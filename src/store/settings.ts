import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import Setting, { AuthorType, MessageType, Style } from '~/models/settings'

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
  visibilities: ['super-chat', 'super-sticker', 'membership'],
  heightType: 'flexible',
  lines: 12,
  lineHeight: 64,
  opacity: 0.8,
  extendedStyle: '',
  speed: 5,
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
  extendedStyle = initialState.extendedStyle
  speed = initialState.speed
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
  setVisibilities({ visibilities }: { visibilities: MessageType[] }) {
    this.visibilities = visibilities
  }
  @Mutation
  setHeightType({ heightType }: { heightType: string }) {
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
  setExtendedStyle({ extendedStyle }: { extendedStyle: string }) {
    this.extendedStyle = extendedStyle
  }
  @Mutation
  setSpeed({ speed }: { speed: number }) {
    this.speed = speed
  }
  @Mutation
  setDisplays({ displays }: { displays: number }) {
    this.displays = displays
  }
  @Mutation
  setStackDirection({ stackDirection }: { stackDirection: string }) {
    this.stackDirection = stackDirection
  }
  @Mutation
  setOverflow({ overflow }: { overflow: string }) {
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
