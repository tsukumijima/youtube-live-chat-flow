export type AuthorType = 'guest' | 'member' | 'moderator' | 'owner' | 'you'

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
  superChatHidden: boolean
  superStickerHidden: boolean
  membershipHidden: boolean
  opacity: string
  speed: string
  displays: string
  lines: string
  stackDirection: string
  overflow: string
  extendedStyle: string
  bottomChatInputEnabled: boolean
  growBottomChatInputEnabled: boolean
}
