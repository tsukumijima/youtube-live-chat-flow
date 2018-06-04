class Logger {
  log (msg, ...args) {
    let message = '[youtube-live-chat-flow] '
    let params = args
    if (typeof msg === 'string') {
      message += msg
    } else {
      message += '%o'
      params.unshift(msg)
    }
    if (process.env.NODE_ENV === 'production') {
      return
    }
    console.log(message, ...params)
  }
}

export default new Logger()
