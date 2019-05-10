import browser from 'webextension-polyfill'
import createStore from './store'
import stylesheet from './constants/stylesheet'
import iconOff from './assets/icon-off48.png'
import iconOn from './assets/icon-on48.png'
import './assets/icon16.png'
import './assets/icon48.png'
import './assets/icon128.png'

let initialDisabled = false
const disabledTabs = {}

const getSettings = async () => {
  const store = await createStore(true)
  return store.state
}

const setIcon = (tabId) => {
  const path = disabledTabs[tabId] ? iconOff : iconOn
  browser.pageAction.setIcon({ tabId, path })
}

const contentLoaded = async (tabId, cssInjected, sendResponse) => {
  const disabled = initialDisabled
  disabledTabs[tabId] = disabled

  setIcon(tabId)
  browser.pageAction.show(tabId)

  if (!cssInjected) {
    console.log('insert css')
    // TODO: Must be injected
    browser.tabs.insertCSS(tabId, { code: stylesheet })
    browser.tabs.sendMessage(tabId, { id: 'cssInjected' })
  }

  sendResponse({ disabled, settings: {} })
}

const disabledToggled = (tabId) => {
  const disabled = !disabledTabs[tabId]
  initialDisabled = disabled
  disabledTabs[tabId] = disabled

  setIcon(tabId)
  browser.tabs.sendMessage(tabId, {
    id: 'disabledChanged',
    data: { disabled }
  })
}

const settingsChanged = async () => {
  const settings = await getSettings()
  const tabs = await browser.tabs.query({})
  for (let tab of tabs) {
    browser.tabs.sendMessage(tab.id, {
      id: 'stateChanged',
      data: { settings }
    })
  }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('chrome.runtime.onMessage', message, sender, sendResponse)

  const { id, data } = message
  const { tab } = sender
  switch (id) {
    case 'contentLoaded':
      contentLoaded(tab.id, data.cssInjected, sendResponse)
      return true
    case 'disabledToggled':
      disabledToggled(tab.id)
      break
    case 'settingsChanged':
      settingsChanged()
      break
  }
})

browser.pageAction.onClicked.addListener((tab) => {
  console.log('chrome.pageAction.onClicked', tab)

  disabledToggled(tab.id)
})
