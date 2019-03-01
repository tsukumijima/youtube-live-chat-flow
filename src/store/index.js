import Vue from 'vue'
import Vuex from 'vuex'
import storage from '~/utils/storage'
import settings, { defaults } from './settings'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    async initialize({ commit }) {
      const state = await storage.get()
      commit('setSettings', { settings: state.settings })
    },
    reset({ commit }) {
      commit('setSettings', { settings: { ...defaults } })
    }
  },
  mutations: {
    setSettings(state, { settings }) {
      state.settings = settings
    }
  },
  modules: {
    settings
  },
  plugins: [
    (store) => {
      store.subscribe(async () => {
        await storage.set(store.state)
        chrome.runtime.sendMessage({ id: 'stateChanged' })
      })
    }
  ]
})
