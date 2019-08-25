import browser from 'webextension-polyfill'
import className from './constants/class-name'
import FlowController from './utils/flow-controller'
import message from './assets/message.svg'
import downArrow from './assets/down-arrow.svg'
import refresh from './assets/refresh.svg'

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

const controller = new FlowController()

const addVideoEventListener = () => {
  const video = parent.document.querySelector('video.html5-main-video')
  if (!video) {
    return
  }

  video.addEventListener('play', () => controller.play())
  video.addEventListener('pause', () => controller.pause())

  if (video.readyState === 0) {
    // wait until video is started
    video.addEventListener('loadeddata', () => {
      addInputControl()
    })
  } else {
    addInputControl()
  }
}

const addControlButton = () => {
  const controls = parent.document.querySelector(
    '.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls'
  )
  if (!controls) {
    return
  }

  const button = document.createElement('button')
  button.classList.add(className.controlButton)
  button.classList.add('ytp-button')
  button.title = 'Flow messages'
  button.onclick = () => {
    browser.runtime.sendMessage({ id: 'controlButtonClicked' })
  }
  button.innerHTML = message

  // Change SVG viewBox
  const svg = button.querySelector('svg')
  svg.setAttribute('viewBox', '-8 -8 40 40')

  controls.prepend(button)

  updateControlButton()
}

const updateControlButton = () => {
  const button = parent.document.querySelector(`.${className.controlButton}`)
  button && button.setAttribute('aria-pressed', controller.enabled)
}

const removeControlButton = () => {
  const button = parent.document.querySelector(`.${className.controlButton}`)
  button && button.remove()
}

const addMenuButtons = () => {
  const header = document.querySelector(
    '#chat-messages > yt-live-chat-header-renderer'
  )
  const refIconButton = header && header.querySelector('yt-icon-button')
  if (!header || !refIconButton) {
    return
  }

  for (let config of menuButtonConfigs) {
    const icon = document.createElement('yt-icon')
    icon.classList.add('style-scope')
    icon.classList.add('yt-live-chat-header-renderer')
    icon.innerHTML = config.svg

    const button = document.createElement('button')
    button.setAttribute('id', 'button')
    button.classList.add('yt-icon-button')
    button.classList.add('style-scope')
    button.append(icon)

    const iconButton = document.createElement('yt-icon-button')
    iconButton.classList.add(className.menuButton, config.className)
    iconButton.classList.add('style-scope')
    iconButton.classList.add('yt-live-chat-header-renderer')
    iconButton.title = config.title
    iconButton.onclick = config.onclick
    iconButton.append(button)

    header.insertBefore(iconButton, refIconButton)

    // remove unnecessary generated button
    iconButton.querySelector('#button').remove()
  }

  updateMenuButtons()
}

const updateMenuButtons = () => {
  for (let config of menuButtonConfigs) {
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

const addInputControl = () => {
  if (!controller.settings.bottomChatFormEnabled) {
    return
  }

  const leftControls = parent.document.querySelector(
    '.ytp-chrome-bottom .ytp-chrome-controls .ytp-left-controls'
  )
  const rightControls = parent.document.querySelector(
    '.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls'
  )
  if (!leftControls || !rightControls) {
    return
  }

  const top = document.querySelector(
    'yt-live-chat-message-input-renderer #container #top'
  )
  const buttons = document.querySelector(
    'yt-live-chat-message-input-renderer #container #buttons.yt-live-chat-message-input-renderer'
  )
  if (!top || !buttons) {
    return
  }

  const input = top.querySelector('div#input')
  const messageButtons = buttons.querySelector('#message-buttons')
  if (!input || !messageButtons) {
    return
  }
  input.addEventListener('keydown', (e) => {
    e.stopPropagation()
    switch (e.keyCode) {
      case 13: {
        if (e.target.textContent !== '') {
          const sendButton = messageButtons.querySelector(
            '#send-button button#button'
          )
          sendButton && sendButton.click()
        }
        e.target.blur()
        break
      }
      case 27:
        e.target.blur()
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
  button.textContent = 'Chat Form is Moved to Bottom Controls'
  button.addEventListener('click', () => {
    input.focus()
  })
  const description = document.createElement('div')
  description.classList.add(className.description)
  description.append(button)
  buttons.append(description)

  // add controls
  const controls = document.createElement('div')
  controls.classList.add(className.controller)
  controls.style.left = `${leftControls.offsetWidth}px`
  controls.style.right = `${rightControls.offsetWidth}px`
  controls.append(top)
  controls.append(messageButtons)
  rightControls.parentNode.insertBefore(controls, rightControls)

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
      controls.classList.add(className.smallController)
    } else {
      controls.classList.remove(className.smallController)
    }
  })
  controlsObserver.observe(controls)
}

const removeInputControl = () => {
  const button = parent.document.querySelector(`.${className.controller}`)
  button && button.remove()
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
  addControlButton()
  addMenuButtons()
  addVideoEventListener()

  window.addEventListener('unload', () => {
    controller.clear()
    controller.disconnect()
    removeControlButton()
    removeInputControl()
  })
})
