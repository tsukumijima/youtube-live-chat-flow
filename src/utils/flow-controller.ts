import { semaphore } from '@fiahfy/semaphore'
import { Message, Settings } from '~/models'
import { querySelectorAsync, waitAllImagesLoaded } from '~/utils/dom-helper'
import MessageSettings from '~/utils/message-settings'
import { parse } from '~/utils/message-parser'
import { render } from '~/utils/message-renderer'

const sem = semaphore()

const ClassName = {
  filterActivated: 'ylcfr-active',
  filteredMessage: 'ylcfr-filtered-message',
  deletedMessage: 'ylcfr-deleted-message',
}

interface Timeline {
  willAppear: number
  didAppear: number
  willDisappear: number
  didDisappear: number
}

class Limiter {
  private limits: number
  private count = 0
  private expireTime = Date.now()

  constructor(limits: number) {
    this.limits = limits
  }

  isOver() {
    const now = Date.now()
    if (now > this.expireTime) {
      this.count = 0
      this.expireTime = now + 1000
    }
    return ++this.count > this.limits
  }
}

export default class FlowController {
  private _enabled = false
  private _following = false
  private _settings: Settings | undefined
  private timelines: Timeline[][] = []
  private observer: MutationObserver | undefined
  private followingTimer = -1
  private cleanupTimer = -1
  private limiter: Limiter | undefined

  get enabled() {
    return this._enabled
  }

  set enabled(value: boolean) {
    this._enabled = value
    if (!this._enabled) {
      this.clear()
    }
  }

  get following() {
    return this._following
  }

  set following(value: boolean) {
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
      this.followingTimer = window.setInterval(scrollToBottom, 1000)
    } else {
      clearInterval(this.followingTimer)
    }
  }

  get settings() {
    return this._settings
  }

  set settings(value: Settings | undefined) {
    this._settings = value
    this.limiter = new Limiter(value?.maxDisplays ?? 0)
  }

  private async proceed(element: HTMLElement) {
    if (!this._enabled || !this.settings) {
      return
    }

    const video = parent.document.querySelector<HTMLVideoElement>(
      'ytd-watch-flexy video.html5-main-video'
    )
    if (!video || video.paused) {
      return
    }

    const container = parent.document.querySelector<HTMLElement>(
      '.html5-video-container'
    )
    if (!container) {
      return
    }

    const [lines, height] = this.getLinesAndHeight(
      video.offsetHeight,
      this.settings
    )

    const deleted = await this.validateDeletedMessage(element)
    if (deleted) {
      return
    }

    const message = await parse(element)
    if (!message) {
      return
    }

    if (this.settings.maxDisplays > 0 && this.limiter?.isOver()) {
      return
    }

    const me = await this.createMessageElement(message, height, this.settings)
    if (!me) {
      return
    }

    me.style.display = 'none'
    container.appendChild(me)
    await waitAllImagesLoaded(me)

    sem.acquire(async () => {
      if (!this.settings || video.paused) {
        me.remove()
        return
      }

      me.style.display = 'flex'

      const messageRows = Math.ceil(me.offsetHeight / Math.ceil(height))
      const containerWidth = container.offsetWidth
      const timeline = this.createTimeline(me, containerWidth, this.settings)

      const index = this.getIndex(lines, messageRows, timeline)
      if (index + messageRows > lines && this.settings.overflow === 'hidden') {
        me.remove()
        return
      }
      this.pushTimeline(timeline, index, messageRows)

      const z = Math.floor(index / lines)
      const y = (index % lines) + (z % 2 > 0 ? 0.5 : 0)
      const opacity = this.settings.opacity ** (z + 1)
      const top =
        this.settings.stackDirection === 'bottom_to_top'
          ? video.offsetHeight - height * (y + messageRows + 0.1)
          : height * (y + 0.1)

      me.style.top = `${top}px`
      me.style.opacity = String(opacity)
      me.style.zIndex = String(z + 1 + 11) // 11 is set to z-index on div.webgl

      const animation = this.createAnimation(me, containerWidth, this.settings)
      animation.onfinish = () => {
        me.remove()
      }
      animation.play()
    })
  }

  private getLinesAndHeight(videoHeight: number, settings: Settings) {
    let lines, height
    if (settings.heightType === 'fixed') {
      height = settings.lineHeight
      lines = Math.floor((videoHeight - height * 0.2) / height)
    } else {
      lines = settings.lines
      height = videoHeight / (lines + 0.2)
    }
    lines = settings.maxLines > 0 ? Math.min(settings.maxLines, lines) : lines
    return [lines, height]
  }

  private async validateDeletedMessage(element: HTMLElement) {
    const active = document.documentElement.classList.contains(
      ClassName.filterActivated
    )
    if (!active) {
      return false
    }
    const deleted = await new Promise<boolean>((resolve) => {
      const expireTime = Date.now() + 1000
      const timer = window.setInterval(() => {
        const filtered = element.classList.contains(ClassName.filteredMessage)
        if (filtered || Date.now() > expireTime) {
          clearInterval(timer)
          const deleted = element.classList.contains(ClassName.deletedMessage)
          resolve(deleted)
        }
      }, 10)
    })
    return deleted
  }

  private async createMessageElement(
    message: Message,
    height: number,
    settings: Settings
  ) {
    const ms = new MessageSettings(message, settings)
    if (!ms.template) {
      return null
    }

    const element = render(ms.template, {
      ...message,
      author: ms.author ? message.author : undefined,
      avatarUrl: ms.avatar ? message.avatarUrl : undefined,
      fontColor: ms.fontColor,
      fontStyle: ms.fontStyle,
      backgroundColor: ms.backgroundColor,
      height,
      width: settings.maxWidth,
      outlineRatio: settings.outlineRatio,
      emojiStyle: settings.emojiStyle,
    })

    if (!element) {
      return null
    }

    element.classList.add('ylcf-flow-message')

    return element
  }

  private createTimeline(
    element: HTMLElement,
    containerWidth: number,
    settings: Settings
  ) {
    const displayMillis = settings.displayTime * 1000
    const delayMillis = settings.delayTime * 1000
    const w = element.offsetWidth
    const v = (containerWidth + w) / displayMillis
    const t = w / v
    const n = Date.now()

    return {
      willAppear: n + delayMillis,
      didAppear: n + t + delayMillis,
      willDisappear: n + displayMillis - t + delayMillis,
      didDisappear: n + displayMillis + delayMillis,
    }
  }

  private createAnimation(
    element: HTMLElement,
    containerWidth: number,
    settings: Settings
  ) {
    element.style.transform = `translate(${containerWidth}px, 0px)`

    const duration = settings.displayTime * 1000
    const delay = settings.delayTime * 1000
    const keyframes = [
      { transform: `translate(${containerWidth}px, 0px)` },
      { transform: `translate(-${element.offsetWidth}px, 0px)` },
    ]
    const animation = element.animate(keyframes, { duration, delay })
    animation.pause()
    return animation
  }

  private isDeniedIndex(index: number, lines: number) {
    // e.g. if lines value is "12", denied index is "23", "47", "71" ...
    return index % (lines * 2) === lines * 2 - 1
  }

  private getIndex(lines: number, messageRows: number, timeline: Timeline) {
    let index = this.timelines.findIndex((_, i, timelines) => {
      const mod = (i + messageRows) % lines
      if (mod > 0 && mod < messageRows) {
        return false
      }
      return Array(messageRows)
        .fill(1)
        .every((_, j) => {
          if (this.isDeniedIndex(i + j, lines)) {
            return false
          }

          const ts = timelines[i + j]
          if (!ts) {
            return true
          }

          const t = ts[ts.length - 1]
          if (!t) {
            return true
          }

          return (
            t.didDisappear < timeline.willDisappear &&
            t.didAppear < timeline.willAppear
          )
        })
    })
    if (index === -1) {
      index = this.timelines.length
      const mod = (index + messageRows) % lines
      if (mod > 0 && mod < messageRows) {
        index += messageRows - mod
      }
      if (this.isDeniedIndex(index + messageRows - 1, lines)) {
        index += messageRows
      }
    }
    return index
  }

  private pushTimeline(timeline: Timeline, index: number, messageRows: number) {
    Array(messageRows)
      .fill(1)
      .forEach((_, j) => {
        const i = index + j
        if (!this.timelines[i]) {
          this.timelines[i] = []
        }
        this.timelines[i].push(timeline)
      })
  }

  async observe() {
    this.observer?.disconnect()

    const items = await querySelectorAsync(
      '#items.yt-live-chat-item-list-renderer'
    )
    if (!items) {
      return
    }

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const nodes = Array.from(mutation.addedNodes)
        nodes.forEach((node: Node) => {
          if (node instanceof HTMLElement) {
            this.proceed(node)
          }
        })
      })
    })
    this.observer.observe(items, { childList: true })

    this.cleanupTimer = window.setInterval(() => {
      this.timelines = this.timelines.map((timelines) => {
        return timelines.filter((timeline) => {
          return timeline.didDisappear > Date.now()
        })
      })
    }, 1000)
  }

  disconnect() {
    clearInterval(this.cleanupTimer)
    this.observer?.disconnect()
  }

  play() {
    parent.document.querySelectorAll('.ylcf-flow-message').forEach((e) => {
      e.getAnimations().forEach((a) => a.play())
    })
  }

  pause() {
    parent.document.querySelectorAll('.ylcf-flow-message').forEach((e) => {
      e.getAnimations().forEach((a) => a.pause())
    })
  }

  clear() {
    parent.document.querySelectorAll('.ylcf-flow-message').forEach((e) => {
      e.remove()
    })
    this.timelines = []
  }
}
