import Settings from '~/models/settings'
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
    return you ? 'you' : this.message.authorType
  }

  private get paid() {
    return ['paid-message', 'paid-sticker', 'membership-item'].includes(
      this.message.messageType ?? ''
    )
  }

  private get style() {
    switch (this.authorType) {
      case 'you':
        return this.settings.yourStyle
      case 'owner':
        return this.settings.ownerStyle
      case 'moderator':
        return this.settings.moderatorStyle
      case 'member':
        return this.settings.memberStyle
      default:
        return this.settings.style
    }
  }

  get template() {
    switch (this.message.messageType) {
      case 'text-message':
        return this.style === 'two-line'
          ? 'two-line-message'
          : 'one-line-message'
      case 'paid-message':
        return this.settings.superChatHidden ? undefined : 'card-message'
      case 'paid-sticker':
        return this.settings.superStickerHidden ? undefined : 'sticker'
      case 'membership-item':
        return this.settings.membershipHidden ? undefined : 'card-message'
    }
  }

  get author() {
    switch (this.message.messageType) {
      case 'text-message':
        return this.style !== 'one-line-without-author'
      case 'paid-message':
        return true
      case 'paid-sticker':
        return true
      case 'membership-item':
        return true
    }
  }

  get avatar() {
    if (this.paid) {
      return true
    }
    switch (this.authorType) {
      case 'you':
        return this.settings.yourAvatar
      case 'owner':
        return this.settings.ownerAvatar
      case 'moderator':
        return this.settings.moderatorAvatar
      case 'member':
        return this.settings.memberAvatar
      default:
        return this.settings.avatar
    }
  }

  get fontColor() {
    if (this.paid) {
      return '#ffffff'
    }
    switch (this.authorType) {
      case 'you':
        return this.settings.yourColor
      case 'owner':
        return this.settings.ownerColor
      case 'moderator':
        return this.settings.moderatorColor
      case 'member':
        return this.settings.memberColor
      default:
        return this.settings.color
    }
  }

  get fontStyle() {
    return this.settings.extendedStyle
  }
}
