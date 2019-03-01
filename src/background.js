import className from './constants/class-name'
import { defaults } from './store/settings'
import logger from './utils/logger'
import storage from './utils/storage'
import iconOff from './assets/icon-off48.png'
import iconOn from './assets/icon-on48.png'
import './assets/icon16.png'
import './assets/icon48.png'
import './assets/icon128.png'

const code = `
.${className.focused} .html5-video-player .ytp-chrome-bottom {
  opacity: 1!important;
}
.${className.focused} .html5-video-player .ytp-gradient-bottom {
  display: block!important;
  opacity: 1!important;
}

.html5-video-player.ytp-fullscreen
.${className.controls} #top yt-img-shadow#avatar img {
  width: 36px;
  height: 36px;
}
.html5-video-player.ytp-fullscreen
.${className.controls} #top #input-container
yt-live-chat-author-chip {
  display: none;
}
.html5-video-player.ytp-fullscreen
.${className.controls} #top #input-container
yt-live-chat-text-input-field-renderer#input #input {
  line-height: 36px;
}
.html5-video-player.ytp-fullscreen
.${className.controls} #message-buttons #send-button #button {
  width: 36px;
  height: 36px;
}

.ytp-chrome-bottom .ytp-chrome-controls {
  position: relative;
}
.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls .ytp-fullerscreen-edu-button {
  display: none;
}

.${className.smallControls}.${className.controls}
#top #input-container yt-live-chat-author-chip {
  display: none;
}

.${className.controls} {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  box-sizing: border-box;
}
.${className.controls} #top {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  height: 100%;
}
.${className.controls} #top yt-img-shadow#avatar {
  border-radius: 50%;
  margin-right: 8px;
  margin-bottom: 1px;
  overflow: hidden;
}
.${className.controls} #top #input-container {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  height: 100%;
}
.${className.controls} #top #input-container
yt-live-chat-author-chip {
  display: flex;
  margin-right: 8px;
  max-width: 128px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.${className.controls} #top #input-container
yt-live-chat-text-input-field-renderer#input {
  position: relative;
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  height: 100%;
  margin-right: 8px;
}
.${className.controls} #top #input-container
yt-live-chat-text-input-field-renderer#input[has-text] #label {
  opacity: 0;
}
.${className.controls} #top #input-container
yt-live-chat-text-input-field-renderer#input #label {
  position: absolute;
  top: 0;
  left: 1px;
  padding-left: 8px;
  pointer-events: none;
}
.${className.controls} #top #input-container
yt-live-chat-text-input-field-renderer#input #input {
  flex: 1;
  min-width: 0;
  height: 66%;
  line-height: 24px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0 8px;
  outline: none;
}
.${className.controls} #top #input-container
yt-live-chat-text-input-field-renderer#input img.yt-live-chat-text-input-field-renderer {
  width: 20px;
  height: 20px;
  margin: -5px 2px;
}
.${className.controls} #message-buttons {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  line-height: initial;
}
.${className.controls} #message-buttons #count {
  margin-right: 8px;
}
.${className.controls} #message-buttons #send-button
yt-button-renderer.yt-live-chat-message-input-renderer[disabled] {
  color: var(--yt-live-chat-disabled-icon-button-color);
}
.${className.controls} #message-buttons #send-button
a.yt-button-renderer:hover {
  color: inherit;
}
.${className.controls} #message-buttons #send-button #button {
  display: block;
}
.${className.controls} #message-buttons #countdown {
  position: absolute;
  right: 1px;
  width: 24px;
  height: 24px;
  opacity: 0;
  transition: opacity 1s;
  pointer-events: none;
}
.${className.controls} #message-buttons #countdown[countdown-active] {
  opacity: 1;
}
.${className.controls} #message-buttons #countdown circle {
  fill: none;
  stroke-linecap: square;
  stroke-width: 2;
  stroke: currentColor;
}
.${className.controls} #message-buttons #countdown #countdown-background {
  opacity: 0.3;
}
.${className.controls} #message-buttons #countdown #countdown-line {
  stroke-dasharray: 62.8318;
  transform: translate(0, 24px) rotateZ(-90deg);
}
`

let initialDisabled = false
const disabledTabs = {}

const setIcon = (tabId) => {
  const path = disabledTabs[tabId] ? iconOff : iconOn
  chrome.pageAction.setIcon({ tabId, path })
}

const contentLoaded = async (tabId, cssInjected) => {
  if (!cssInjected) {
    logger.log('insert css')
    chrome.tabs.insertCSS(tabId, { code })
    chrome.tabs.sendMessage(tabId, { id: 'cssInjected' })
  }

  const disabled = initialDisabled
  disabledTabs[tabId] = disabled

  setIcon(tabId)
  chrome.pageAction.show(tabId)
  chrome.tabs.sendMessage(tabId, {
    id: 'disabledChanged',
    data: { disabled }
  })

  const state = await storage.get()
  chrome.tabs.sendMessage(tabId, {
    id: 'stateChanged',
    data: { state }
  })
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
  const state = await storage.get()
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
  logger.log('chrome.runtime.onInstalled', details)

  const state = await storage.get()
  const newState = {
    settings: defaults,
    ...state
  }
  await storage.set(newState)
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.log('chrome.runtime.onMessage', message, sender, sendResponse)

  const { id, data } = message
  const { tab } = sender
  switch (id) {
    case 'contentLoaded':
      contentLoaded(tab.id, data.cssInjected)
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
  logger.log('chrome.pageAction.onClicked', tab)

  disabledToggled(tab.id)
})

logger.log('background script loaded')
