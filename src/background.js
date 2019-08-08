import browser from 'webextension-polyfill'
import createStore from './store'
import { parentCode, code } from './constants/stylesheet'
import icon from './assets/icon.png'
import iconOn from './assets/icon-on.png'

let initialState = { enabled: true, following: true }
let tabStates = {}

const getSettings = async () => {
  const store = await createStore(true)
  return JSON.parse(JSON.stringify(store.state))
}

const setIcon = async (tabId) => {
  const path = tabStates[tabId] && tabStates[tabId].enabled ? iconOn : icon
  await browser.pageAction.setIcon({ tabId, path })
}

const initTab = async (tabId, frameId, needCSSInject) => {
  const enabled = initialState.enabled
  const following = initialState.following
  tabStates = { ...tabStates, [tabId]: { enabled, following } }

  await setIcon(tabId)
  await browser.pageAction.show(tabId)

  // window
  await browser.tabs.insertCSS(tabId, { frameId, code })

  // window.parent
  if (needCSSInject) {
    await browser.tabs.insertCSS(tabId, { code: parentCode })
    await browser.tabs.sendMessage(tabId, { id: 'cssInjected' })
  }

  const settings = await getSettings()

  return { enabled, following, settings }
}

const toggleEnabled = async (tabId) => {
  const enabled = !(tabStates[tabId] && tabStates[tabId].enabled)
  initialState.enabled = enabled
  tabStates = {
    ...tabStates,
    [tabId]: { ...(tabStates[tabId] || {}), enabled }
  }

  await setIcon(tabId)

  await browser.tabs.sendMessage(tabId, {
    id: 'enabledChanged',
    data: { enabled }
  })
}

const toggleFollowing = async (tabId) => {
  const following = !(tabStates[tabId] && tabStates[tabId].following)
  initialState.following = following
  tabStates = {
    ...tabStates,
    [tabId]: { ...(tabStates[tabId] || {}), following }
  }

  await setIcon(tabId)

  await browser.tabs.sendMessage(tabId, {
    id: 'followingChanged',
    data: { following }
  })
}

const settingsChanged = async () => {
  const settings = await getSettings()
  const tabs = await browser.tabs.query({})
  for (let tab of tabs) {
    try {
      await browser.tabs.sendMessage(tab.id, {
        id: 'settingsChanged',
        data: { settings }
      })
    } catch (e) {} // eslint-disable-line no-empty
  }
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  const { id, data } = message
  const { tab, frameId } = sender
  switch (id) {
    case 'contentLoaded':
      return await initTab(tab.id, frameId, data.needCSSInject)
    case 'controlButtonClicked':
      await toggleEnabled(tab.id)
      break
    case 'menuButtonClicked':
      await toggleFollowing(tab.id)
      break
    case 'settingsChanged':
      await settingsChanged()
      break
  }
})

browser.pageAction.onClicked.addListener((tab) => {
  toggleEnabled(tab.id)
})
