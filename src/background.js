import { defaults } from './store/settings'
import storage from './utils/storage'
import logger from './utils/logger'
import iconOn from './assets/icon-48.png'
import iconOff from './assets/icon-off-48.png'

logger.log('background script loaded')

const sendMessageAll = (data) => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, data)
    })
  })
}

const updateIcon = async () => {
  const settings = (await storage.get()).settings
  const path = settings.enabled ? iconOn : iconOff
  chrome.browserAction.setIcon({ path })
}

const initialize = async () => {
  const state = {
    settings: defaults,
    ...(await storage.get())
  }
  await storage.set(state)
}

chrome.browserAction.onClicked.addListener(async (tab) => {
  logger.log('chrome.browserAction.onClicked', tab)

  const settings = (await storage.get()).settings
  settings.enabled = !settings.enabled
  await storage.set({ settings })

  await updateIcon()
  sendMessageAll({ id: 'stateChanged' })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  logger.log('chrome.tabs.onUpdated', tabId, changeInfo, tab)

  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, { id: 'urlChanged' })
  }
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  logger.log('chrome.runtime.onMessage', message, sender, sendResponse)

  const { id } = message
  switch (id) {
    case 'contentLoaded':
      await updateIcon()
      break
    case 'stateChanged':
      await updateIcon()
      sendMessageAll({ id: 'stateChanged' })
      break
  }
})

;(async () => {
  await initialize()
})()
