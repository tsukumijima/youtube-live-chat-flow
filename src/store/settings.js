export const defaults = {
  enabled: true,
  color: 'white',
  textShadow: '1px 1px 2px #333',
  opacity: '0.8',
  rows: '12',
  speed: '6'
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
