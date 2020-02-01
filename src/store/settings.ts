import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import Filter from '~/models/filter'

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
  rows: '12',
  stackDirection: 'top_to_bottom',
  overflow: 'overlay',
  extendedStyle: ''
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
  rows = initialState.rows
  stackDirection = initialState.stackDirection
  overflow = initialState.overflow
  extendedStyle = initialState.extendedStyle
  filters: Filter[] = []
  bottomChatInputEnabled = true
  growBottomChatInputEnabled = false

  get getFilter() {
    return ({ id }: { id: number }) => {
      return this.filters.find((filter) => filter.id === id)
    }
  }

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
    superStickerHidden
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
  setRows({ rows }: { rows: string }) {
    this.rows = rows
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
  addFilter(params: Partial<Filter>) {
    const id =
      Math.max.apply(null, [0, ...this.filters.map((item) => item.id)]) + 1

    this.filters = [
      ...this.filters,
      {
        subject: '',
        keyword: '',
        regExp: false,
        ...params,
        id: id + 1
      }
    ]
  }
  @Mutation
  removeFilter({ id }: { id: number }) {
    this.filters = this.filters.filter((item) => item.id !== id)
  }
  @Mutation
  setFilter({ id, ...params }: Partial<Filter>) {
    this.filters = this.filters.map((item) => {
      if (item.id !== id) {
        return item
      }
      return {
        ...item,
        ...params
      }
    })
  }
  @Mutation
  setBottomChatInputEnabled({
    bottomChatInputEnabled
  }: {
    bottomChatInputEnabled: boolean
  }) {
    this.bottomChatInputEnabled = bottomChatInputEnabled
  }
  @Mutation
  setGrowBottomChatInputEnabled({
    growBottomChatInputEnabled
  }: {
    growBottomChatInputEnabled: boolean
  }) {
    this.growBottomChatInputEnabled = growBottomChatInputEnabled
  }
}
