export type AuthorType = 'guest' | 'member' | 'moderator' | 'owner' | 'you'
export type MessageType = 'super-chat' | 'super-sticker' | 'membership'
export type EmojiStyle = 'image' | 'text' | 'none'
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
  background: boolean
  backgroundOpacity: number
  bottomChatInputEnabled: boolean
  chatVisible: boolean
  delayTime: number
  displayTime: number
  emojiStyle: EmojiStyle
  extendedStyle: string
  growBottomChatInputEnabled: boolean
  heightType: HeightType
  lineHeight: number
  lines: number
  maxDisplays: number
  maxLines: number
  maxWidth: number
  opacity: number
  outlineRatio: number
  overflow: Overflow
  stackDirection: StackDirection
  styles: Styles
  visibilities: Visibilities
}
