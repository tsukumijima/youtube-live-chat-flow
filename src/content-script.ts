import { Settings } from '~/models'
import { querySelectorAsync } from '~/utils/dom-helper'

let settings: Settings

const isVideoUrl = () => new URL(location.href).pathname === '/watch'

const waitCollapsed = async () => {
  const iframe = await querySelectorAsync('ytd-live-chat-frame')
  return new Promise<boolean>((resolve) => {
    const expireTime = Date.now() + 1000
    const timer = window.setInterval(async () => {
      const collapsed = iframe?.hasAttribute('collapsed') ?? false
      if (collapsed || Date.now() > expireTime) {
        clearInterval(timer)
        resolve(collapsed)
      }
    }, 100)
  })
}

const init = async (): Promise<void> => {
  if (!isVideoUrl()) {
    return
  }

  if (!settings.chatVisible) {
    return
  }

  const collapsed = await waitCollapsed()
  if (!collapsed) {
    return
  }

  const button = await querySelectorAsync<HTMLAnchorElement>(
    '#show-hide-button a'
  )
  button && button.click()
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const { id, data } = message
  switch (id) {
    case 'url-changed':
      settings = data.settings
      init().then(() => sendResponse())
      return true
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await chrome.runtime.sendMessage({
    id: 'content-loaded',
  })
  settings = data.settings
  await init()
})
