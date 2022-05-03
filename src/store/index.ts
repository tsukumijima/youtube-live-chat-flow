import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { getModule } from 'vuex-module-decorators'
import settings from '~/store/settings'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  storage: chrome.storage.local as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  asyncStorage: true,
  restoreState: async (key, storage) => {
    const result = await storage?.get(key)
    const json = result[key]

    let state = {}
    try {
      state = JSON.parse(json)
    } catch (e) {} // eslint-disable-line no-empty

    return {
      ...state,
      __storageReady: true,
    }
  },
  saveState: async (key, state, storage) => {
    const json = JSON.stringify(state)
    await storage?.set({ [key]: json })
  },
})

const createStore = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new Vuex.Store<any>({
    state: {},
    modules: {
      settings,
    },
    plugins: [
      vuexPersist.plugin,
      (store) => {
        store.subscribe(
          async () =>
            await chrome.runtime.sendMessage({ type: 'settings-changed' })
        )
      },
    ],
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const readyStore = async () => {
  const store = createStore()
  // @see https://github.com/championswimmer/vuex-persist#how-to-know-when-async-store-has-been-replaced
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (store as any).restored
  return store
}

export const settingsStore = getModule(settings, createStore())
