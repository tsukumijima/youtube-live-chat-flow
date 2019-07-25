import DOMHelper from './dom-helper'
import MessageBuilder from './message-builder'
import className from '../constants/class-name'
import error from '../assets/error.svg'

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
  async observe() {
    const items = await DOMHelper.querySelectorAsync(
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

    const message = await this._createMessage(node, video.offsetHeight)
    if (!message) {
      return
    }

    const messageInfo = node.querySelector(`.${className.messageInfo}`)
    messageInfo && messageInfo.remove()

    const { banned, reason } = this._filterMessage(message)
    if (banned) {
      const div = parent.document.createElement('div')
      div.classList.add(className.messageInfo)
      div.style.marginTop = '4px'
      div.style.marginRight = '8px'
      div.style.cursor = 'pointer'
      div.title = reason
      div.innerHTML = error
      const svg = div.querySelector('svg')
      svg.style.fill = 'var(--yt-live-chat-secondary-text-color)'
      svg.style.width = '16px'
      node.prepend(div)
      return
    }

    container.appendChild(message.element)

    const lineHeight = Number(message.lineHeight)
    const width = message.element.offsetWidth
    const containerWidth = container.offsetWidth
    const time = Date.now()

    const index = this._getIndex(lineHeight, width, containerWidth, time)
    if (
      index + lineHeight > this._settings.rows &&
      this._settings.overflow === 'hidden'
    ) {
      message.element.remove()
      return
    }

    const z = Math.floor(index / this._settings.rows)
    const y = (index % this._settings.rows) + (z % 2 > 0 ? 0.5 : 0)
    const opacity = this._settings.opacity ** (z + 1)
    const top = (video.offsetHeight / this._settings.rows) * y

    message.element.style.top = `${top}px`
    message.element.style.opacity = opacity
    message.element.style.zIndex = z + 1

    const animation = this._createAnimation(message.element, containerWidth)
    animation.onfinish = () => {
      message.element.remove()
      this._shiftMessage(index, lineHeight)
    }

    message.time = time
    message.animation = animation
    this._pushMessage(message, index, lineHeight)

    if (video.paused) {
      return
    }
    animation.play()
  }
  async _createMessage(node, containerHeight) {
    const height = containerHeight / this._settings.rows

    const builder = new MessageBuilder({
      node,
      height,
      settings: this._settings
    })

    const message = await builder.build()
    if (!message) {
      return null
    }
    message.element.classList.add(className.message)
    return message
  }
  _filterMessage(message) {
    return this._settings.filters.reduce(
      (carry, filter) => {
        if (carry.banned) {
          return carry
        }

        const { subject, keyword, regExp } = filter
        if (!subject || !keyword) {
          return carry
        }

        let reg
        try {
          const pattern = regExp
            ? keyword
            : keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

          reg = new RegExp(`(${pattern})`, 'i')
        } catch (e) {
          return carry
        }

        const text = subject === 'author' ? message.author : message.message
        if (!text || !reg.test(text)) {
          return carry
        }

        let reason = `Match keyword "${keyword}" in ${subject}`
        if (regExp) {
          reason += ' with regexp'
        }

        return {
          banned: true,
          reason
        }
      },
      { banned: false, reason: '' }
    )
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
  _isDeniedIndex(index) {
    // e.g. if rows value is "12", denied index is "23", "47", "71" ...
    return index % (this._settings.rows * 2) === this._settings.rows * 2 - 1
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
          if (this._isDeniedIndex(i + j)) {
            return false
          }

          const messages = rows[i + j]
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
      index = this._rows.length
      const mod = (index + lineHeight) % this._settings.rows
      if (mod > 0 && mod < lineHeight) {
        index += lineHeight - mod
      }
      if (this._isDeniedIndex(index + lineHeight - 1)) {
        index += lineHeight
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
