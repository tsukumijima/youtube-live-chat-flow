import browser from 'webextension-polyfill'
import className from './constants/class-name'

let disabled = false
let settings = null
const lines = []

const isMyName = (authorName) => {
  // if input control exists
  const span = document.querySelector('#input-container span#author-name')
  if (span) {
    return authorName === span.textContent
  }
  // if input control is moved
  const movedSpan = parent.document.querySelector(
    '#input-container span#author-name'
  )
  if (movedSpan) {
    return authorName === movedSpan.textContent
  }
  // otherwise
  const button = parent.document.querySelector(
    '.html5-video-player .ytp-chrome-top-buttons .ytp-watch-later-button'
  )
  if (button) {
    // TODO: japanese only
    return (
      authorName ===
      button.getAttribute('title').replace(' として後で再生します', '')
    )
  }
  return false
}

const getColor = (authorType) => {
  switch (authorType) {
    case 'owner':
      return settings.ownerColor
    case 'moderator':
      return settings.moderatorColor
    case 'member':
      return settings.memberColor
    default:
      return settings.color
  }
}

const hasAuthority = (authorType) => {
  switch (authorType) {
    case 'owner':
      return settings.ownerAvatar
    case 'moderator':
      return settings.moderatorAvatar
    case 'member':
      return settings.memberAvatar
    default:
      return settings.avatar
  }
}

const createElement = (node, height) => {
  const tags = [
    'yt-live-chat-text-message-renderer',
    'yt-live-chat-paid-message-renderer'
  ]
  if (!tags.includes(node.tagName.toLowerCase())) {
    return
  }

  const html =
    node.querySelector('#message') && node.querySelector('#message').innerHTML
  if (!html) {
    return
  }

  const avatarUrl = node.querySelector('#img') && node.querySelector('#img').src
  const authorType = node.getAttribute('author-type')
  const authorName =
    node.querySelector('#author-name') &&
    node.querySelector('#author-name').textContent
  const purchase =
    node.querySelector('#purchase-amount') &&
    node.querySelector('#purchase-amount').textContent
  const myself = isMyName(authorName)

  const fontSize = height * 0.8
  const color = myself
    ? settings.myColor
    : purchase
    ? settings.paidColor
    : getColor(authorType, authorName)
  const authority = myself
    ? settings.myAvatar
    : purchase
    ? settings.paidAvatar
    : hasAuthority(authorType, authorName)

  const element = parent.document.createElement('div')
  element.classList.add(className.message)
  element.style.color = color
  element.style.fontSize = `${fontSize}px`
  element.style.height = `${fontSize}px`
  element.style.lineHeight = `${fontSize}px`
  element.setAttribute(
    'style',
    element.getAttribute('style') + settings.extendedStyle
  )

  if (authority && avatarUrl) {
    element.classList.add('has-auth')
    const img = parent.document.createElement('img')
    img.classList.add(className.messageAvatar)
    img.src = avatarUrl
    img.style.borderRadius = `${fontSize}px`
    img.style.height = `${fontSize}px`
    element.appendChild(img)
  }

  const span = parent.document.createElement('span')
  span.classList.add(className.messageText)
  span.innerHTML = html
  Array.from(span.childNodes).map((node) => {
    if (!node.tagName || node.tagName.toLowerCase() !== 'img') {
      return node
    }
    node.style.height = `${fontSize}px`
    return node
  })
  element.appendChild(span)

  if (purchase) {
    const textSize = fontSize * 0.5
    const span = parent.document.createElement('span')
    span.classList.add(className.messagePurchase)
    span.style.fontSize = `${textSize}px`
    span.textContent = purchase
    element.appendChild(span)
  }

  return element
}

const flow = (node) => {
  if (disabled || !settings) {
    return
  }

  const video = parent.document.querySelector('video.html5-main-video')
  if (video && video.paused) {
    return
  }

  const height = video.offsetHeight / settings.rows
  const element = createElement(node, height)
  if (!element) {
    return
  }

  const container = parent.document.querySelector('.html5-video-container')
  if (!container) {
    return
  }
  container.appendChild(element)

  const millis = settings.speed * 1000
  const keyframes = [
    { transform: `translate(${container.offsetWidth}px, 0px)` },
    { transform: `translate(-${element.offsetWidth}px, 0px)` }
  ]
  const animation = element.animate(keyframes, millis)

  const now = Date.now()
  const vc = (container.offsetWidth + element.offsetWidth) / millis

  let index = lines.findIndex((messages) => {
    const message = messages[messages.length - 1]
    if (!message) {
      return true
    }
    const vt = (container.offsetWidth + message.element.offsetWidth) / millis

    const t1 = now - message.time
    const d1 = vt * t1
    if (d1 < message.element.offsetWidth) {
      return false
    }

    const t2 = t1 + container.offsetWidth / vc
    const d2 = vt * t2
    if (d2 < container.offsetWidth + message.element.offsetWidth) {
      return false
    }

    return true
  })

  const message = {
    element,
    animation,
    time: now
  }

  if (index === -1) {
    index = lines.length
  }

  if (index > settings.rows - 1 && settings.overflow === 'hidden') {
    element.remove()
    return
  }

  if (!lines[index]) {
    lines[index] = []
  }
  lines[index].push(message)

  const top = height * (0.1 + (index % settings.rows))
  const depth = element.classList.contains('has-auth')
    ? 0
    : Math.floor(index / settings.rows)
  const opacity = settings.opacity ** (depth + 1)

  element.style.top = `${top}px`
  element.style.opacity = opacity

  animation.onfinish = () => {
    element.remove()
    lines[index].shift()
  }
}

const observeChat = () => {
  const items = document.querySelector('#items.yt-live-chat-item-list-renderer')
  if (!items) {
    return
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const nodes = Array.from(mutation.addedNodes)
      nodes.forEach((node) => {
        flow(node)
      })
    })
  })
  observer.observe(items, { childList: true })
}

const addVideoEventListener = () => {
  const video = parent.document.querySelector('.video-stream.html5-main-video')
  if (!video) {
    return
  }

  const callback = (e) => {
    lines
      .reduce(
        (carry, messages) => [
          ...carry,
          ...messages.map((message) => message.animation)
        ],
        []
      )
      .forEach((animation) => animation[e.type]())
  }
  video.addEventListener('pause', callback)
  video.addEventListener('play', callback)

  if (video.readyState === 0) {
    // wait until video is started
    video.addEventListener('loadeddata', () => {
      addInputControl()
    })
  } else {
    addInputControl()
  }
}

const clearMessages = () => {
  Array.from(parent.document.querySelectorAll(`.${className.message}`)).forEach(
    (element) => {
      element.remove()
    }
  )
}

const addControlButton = (disabled) => {
  const controls = parent.document.querySelector(
    '.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls'
  )
  if (!controls) {
    return
  }

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute(
    'd',
    'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z'
  )
  path.setAttribute('fill', '#fff')

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '-8 -8 40 40')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.append(path)

  const button = document.createElement('button')
  button.classList.add(className.controlButton)
  button.classList.add('ytp-button')
  button.onclick = () => {
    browser.runtime.sendMessage({ id: 'disabledToggled' })
  }
  button.append(svg)

  controls.prepend(button)

  updateControlButton(disabled)
}

const updateControlButton = (disabled) => {
  const button = parent.document.querySelector(`.${className.controlButton}`)
  button && button.setAttribute('aria-pressed', !disabled)
}

const removeControlButton = () => {
  const button = parent.document.querySelector(`.${className.controlButton}`)
  button && button.remove()
}

const addInputControl = () => {
  if (!settings.bottomControllerEnabled) {
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

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('chrome.runtime.onMessage', message, sender, sendResponse)

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
    case 'disabledChanged':
      disabled = data.disabled
      updateControlButton(disabled)
      if (disabled) {
        clearMessages()
      }
      break
    case 'stateChanged':
      settings = data.state.settings
      break
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  const cssInjected = parent.document.body.classList.contains(
    className.injected
  )
  const data = await browser.runtime.sendMessage({
    id: 'contentLoaded',
    data: { cssInjected }
  })
  disabled = data.disabled
  settings = data.settings

  observeChat()
  addVideoEventListener()
  addControlButton(disabled)
})

window.addEventListener('unload', () => {
  clearMessages()
  removeControlButton()
  removeInputControl()
})
