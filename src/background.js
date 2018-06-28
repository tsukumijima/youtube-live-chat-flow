import { defaults } from './store/settings'
import Storage from './utils/storage'
import Logger from './utils/logger'
import iconOff from './assets/icon-off48.png'
import iconOn from './assets/icon-on48.png'
import './assets/icon48.png'

const toggleEnabled = async () => {
  const settings = (await Storage.get()).settings
  settings.enabled = !settings.enabled
  await Storage.set({ settings })
}

const updateIcon = async () => {
  const settings = (await Storage.get()).settings
  const path = settings.enabled ? iconOn : iconOff
  chrome.browserAction.setIcon({ path })
}

const sendMessageAll = (data) => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, data)
    })
  })
}

chrome.browserAction.onClicked.addListener(async (tab) => {
  Logger.log('chrome.browserAction.onClicked', tab)

  await toggleEnabled()
  await updateIcon()
  sendMessageAll({ id: 'stateChanged' })
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  Logger.log('chrome.runtime.onMessage', message, sender, sendResponse)

  const { id } = message
  switch (id) {
    case 'stateChanged':
      await updateIcon()
      sendMessageAll({ id: 'stateChanged' })
      break
    case 'controlButtonClicked':
      await toggleEnabled()
      await updateIcon()
      sendMessageAll({ id: 'stateChanged' })
      break
  }
})

;(async () => {
  Logger.log('background script loaded')

  const state = {
    settings: defaults,
    ...(await Storage.get())
  }
  await Storage.set(state)

  await updateIcon()
  sendMessageAll({ id: 'stateChanged' })
})()
