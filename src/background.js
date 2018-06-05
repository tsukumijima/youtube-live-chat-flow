import logger from './utils/logger'
import './assets/icon-48.png'

logger.log('background script loaded')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.log('onMessage: %o', message)
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { id: 'stateChanged' })
    })
  })
})
