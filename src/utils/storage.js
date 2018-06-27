export default class Storage {
  static get (keys) {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (result) => {
        resolve(result)
      })
    })
  }
  static set (items) {
    return new Promise((resolve) => {
      chrome.storage.local.set(items, () => {
        resolve()
      })
    })
  }
  static remove (keys) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(keys, () => {
        resolve()
      })
    })
  }
  static clear () {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve()
      })
    })
  }
}
