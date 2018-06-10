export const defaults = {
  enabled: true,
  textShadow: '1px 1px 2px #333',
  opacity: '0.8',
  rows: '12',
  speed: '6',
  color: '#ffffff',
  memberColor: '#99ff99',
  moderatorColor: '#9999ff',
  ownerColor: '#ffff99'
}

export default {
  namespaced: true,
  state: {
    ...defaults
  },
  mutations: {
    setEnabled (state, { enabled }) {
      state.enabled = enabled
    },
    setColor (state, { color }) {
      state.color = color
    },
    setMemberColor (state, { memberColor }) {
      state.memberColor = memberColor
    },
    setModeratorColor (state, { moderatorColor }) {
      state.moderatorColor = moderatorColor
    },
    setOwnerColor (state, { ownerColor }) {
      state.ownerColor = ownerColor
    },
    setTextShadow (state, { textShadow }) {
      state.textShadow = textShadow
    },
    setOpacity (state, { opacity }) {
      state.opacity = opacity
    },
    setRows (state, { rows }) {
      state.rows = rows
    },
    setSpeed (state, { speed }) {
      state.speed = speed
    }
  }
}
