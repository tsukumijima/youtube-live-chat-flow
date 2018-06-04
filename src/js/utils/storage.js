class Storage {
  get (keys) {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (result) => {
        resolve(result)
      })
    })
  }
  set (items) {
    return new Promise((resolve) => {
      chrome.storage.local.set(items, () => {
        resolve()
      })
    })
  }
  remove (keys) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(keys, () => {
        resolve()
      })
    })
  }
  clear () {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve()
      })
    })
  }
}

export default new Storage()
