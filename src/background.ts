import { readyStore } from '~/store'
import iconOff from '~/assets/icon-off.png'
import iconOn from '~/assets/icon-on.png'

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
  const path = tabStates[tabId] && tabStates[tabId].enabled ? iconOn : iconOff
  await chrome.action.setIcon({ tabId, path })
}

const contentLoaded = async () => {
  const settings = await getSettings()

  return { settings }
}

const iframeLoaded = async (tabId: number) => {
  const enabled = initialState.enabled
  const following = initialState.following
  tabStates = { ...tabStates, [tabId]: { enabled, following } }

  await setIcon(tabId)

  const settings = await getSettings()

  return { enabled, following, settings }
}

const toggleEnabled = async (tabId: number) => {
  const enabled = !(tabStates[tabId] && tabStates[tabId].enabled)
  initialState.enabled = enabled
  tabStates = {
    ...tabStates,
    [tabId]: { ...(tabStates[tabId] ?? {}), enabled },
  }

  await setIcon(tabId)

  await chrome.tabs.sendMessage(tabId, {
    type: 'enabled-changed',
    data: { enabled },
  })
}

const toggleFollowing = async (tabId: number) => {
  const following = !(tabStates[tabId] && tabStates[tabId].following)
  initialState.following = following
  tabStates = {
    ...tabStates,
    [tabId]: { ...(tabStates[tabId] ?? {}), following },
  }

  await setIcon(tabId)

  await chrome.tabs.sendMessage(tabId, {
    type: 'following-changed',
    data: { following },
  })
}

const settingsChanged = async () => {
  const settings = await getSettings()
  const tabs = await chrome.tabs.query({})
  for (const tab of tabs) {
    try {
      tab.id &&
        chrome.tabs.sendMessage(tab.id, {
          type: 'settings-changed',
          data: { settings },
        })
    } catch (e) {} // eslint-disable-line no-empty
  }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url) {
    await chrome.tabs.sendMessage(tabId, { type: 'url-changed' })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type } = message
  const { tab } = sender
  switch (type) {
    case 'content-loaded':
      contentLoaded().then((data) => sendResponse(data))
      return true
    case 'iframe-loaded':
      if (tab?.id) {
        iframeLoaded(tab.id).then((data) => sendResponse(data))
        return true
      }
      return
    case 'control-button-clicked':
      if (tab?.id) {
        toggleEnabled(tab.id).then(() => sendResponse())
        return true
      }
      return
    case 'menu-button-clicked':
      if (tab?.id) {
        toggleFollowing(tab.id).then(() => sendResponse())
        return true
      }
      return
    case 'settings-changed':
      settingsChanged().then(() => sendResponse())
      return true
  }
})
