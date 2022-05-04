export const querySelectorAsync = <T extends Element = Element>(
  selector: string,
  interval = 100,
  timeout = 1000
) => {
  return new Promise<T | null>((resolve) => {
    const expireTime = Date.now() + timeout
    const timer = window.setInterval(() => {
      const e = document.querySelector<T>(selector)
      if (e || Date.now() > expireTime) {
        clearInterval(timer)
        resolve(e)
      }
    }, interval)
  })
}

export const getImageSourceAsync = (
  img: HTMLImageElement,
  interval = 100,
  timeout = 1000
) => {
  return new Promise<string>((resolve) => {
    const expireTime = Date.now() + timeout
    const timer = window.setInterval(() => {
      if (img.src || Date.now() > expireTime) {
        clearInterval(timer)
        resolve(img.src)
      }
    }, interval)
  })
}

export const waitImageLoaded = (
  img: HTMLImageElement,
  interval = 100,
  timeout = 1000
) => {
  return new Promise<string>((resolve) => {
    const expireTime = Date.now() + timeout
    const timer = window.setInterval(() => {
      if ((img.complete && img.naturalWidth) || Date.now() > expireTime) {
        clearInterval(timer)
        resolve(img.src)
      }
    }, interval)
  })
}

export const waitAllImagesLoaded = (
  element: HTMLElement,
  interval = 100,
  timeout = 1000
) => {
  if (element instanceof HTMLImageElement) {
    return Promise.all([waitImageLoaded(element, interval, timeout)])
  }
  return Promise.all(
    Array.from(element.querySelectorAll('img')).map((img) => {
      return waitImageLoaded(img, interval, timeout)
    })
  )
}
