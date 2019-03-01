const id = chrome.runtime.id

export default {
  injected: `${id}-injected`,
  message: `${id}-message`,
  controlButton: `${id}-control-button`,
  controller: `${id}-controller`,
  focused: `${id}-focused`,
  small: `${id}-small`
}
