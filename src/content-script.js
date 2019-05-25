import browser from 'webextension-polyfill'
import className from './constants/class-name'
import FlowController from './controllers/flow-controller'
import message from './assets/message.svg'

const controller = new FlowController()

const addVideoEventListener = () => {
  const video = parent.document.querySelector('video.html5-main-video')
  if (!video) {
    return
  }

  video.addEventListener('play', () => controller.start())
  video.addEventListener('pause', () => controller.stop())

  if (video.readyState === 0) {
    // wait until video is started
    video.addEventListener('loadeddata', () => {
      addInputControl()
    })
  } else {
    addInputControl()
  }
}

const addControlButton = (disabled) => {
  const controls = parent.document.querySelector(
    '.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls'
  )
  if (!controls) {
    return
  }

  const button = document.createElement('button')
  button.classList.add(className.controlButton)
  button.classList.add('ytp-button')
  button.onclick = () => {
    browser.runtime.sendMessage({ id: 'controlButtonClicked' })
  }
  button.innerHTML = message

  const svg = button.querySelector('svg')
  svg.setAttribute('viewBox', '-8 -8 40 40')
  svg.style.fill = 'white'

  controls.prepend(button)

  updateControlButton(disabled)
}

const updateControlButton = () => {
  const button = parent.document.querySelector(`.${className.controlButton}`)
  button && button.setAttribute('aria-pressed', controller.enabled)
}

const removeControlButton = () => {
  const button = parent.document.querySelector(`.${className.controlButton}`)
  button && button.remove()
}

const addInputControl = () => {
  if (!controller.settings.bottomControllerEnabled) {
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
        if (e.target.textContent === '') {
          e.target.blur()
          return
        }
        const sendButton = messageButtons.querySelector(
          '#send-button button#button'
        )
        sendButton && sendButton.click()
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
  const description = document.createElement('button')
  description.textContent = 'Chat Form is Moved to Bottom Controls'
  description.style.textAlign = 'center'
  description.style.fontSize = 'smaller'
  description.style.flex = 1
  description.style.color = 'var(--yt-spec-text-secondary)'
  description.style.webkitAppearance = 'none'
  description.style.background = 'none'
  description.style.border = 'none'
  description.style.outline = 'none'
  description.style.cursor = 'pointer'
  description.addEventListener('click', () => {
    input.focus()
  })
  const wrapper = document.createElement('div')
  wrapper.style.flex = 1
  wrapper.style.display = 'flex'
  wrapper.style.alignItems = 'center'
  wrapper.append(description)
  buttons.append(wrapper)

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
  const { id, type, data } = message
  if (type === 'SIGN_RELOAD' && process.env.NODE_ENV !== 'production') {
    // reload if files changed
    parent.location.reload()
    return
  }
  switch (id) {
    case 'cssInjected':
      parent.document.body.classList.add(className.injected)
      break
    case 'enabledChanged':
      controller.enabled = data.enabled
      updateControlButton()
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
  controller.settings = data.settings
  controller.observe()
  addVideoEventListener()
  addControlButton()
})

window.addEventListener('unload', () => {
  controller.clear()
  removeControlButton()
  removeInputControl()
})
