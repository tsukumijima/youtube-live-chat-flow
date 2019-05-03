const id = chrome.runtime.id

export default {
  injected: `${id}-injected`,
  focused: `${id}-focused`,
  message: `${id}-message`,
  messageAvatar: `${id}-message-avatar`,
  messageText: `${id}-message-text`,
  messagePurchase: `${id}-message-purchase`,
  controlButton: `${id}-control-button`,
  controller: `${id}-controller`,
  smallController: `${id}-small-controller`
}
