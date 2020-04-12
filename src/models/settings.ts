export type AuthorType = 'guest' | 'member' | 'moderator' | 'owner' | 'you'
export type MessageType = 'super-chat' | 'super-sticker' | 'membership'

export type Template =
  | 'one-line-without-author'
  | 'one-line-with-author'
  | 'two-line'

export type Style = {
  avatar: boolean
  color: string
  template: Template
}

export default interface Settings {
  styles: { [authorType in AuthorType]: Style }
  visibilities: MessageType[]
  heightType: string
  lines: number
  lineHeight: number
  opacity: number
  extendedStyle: string
  speed: number
  displays: number
  stackDirection: string
  overflow: string
  bottomChatInputEnabled: boolean
  growBottomChatInputEnabled: boolean
}
