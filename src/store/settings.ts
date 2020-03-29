import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

const initialState = {
  color: '#ffffff',
  avatar: false,
  style: 'one-line-without-author',
  memberColor: '#66ff66',
  memberAvatar: true,
  memberStyle: 'one-line-with-author',
  moderatorColor: '#6666ff',
  moderatorAvatar: true,
  moderatorStyle: 'two-line',
  ownerColor: '#ffff66',
  ownerAvatar: true,
  ownerStyle: 'two-line',
  yourColor: '#ff6666',
  yourAvatar: true,
  yourStyle: 'one-line-with-author',
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
  color = initialState.color
  avatar = initialState.avatar
  style = initialState.style
  memberColor = initialState.memberColor
  memberAvatar = initialState.memberAvatar
  memberStyle = initialState.memberStyle
  moderatorColor = initialState.moderatorColor
  moderatorAvatar = initialState.moderatorAvatar
  moderatorStyle = initialState.moderatorStyle
  ownerColor = initialState.ownerColor
  ownerAvatar = initialState.ownerAvatar
  ownerStyle = initialState.ownerStyle
  yourColor = initialState.yourColor
  yourAvatar = initialState.yourAvatar
  yourStyle = initialState.yourStyle
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
  setColor({ color }: { color: string }) {
    this.color = color
  }
  @Mutation
  setAvatar({ avatar }: { avatar: boolean }) {
    this.avatar = avatar
  }
  @Mutation
  setStyle({ style }: { style: string }) {
    this.style = style
  }
  @Mutation
  setMemberColor({ memberColor }: { memberColor: string }) {
    this.memberColor = memberColor
  }
  @Mutation
  setMemberAvatar({ memberAvatar }: { memberAvatar: boolean }) {
    this.memberAvatar = memberAvatar
  }
  @Mutation
  setMemberStyle({ memberStyle }: { memberStyle: string }) {
    this.memberStyle = memberStyle
  }
  @Mutation
  setModeratorColor({ moderatorColor }: { moderatorColor: string }) {
    this.moderatorColor = moderatorColor
  }
  @Mutation
  setModeratorAvatar({ moderatorAvatar }: { moderatorAvatar: boolean }) {
    this.moderatorAvatar = moderatorAvatar
  }
  @Mutation
  setModeratorStyle({ moderatorStyle }: { moderatorStyle: string }) {
    this.moderatorStyle = moderatorStyle
  }
  @Mutation
  setOwnerColor({ ownerColor }: { ownerColor: string }) {
    this.ownerColor = ownerColor
  }
  @Mutation
  setOwnerAvatar({ ownerAvatar }: { ownerAvatar: boolean }) {
    this.ownerAvatar = ownerAvatar
  }
  @Mutation
  setOwnerStyle({ ownerStyle }: { ownerStyle: string }) {
    this.ownerStyle = ownerStyle
  }
  @Mutation
  setYourColor({ yourColor }: { yourColor: string }) {
    this.yourColor = yourColor
  }
  @Mutation
  setYourAvatar({ yourAvatar }: { yourAvatar: boolean }) {
    this.yourAvatar = yourAvatar
  }
  @Mutation
  setYourStyle({ yourStyle }: { yourStyle: string }) {
    this.yourStyle = yourStyle
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
