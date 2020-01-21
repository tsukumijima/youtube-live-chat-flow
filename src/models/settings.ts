import Filter from '~/models/filter'

export default interface Settings {
  color: string
  avatar: boolean
  style: string
  memberColor: string
  memberAvatar: boolean
  memberStyle: string
  moderatorColor: string
  moderatorAvatar: boolean
  moderatorStyle: string
  ownerColor: string
  ownerAvatar: boolean
  ownerStyle: string
  yourColor: string
  yourAvatar: boolean
  yourStyle: string
  superChatHidden: boolean
  superStickerHidden: boolean
  membershipHidden: boolean
  opacity: string
  speed: string
  displays: string
  rows: string
  overflow: string
  extendedStyle: string
  filters: Filter[]
  bottomChatInputEnabled: boolean
  growBottomChatInputEnabled: boolean
}
