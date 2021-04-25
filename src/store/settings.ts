import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import {
  AuthorType,
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
  delayTime: 0,
  displayTime: 5,
  extendedStyle: '',
  growBottomChatInputEnabled: false,
  heightType: 'flexible',
  lineHeight: 64,
  lines: 12,
  maxDisplays: 0,
  maxLines: 0,
  maxWidth: 100,
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
  delayTime = initialState.delayTime
  displayTime = initialState.displayTime
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
  }: { authorType: AuthorType } & Partial<Style>): void {
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
  }): void {
    this.visibilities[type] = visibility
  }
  @Mutation
  setBackground({ background }: { background: boolean }): void {
    this.background = background
  }
  @Mutation
  setBackgroundOpacity({
    backgroundOpacity,
  }: {
    backgroundOpacity: number
  }): void {
    this.backgroundOpacity = backgroundOpacity
  }
  @Mutation
  setBottomChatInputEnabled({
    bottomChatInputEnabled,
  }: {
    bottomChatInputEnabled: boolean
  }): void {
    this.bottomChatInputEnabled = bottomChatInputEnabled
  }
  @Mutation
  setDelayTime({ delayTime }: { delayTime: number }): void {
    this.delayTime = delayTime
  }
  @Mutation
  setDisplayTime({ displayTime }: { displayTime: number }): void {
    this.displayTime = displayTime
  }
  @Mutation
  setExtendedStyle({ extendedStyle }: { extendedStyle: string }): void {
    this.extendedStyle = extendedStyle
  }
  @Mutation
  setGrowBottomChatInputEnabled({
    growBottomChatInputEnabled,
  }: {
    growBottomChatInputEnabled: boolean
  }): void {
    this.growBottomChatInputEnabled = growBottomChatInputEnabled
  }
  @Mutation
  setHeightType({ heightType }: { heightType: HeightType }): void {
    this.heightType = heightType
  }
  @Mutation
  setLineHeight({ lineHeight }: { lineHeight: number }): void {
    this.lineHeight = lineHeight
  }
  @Mutation
  setLines({ lines }: { lines: number }): void {
    this.lines = lines
  }
  @Mutation
  setMaxDisplays({ maxDisplays }: { maxDisplays: number }): void {
    this.maxDisplays = maxDisplays
  }
  @Mutation
  setMaxLines({ maxLines }: { maxLines: number }): void {
    this.maxLines = maxLines
  }
  @Mutation
  setMaxWidth({ maxWidth }: { maxWidth: number }): void {
    this.maxWidth = maxWidth
  }
  @Mutation
  setOpacity({ opacity }: { opacity: number }): void {
    this.opacity = opacity
  }
  @Mutation
  setOutlineRatio({ outlineRatio }: { outlineRatio: number }): void {
    this.outlineRatio = outlineRatio
  }
  @Mutation
  setOverflow({ overflow }: { overflow: Overflow }): void {
    this.overflow = overflow
  }
  @Mutation
  setStackDirection({
    stackDirection,
  }: {
    stackDirection: StackDirection
  }): void {
    this.stackDirection = stackDirection
  }
  @Mutation
  resetState(): void {
    for (const [k, v] of Object.entries(initialState)) {
      ;(this as any)[k] = v // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }
}
