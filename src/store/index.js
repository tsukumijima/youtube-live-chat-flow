import browser from 'webextension-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  storage: browser.storage.local,
  asyncStorage: true,
  restoreState: async (key, storage) => {
    const result = await storage.get(key)
    const json = result[key]

    let state = {}
    try {
      state = JSON.parse(json)
    } catch (e) {} // eslint-disable-line no-empty

    return {
      ...state,
      __storageReady: true
    }
  },
  saveState: async (key, state, storage) => {
    const json = JSON.stringify(state)
    await storage.set({ [key]: json })
  }
})

const initialState = {
  color: '#ffffff',
  avatar: false,
  memberColor: '#66ff66',
  memberAvatar: true,
  moderatorColor: '#6666ff',
  moderatorAvatar: true,
  ownerColor: '#ffff66',
  ownerAvatar: true,
  paidColor: '#ffcc66',
  paidAvatar: true,
  myColor: '#ff6666',
  myAvatar: true,
  opacity: '0.8',
  rows: '12',
  speed: '5',
  overflow: 'hidden',
  textStyle: 'outline',
  extendedTextStyle: '',
  bottomControllerEnabled: false
}

const config = {
  state: {
    ...initialState
  },
  mutations: {
    setColor(state, { color }) {
      state.color = color
    },
    setAvatar(state, { avatar }) {
      state.avatar = avatar
    },
    setMemberColor(state, { memberColor }) {
      state.memberColor = memberColor
    },
    setMemberAvatar(state, { memberAvatar }) {
      state.memberAvatar = memberAvatar
    },
    setModeratorColor(state, { moderatorColor }) {
      state.moderatorColor = moderatorColor
    },
    setModeratorAvatar(state, { moderatorAvatar }) {
      state.moderatorAvatar = moderatorAvatar
    },
    setOwnerColor(state, { ownerColor }) {
      state.ownerColor = ownerColor
    },
    setOwnerAvatar(state, { ownerAvatar }) {
      state.ownerAvatar = ownerAvatar
    },
    setPaidColor(state, { paidColor }) {
      state.paidColor = paidColor
    },
    setPaidAvatar(state, { paidAvatar }) {
      state.paidAvatar = paidAvatar
    },
    setMyColor(state, { myColor }) {
      state.myColor = myColor
    },
    setMyAvatar(state, { myAvatar }) {
      state.myAvatar = myAvatar
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
    },
    setTextStyle(state, { textStyle }) {
      state.textStyle = textStyle
    },
    setExtendedTextStyle(state, { extendedTextStyle }) {
      state.extendedTextStyle = extendedTextStyle
    },
    setBottomControllerEnabled(state, { bottomControllerEnabled }) {
      state.bottomControllerEnabled = bottomControllerEnabled
    },
    resetState(state) {
      for (let [k, v] of Object.entries(initialState)) {
        state[k] = v
      }
    }
  },
  plugins: [
    vuexPersist.plugin,
    (store) => {
      store.subscribe(() => {
        browser.runtime.sendMessage({ id: 'settingsChanged' })
      })
    }
  ]
}

export default function createStore(waitStorageReady = false) {
  return new Promise((resolve) => {
    const store = new Vuex.Store(config)
    if (!waitStorageReady) {
      resolve(store)
      return
    }
    // wait for async storage restore
    // @see https://github.com/championswimmer/vuex-persist/issues/15
    const timeout = Date.now() + 1000
    const timer = setInterval(() => {
      if (store.state.__storageReady || Date.now() > timeout) {
        clearInterval(timer)
        resolve(store)
      }
    }, 100)
  })
}
