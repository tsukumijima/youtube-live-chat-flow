import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import Setting, { AuthorType, Style } from '~/models/settings'

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
  superChatHidden: false,
  superStickerHidden: false,
  membershipHidden: false,
  opacity: '0.8',
  speed: '5',
  displays: '0',
  lines: '12',
  stackDirection: 'top_to_bottom',
  overflow: 'overlay',
  extendedStyle: '',
}

@Module({ name: 'settings' })
export default class SettingsModule extends VuexModule {
  styles = initialState.styles
  superChatHidden = initialState.superChatHidden
  superStickerHidden = initialState.superStickerHidden
  membershipHidden = initialState.membershipHidden
  opacity = initialState.opacity
  speed = initialState.speed
  displays = initialState.displays
  lines = initialState.lines
  stackDirection = initialState.stackDirection
  overflow = initialState.overflow
  extendedStyle = initialState.extendedStyle
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
  setSuperChatHidden({ superChatHidden }: { superChatHidden: boolean }) {
    this.superChatHidden = superChatHidden
  }
  @Mutation
  setSuperStickerHidden({
    superStickerHidden,
  }: {
    superStickerHidden: boolean
  }) {
    this.superStickerHidden = superStickerHidden
  }
  @Mutation
  setMembershipHidden({ membershipHidden }: { membershipHidden: boolean }) {
    this.membershipHidden = membershipHidden
  }
  @Mutation
  setOpacity({ opacity }: { opacity: string }) {
    this.opacity = opacity
  }
  @Mutation
  setSpeed({ speed }: { speed: string }) {
    this.speed = speed
  }
  @Mutation
  setDisplays({ displays }: { displays: string }) {
    this.displays = displays
  }
  @Mutation
  setLines({ lines }: { lines: string }) {
    this.lines = lines
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
  setExtendedStyle({ extendedStyle }: { extendedStyle: string }) {
    this.extendedStyle = extendedStyle
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
