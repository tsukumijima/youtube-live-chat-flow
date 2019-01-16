const get = (keys) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(result)
    })
  })
}

const set = (items) => {
  return new Promise((resolve) => {
    chrome.storage.local.set(items, () => {
      resolve()
    })
  })
}

const remove = (keys) => {
  return new Promise((resolve) => {
    chrome.storage.local.remove(keys, () => {
      resolve()
    })
  })
}

const clear = () => {
  return new Promise((resolve) => {
    chrome.storage.local.clear(() => {
      resolve()
    })
  })
}

export default { get, set, remove, clear }
