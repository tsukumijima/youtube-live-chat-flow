import ElementBuilder from './element-builder'

export default class FlowController {
  constructor() {
    this._enabled = true
    this._settings = null
    this._lines = []
    this._observer = null
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
  async _createElement(node, containerHeight) {
    const height = containerHeight / this._settings.rows

    const builder = new ElementBuilder({
      node,
      height,
      settings: this._settings
    })
    const element = await builder.build()
    if (!element) {
      return null
    }

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
      const mod = (i + lineHeight) % this._settings.rows
      if (mod > 0 && mod < lineHeight) {
        return false
      }
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
      const mod = (index + lineHeight) % this._settings.rows
      if (mod > 0 && mod < lineHeight) {
        index += lineHeight - mod
      }
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

    const element = await this._createElement(node, video.offsetHeight)
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

    const top =
      (video.offsetHeight / this._settings.rows) * (index % this._settings.rows)
    const depth = Math.floor(index / this._settings.rows)
    const opacity = this._settings.opacity ** (depth + 1)

    element.style.top = `${top}px`
    element.style.opacity = opacity

    const animation = this._createAnimation(element, container.offsetWidth)

    const message = {
      element,
      animation,
      time: now
    }

    this._pushMessage(message, index, lineHeight)

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

    this._observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const nodes = Array.from(mutation.addedNodes)
        nodes.forEach((node) => {
          this._flow(node)
        })
      })
    })
    this._observer.observe(items, { childList: true })
  }
  disconnect() {
    this._observer.disconnect()
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
