import Vue from 'vue'
import Vuex from 'vuex'
import storage from '~/utils/storage'

Vue.use(Vuex)

export const defaultState = {
  enabled: true,
  color: 'white',
  textShadow: '1px 1px 2px #333',
  rows: 12,
  speed: 6
}

export default new Vuex.Store({
  state: {
    ...defaultState
  },
  actions: {
    async initialize ({ commit }) {
      const allState = await storage.get()
      commit('setAllState', { allState })
    },
    sendUpdates () {
      chrome.runtime.sendMessage({})
    },
    reset ({ commit }) {
      commit('setAllState', { allState: defaultState })
    }
  },
  mutations: {
    setAllState (state, { allState }) {
      Object.keys(state).forEach((key) => {
        state[key] = allState[key]
      })
    },
    setEnabled (state, { enabled }) {
      state.enabled = enabled
    },
    setColor (state, { color }) {
      state.color = color
    },
    setTextShadow (state, { textShadow }) {
      state.textShadow = textShadow
    },
    setRows (state, { rows }) {
      state.rows = rows
    },
    setSpeed (state, { speed }) {
      state.speed = speed
    }
  },
  plugins: [
    (store) => {
      store.subscribe(async (mutation) => {
        await storage.set(store.state)
        const r = await storage.get()
        console.log(r)
        store.dispatch('sendUpdates')
      })
    }
  ]
})
