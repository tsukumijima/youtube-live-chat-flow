export type AuthorType = 'guest' | 'member' | 'moderator' | 'owner' | 'you'
export type MessageType = 'super-chat' | 'super-sticker' | 'membership'
export type HeightType = 'flexible' | 'fixed'
export type StackDirection = 'top_to_bottom' | 'bottom_to_top'
export type Overflow = 'overlay' | 'hidden'
export type Styles = { [authorType in AuthorType]: Style }
export type Visibilities = { [type in AuthorType | MessageType]: boolean }

export type Template =
  | 'one-line-without-author'
  | 'one-line-with-author'
  | 'two-line'

export type Style = {
  avatar: boolean
  color: string
  template: Template
}

export type Settings = {
  styles: Styles
  visibilities: Visibilities
  heightType: HeightType
  lines: number
  maxLines: number
  maxWidth: number
  lineHeight: number
  opacity: number
  backgroundOpacity: number
  outlineRatio: number
  extendedStyle: string
  displayTime: number
  delayTime: number
  displays: number
  stackDirection: StackDirection
  overflow: Overflow
  bottomChatInputEnabled: boolean
  growBottomChatInputEnabled: boolean
}
