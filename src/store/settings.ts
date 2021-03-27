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

const initialState: Omit<
  Settings,
  'bottomChatInputEnabled' | 'growBottomChatInputEnabled'
> = {
  styles: {
    guest: {
      avatar: false,
      color: '#ffffff',
      template: 'one-line-without-author',
    },
    member: {
      avatar: true,
      color: '#66ff66',
      template: 'one-line-without-author',
    },
    moderator: {
      avatar: true,
      color: '#6666ff',
      template: 'two-line',
    },
    owner: {
      avatar: true,
      color: '#ffff66',
      template: 'two-line',
    },
    you: {
      avatar: true,
      color: '#ff6666',
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
  heightType: 'flexible',
  lines: 12,
  maxLines: 0,
  maxWidth: 100,
  lineHeight: 64,
  opacity: 0.8,
  background: false,
  backgroundOpacity: 0.4,
  outlineRatio: 0.015,
  extendedStyle: '',
  displayTime: 5,
  delayTime: 0,
  displays: 0,
  stackDirection: 'top_to_bottom',
  overflow: 'overlay',
}

@Module({ name: 'settings' })
export default class SettingsModule extends VuexModule {
  styles = initialState.styles
  visibilities = initialState.visibilities
  heightType = initialState.heightType
  lines = initialState.lines
  maxLines = initialState.maxLines
  maxWidth = initialState.maxWidth
  lineHeight = initialState.lineHeight
  opacity = initialState.opacity
  background = initialState.background
  backgroundOpacity = initialState.backgroundOpacity
  outlineRatio = initialState.outlineRatio
  extendedStyle = initialState.extendedStyle
  displayTime = initialState.displayTime
  delayTime = initialState.delayTime
  displays = initialState.displays
  stackDirection = initialState.stackDirection
  overflow = initialState.overflow
  bottomChatInputEnabled = true
  growBottomChatInputEnabled = false

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
  setHeightType({ heightType }: { heightType: HeightType }): void {
    this.heightType = heightType
  }
  @Mutation
  setLines({ lines }: { lines: number }): void {
    this.lines = lines
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
  setLineHeight({ lineHeight }: { lineHeight: number }): void {
    this.lineHeight = lineHeight
  }
  @Mutation
  setOpacity({ opacity }: { opacity: number }): void {
    this.opacity = opacity
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
  setOutlineRatio({ outlineRatio }: { outlineRatio: number }): void {
    this.outlineRatio = outlineRatio
  }
  @Mutation
  setExtendedStyle({ extendedStyle }: { extendedStyle: string }): void {
    this.extendedStyle = extendedStyle
  }
  @Mutation
  setDisplayTime({ displayTime }: { displayTime: number }): void {
    this.displayTime = displayTime
  }
  @Mutation
  setDelayTime({ delayTime }: { delayTime: number }): void {
    this.delayTime = delayTime
  }
  @Mutation
  setDisplays({ displays }: { displays: number }): void {
    this.displays = displays
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
  setOverflow({ overflow }: { overflow: Overflow }): void {
    this.overflow = overflow
  }
  @Mutation
  resetState(): void {
    for (const [k, v] of Object.entries(initialState)) {
      ;(this as any)[k] = v // eslint-disable-line @typescript-eslint/no-explicit-any
    }
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
  setGrowBottomChatInputEnabled({
    growBottomChatInputEnabled,
  }: {
    growBottomChatInputEnabled: boolean
  }): void {
    this.growBottomChatInputEnabled = growBottomChatInputEnabled
  }
}
