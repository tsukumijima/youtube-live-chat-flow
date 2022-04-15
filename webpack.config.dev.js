const webpack = require('webpack')
const config = require('./webpack.config')
const hotReloadConfig = require('./mv3-hot-reload.config')

module.exports = {
  ...config,
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    ...config.entry,
    background: ['mv3-hot-reload/background', config.entry.background],
    'content-script': [
      'mv3-hot-reload/content',
      config.entry['content-script'],
    ],
  },
  plugins: [
    ...config.plugins,
    new webpack.EnvironmentPlugin({
      MV3_HOT_RELOAD_PORT: hotReloadConfig.port,
    }),
  ],
}
