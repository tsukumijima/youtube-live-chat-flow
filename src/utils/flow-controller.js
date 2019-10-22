import DOMHelper from './dom-helper'
import MessageBuilder from './message-builder'
import className from '../constants/class-name'
import error from '../assets/error.svg'

export default class FlowController {
  constructor() {
    this._enabled = true
    this._following = true
    this._settings = null
    this._rows = []
    this._observer = null
    this._timer = null
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
  get following() {
    return this._following
  }
  set following(value) {
    this._following = value
    if (value) {
      const scrollToBottom = () => {
        const hovered = !!document.querySelector('#chat:hover')
        if (hovered) {
          return
        }
        const scroller = document.querySelector('#item-scroller')
        if (scroller) {
          scroller.scrollTop = scroller.scrollHeight
        }
      }
      scrollToBottom()
      this._timer = setInterval(scrollToBottom, 1000)
    } else {
      clearInterval(this._timer)
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

    const rows = Number(this._settings.rows)
    const height = video.offsetHeight / (rows + 0.2)

    const message = await this._createMessage(node, height)
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

    const messageRows = Number(message.rows)
    const containerWidth = container.offsetWidth
    const times = this._createTimes(message.element, containerWidth)

    const index = this._getIndex(messageRows, times)
    if (index + messageRows > rows && this._settings.overflow === 'hidden') {
      message.element.remove()
      return
    }

    const z = Math.floor(index / rows)
    const y = (index % rows) + (z % 2 > 0 ? 0.5 : 0)
    const opacity = this._settings.opacity ** (z + 1)
    const top = height * (y + 0.1)

    message.element.style.top = `${top}px`
    message.element.style.opacity = opacity
    message.element.style.zIndex = z + 1

    const animation = this._createAnimation(message.element, containerWidth)
    animation.onfinish = () => {
      message.element.remove()
      this._shiftMessage(index, messageRows)
    }

    message.times = times
    message.animation = animation
    this._pushMessage(message, index, messageRows)

    if (video.paused) {
      return
    }
    animation.play()
  }
  async _createMessage(node, height) {
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
  _createTimes(element, containerWidth) {
    const millis = this._settings.speed * 1000
    const w = element.offsetWidth
    const v = (containerWidth + w) / millis
    const t = w / v
    const n = Date.now()

    return {
      willAppear: n,
      didAppear: n + t,
      willDisappear: n + millis - t,
      didDisappear: n + millis
    }
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
  _getIndex(messageRows, times) {
    let index = this._rows.findIndex((_, i, rows) => {
      const mod = (i + messageRows) % this._settings.rows
      if (mod > 0 && mod < messageRows) {
        return false
      }
      return Array(messageRows)
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

          return (
            message.times.didDisappear < times.willDisappear &&
            message.times.didAppear < times.willAppear
          )
        })
    })
    if (index === -1) {
      index = this._rows.length
      const mod = (index + messageRows) % this._settings.rows
      if (mod > 0 && mod < messageRows) {
        index += messageRows - mod
      }
      if (this._isDeniedIndex(index + messageRows - 1)) {
        index += messageRows
      }
    }
    return index
  }
  _pushMessage(message, index, messageRows) {
    Array(messageRows)
      .fill(1)
      .forEach((_, j) => {
        const i = index + j
        if (!this._rows[i]) {
          this._rows[i] = []
        }
        this._rows[i].push(message)
      })
  }
  _shiftMessage(index, messageRows) {
    Array(messageRows)
      .fill(1)
      .forEach((_, j) => {
        const i = index + j
        this._rows[i].shift()
      })
  }
}
