import Vue from 'vue'
import Vuex from 'vuex'
import storage from '~/utils/storage'
import settings, { defaults } from './settings'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    async initialize ({ commit }) {
      const state = await storage.get()
      commit('setSettings', { settings: { ...defaults, ...state.settings } })
    },
    sendUpdates () {
      chrome.runtime.sendMessage({ id: 'stateChanged' })
    },
    reset ({ commit }) {
      commit('setSettings', { settings: defaults })
    }
  },
  mutations: {
    setSettings (state, { settings }) {
      state.settings = settings
    }
  },
  modules: {
    settings
  },
  plugins: [
    (store) => {
      store.subscribe(async (mutation) => {
        await storage.set(store.state)
        store.dispatch('sendUpdates')
      })
    }
  ]
})
