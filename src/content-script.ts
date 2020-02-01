import { browser } from 'webextension-polyfill-ts'
import className from '~/constants/class-name'
import FlowController from '~/utils/flow-controller'
import message from '~/assets/message.svg'
import downArrow from '~/assets/down-arrow.svg'
import refresh from '~/assets/refresh.svg'

const controller = new FlowController()

const menuButtonConfigs = [
  {
    svg: downArrow,
    title: 'Follow New Messages',
    className: className.followButton,
    onclick: () => browser.runtime.sendMessage({ id: 'menuButtonClicked' }),
    isActive: () => controller.following
  },
  {
    svg: refresh,
    title: 'Reload Frame',
    className: className.reloadButton,
    onclick: () => location.reload(),
    isActive: () => false
  }
]

const updateControlButton = () => {
  const button = parent.document.querySelector(`.${className.controlButton}`)
  button && button.setAttribute('aria-pressed', String(controller.enabled))
}

const addControlButton = () => {
  const controls = parent.document.querySelector(
    '.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls'
  )
  if (!controls) {
    return
  }

  const button = document.createElement('button')
  button.classList.add('ytp-button', className.controlButton)
  button.title = 'Flow messages'
  button.onclick = () => {
    browser.runtime.sendMessage({ id: 'controlButtonClicked' })
  }
  button.innerHTML = message

  // Change SVG viewBox
  const svg = button.querySelector('svg')
  svg?.setAttribute('viewBox', '-8 -8 40 40')

  controls.prepend(button)

  updateControlButton()
}

const removeControlButton = () => {
  const button = parent.document.querySelector(`.${className.controlButton}`)
  button && button.remove()
}

const updateMenuButtons = () => {
  for (const config of menuButtonConfigs) {
    const button = document.querySelector(`.${config.className}`)
    if (!button) {
      return
    }
    if (config.isActive()) {
      button.classList.add(className.menuButtonActive)
    } else {
      button.classList.remove(className.menuButtonActive)
    }
  }
}

const addMenuButtons = () => {
  const refIconButton = document.querySelector(
    '#chat-messages > yt-live-chat-header-renderer > yt-icon-button'
  )
  if (!refIconButton) {
    return
  }

  for (const config of menuButtonConfigs) {
    const icon = document.createElement('yt-icon')
    icon.classList.add('yt-live-chat-header-renderer', 'style-scope')

    const iconButton = document.createElement('yt-icon-button')
    iconButton.id = 'overflow'
    iconButton.classList.add(
      'yt-live-chat-header-renderer',
      'style-scope',
      className.menuButton,
      config.className
    )
    iconButton.title = config.title
    iconButton.onclick = config.onclick
    iconButton.append(icon)

    refIconButton.parentElement?.insertBefore(iconButton, refIconButton)

    // insert svg after wrapper button appended
    icon.innerHTML = config.svg
  }

  updateMenuButtons()
}

const moveChatInputControl = () => {
  if (!controller.settings?.bottomChatInputEnabled) {
    return
  }

  const leftControls = parent.document.querySelector(
    '.ytp-chrome-bottom .ytp-chrome-controls .ytp-left-controls'
  ) as HTMLElement | null
  const rightControls = parent.document.querySelector(
    '.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls'
  ) as HTMLElement | null
  if (!leftControls || !rightControls) {
    return
  }

  const top = document.querySelector(
    'yt-live-chat-message-input-renderer #container #top'
  )
  const buttons = document.querySelector(
    'yt-live-chat-message-input-renderer #container #buttons.yt-live-chat-message-input-renderer'
  )
  const message = document.querySelector(
    'yt-live-chat-message-input-renderer #interaction-message'
  ) as HTMLElement | null
  if (!top || !buttons) {
    return
  }

  const input = top.querySelector('div#input') as HTMLInputElement | null
  const messageButtons = buttons.querySelector('#message-buttons')
  if (!input || !messageButtons) {
    return
  }
  input.addEventListener('keydown', (e) => {
    e.stopPropagation()
    const el = e.target as HTMLElement
    switch (e.keyCode) {
      case 13: {
        if (el.textContent !== '') {
          const sendButton = messageButtons.querySelector(
            '#send-button button#button'
          ) as HTMLButtonElement | null
          sendButton?.click()
        }
        el.blur()
        break
      }
      case 27:
        el.blur()
        break
    }
  })
  input.addEventListener('focus', () => {
    parent.document.body.classList.add(className.focused)
  })
  input.addEventListener('blur', () => {
    parent.document.body.classList.remove(className.focused)
  })
  parent.window.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      input.focus()
    }
  })

  // add description
  const button = document.createElement('button')
  button.textContent = 'Chat Input is Moved to Bottom Controls'
  button.addEventListener('click', () => {
    input.focus()
  })
  const description = document.createElement('div')
  description.classList.add(className.description)
  description.append(button)
  buttons.parentElement?.insertBefore(description, buttons)

  // add controls
  const controls = document.createElement('div')
  controls.classList.add(className.controller)
  controls.style.left = `${leftControls.offsetWidth}px`
  controls.style.right = `${rightControls.offsetWidth}px`
  controls.append(top)
  controls.append(messageButtons)
  message && controls.append(message)
  rightControls.parentElement?.insertBefore(controls, rightControls)

  // setup resize observers
  const leftControlsObserver = new ResizeObserver((entries) => {
    const [entry] = entries
    controls.style.left = `${entry.contentRect.width}px`
  })
  leftControlsObserver.observe(leftControls)
  const rightControlsObserver = new ResizeObserver((entries) => {
    const [entry] = entries
    controls.style.right = `${entry.contentRect.width}px`
  })
  rightControlsObserver.observe(rightControls)
  const controlsObserver = new ResizeObserver((entries) => {
    const [entry] = entries
    if (entry.contentRect.width < 512) {
      parent.document.body.classList.add(className.small)
    } else {
      parent.document.body.classList.remove(className.small)
    }
  })
  controlsObserver.observe(controls)

  // setup for grow input
  if (!controller.settings?.growBottomChatInputEnabled) {
    return
  }

  parent.document.body.classList.add(className.grow)
}

const removeChatInputControl = () => {
  const button = parent.document.querySelector(`.${className.controller}`)
  button && button.remove()
}

const addVideoEventListener = () => {
  const video = parent.document.querySelector(
    'video.html5-main-video'
  ) as HTMLVideoElement | null
  if (!video) {
    return
  }

  video.addEventListener('play', () => controller.play())
  video.addEventListener('pause', () => controller.pause())

  if (video.readyState === 0) {
    // wait until video is started
    video.addEventListener('loadeddata', () => {
      moveChatInputControl()
    })
  } else {
    moveChatInputControl()
  }
}

browser.runtime.onMessage.addListener((message) => {
  const { id, data } = message
  switch (id) {
    case 'cssInjected':
      parent.document.body.classList.add(className.injected)
      break
    case 'enabledChanged':
      controller.enabled = data.enabled
      updateControlButton()
      break
    case 'followingChanged':
      controller.following = data.following
      updateMenuButtons()
      break
    case 'settingsChanged':
      controller.settings = data.settings
      break
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  const needCSSInject = !parent.document.body.classList.contains(
    className.injected
  )
  const data = await browser.runtime.sendMessage({
    id: 'contentLoaded',
    data: { needCSSInject }
  })

  controller.enabled = data.enabled
  controller.following = data.following
  controller.settings = data.settings
  await controller.observe()
  addVideoEventListener()
  addControlButton()
  addMenuButtons()

  window.addEventListener('unload', () => {
    controller.clear()
    controller.disconnect()
    removeControlButton()
    removeChatInputControl()
  })
})
