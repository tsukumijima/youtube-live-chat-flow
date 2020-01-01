const querySelectorAsync = (
  selector: string,
  interval = 100,
  timeout = 1000
): Promise<Element | null> => {
  return new Promise((resolve) => {
    const expireTime = Date.now() + timeout
    const timer = setInterval(() => {
      const e = document.querySelector(selector)
      if (e || Date.now() > expireTime) {
        clearInterval(timer)
        resolve(e)
      }
    }, interval)
  })
}

const getImageSourceAsync = (
  img: HTMLImageElement,
  interval = 100,
  timeout = 1000
): Promise<string> => {
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

const waitImageLoaded = (
  img: HTMLImageElement,
  interval = 100,
  timeout = 1000
): Promise<string> => {
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

const waitAllImagesLoaded = (
  element: HTMLElement,
  interval = 100,
  timeout = 1000
): Promise<string[]> => {
  if (element instanceof HTMLImageElement) {
    return Promise.all([waitImageLoaded(element, interval, timeout)])
  }
  return Promise.all(
    Array.from(element.querySelectorAll('img')).map((img) => {
      return waitImageLoaded(img, interval, timeout)
    })
  )
}

export default {
  querySelectorAsync,
  getImageSourceAsync,
  waitImageLoaded,
  waitAllImagesLoaded
}
