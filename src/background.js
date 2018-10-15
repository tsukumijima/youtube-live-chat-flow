import { defaults } from './store/settings'
import Logger from './utils/logger'
import Storage from './utils/storage'
import iconOff from './assets/icon-off48.png'
import iconOn from './assets/icon-on48.png'
import './assets/icon16.png'
import './assets/icon48.png'
import './assets/icon128.png'

const enabled = {}

const setIcon = (tabId) => {
  const path = enabled[tabId] ? iconOn : iconOff
  chrome.pageAction.setIcon({ tabId, path })
}

const sendMessage = (tabId) => {
  chrome.tabs.sendMessage(tabId, {
    id: 'enabledChanged',
    data: { enabled: enabled[tabId] }
  })
}

chrome.pageAction.onClicked.addListener((tab) => {
  Logger.log('chrome.pageAction.onClicked', tab)

  enabled[tab.id] = !enabled[tab.id]
  setIcon(tab.id)
  sendMessage(tab.id)
})

chrome.runtime.onInstalled.addListener(async (details) => {
  Logger.log('chrome.runtime.onInstalled', details)

  const state = {
    settings: defaults,
    ...(await Storage.get())
  }
  await Storage.set(state)
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  Logger.log('chrome.runtime.onMessage', message, sender, sendResponse)

  const { id } = message
  const { tab } = sender
  switch (id) {
    case 'contentLoaded':
      chrome.pageAction.show(tab.id)
      setIcon(tab.id)
      sendMessage(tab.id)
      break
    case 'controlButtonClicked':
      enabled[tab.id] = !enabled[tab.id]
      setIcon(tab.id)
      sendMessage(tab.id)
      break
    case 'stateChanged':
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { id: 'stateChanged' })
        })
      })
      break
  }
})
;(() => {
  Logger.log('background script loaded')
})()
