import Color from 'color'
import DOMHelper from './dom-helper'
import { build } from './message-builder2'
import { parse } from './message-parser'

export default class MessageBuilder {
  private _node: HTMLElement
  private _height: number
  private _settings: any

  constructor({
    node,
    height,
    settings
  }: {
    node: HTMLElement
    height: number
    settings: any
  }) {
    this._node = node
    this._height = height
    this._settings = settings
  }
  async build() {
    let message

    const tagName = this._node.tagName.toLowerCase()
    switch (tagName) {
      case 'yt-live-chat-text-message-renderer':
        message = await this._buildText()
        break
      case 'yt-live-chat-paid-message-renderer':
        if (!this._settings.superChatHidden) {
          message = await this._buildSuperChat()
        }
        break
      case 'yt-live-chat-paid-sticker-renderer':
        if (!this._settings.superStickerHidden) {
          message = await this._buildSuperSticker()
        }
        break
      case 'yt-live-chat-membership-item-renderer':
        if (!this._settings.membershipHidden) {
          message = await this._buildMembership()
        }
        break
    }
    const element = message?.element
    if (!element) {
      return null
    }

    await DOMHelper.waitAllImagesLoaded(element)

    return {
      ...message,
      element
    }
  }
  get _yourName() {
    // if input control exists
    const span = document.querySelector('#input-container span#author-name')
    if (span?.textContent) {
      return span.textContent
    }
    // if input control is moved
    const movedSpan = parent.document.querySelector(
      '#input-container span#author-name'
    )
    if (movedSpan?.textContent) {
      return movedSpan.textContent
    }
    // otherwise
    const button = parent.document.querySelector(
      '.html5-video-player .ytp-chrome-top-buttons .ytp-watch-later-button'
    ) as HTMLElement | null
    // TODO: japanese only
    return button?.getAttribute('title')?.replace(' として後で再生します', '')
  }
  get _authorType() {
    const authorName = this._node.querySelector('#author-name')?.textContent
    const you = authorName && authorName === this._yourName
    return you ? 'you' : this._node.getAttribute('author-type')
  }
  get _paid() {
    const tagName = this._node.tagName.toLowerCase()
    return [
      'yt-live-chat-paid-message-renderer',
      'yt-live-chat-paid-sticker-renderer',
      'yt-live-chat-membership-item-renderer'
    ].includes(tagName)
  }
  get _style() {
    switch (this._authorType) {
      case 'you':
        return this._settings.yourStyle
      case 'owner':
        return this._settings.ownerStyle
      case 'moderator':
        return this._settings.moderatorStyle
      case 'member':
        return this._settings.memberStyle
      default:
        return this._settings.style
    }
  }
  get _avatar() {
    switch (this._authorType) {
      case 'you':
        return this._settings.yourAvatar
      case 'owner':
        return this._settings.ownerAvatar
      case 'moderator':
        return this._settings.moderatorAvatar
      case 'member':
        return this._settings.memberAvatar
      default:
        return this._settings.avatar
    }
  }
  get _textColor() {
    if (this._paid) {
      return '#ffffff'
    }
    switch (this._authorType) {
      case 'you':
        return this._settings.yourColor
      case 'owner':
        return this._settings.ownerColor
      case 'moderator':
        return this._settings.moderatorColor
      case 'member':
        return this._settings.memberColor
      default:
        return this._settings.color
    }
  }
  get _textStyle() {
    const n = ((this._height * 0.8) / 48).toFixed(2)
    const c = Color(this._textColor)
      .darken(0.6)
      .hex()
    return `
          text-shadow:
            -${n}px -${n}px 0 ${c},
            ${n}px -${n}px 0 ${c},
            -${n}px ${n}px 0 ${c},
            ${n}px ${n}px 0 ${c},
            0 ${n}px 0 ${c},
            0 -${n}px 0 ${c},
            ${n}px 0 0 ${c},
            -${n}px 0 0 ${c};
        `
  }
  async _buildText() {
    let message
    if (this._style === 'two-line') {
      message = await this._buildTwoLineText()
    } else {
      message = await this._buildOneLineText()
    }
    return {
      ...message,
      author: this._node.querySelector('#author-name')?.childNodes[0]
        .textContent,
      message: this._node.querySelector('#message')?.textContent
    }
  }
  async _buildOneLineText() {
    const params = await parse(this._node)

    const element = build('one-line-message', {
      ...params,
      fontColor: this._textColor,
      fontStyle: this._textStyle + this._settings.extendedStyle,
      height: this._height
    })

    return {
      element,
      rows: 1
    }
  }
  async _buildTwoLineText() {
    const params = await parse(this._node)

    const element = build('two-line-message', {
      ...params,
      fontColor: this._textColor,
      fontStyle: this._textStyle + this._settings.extendedStyle,
      height: this._height
    })

    return {
      element,
      rows: 2
    }
  }
  async _buildSuperChat() {
    const params = await parse(this._node)

    const element = build('card-message', {
      ...params,
      fontColor: this._textColor,
      fontStyle: this._textStyle + this._settings.extendedStyle,
      height: this._height
    })

    return {
      element,
      rows: params?.html ? 3 : 2
    }
  }
  async _buildSuperSticker() {
    const params = await parse(this._node)

    const element = build('sticker', {
      ...params,
      fontColor: this._textColor,
      fontStyle: this._textStyle + this._settings.extendedStyle,
      height: this._height
    })

    return {
      element,
      rows: 3
    }
  }
  async _buildMembership() {
    const params = await parse(this._node)

    const element = build('card-message', {
      ...params,
      fontColor: this._textColor,
      fontStyle: this._textStyle + this._settings.extendedStyle,
      height: this._height
    })

    return {
      element,
      rows: 3
    }
  }
}
