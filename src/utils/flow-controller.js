import ElementBuilder from './element-builder'
import className from '../constants/class-name'

export default class FlowController {
  constructor() {
    this._enabled = true
    this._settings = null
    this._rows = []
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
    this._observer && this._observer.disconnect()
  }
  play() {
    this._rows
      .reduce(
        (carry, messages) => [
          ...carry,
          ...messages.map((message) => message.animation)
        ],
        []
      )
      .forEach((animation) => animation.play())
  }
  pause() {
    this._rows
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
    parent.document.querySelectorAll(`.${className.message}`).forEach((e) => {
      e.remove()
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
    const width = element.offsetWidth
    const containerWidth = container.offsetWidth
    const time = Date.now()

    const index = this._getIndex(lineHeight, width, containerWidth, time)
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

    const animation = this._createAnimation(element, containerWidth)
    animation.onfinish = () => {
      element.remove()
      this._shiftMessage(index, lineHeight)
    }

    const message = {
      width,
      time,
      animation
    }
    this._pushMessage(message, index, lineHeight)

    if (video.paused) {
      return
    }
    animation.play()
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
    element.classList.add(className.message)
    return element
  }
  _createAnimation(element, containerWidth) {
    const millis = this._settings.speed * 1000
    const keyframes = [
      { transform: `translate(${containerWidth}px, 0px)` },
      { transform: `translate(-${element.offsetWidth}px, 0px)` }
    ]
    const animation = element.animate(keyframes, millis)
    animation.pause()
    return animation
  }
  _getIndex(lineHeight, width, containerWidth, time) {
    const millis = this._settings.speed * 1000
    const vc = (containerWidth + width) / millis

    let index = this._rows.findIndex((_, i, rows) => {
      const mod = (i + lineHeight) % this._settings.rows
      if (mod > 0 && mod < lineHeight) {
        return false
      }
      return Array(lineHeight)
        .fill(1)
        .every((_, j) => {
          const messages = rows[i + j]
          if (!messages) {
            return true
          }
          const message = messages[messages.length - 1]
          if (!message) {
            return true
          }
          const vt = (containerWidth + message.width) / millis

          const t1 = time - message.time
          const d1 = vt * t1
          if (d1 < message.width) {
            return false
          }

          const t2 = t1 + containerWidth / vc
          const d2 = vt * t2
          if (d2 < containerWidth + message.width) {
            return false
          }

          return true
        })
    })
    if (index === -1) {
      index = this._rows.length
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
        if (!this._rows[i]) {
          this._rows[i] = []
        }
        this._rows[i].push(message)
      })
  }
  _shiftMessage(index, lineHeight) {
    Array(lineHeight)
      .fill(1)
      .forEach((_, j) => {
        const i = index + j
        this._rows[i].shift()
      })
  }
}
