import Package from '~~/package.json'

export default class Logger {
  static log (msg, ...args) {
    if (process.env.NODE_ENV === 'production') {
      return
    }

    let message = `[${Package.name}] `
    let params = args
    if (typeof msg === 'string') {
      message += msg
    } else {
      message += '%o'
      params.unshift(msg)
    }
    console.log(message, ...params)
  }
}
