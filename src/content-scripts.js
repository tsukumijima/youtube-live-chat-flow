import storage from './utils/storage'
import logger from './utils/logger'

logger.log('content script loaded')

let observer
let settings
let data = []
const doc = (parent || window).document

const loadSettings = async () => {
  settings = (await storage.get()).settings
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
    case 'moderator':
    case 'member':
      return true
    default:
      return false
  }
}

const flow = (node) => {
  if (!settings.enabled) {
    return
  }

  if (node.tagName.toLowerCase() !== 'yt-live-chat-text-message-renderer') {
    return
  }

  const authorType = node.getAttribute('author-type')
  const html = node.querySelector('#message').innerHTML
  const src = node.querySelector('#img').src

  const container = doc.querySelector('.html5-video-container')
  const video = doc.querySelector('.video-stream.html5-main-video')

  const height = video.offsetHeight / settings.rows
  const fontSize = height * 0.8
  const millis = settings.speed * 1000
  const color = getColor(authorType)
  const authority = hasAuthority(authorType)

  const element = doc.createElement('div')
  element.classList.add('ylcf-message')
  element.setAttribute('style', `
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
  `)
  if (authority) {
    const img = doc.createElement('img')
    img.src = src
    img.setAttribute('style', `
      height: ${fontSize}px;
      border-radius: ${fontSize}px;
      object-fit: cover;
    `)
    element.appendChild(img)
  }
  const span = doc.createElement('span')
  span.setAttribute('style', `
    height: ${fontSize}px;
    line-height: ${fontSize}px;
    white-space: nowrap;
    font-size: ${fontSize}px;
    font-weight: bold;
    color: ${color};
    text-shadow: ${settings.textShadow};
  `)
  span.innerHTML = html
  Array.from(span.childNodes).map((node) => {
    if (!node.tagName || node.tagName.toLowerCase() !== 'img') {
      return node
    }
    node.setAttribute('style', `
      height: ${fontSize}px;
      vertical-align: bottom;
    `)
    return node
  })
  element.appendChild(span)

  container.appendChild(element)

  const keyframes = [
    { transform: `translate(${video.offsetWidth}px, 0px)` },
    { transform: `translate(-${element.offsetWidth}px, 0px)` }
  ]
  const animation = element.animate(keyframes, millis)
  animation.pause()

  const now = Date.now()
  const vc = (video.offsetWidth + element.offsetWidth) / millis

  const message = {
    element,
    animation,
    time: now
  }

  let index = data.findIndex((messages) => {
    const message = messages[messages.length - 1]
    if (!message) {
      return true
    }
    const vt = (video.offsetWidth + message.element.offsetWidth) / millis

    const t1 = now - message.time
    const d1 = vt * t1
    if (d1 < message.element.offsetWidth) {
      return false
    }

    const t2 = t1 + video.offsetWidth / vc
    const d2 = vt * t2
    if (d2 < video.offsetWidth + message.element.offsetWidth) {
      return false
    }

    return true
  })

  if (index === -1) {
    data.push([message])
    index = data.length - 1
  } else {
    data[index].push(message)
  }

  const top = height * (0.1 + (index % settings.rows))
  const depth = authority ? 0 : Math.floor(index / settings.rows)
  const opacity = settings.opacity * (1 - 0.2 * depth)

  element.setAttribute('style', element.getAttribute('style') + `
    top: ${top}px;
    opacity: ${opacity};
  `)

  animation.onfinish = () => {
    element.remove()
    data[index].shift()
  }
  if (!video.paused) {
    animation.play()
  }
}

const clear = () => {
  data = []
  Array.from(doc.querySelectorAll('.ylcf-message')).forEach((element) => {
    element.remove()
  })
}

const initialize = async () => {
  logger.log('initialize')

  clear()
  await loadSettings()

  if (observer) {
    observer.disconnect()
  }
  const items = document.querySelector('#items.yt-live-chat-item-list-renderer')
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const nodes = Array.from(mutation.addedNodes)
      nodes.forEach((node) => {
        flow(node)
      })
    })
  })
  observer.observe(items, { childList: true })

  const callback = (e) => {
    data.reduce((carry, messages) => [...carry, ...messages.map((message) => message.animation)], [])
      .forEach((animation) => animation[e.type]())
  }
  const video = doc.querySelector('.video-stream.html5-main-video')
  video.addEventListener('pause', callback)
  video.addEventListener('play', callback)

  chrome.runtime.sendMessage({ id: 'contentLoaded' })
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  logger.log('onMessage: %o', message)
  const { id } = message
  switch (id) {
    case 'stateChanged':
      await loadSettings()
      break
  }
})

;(async () => {
  await initialize(location.href)
})()
