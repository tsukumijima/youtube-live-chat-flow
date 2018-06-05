import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
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
    async init ({ commit }) {
      const items = await storage.get('vuex')
      try {
        const values = JSON.parse(items['vuex'])
        commit('setValues', { values })
      } catch (e) {}
    },
    async sendUpdates () {
      console.log('sendUpdates')
      chrome.runtime.sendMessage({})
    },
    async setEnabled ({ commit, dispatch }, { enabled }) {
      commit('setEnabled', { enabled })
      console.log('setEnabled')
      dispatch('sendUpdates')
    },
    async setColor ({ commit, dispatch }, { color }) {
      commit('setColor', { color })
      dispatch('sendUpdates')
    },
    async setTextShadow ({ commit, dispatch }, { textShadow }) {
      commit('setTextShadow', { textShadow })
      dispatch('sendUpdates')
    },
    async setRows ({ commit, dispatch }, { rows }) {
      commit('setRows', { rows })
      dispatch('sendUpdates')
    },
    async setSpeed ({ commit, dispatch }, { speed }) {
      commit('setSpeed', { speed })
      dispatch('sendUpdates')
    }
  },
  mutations: {
    setValues (state, { values }) {
      Object.keys(state).forEach((key) => {
        const value = values[key]
        if (typeof value !== 'undefined') {
          state[key] = values[key]
        }
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
    createPersistedState({
      storage: {
        getItem: (key) => null,
        setItem: (key, value) => storage.set({ [key]: value }),
        removeItem: (key) => storage.remove(key)
      }
    })
  ]
})
