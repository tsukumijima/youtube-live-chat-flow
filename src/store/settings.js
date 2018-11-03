export const defaults = {
  color: '#ffffff',
  memberColor: '#99ff99',
  moderatorColor: '#9999ff',
  ownerColor: '#ffff99',
  paidColor: '#ffcc99',
  textShadow: '1px 1px 2px #333',
  opacity: '0.8',
  rows: '12',
  speed: '5',
  overflow: 'hidden'
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
    setMemberColor(state, { memberColor }) {
      state.memberColor = memberColor
    },
    setModeratorColor(state, { moderatorColor }) {
      state.moderatorColor = moderatorColor
    },
    setOwnerColor(state, { ownerColor }) {
      state.ownerColor = ownerColor
    },
    setTextShadow(state, { textShadow }) {
      state.textShadow = textShadow
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
    }
  }
}
