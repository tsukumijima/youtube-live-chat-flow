import Color from 'color'

export default class StyleHelper {
  constructor({ authorType, fontSize, settings }) {
    this.authorType = authorType
    this.fontSize = fontSize
    this.settings = settings
  }
  get avatar() {
    switch (this.authorType) {
      case 'myself':
        return this.settings.myAvatar
      case 'super-chat':
        return this.settings.paidAvatar
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
  get textColor() {
    switch (this.authorType) {
      case 'myself':
        return this.settings.myColor
      case 'super-chat':
        return this.settings.paidColor
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
  get textStyle() {
    const n = (this.fontSize / 48).toFixed(2)
    switch (this.settings.textStyle) {
      case 'outline': {
        const c = Color(this.textColor)
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
}
