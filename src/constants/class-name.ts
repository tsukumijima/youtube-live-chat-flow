import { browser } from 'webextension-polyfill-ts'

const id = 'e' + browser.runtime.id.replace('@', '')

const classNames = [
  // parent window
  'injected',
  'focused',
  'message',
  'infoIcon',
  'controlButton',
  'controller',
  'smallController',
  // window
  'menuButton',
  'menuButtonActive',
  'followButton',
  'reloadButton',
  'description'
]

export default classNames.reduce((carry, className) => {
  const kebabName = className.replace(/([A-Z])/g, (s) => {
    return '-' + s.charAt(0).toLowerCase()
  })
  return {
    ...carry,
    [className]: `${id}-${kebabName}`
  }
}, {}) as { [key: string]: string }
