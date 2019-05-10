import browser from 'webextension-polyfill'

const id = browser.runtime.id

const classNames = [
  'injected',
  'focused',
  'message',
  'messageAvatar',
  'messageText',
  'messagePurchase',
  'controlButton',
  'controller',
  'smallController'
]

export default classNames.reduce((carry, className) => {
  const kebabName = className.replace(/([A-Z])/g, (s) => {
    return '-' + s.charAt(0).toLowerCase()
  })
  return {
    ...carry,
    [className]: `${id}-${kebabName}`
  }
}, {})
