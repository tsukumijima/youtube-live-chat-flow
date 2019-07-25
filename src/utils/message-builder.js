import Color from 'color'
import DOMHelper from './dom-helper'
import className from '../constants/class-name'

export default class MessageBuilder {
  constructor({ node, height, settings }) {
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
      case 'yt-live-chat-legacy-paid-message-renderer':
        if (!this._settings.membershipHidden) {
          message = await this._buildMembership()
        }
        break
    }
    if (!message) {
      return null
    }

    await DOMHelper.waitAllImagesLoaded(message.element)

    return message
  }
  get _myName() {
    // if input control exists
    const span = document.querySelector('#input-container span#author-name')
    if (span) {
      return span.textContent
    }
    // if input control is moved
    const movedSpan = parent.document.querySelector(
      '#input-container span#author-name'
    )
    if (movedSpan) {
      return movedSpan.textContent
    }
    // otherwise
    const button = parent.document.querySelector(
      '.html5-video-player .ytp-chrome-top-buttons .ytp-watch-later-button'
    )
    if (button) {
      // TODO: japanese only
      return button.getAttribute('title').replace(' として後で再生します', '')
    }
    return null
  }
  get _authorType() {
    const authorName = this._node.querySelector('#author-name').textContent
    const myself = authorName === this._myName
    return myself ? 'myself' : this._node.getAttribute('author-type')
  }
  get _style() {
    switch (this._authorType) {
      case 'myself':
        return this._settings.myStyle
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
      case 'myself':
        return this._settings.myAvatar
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
    switch (this._authorType) {
      case 'myself':
        return this._settings.myColor
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
    switch (this._settings.textStyle) {
      case 'outline': {
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
      case 'shadow':
        return `text-shadow: ${n}px ${n}px ${n * 2}px #333;`
      case 'none':
      default:
        return ''
    }
  }
  async _buildText() {
    let message
    if (this._style === 'two-line') {
      message = await this._buildTwoLineText()
    } else {
      message = await this._buildOneLineText()
    }
    message.author = this._node.querySelector(
      '#author-name'
    ).childNodes[0].textContent
    message.message = this._node.querySelector('#message').textContent
    return message
  }
  async _buildOneLineText() {
    const html = this._node.querySelector('#message').innerHTML
    const avatarUrl = await DOMHelper.getImageSourceAsync(
      this._node.querySelector('#img')
    )

    const height = this._height * 0.8
    const padding = this._height * 0.1

    const element = parent.document.createElement('div')
    element.style.color = this._textColor
    element.style.fontSize = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.padding = `${padding}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') +
        this._textStyle +
        this._settings.extendedStyle
    )

    if (this._avatar && avatarUrl) {
      const avatar = parent.document.createElement('img')
      avatar.classList.add(className.messageAvatar)
      avatar.src = avatarUrl
      avatar.style.height = `${height}px`
      avatar.style.marginRight = `${padding * 2}px`
      element.append(avatar)
    }

    const message = parent.document.createElement('span')
    message.classList.add(className.messageMessage)
    message.innerHTML = html
    this._fixInnerImageHeight(message, height)
    element.append(message)

    return {
      element,
      lineHeight: 1
    }
  }
  async _buildTwoLineText() {
    const html = this._node.querySelector('#message').innerHTML
    const avatarUrl = await DOMHelper.getImageSourceAsync(
      this._node.querySelector('#img')
    )
    const authorName = this._node.querySelector('#author-name').textContent

    const height = this._height * 0.8
    const padding = this._height * 0.1

    const element = parent.document.createElement('div')
    element.classList.add(className.messageTwoLine)
    element.style.color = this._textColor
    element.style.fontSize = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.padding = `${padding}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') +
        this._textStyle +
        this._settings.extendedStyle
    )

    if (this._avatar && avatarUrl) {
      const avatar = parent.document.createElement('img')
      avatar.classList.add(className.messageAvatar)
      avatar.src = avatarUrl
      avatar.style.height = `${height}px`
      avatar.style.marginRight = `${padding * 2}px`
      element.append(avatar)
    }

    const wrapper = parent.document.createElement('div')
    element.append(wrapper)

    const subTextHeight = height * 0.8
    const subTextPadding = height * 0.1
    const author = parent.document.createElement('span')
    author.classList.add(className.messageAuthor)
    author.style.fontSize = `${subTextHeight}px`
    author.style.lineHeight = `${subTextHeight}px`
    author.style.paddingTop = `${subTextPadding}px`
    author.style.paddingBottom = `${subTextPadding}px`
    author.textContent = authorName
    wrapper.append(author)

    const message = parent.document.createElement('span')
    message.classList.add(className.messageMessage)
    message.style.paddingTop = `${padding}px`
    message.innerHTML = html
    this._fixInnerImageHeight(message, height)
    wrapper.append(message)

    return {
      element,
      lineHeight: 2
    }
  }
  async _buildSuperChat() {
    const html = this._node.querySelector('#message').innerHTML
    const avatarUrl = await DOMHelper.getImageSourceAsync(
      this._node.querySelector('#img')
    )
    const authorName = this._node.querySelector('#author-name').textContent
    const amount = this._node.querySelector('#purchase-amount').textContent
    const color = this._getColor(
      this._node.querySelector('#card > #header'),
      0.8
    )
    const backgroundColor = this._getBackgroundColor(
      this._node.querySelector('#card > #header'),
      0.8
    )

    const height = this._height * 0.8
    const padding = this._height * 0.1

    const element = parent.document.createElement('div')
    element.classList.add(className.messageSuperChat)
    element.style.color = color
    element.style.fontSize = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.padding = `${padding}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') + this._settings.extendedStyle
    )

    const containerPadding = this._height * 0.2
    const container = parent.document.createElement('div')
    container.style.backgroundColor = backgroundColor
    container.style.borderRadius = `${containerPadding / 2}px`
    container.style.padding = `${containerPadding}px ${containerPadding * 2}px`
    element.append(container)

    if (avatarUrl) {
      const avatar = parent.document.createElement('img')
      avatar.classList.add(className.messageAvatar)
      avatar.src = avatarUrl
      avatar.style.height = `${height}px`
      avatar.style.marginRight = `${padding * 2}px`
      container.append(avatar)
    }

    const wrapper = parent.document.createElement('div')
    container.append(wrapper)

    const subTextHeight = height * 0.8
    const subTextPadding = height * 0.1
    const author = parent.document.createElement('span')
    author.classList.add(className.messageAuthor)
    author.style.fontSize = `${subTextHeight}px`
    author.style.lineHeight = `${subTextHeight}px`
    author.style.paddingTop = `${subTextPadding}px`
    author.style.paddingBottom = `${subTextPadding}px`
    author.textContent = `${authorName} - ${amount}`
    wrapper.append(author)

    if (html) {
      const message = parent.document.createElement('span')
      message.classList.add(className.messageMessage)
      message.style.paddingTop = `${padding}px`
      message.innerHTML = html
      this._fixInnerImageHeight(message, height)
      wrapper.append(message)
    }

    return {
      element,
      lineHeight: html ? 3 : 2
    }
  }
  async _buildSuperSticker() {
    const avatarUrl = await DOMHelper.getImageSourceAsync(
      this._node.querySelector('#img')
    )
    const authorName = this._node.querySelector('#author-name').textContent
    const amount = this._node.querySelector('#purchase-amount-chip').textContent
    const color = this._getColor(
      this._node.querySelector('#card #author-name'),
      0.8
    )
    const backgroundColor = this._getBackgroundColor(
      this._node.querySelector('#card'),
      0.8
    )
    const stickerUrl = await DOMHelper.getImageSourceAsync(
      this._node.querySelector('#sticker > #img')
    )

    const height = this._height * 0.8
    const padding = this._height * 0.1

    const element = parent.document.createElement('div')
    element.classList.add(className.messageSuperSticker)
    element.style.color = color
    element.style.fontSize = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.padding = `${padding}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') + this._settings.extendedStyle
    )

    const containerPadding = this._height * 0.2
    const container = parent.document.createElement('div')
    container.style.backgroundColor = backgroundColor
    container.style.borderRadius = `${containerPadding / 2}px`
    container.style.padding = `${containerPadding}px ${containerPadding * 2}px`
    element.append(container)

    if (avatarUrl) {
      const avatar = parent.document.createElement('img')
      avatar.classList.add(className.messageAvatar)
      avatar.src = avatarUrl
      avatar.style.height = `${height}px`
      avatar.style.marginRight = `${padding * 2}px`
      container.append(avatar)
    }

    const wrapper = parent.document.createElement('div')
    container.append(wrapper)

    const subTextHeight = height * 0.8
    const subTextPadding = height * 0.1
    const author = parent.document.createElement('span')
    author.classList.add(className.messageAuthor)
    author.style.fontSize = `${subTextHeight}px`
    author.style.lineHeight = `${subTextHeight}px`
    author.style.paddingTop = `${subTextPadding}px`
    author.style.paddingBottom = `${subTextPadding}px`
    author.textContent = `${authorName} - ${amount}`
    wrapper.append(author)

    if (stickerUrl) {
      const stickerHeight = height * 1.9
      const sticker = parent.document.createElement('img')
      sticker.src = stickerUrl
      sticker.style.height = `${stickerHeight}px`
      sticker.style.paddingTop = `${padding}px`
      wrapper.append(sticker)
    }

    return {
      element,
      lineHeight: 3
    }
  }
  async _buildMembership() {
    const avatarUrl = await DOMHelper.getImageSourceAsync(
      this._node.querySelector('#img')
    )
    const eventText = this._node.querySelector('#event-text').textContent
    const detailText = this._node.querySelector('#detail-text').textContent
    const color = this._getColor(this._node.querySelector('#card'), 0.8)
    const backgroundColor = this._getBackgroundColor(
      this._node.querySelector('#card'),
      0.8
    )

    const height = this._height * 0.8
    const padding = this._height * 0.1

    const element = parent.document.createElement('div')
    element.classList.add(className.messageMembership)
    element.style.color = color
    element.style.fontSize = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.padding = `${padding}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') + this._settings.extendedStyle
    )

    const containerPadding = this._height * 0.2
    const container = parent.document.createElement('div')
    container.style.backgroundColor = backgroundColor
    container.style.borderRadius = `${containerPadding / 2}px`
    container.style.padding = `${containerPadding}px ${containerPadding * 2}px`
    element.append(container)

    if (avatarUrl) {
      const avatar = parent.document.createElement('img')
      avatar.classList.add(className.messageAvatar)
      avatar.src = avatarUrl
      avatar.style.height = `${height}px`
      avatar.style.marginRight = `${padding * 2}px`
      container.append(avatar)
    }

    const wrapper = parent.document.createElement('div')
    container.append(wrapper)

    const subTextHeight = height * 0.8
    const subTextPadding = height * 0.1
    const author = parent.document.createElement('span')
    author.classList.add(className.messageAuthor)
    author.style.fontSize = `${subTextHeight}px`
    author.style.lineHeight = `${subTextHeight}px`
    author.style.paddingTop = `${subTextPadding}px`
    author.style.paddingBottom = `${subTextPadding}px`
    author.textContent = eventText
    wrapper.append(author)

    const message = parent.document.createElement('span')
    message.classList.add(className.messageMessage)
    message.style.paddingTop = `${padding}px`
    message.textContent = detailText
    this._fixInnerImageHeight(message, height)
    wrapper.append(message)

    return {
      element,
      lineHeight: 3
    }
  }
  _fixInnerImageHeight(node, height) {
    const children = node.childNodes
    if (!children) {
      return
    }

    Array.from(children).map((node) => {
      if (node.tagName && node.tagName.toLowerCase() === 'img') {
        node.style.height = `${height}px`
        return node
      }

      this._fixInnerImageHeight(node, height)
      return node
    })
  }
  _getColor(node, opacity) {
    const color = getComputedStyle(node).color
    const o = new Color(color).object()
    return `rgba(${o.r}, ${o.g}, ${o.b}, ${opacity})`
  }
  _getBackgroundColor(node, opacity) {
    const backgroundColor = getComputedStyle(node).backgroundColor
    const o = new Color(backgroundColor).object()
    return `rgba(${o.r}, ${o.g}, ${o.b}, ${opacity})`
  }
}
