import { defaults } from './store/settings'
import Logger from './utils/logger'
import Storage from './utils/storage'
import iconOff from './assets/icon-off48.png'
import iconOn from './assets/icon-on48.png'
import './assets/icon16.png'
import './assets/icon48.png'
import './assets/icon128.png'

let initialDisabled = false
const disabledTabs = {}

const setIcon = (tabId) => {
  const path = disabledTabs[tabId] ? iconOff : iconOn
  chrome.pageAction.setIcon({ tabId, path })
}

const contentLoaded = async (tabId) => {
  const disabled = initialDisabled
  disabledTabs[tabId] = disabled
  setIcon(tabId)
  chrome.tabs.sendMessage(tabId, {
    id: 'disabledChanged',
    data: { disabled }
  })
  const state = await Storage.get()
  chrome.tabs.sendMessage(tabId, {
    id: 'stateChanged',
    data: { state }
  })
  chrome.pageAction.show(tabId)
}

const disabledToggled = (tabId) => {
  const disabled = !disabledTabs[tabId]
  initialDisabled = disabled
  disabledTabs[tabId] = disabled
  setIcon(tabId)
  chrome.tabs.sendMessage(tabId, {
    id: 'disabledChanged',
    data: { disabled }
  })
}

const stateChanged = async () => {
  const state = await Storage.get()
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, {
        id: 'stateChanged',
        data: { state }
      })
    })
  })
}

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
      contentLoaded(tab.id)
      break
    case 'disabledToggled':
      disabledToggled(tab.id)
      break
    case 'stateChanged':
      stateChanged()
      break
  }
})

chrome.pageAction.onClicked.addListener((tab) => {
  Logger.log('chrome.pageAction.onClicked', tab)
  disabledToggled(tab.id)
})

Logger.log('background script loaded')
