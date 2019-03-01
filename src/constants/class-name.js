const id = chrome.runtime.id

export default {
  button: `${id}-button`,
  message: `${id}-message`,

  injected: `${id}-injected`,
  focused: `${id}-focused`,
  controls: `${id}-controls`,
  smallControls: `${id}-small-controls`
}
