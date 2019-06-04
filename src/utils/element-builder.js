import Color from 'color'
import DOMHelper from './dom-helper'
import className from '../constants/class-name'

export default class ElementBuilder {
  constructor({ node, height, settings }) {
    this._node = node
    this._height = height
    this._settings = settings
  }
  async build() {
    let element

    const tagName = this._node.tagName.toLowerCase()
    switch (tagName) {
      case 'yt-live-chat-text-message-renderer':
        element = await this._buildText()
        break
      case 'yt-live-chat-paid-message-renderer':
        element = await this._buildSuperChat()
        break
      case 'yt-live-chat-paid-sticker-renderer':
        element = await this._buildSuperSticker()
        break
    }
    if (!element) {
      return null
    }

    await DOMHelper.waitAllImagesLoaded(element)

    return element
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
    if (this._style === 'two-line') {
      return await this._buildTwoLineText()
    } else {
      return await this._buildOneLineText()
    }
  }
  async _buildOneLineText() {
    const html = this._node.querySelector('#message').innerHTML
    const avatarUrl = await DOMHelper.getImageSourceAsync(
      this._node.querySelector('#img')
    )

    const height = this._height * 0.8
    const padding = this._height * 0.1

    const element = parent.document.createElement('div')
    element.dataset.lineHeight = 1
    element.classList.add(className.message)
    element.style.color = this._textColor
    element.style.fontSize = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.padding = `${padding}px`
    element.style.height = `${this._height}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') +
        this._textStyle +
        this._settings.extendedTextStyle
    )

    if (this._avatar && avatarUrl) {
      const avatar = parent.document.createElement('img')
      avatar.classList.add(className.messageAvatar)
      avatar.src = avatarUrl
      avatar.style.borderRadius = `${height}px`
      avatar.style.height = `${height}px`
      element.append(avatar)
    }

    const message = parent.document.createElement('span')
    message.classList.add(className.messageMessage)
    message.innerHTML = html
    Array.from(message.childNodes).map((node) => {
      if (!node.tagName || node.tagName.toLowerCase() !== 'img') {
        return node
      }
      node.style.height = `${height}px`
      return node
    })
    element.append(message)

    return element
  }
  async _buildTwoLineText() {
    const html = this._node.querySelector('#message').innerHTML
    const authorName = this._node.querySelector('#author-name').textContent
    const avatarUrl = await DOMHelper.getImageSourceAsync(
      this._node.querySelector('#img')
    )

    const height = this._height * 0.8
    const padding = this._height * 0.1

    const element = parent.document.createElement('div')
    element.dataset.lineHeight = 2
    element.classList.add(className.message, className.messageTwoLine)
    element.style.color = this._textColor
    element.style.fontSize = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.padding = `${padding}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') +
        this._textStyle +
        this._settings.extendedTextStyle
    )

    if (this._avatar && avatarUrl) {
      const avatar = parent.document.createElement('img')
      avatar.classList.add(className.messageAvatar)
      avatar.src = avatarUrl
      avatar.style.borderRadius = `${height}px`
      avatar.style.height = `${height}px`
      element.append(avatar)
    }

    const div = parent.document.createElement('div')
    element.append(div)

    const subTextHeight = height * 0.8
    const subTextPadding = height * 0.1
    const author = parent.document.createElement('span')
    author.classList.add(className.messageAuthor)
    author.style.fontSize = `${subTextHeight}px`
    author.style.lineHeight = `${subTextHeight}px`
    author.style.paddingTop = `${subTextPadding}px`
    author.style.paddingBottom = `${subTextPadding}px`
    author.textContent = authorName
    div.append(author)

    const message = parent.document.createElement('span')
    message.classList.add(className.messageMessage)
    message.style.paddingTop = `${padding}px`
    message.innerHTML = html
    Array.from(message.childNodes).map((node) => {
      if (!node.tagName || node.tagName.toLowerCase() !== 'img') {
        return node
      }
      node.style.height = `${height}px`
      return node
    })
    div.append(message)

    return element
  }
  async _buildSuperChat() {
    const html = this._node.querySelector('#message').innerHTML
    const authorName = this._node.querySelector('#author-name').textContent
    const avatarUrl = await DOMHelper.getImageSourceAsync(
      this._node.querySelector('#img')
    )

    const amount = this._node.querySelector('#purchase-amount').textContent
    const cardColor = getComputedStyle(
      this._node.querySelector('#card > #header')
    ).backgroundColor
    const c = new Color(cardColor).object()
    const backgroundColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.8)`

    const height = this._height * 0.8
    const padding = this._height * 0.1

    const element = parent.document.createElement('div')
    element.dataset.lineHeight = 3
    element.classList.add(className.message, className.messageSuperChat)
    element.style.color = 'white'
    element.style.fontSize = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.padding = `${padding}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') + this._settings.extendedTextStyle
    )

    const wrapperPadding = this._height * 0.2
    const wrapper = parent.document.createElement('div')
    wrapper.style.backgroundColor = backgroundColor
    wrapper.style.borderRadius = `${wrapperPadding / 2}px`
    wrapper.style.padding = `${wrapperPadding}px`
    element.append(wrapper)

    const avatar = parent.document.createElement('img')
    avatar.classList.add(className.messageAvatar)
    avatar.src = avatarUrl
    avatar.style.borderRadius = `${height}px`
    avatar.style.height = `${height}px`
    wrapper.append(avatar)

    const div = parent.document.createElement('div')
    wrapper.append(div)

    const subTextHeight = height * 0.8
    const subTextPadding = height * 0.1
    const author = parent.document.createElement('span')
    author.classList.add(className.messageAuthor)
    author.style.fontSize = `${subTextHeight}px`
    author.style.lineHeight = `${subTextHeight}px`
    author.style.paddingTop = `${subTextPadding}px`
    author.style.paddingBottom = `${subTextPadding}px`
    author.textContent = authorName
    div.append(author)

    const purchaseTextHeight = height * 0.5
    const purchase = parent.document.createElement('span')
    purchase.classList.add(className.messagePurchaseAmount)
    purchase.style.fontSize = `${purchaseTextHeight}px`
    purchase.textContent = amount
    author.append(purchase)

    if (html) {
      const message = parent.document.createElement('span')
      message.classList.add(className.messageMessage)
      message.style.paddingTop = `${padding}px`
      message.innerHTML = html
      Array.from(message.childNodes).map((node) => {
        if (!node.tagName || node.tagName.toLowerCase() !== 'img') {
          return node
        }
        node.style.height = `${height}px`
        return node
      })
      div.append(message)
    }

    return element
  }
  async _buildSuperSticker() {
    const avatarUrl = this._node.querySelector('#img').src
    const authorName = this._node.querySelector('#author-name').textContent
    const amount = this._node.querySelector('#purchase-amount-chip').textContent
    const cardColor = getComputedStyle(this._node.querySelector('#card'))
      .backgroundColor
    const c = new Color(cardColor).object()
    const backgroundColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.8)`

    const height = this._height * 0.8
    const padding = this._height * 0.1

    const element = parent.document.createElement('div')
    element.dataset.lineHeight = 3
    element.classList.add(className.message, className.messageSuperSticker)
    element.style.color = 'white'
    element.style.fontSize = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.padding = `${padding}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') + this._settings.extendedTextStyle
    )

    const wrapperPadding = this._height * 0.2
    const wrapper = parent.document.createElement('div')
    wrapper.style.backgroundColor = backgroundColor
    wrapper.style.borderRadius = `${wrapperPadding / 2}px`
    wrapper.style.padding = `${wrapperPadding}px`
    element.append(wrapper)

    const avatar = parent.document.createElement('img')
    avatar.classList.add(className.messageAvatar)
    avatar.src = avatarUrl
    avatar.style.borderRadius = `${height}px`
    avatar.style.height = `${height}px`
    wrapper.append(avatar)

    const div = parent.document.createElement('div')
    wrapper.append(div)

    const subTextHeight = height * 0.8
    const subTextPadding = height * 0.1
    const author = parent.document.createElement('span')
    author.classList.add(className.messageAuthor)
    author.style.fontSize = `${subTextHeight}px`
    author.style.lineHeight = `${subTextHeight}px`
    author.style.paddingTop = `${subTextPadding}px`
    author.style.paddingBottom = `${subTextPadding}px`
    author.textContent = authorName
    div.append(author)

    const purchaseTextHeight = height * 0.5
    const purchase = parent.document.createElement('span')
    purchase.classList.add(className.messagePurchaseAmount)
    purchase.style.fontSize = `${purchaseTextHeight}px`
    purchase.textContent = amount
    author.append(purchase)

    const stickerImg = this._node.querySelector('#sticker > #img')
    if (!stickerImg) {
      return null
    }
    const stickerUrl = await DOMHelper.getImageSourceAsync(stickerImg)
    const stickerHeight = this._height * 1.6
    const stickerPadding = this._height * 0.1
    const sticker = parent.document.createElement('img')
    sticker.src = stickerUrl
    sticker.style.height = `${stickerHeight}px`
    sticker.style.paddingTop = `${stickerPadding}px`
    div.append(sticker)

    return element
  }
}
