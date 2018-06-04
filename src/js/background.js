import logger from './utils/logger'
import '../img/icon-48.png'

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    chrome.tabs.sendMessage(tabId, { id: 'stateChanged', data: tab })
  })

  if (changeInfo && changeInfo.status === 'complete') {
    logger.log('url changed: %s', tab.url)
    chrome.tabs.sendMessage(tabId, { id: 'urlChanged', data: tab })
  }
})
