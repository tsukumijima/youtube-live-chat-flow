import { defaultState } from './store'
import storage from './utils/storage'
import logger from './utils/logger'

logger.log('content script loaded')

let observer
let state
let data = []

const loadState = async () => {
  const items = await storage.get('vuex')
  try {
    state = {
      ...defaultState,
      ...JSON.parse(items['vuex'])
    }
  } catch (e) {
    state = defaultState
  }
}

const flow = (node) => {
  if (!state.enabled) {
    return
  }

  const message = node.querySelector('#message')
  if (!message) {
    return
  }

  const text = message.innerText

  const doc = (parent || window).document

  const container = doc.querySelector('.html5-video-container')
  const video = doc.querySelector('.video-stream.html5-main-video')
  const rows = state.rows
  const height = video.offsetHeight / rows
  const fontSize = height * 0.8

  const div = doc.createElement('div')
  div.innerHTML = text
  div.setAttribute('style', `
    position: absolute;
    left: 0;
    white-space: nowrap;
    display: inline-block;
    font-size: ${fontSize}px;
    font-weight: bold;
    color: ${state.color};
    text-shadow: ${state.textShadow};
  `)

  container.appendChild(div)

  const width = container.offsetWidth
  const commentWidth = div.offsetWidth
  const millis = state.speed * 1000

  const now = Date.now()

  const comment = {
    width: commentWidth,
    time: now
  }
  const vc = (width + commentWidth) / millis

  let index = data.findIndex((comments) => {
    const comment = comments[comments.length - 1]
    if (!comment) {
      return true
    }
    const vt = (width + comment.width) / millis

    const t1 = now - comment.time
    const d1 = vt * t1
    if (d1 < comment.width) {
      return false
    }

    const t2 = t1 + width / vc
    const d2 = vt * t2
    if (d2 < width + comment.width) {
      return false
    }

    return true
  })

  if (index === -1) {
    data.push([comment])
    index = data.length - 1
  } else {
    data[index].push(comment)
  }

  const top = (height * (index % rows))
  const depth = Math.floor(index / rows)
  const opacity = 1 - 0.2 * depth

  div.setAttribute('style', div.getAttribute('style') + `
    top: ${top}px;
    opacity: ${opacity};
  `)

  const keyframes = [
    { transform: `translate(${width}px, 0px)` },
    { transform: `translate(-${commentWidth}px, 0px)` }
  ]
  const animation = div.animate(keyframes, millis)
  animation.onfinish = () => {
    div.parentNode.removeChild(div)
    data[index].shift()
  }
}

const initialize = async () => {
  logger.log('initialize')

  if (observer) {
    observer.disconnect()
  }
  const items = document.querySelector('#items.yt-live-chat-item-list-renderer')
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const nodes = Array.from(mutation.addedNodes)
      if (nodes.length > 50) {
        return
      }
      nodes.forEach((node) => {
        flow(node)
      })
    })
  })
  observer.observe(items, { childList: true })
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  logger.log('onMessage: %o', message)
  const { id, data } = message
  switch (id) {
    case 'urlChanged':
      initialize(data.url)
      break
    case 'stateChanged':
      await loadState()
      break
  }
});

(async () => {
  await loadState()
  initialize(location.href)
})()
