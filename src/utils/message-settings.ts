import Settings, { AuthorType, MessageType } from '~/models/settings'
import Message from '~/models/message'

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
    const button = parent.document.querySelector(
      '.html5-video-player .ytp-chrome-top-buttons .ytp-watch-later-button'
    ) as HTMLElement | null
    // TODO: japanese only
    return button?.getAttribute('title')?.replace(' として後で再生します', '')
  }

  private get authorType() {
    const author = this.message.author
    const you = author && author === this.yourName
    const authorType = you ? 'you' : this.message.authorType ?? 'guest'
    return (['guest', 'member', 'moderator', 'owner', 'you'].includes(
      authorType
    )
      ? authorType
      : 'guest') as AuthorType
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
        return this.settings.visibilities.includes(this.authorType)
          ? this.style.template === 'two-line'
            ? 'two-line-message'
            : 'one-line-message'
          : undefined
      case 'paid-message':
        return this.settings.visibilities.includes('super-chat')
          ? 'card-message'
          : undefined
      case 'paid-sticker':
        return this.settings.visibilities.includes('super-sticker')
          ? 'sticker'
          : undefined
      case 'membership-item':
        return this.settings.visibilities.includes('membership')
          ? 'card-message'
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
}
