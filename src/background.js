import browser from 'webextension-polyfill'
import createStore from './store'
import stylesheet from './constants/stylesheet'
import iconOff from './assets/icon-off48.png'
import iconOn from './assets/icon-on48.png'
import './assets/icon16.png'
import './assets/icon48.png'
import './assets/icon128.png'

let initialEnabled = true
const enabledTabs = {}

const getSettings = async () => {
  const store = await createStore(true)
  return store.state
}

const setIcon = (tabId) => {
  const path = enabledTabs[tabId] ? iconOn : iconOff
  browser.pageAction.setIcon({ tabId, path })
}

const initTab = async (tabId, needCSSInject, sendResponse) => {
  const enabled = initialEnabled
  enabledTabs[tabId] = enabled

  setIcon(tabId)
  browser.pageAction.show(tabId)

  if (needCSSInject) {
    browser.tabs.insertCSS(tabId, { code: stylesheet })
    browser.tabs.sendMessage(tabId, { id: 'cssInjected' })
  }

  const settings = await getSettings()
  sendResponse({ enabled, settings })
}

const toggleEnabled = (tabId) => {
  const enabled = !enabledTabs[tabId]
  initialEnabled = enabled
  enabledTabs[tabId] = enabled

  setIcon(tabId)

  browser.tabs.sendMessage(tabId, {
    id: 'enabledChanged',
    data: { enabled }
  })
}

const settingsChanged = async () => {
  const settings = await getSettings()
  const tabs = await browser.tabs.query({})
  for (let tab of tabs) {
    browser.tabs.sendMessage(tab.id, {
      id: 'settingsChanged',
      data: { settings }
    })
  }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { id, data } = message
  const { tab } = sender
  switch (id) {
    case 'contentLoaded':
      initTab(tab.id, data.needCSSInject, sendResponse)
      return true
    case 'controlButtonClicked':
      toggleEnabled(tab.id)
      break
    case 'settingsChanged':
      settingsChanged()
      break
  }
})

browser.pageAction.onClicked.addListener((tab) => {
  toggleEnabled(tab.id)
})
