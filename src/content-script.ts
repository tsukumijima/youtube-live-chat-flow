import { browser } from 'webextension-polyfill-ts'
import { Settings } from '~/models'
import { querySelectorAsync } from '~/utils/dom-helper'

let settings: Settings

const isVideoUrl = () => new URL(location.href).pathname === '/watch'

const init = async (): Promise<void> => {
  if (!isVideoUrl()) {
    return
  }

  if (!settings.chatVisible) {
    return
  }

  const iframe = await querySelectorAsync('ytd-live-chat-frame')
  const collapsed = iframe?.hasAttribute('collapsed') ?? false
  if (!collapsed) {
    return
  }

  const button = await querySelectorAsync<HTMLAnchorElement>(
    '#show-hide-button a'
  )
  button && button.click()
}

browser.runtime.onMessage.addListener(async (message) => {
  const { id, data } = message
  switch (id) {
    case 'urlChanged':
      settings = data.settings
      return await init()
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  const data = await browser.runtime.sendMessage({ id: 'contentLoaded' })
  settings = data.settings
  await init()
})
