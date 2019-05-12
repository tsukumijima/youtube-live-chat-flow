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

const setIcon = async (tabId) => {
  const path = enabledTabs[tabId] ? iconOn : iconOff
  await browser.pageAction.setIcon({ tabId, path })
}

const initTab = async (tabId, needCSSInject) => {
  const enabled = initialEnabled
  enabledTabs[tabId] = enabled

  await setIcon(tabId)
  await browser.pageAction.show(tabId)

  if (needCSSInject) {
    await browser.tabs.insertCSS(tabId, { code: stylesheet })
    await browser.tabs.sendMessage(tabId, { id: 'cssInjected' })
  }

  const settings = await getSettings()

  return { enabled, settings }
}

const toggleEnabled = async (tabId) => {
  const enabled = !enabledTabs[tabId]
  initialEnabled = enabled
  enabledTabs[tabId] = enabled

  await setIcon(tabId)

  await browser.tabs.sendMessage(tabId, {
    id: 'enabledChanged',
    data: { enabled }
  })
}

const settingsChanged = async () => {
  const settings = await getSettings()
  const tabs = await browser.tabs.query({})
  for (let tab of tabs) {
    try {
      await browser.tabs.sendMessage(tab.id, {
        id: 'settingsChanged',
        data: { settings }
      })
    } catch (e) {} // eslint-disable-line no-empty
  }
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  const { id, data } = message
  const { tab } = sender
  switch (id) {
    case 'contentLoaded':
      return await initTab(tab.id, data.needCSSInject)
    case 'controlButtonClicked':
      await toggleEnabled(tab.id)
      break
    case 'settingsChanged':
      await settingsChanged()
      break
  }
})

browser.pageAction.onClicked.addListener((tab) => {
  toggleEnabled(tab.id)
})
