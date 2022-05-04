import Color from 'color'
import { AuthorType, Message, Settings } from '~/models'

export default class MessageSettings {
  private message: Message
  private settings: Settings

  constructor(message: Message, settings: Settings) {
    this.message = message
    this.settings = settings
  }

  private get yourName() {
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
    const button = parent.document.querySelector<HTMLElement>(
      '.html5-video-player .ytp-chrome-top-buttons .ytp-watch-later-button'
    )
    // TODO: japanese only
    return (
      button?.getAttribute('title')?.replace(' として後で再生します', '') ?? ''
    )
  }

  private get authorType() {
    const author = this.message.author
    const you = author && author === this.yourName
    const authorType = you ? 'you' : this.message.authorType ?? 'guest'
    return (
      ['guest', 'member', 'moderator', 'owner', 'you'].includes(authorType)
        ? authorType
        : 'guest'
    ) as AuthorType
  }

  private get paid() {
    return ['paid-message', 'paid-sticker', 'membership-item'].includes(
      this.message.messageType ?? ''
    )
  }

  private get style() {
    return this.settings.styles[this.authorType]
  }

  get template() {
    switch (this.message.messageType) {
      case 'text-message':
        return this.settings.visibilities[this.authorType]
          ? this.style.template === 'two-line'
            ? 'two-line-message'
            : 'one-line-message'
          : undefined
      case 'paid-message':
        return this.settings.visibilities['super-chat']
          ? 'two-line-message'
          : undefined
      case 'paid-sticker':
        return this.settings.visibilities['super-sticker']
          ? 'sticker'
          : undefined
      case 'membership-item':
        return this.settings.visibilities['membership']
          ? 'two-line-message'
          : undefined
    }
  }

  get author() {
    switch (this.message.messageType) {
      case 'text-message':
        return this.style.template !== 'one-line-without-author'
      case 'paid-message':
        return true
      case 'paid-sticker':
        return true
      case 'membership-item':
        return true
      default:
        return false
    }
  }

  get avatar() {
    return this.paid ? true : this.style.avatar
  }

  get fontColor() {
    return this.paid ? '#ffffff' : this.style.color
  }

  get fontStyle() {
    return this.settings.extendedStyle
  }

  get backgroundColor() {
    const backgroundColor = this.paid
      ? this.message.backgroundColor
      : this.settings.background
      ? 'black'
      : undefined

    if (!backgroundColor) {
      return undefined
    }

    try {
      const o = new Color(backgroundColor).object()
      const opacity = this.settings.backgroundOpacity
      return `rgba(${o.r}, ${o.g}, ${o.b}, ${opacity})`
    } catch (e) {
      // parse error by invalid background color
      return undefined
    }
  }
}
