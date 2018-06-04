import { defaultState } from './store'
import storage from './utils/storage'
import logger from './utils/logger'

logger.log('ready')

let observer1
let observer2

const querySelectorAsync = (selector) => {
  return new Promise((resolve, reject) => {
    const expireMillis = 5000
    const expire = Date.now() + expireMillis
    const timer = setInterval(() => {
      const dom = document.querySelector(selector)
      if (dom) {
        if (timer) {
          clearInterval(timer)
        }
        resolve(dom)
        return
      }
      if (Date.now() > expire) {
        if (timer) {
          clearInterval(timer)
        }
        reject(new Error(`querySelectorAsync <${selector}> timeout ${expireMillis}ms`))
      }
    }, 100)
  })
}

const getState = async () => {
  const items = await storage.get('vuex')
  try {
    return {
      ...defaultState,
      ...JSON.parse(items['vuex'])
    }
  } catch (e) {
    return defaultState
  }
}

let state
let lines = []
let i = 0
const flow = (node) => {
  if (!state.enabled) {
    return
  }

  const message = node.querySelector('#message')
  if (!message) {
    return
  }

  const text = message.innerText



  const win = parent || window
  const doc = win.document

  const animationName = `translate-${++i}`
  const container = doc.querySelector('.html5-video-container')
  const video = doc.querySelector('.video-stream.html5-main-video')
  const rows = state.rows
  const height = video.offsetHeight / rows
  const font = height * 0.8

  const div = doc.createElement('div')
  div.innerHTML = text
  div.setAttribute('style', `
    position: absolute;
    left: 0;
    white-space: nowrap;
    display: inline-block;
    font-size: ${font}px;
    font-weight: bold;
    color: ${state.color};
    text-shadow: ${state.textShadow};
    animation: ${animationName} ${state.speed}s;
    animation-timing-function: linear;
  `)
  //   animation: ${animationName} ${state.speed}s;
  //   animation-timing-function: linear;
  //   top: ${top};
  //   opacity: ${opacity};
  // `)

  container.appendChild(div)

  const width = container.offsetWidth
  const cW = div.offsetWidth

  const now = Date.now()

  const item = {
    width: cW,
    time: now
  }
  const vc = (width + cW) / state.speed / 1000

  let index = lines.findIndex((line) => {
    const item = line[line.length - 1]
    if (!item) {
      return true
    }
    const vt = (width + item.width) / state.speed / 1000

    // console.log(vt, vc)

    const t1 = now - item.time
    const d1 = vt * t1
    // console.log(d1, item.width)
    if (d1 < item.width) {
      return false
    }
    const t2 = t1 + width / vc
    const d2 = vt * t2
    // console.log(d1, width + item.width)
    if (d2 < width + item.width) {
      return false
    }
    return true
  })
  if (index === -1) {
    lines.push([item])
    index = lines.length - 1
  } else {
    lines[index].push(item)
  }

  const top = (height * (index % rows)) + 'px'
  const depth = Math.floor(index / rows)
  const opacity = 1 - 0.2 * depth

  div.setAttribute('style', div.getAttribute('style') + `
    top: ${top};
    opacity: ${opacity};
  `)

  div.addEventListener('animationend', () => {
    // console.log('end = ' + comment)
    div.parentNode.removeChild(div)
    lines[index].shift()
    // console.log(index)
  })

  // console.log(cW)
  // console.log(element.offsetWidth)
  const keyframes = `
  @keyframes ${animationName} {
    0% { transform: translate(${width}px, 0px) }
    100% { transform: translate(-${cW}px, 0px) }
  }
  `
  // console.log(keyframes)
  const sheet = doc.styleSheets[0]
  sheet.insertRule(keyframes, sheet.cssRules.length)
}

const proceed = async () => {
  logger.log('proceed')

  if (observer2) {
    observer2.disconnect()
  }
  const items = await querySelectorAsync('#items.yt-live-chat-item-list-renderer')
  observer2 = new MutationObserver((mutations) => {
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
  observer2.observe(items, { childList: true })
}

const setup = async (urlString) => {
  logger.log('setup: %s', urlString)

  state = await getState()

  const url = new URL(urlString)
  if (url.host === 'www.youtube.com' && (url.pathname === '/live_chat_replay' || url.pathname === '/live_chat')) {
    //
  } else if (url.host === 'gaming.youtube.com' && (url.pathname === '/watch' || url.pathname.match(/^\/channel\/[^/]*\/live$/))) {
    //
  } else {
    logger.log('url not match')
    return
  }

  if (observer1) {
    observer1.disconnect()
  }
  const itemList = await querySelectorAsync('#item-list.yt-live-chat-renderer')
  observer1 = new MutationObserver(() => {
    proceed()
  })
  observer1.observe(itemList, { childList: true })
  proceed()
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const { id, data } = message
  logger.log('message received: %s', id)
  switch (id) {
    case 'urlChanged':
      setup(data.url)
      break
    case 'stateChanged':
      state = await getState()
      console.log(state)
      break
  }
})

setup(location.href)
