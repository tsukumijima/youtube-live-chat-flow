import browser from 'webextension-polyfill'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { getModule } from 'vuex-module-decorators'
import settings from '~/store/settings'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  storage: browser.storage.local as any, // eslint-disable-line @typescript-eslint/no-explicit-any
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
        store.subscribe(() => {
          browser.runtime.sendMessage({ id: 'settingsChanged' })
        })
      },
    ],
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readyStore(): Promise<Store<any>> {
  return new Promise((resolve) => {
    const store = createStore()
    // wait for async storage restore
    // @see https://github.com/championswimmer/vuex-persist/issues/15
    const timeout = Date.now() + 1000
    const timer = window.setInterval(() => {
      if (store.state.__storageReady || Date.now() > timeout) {
        clearInterval(timer)
        resolve(store)
      }
    }, 100)
  })
}

export const settingsStore = getModule(settings, createStore())
