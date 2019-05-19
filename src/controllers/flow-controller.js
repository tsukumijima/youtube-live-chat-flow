import className from '../constants/class-name'
import DOMHelper from '../helpers/dom-helper'
import StyleHelper from '../helpers/style-helper'

export default class FlowController {
  constructor() {
    this._enabled = true
    this._settings = null
    this._lines = []
  }
  get enabled() {
    return this._enabled
  }
  set enabled(value) {
    this._enabled = value
    if (!this._enabled) {
      this.clear()
    }
  }
  get settings() {
    return this._settings
  }
  set settings(value) {
    this._settings = value
  }
  _getMyName() {
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
  _createTextElement(node, outerHeight) {
    const html =
      node.querySelector('#message') && node.querySelector('#message').innerHTML
    if (!html) {
      return null
    }

    const avatarUrl =
      node.querySelector('#img') && node.querySelector('#img').src
    const authorName =
      node.querySelector('#author-name') &&
      node.querySelector('#author-name').textContent
    const purchase =
      node.querySelector('#purchase-amount') &&
      node.querySelector('#purchase-amount').textContent
    const myself = authorName === this._getMyName()
    let authorType = node.getAttribute('author-type')
    if (myself) {
      authorType = 'myself'
    } else if (purchase) {
      authorType = 'super-chat'
    }

    const height = outerHeight * 0.8
    const padding = outerHeight * 0.1

    const helper = new StyleHelper({
      authorType,
      fontSize: height,
      settings: this._settings
    })

    const element = parent.document.createElement('div')
    element.classList.add(className.message)
    element.style.color = helper.textColor
    element.style.fontSize = `${height}px`
    element.style.height = `${height}px`
    element.style.lineHeight = `${height}px`
    element.style.paddingTop = `${padding}px`
    element.style.paddingBottom = `${padding}px`
    element.setAttribute(
      'style',
      element.getAttribute('style') +
        helper.textStyle +
        this._settings.extendedTextStyle
    )
    element.dataset.lineHeight = 1

    if (helper.avatar && avatarUrl) {
      element.classList.add('has-auth')
      const img = parent.document.createElement('img')
      img.classList.add(className.messageAvatar)
      img.src = avatarUrl
      img.style.borderRadius = `${height}px`
      img.style.height = `${height}px`
      element.appendChild(img)
    }

    const span = parent.document.createElement('span')
    span.classList.add(className.messageText)
    span.innerHTML = html
    Array.from(span.childNodes).map((node) => {
      if (!node.tagName || node.tagName.toLowerCase() !== 'img') {
        return node
      }
      node.style.height = `${height}px`
      return node
    })
    element.appendChild(span)

    if (purchase) {
      const textSize = height * 0.5
      const span = parent.document.createElement('span')
      span.classList.add(className.messagePurchase)
      span.style.fontSize = `${textSize}px`
      span.textContent = purchase
      element.appendChild(span)
    }
    return element
  }
  async _createStickerElement(node, outerHeight) {
    const height = outerHeight * 1.8
    const padding = outerHeight * 0.1
    const stickerImg = node.querySelector('#sticker #img')
    if (!stickerImg) {
      return null
    }
    const stickerUrl = await DOMHelper.getImageSourceAsync(stickerImg)
    const img = parent.document.createElement('img')
    img.classList.add(className.sticker)
    img.src = stickerUrl
    img.style.height = `${height}px`
    img.style.paddingTop = `${padding}px`
    img.style.paddingBottom = `${padding}px`
    img.dataset.lineHeight = 2
    return img
  }
  async _createElement(node, containerHeight, settings) {
    const tagName = node.tagName.toLowerCase()

    const tagNames = [
      'yt-live-chat-text-message-renderer',
      'yt-live-chat-paid-message-renderer',
      'yt-live-chat-paid-sticker-renderer'
    ]
    if (!tagNames.includes(tagName)) {
      return
    }

    const height = containerHeight / settings.rows

    const element =
      tagName === 'yt-live-chat-paid-sticker-renderer'
        ? await this._createStickerElement(node, height, settings)
        : this._createTextElement(node, height, settings)
    if (!element) {
      return null
    }

    await DOMHelper.waitAllImagesLoaded(element)

    return element
  }
  _createAnimation(element, containerWidth) {
    const millis = this._settings.speed * 1000
    const keyframes = [
      { transform: `translate(${containerWidth}px, 0px)` },
      { transform: `translate(-${element.offsetWidth}px, 0px)` }
    ]
    return element.animate(keyframes, millis)
  }
  _getIndex(element, lineHeight, containerWidth, time) {
    const millis = this._settings.speed * 1000
    const vc = (containerWidth + element.offsetWidth) / millis

    let index = this._lines.findIndex((_, i, lines) => {
      return Array(lineHeight)
        .fill(1)
        .every((_, j) => {
          const messages = lines[i + j]
          if (!messages) {
            return true
          }
          const message = messages[messages.length - 1]
          if (!message) {
            return true
          }
          const vt = (containerWidth + message.element.offsetWidth) / millis

          const t1 = time - message.time
          const d1 = vt * t1
          if (d1 < message.element.offsetWidth) {
            return false
          }

          const t2 = t1 + containerWidth / vc
          const d2 = vt * t2
          if (d2 < containerWidth + message.element.offsetWidth) {
            return false
          }

          return true
        })
    })
    if (index === -1) {
      index = this._lines.length
    }
    return index
  }
  _pushMessage(message, index, lineHeight) {
    Array(lineHeight)
      .fill(1)
      .forEach((_, j) => {
        const i = index + j
        if (!this._lines[i]) {
          this._lines[i] = []
        }
        this._lines[i].push(message)
      })
  }
  _shiftMessage(index, lineHeight) {
    Array(lineHeight)
      .fill(1)
      .forEach((_, j) => {
        const i = index + j
        this._lines[i].shift()
      })
  }
  async _flow(node) {
    if (!this._enabled || !this._settings) {
      return
    }

    const video = parent.document.querySelector('video.html5-main-video')
    if (!video || video.paused) {
      return
    }

    const container = parent.document.querySelector('.html5-video-container')
    if (!container) {
      return
    }

    const element = await this._createElement(
      node,
      video.offsetHeight,
      this._settings
    )
    if (!element) {
      return
    }
    container.appendChild(element)

    const lineHeight = Number(element.dataset.lineHeight)
    const now = Date.now()

    const index = this._getIndex(
      element,
      lineHeight,
      container.offsetWidth,
      now
    )
    if (
      index + lineHeight > this._settings.rows &&
      this._settings.overflow === 'hidden'
    ) {
      element.remove()
      return
    }

    const animation = this._createAnimation(element, container.offsetWidth)

    const message = {
      element,
      animation,
      time: now
    }

    this._pushMessage(message, index, lineHeight)

    const top =
      (video.offsetHeight / this._settings.rows) * (index % this._settings.rows)
    const depth = element.classList.contains('has-auth')
      ? 0
      : Math.floor(index / this._settings.rows)
    const opacity = this._settings.opacity ** (depth + 1)

    element.style.top = `${top}px`
    element.style.opacity = opacity

    animation.onfinish = () => {
      element.remove()
      this._shiftMessage(index, lineHeight)
    }
  }
  observe() {
    const items = document.querySelector(
      '#items.yt-live-chat-item-list-renderer'
    )
    if (!items) {
      return
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const nodes = Array.from(mutation.addedNodes)
        nodes.forEach((node) => {
          this._flow(node)
        })
      })
    })
    observer.observe(items, { childList: true })
  }
  start() {
    this._lines
      .reduce(
        (carry, messages) => [
          ...carry,
          ...messages.map((message) => message.animation)
        ],
        []
      )
      .forEach((animation) => animation.play())
  }
  stop() {
    this._lines
      .reduce(
        (carry, messages) => [
          ...carry,
          ...messages.map((message) => message.animation)
        ],
        []
      )
      .forEach((animation) => animation.pause())
  }
  clear() {
    this._lines
      .reduce(
        (carry, messages) => [
          ...carry,
          ...messages.map((message) => message.element)
        ],
        []
      )
      .forEach((element) => element.remove())
  }
}
