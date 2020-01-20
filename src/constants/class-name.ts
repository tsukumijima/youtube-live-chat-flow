import { browser } from 'webextension-polyfill-ts'

const id = 'e' + browser.runtime.id.replace('@', '')

const classNames = [
  // parent window
  'injected',
  'focused',
  'small',
  'grow',
  'message',
  'controlButton',
  'controller',
  // window
  'menuButton',
  'menuButtonActive',
  'followButton',
  'reloadButton',
  'infoIcon',
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
