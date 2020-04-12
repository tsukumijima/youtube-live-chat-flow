export type AuthorType = 'guest' | 'member' | 'moderator' | 'owner' | 'you'
export type MessageType = 'super-chat' | 'super-sticker' | 'membership'
export type HeightType = 'flexible' | 'fixed'
export type StackDirection = 'top_to_bottom' | 'bottom_to_top'
export type Overflow = 'overlay' | 'hidden'

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
  heightType: HeightType
  lines: number
  lineHeight: number
  opacity: number
  extendedStyle: string
  speed: number
  displays: number
  stackDirection: StackDirection
  overflow: Overflow
  bottomChatInputEnabled: boolean
  growBottomChatInputEnabled: boolean
}
