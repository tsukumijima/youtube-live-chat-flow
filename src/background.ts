import { browser } from 'webextension-polyfill-ts'
import { readyStore } from './store'
import { parentCode, code } from './constants/stylesheet'
import icon from './assets/icon.png'
import iconOn from './assets/icon-on.png'

interface TabState {
  enabled: boolean
  following: boolean
}

const initialState = { enabled: true, following: true }
let tabStates: { [tabId: number]: TabState } = {}

const getSettings = async () => {
  const store = await readyStore()
  return JSON.parse(JSON.stringify(store.state.settings))
}

const setIcon = async (tabId: number) => {
  const path = tabStates[tabId] && tabStates[tabId].enabled ? iconOn : icon
  await browser.pageAction.setIcon({ tabId, path })
}

const initTab = async (
  tabId: number,
  frameId: number,
  needCSSInject: boolean
) => {
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

const toggleEnabled = async (tabId: number) => {
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

const toggleFollowing = async (tabId: number) => {
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
  for (const tab of tabs) {
    try {
      tab.id &&
        (await browser.tabs.sendMessage(tab.id, {
          id: 'settingsChanged',
          data: { settings }
        }))
    } catch (e) {} // eslint-disable-line no-empty
  }
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  const { id, data } = message
  const { tab, frameId } = sender
  switch (id) {
    case 'contentLoaded':
      return (
        tab?.id &&
        frameId &&
        (await initTab(tab.id, frameId, data.needCSSInject))
      )
    case 'controlButtonClicked':
      tab?.id && (await toggleEnabled(tab.id))
      break
    case 'menuButtonClicked':
      tab?.id && (await toggleFollowing(tab.id))
      break
    case 'settingsChanged':
      await settingsChanged()
      break
  }
})

browser.pageAction.onClicked.addListener((tab) => {
  tab.id && toggleEnabled(tab.id)
})
