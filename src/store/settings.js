export const defaults = {
  enabled: true,
  textShadow: '1px 1px 2px #333',
  opacity: '0.8',
  rows: '12',
  speed: '6',
  color: 'white',
  ownerColor: '#ff9',
  moderatorColor: '#99f',
  memberColor: '#9f9'
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
    setOwnerColor (state, { ownerColor }) {
      state.ownerColor = ownerColor
    },
    setModeratorColor (state, { moderatorColor }) {
      state.moderatorColor = moderatorColor
    },
    setMemberColor (state, { memberColor }) {
      state.memberColor = memberColor
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
