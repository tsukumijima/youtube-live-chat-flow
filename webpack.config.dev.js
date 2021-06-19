const config = require('./webpack.config')

module.exports = {
  ...config,
  entry: {
    ...config.entry,
    background: ['crx-hotreload', config.entry.background],
  },
}
