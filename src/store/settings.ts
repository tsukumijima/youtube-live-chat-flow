import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import {
  AuthorType,
  EmojiStyle,
  HeightType,
  MessageType,
  Overflow,
  Settings,
  StackDirection,
  Style,
} from '~/models'

const initialState: Settings = {
  background: false,
  backgroundOpacity: 0.4,
  bottomChatInputEnabled: true,
  chatVisible: true,
  delayTime: 0,
  displayTime: 5,
  emojiStyle: 'image',
  extendedStyle: '',
  growBottomChatInputEnabled: false,
  heightType: 'flexible',
  lineHeight: 64,
  lines: 12,
  maxDisplays: 0,
  maxLines: 0,
  maxWidth: 200,
  opacity: 0.8,
  outlineRatio: 0.015,
  overflow: 'overlay',
  stackDirection: 'top_to_bottom',
  styles: {
    guest: {
      avatar: false,
      color: '#ffffff',
      template: 'one-line-without-author',
    },
    member: {
      avatar: true,
      color: '#ccffcc',
      template: 'one-line-without-author',
    },
    moderator: {
      avatar: true,
      color: '#ccccff',
      template: 'two-line',
    },
    owner: {
      avatar: true,
      color: '#ffffcc',
      template: 'two-line',
    },
    you: {
      avatar: true,
      color: '#ffcccc',
      template: 'one-line-with-author',
    },
  },
  visibilities: {
    guest: true,
    member: true,
    moderator: true,
    owner: true,
    you: true,
    'super-chat': true,
    'super-sticker': true,
    membership: true,
  },
}

@Module({ name: 'settings' })
export default class SettingsModule extends VuexModule {
  background = initialState.background
  backgroundOpacity = initialState.backgroundOpacity
  bottomChatInputEnabled = true
  chatVisible = true
  delayTime = initialState.delayTime
  displayTime = initialState.displayTime
  emojiStyle = initialState.emojiStyle
  extendedStyle = initialState.extendedStyle
  growBottomChatInputEnabled = false
  heightType = initialState.heightType
  lineHeight = initialState.lineHeight
  lines = initialState.lines
  maxDisplays = initialState.maxDisplays
  maxLines = initialState.maxLines
  maxWidth = initialState.maxWidth
  opacity = initialState.opacity
  outlineRatio = initialState.outlineRatio
  overflow = initialState.overflow
  stackDirection = initialState.stackDirection
  styles = initialState.styles
  visibilities = initialState.visibilities

  @Mutation
  updateStyle({
    authorType,
    ...params
  }: { authorType: AuthorType } & Partial<Style>) {
    this.styles = {
      ...this.styles,
      [authorType]: {
        ...this.styles[authorType],
        ...params,
      },
    }
  }
  @Mutation
  setVisibility({
    type,
    visibility,
  }: {
    type: AuthorType | MessageType
    visibility: boolean
  }) {
    this.visibilities[type] = visibility
  }
  @Mutation
  setBackground({ background }: { background: boolean }) {
    this.background = background
  }
  @Mutation
  setBackgroundOpacity({ backgroundOpacity }: { backgroundOpacity: number }) {
    this.backgroundOpacity = backgroundOpacity
  }
  @Mutation
  setBottomChatInputEnabled({
    bottomChatInputEnabled,
  }: {
    bottomChatInputEnabled: boolean
  }) {
    this.bottomChatInputEnabled = bottomChatInputEnabled
  }
  @Mutation
  setChatVisible({ chatVisible }: { chatVisible: boolean }) {
    this.chatVisible = chatVisible
  }
  @Mutation
  setDelayTime({ delayTime }: { delayTime: number }) {
    this.delayTime = delayTime
  }
  @Mutation
  setDisplayTime({ displayTime }: { displayTime: number }) {
    this.displayTime = displayTime
  }
  @Mutation
  setEmojiStyle({ emojiStyle }: { emojiStyle: EmojiStyle }) {
    this.emojiStyle = emojiStyle
  }
  @Mutation
  setExtendedStyle({ extendedStyle }: { extendedStyle: string }) {
    this.extendedStyle = extendedStyle
  }
  @Mutation
  setGrowBottomChatInputEnabled({
    growBottomChatInputEnabled,
  }: {
    growBottomChatInputEnabled: boolean
  }) {
    this.growBottomChatInputEnabled = growBottomChatInputEnabled
  }
  @Mutation
  setHeightType({ heightType }: { heightType: HeightType }) {
    this.heightType = heightType
  }
  @Mutation
  setLineHeight({ lineHeight }: { lineHeight: number }) {
    this.lineHeight = lineHeight
  }
  @Mutation
  setLines({ lines }: { lines: number }) {
    this.lines = lines
  }
  @Mutation
  setMaxDisplays({ maxDisplays }: { maxDisplays: number }) {
    this.maxDisplays = maxDisplays
  }
  @Mutation
  setMaxLines({ maxLines }: { maxLines: number }) {
    this.maxLines = maxLines
  }
  @Mutation
  setMaxWidth({ maxWidth }: { maxWidth: number }) {
    this.maxWidth = maxWidth
  }
  @Mutation
  setOpacity({ opacity }: { opacity: number }) {
    this.opacity = opacity
  }
  @Mutation
  setOutlineRatio({ outlineRatio }: { outlineRatio: number }) {
    this.outlineRatio = outlineRatio
  }
  @Mutation
  setOverflow({ overflow }: { overflow: Overflow }) {
    this.overflow = overflow
  }
  @Mutation
  setStackDirection({ stackDirection }: { stackDirection: StackDirection }) {
    this.stackDirection = stackDirection
  }
  @Mutation
  resetState() {
    for (const [k, v] of Object.entries(initialState)) {
      ;(this as any)[k] = v // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }
}
