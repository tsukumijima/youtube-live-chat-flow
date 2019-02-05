import pkg from '~~/package.json'

const log = (msg, ...args) => {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  let message = `[${pkg.name}] `
  let params = args
  if (typeof msg === 'string') {
    message += msg
  } else {
    message += '%o'
    params.unshift(msg)
  }
  console.log(message, ...params) // eslint-disable-line no-console
}

export default { log }
