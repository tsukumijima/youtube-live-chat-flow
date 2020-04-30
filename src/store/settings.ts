import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import Setting, {
  AuthorType,
  MessageType,
  HeightType,
  StackDirection,
  Overflow,
  Style,
} from '~/models/settings'

const initialState: Omit<
  Setting,
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
      template: 'one-line-with-author',
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
  visibilities: [
    'guest',
    'member',
    'moderator',
    'owner',
    'you',
    'super-chat',
    'super-sticker',
    'membership',
  ],
  heightType: 'flexible',
  lines: 12,
  lineHeight: 64,
  opacity: 0.8,
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
  lineHeight = initialState.lineHeight
  opacity = initialState.opacity
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
  setVisibilities({
    visibilities,
  }: {
    visibilities: (AuthorType | MessageType)[]
  }) {
    this.visibilities = visibilities
  }
  @Mutation
  setHeightType({ heightType }: { heightType: HeightType }) {
    this.heightType = heightType
  }
  @Mutation
  setLines({ lines }: { lines: number }) {
    this.lines = lines
  }
  @Mutation
  setLineHeight({ lineHeight }: { lineHeight: number }) {
    this.lineHeight = lineHeight
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
  setExtendedStyle({ extendedStyle }: { extendedStyle: string }) {
    this.extendedStyle = extendedStyle
  }
  @Mutation
  setDisplayTime({ displayTime }: { displayTime: number }) {
    this.displayTime = displayTime
  }
  @Mutation
  setDelayTime({ delayTime }: { delayTime: number }) {
    this.delayTime = delayTime
  }
  @Mutation
  setDisplays({ displays }: { displays: number }) {
    this.displays = displays
  }
  @Mutation
  setStackDirection({ stackDirection }: { stackDirection: StackDirection }) {
    this.stackDirection = stackDirection
  }
  @Mutation
  setOverflow({ overflow }: { overflow: Overflow }) {
    this.overflow = overflow
  }
  @Mutation
  resetState() {
    for (const [k, v] of Object.entries(initialState)) {
      ;(this as any)[k] = v // eslint-disable-line @typescript-eslint/no-explicit-any
    }
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
  setGrowBottomChatInputEnabled({
    growBottomChatInputEnabled,
  }: {
    growBottomChatInputEnabled: boolean
  }) {
    this.growBottomChatInputEnabled = growBottomChatInputEnabled
  }
}
