import { defaults } from './store/settings'
import storage from './utils/storage'
import logger from './utils/logger'
import iconOn from './assets/icon-48.png'
import iconOff from './assets/icon-off-48.png'

logger.log('background script loaded')

const getSettings = async () => {
  return {
    ...defaults,
    ...(await storage.get()).settings
  }
}

const sendMessage = (data) => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, data)
    })
  })
}

const updateIcon = async () => {
  const settings = await getSettings()
  const path = settings.enabled ? iconOn : iconOff
  chrome.browserAction.setIcon({ path })
}

chrome.browserAction.onClicked.addListener(async (tab) => {
  logger.log('chrome.browserAction.onClicked')

  const settings = await getSettings()
  settings.enabled = !settings.enabled
  await storage.set({ settings })

  updateIcon()
  sendMessage({ id: 'stateChanged' })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.log('chrome.runtime.onMessage: %o', message)

  const { id } = message
  switch (id) {
    case 'contentLoaded':
      updateIcon()
      break
    case 'stateChanged':
      updateIcon()
      sendMessage({ id: 'stateChanged' })
      break
  }
})

;(async () => {
  await updateIcon()
})()
