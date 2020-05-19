/* eslint-disable @typescript-eslint/no-var-requires */

const WebpackExtensionReloaderPlugin = require('webpack-extension-reloader')
const config = require('./webpack.config')

module.exports = {
  ...config,
  plugins: [...config.plugins, new WebpackExtensionReloaderPlugin()],
}
