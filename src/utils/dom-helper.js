const getImageSourceAsync = (img, interval = 100, timeout = 1000) => {
  return new Promise((resolve) => {
    const expireTime = Date.now() + timeout
    const timer = setInterval(() => {
      if (img.src || Date.now() > expireTime) {
        clearInterval(timer)
        resolve(img.src)
      }
    }, interval)
  })
}

const waitImageLoaded = (img, interval = 100, timeout = 1000) => {
  return new Promise((resolve) => {
    const expireTime = Date.now() + timeout
    const timer = setInterval(() => {
      if ((img.complete && img.naturalWidth) || Date.now() > expireTime) {
        clearInterval(timer)
        resolve(img.src)
      }
    }, interval)
  })
}

const waitAllImagesLoaded = (element, interval = 100, timeout = 1000) => {
  if (element.tagName.toLowerCase() === 'img') {
    return waitImageLoaded(element, interval, timeout)
  }
  return Promise.all(
    Array.from(element.querySelectorAll('img')).map((img) => {
      return waitImageLoaded(img, interval, timeout)
    })
  )
}

export default {
  getImageSourceAsync,
  waitImageLoaded,
  waitAllImagesLoaded
}
