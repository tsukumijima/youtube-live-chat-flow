import browser from 'webextension-polyfill'

const id = 'e' + browser.runtime.id.replace('@', '')

const classNames = [
  // parent window
  'injected',
  'focused',
  'message',
  'messageTwoLine',
  'messageSuperChat',
  'messageSuperSticker',
  'messageMembership',
  'messageAvatar',
  'messageAuthor',
  'messageMessage',
  'messagePurchaseAmount',
  'messageInfo',
  'controlButton',
  'controller',
  'smallController',
  // window
  'menuButton',
  'menuButtonActive',
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
}, {})
