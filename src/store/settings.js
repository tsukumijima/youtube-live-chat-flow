export const defaults = {
  color: '#ffffff',
  avatar: false,
  memberColor: '#66ff66',
  memberAvatar: true,
  moderatorColor: '#6666ff',
  moderatorAvatar: true,
  ownerColor: '#ffff66',
  ownerAvatar: true,
  paidColor: '#ffcc66',
  paidAvatar: true,
  selfColor: '#ff6666',
  selfAvatar: true,
  opacity: '0.8',
  rows: '12',
  speed: '5',
  overflow: 'hidden',
  extendedStyle: 'text-shadow: 1px 1px 2px #333;'
}

export default {
  namespaced: true,
  state: {
    ...defaults
  },
  mutations: {
    setColor(state, { color }) {
      state.color = color
    },
    setAvatar(state, { avatar }) {
      state.avatar = avatar
    },
    setMemberColor(state, { memberColor }) {
      state.memberColor = memberColor
    },
    setMemberAvatar(state, { memberAvatar }) {
      state.memberAvatar = memberAvatar
    },
    setModeratorColor(state, { moderatorColor }) {
      state.moderatorColor = moderatorColor
    },
    setModeratorAvatar(state, { moderatorAvatar }) {
      state.moderatorAvatar = moderatorAvatar
    },
    setOwnerColor(state, { ownerColor }) {
      state.ownerColor = ownerColor
    },
    setOwnerAvatar(state, { ownerAvatar }) {
      state.ownerAvatar = ownerAvatar
    },
    setPaidColor(state, { paidColor }) {
      state.paidColor = paidColor
    },
    setPaidAvatar(state, { paidAvatar }) {
      state.paidAvatar = paidAvatar
    },
    setSelfColor(state, { selfColor }) {
      state.selfColor = selfColor
    },
    setSelfAvatar(state, { selfAvatar }) {
      state.selfAvatar = selfAvatar
    },
    setOpacity(state, { opacity }) {
      state.opacity = opacity
    },
    setRows(state, { rows }) {
      state.rows = rows
    },
    setSpeed(state, { speed }) {
      state.speed = speed
    },
    setOverflow(state, { overflow }) {
      state.overflow = overflow
    },
    setExtendedStyle(state, { extendedStyle }) {
      state.extendedStyle = extendedStyle
    }
  }
}
