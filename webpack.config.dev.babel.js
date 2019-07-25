import WebpackExtensionReloaderPlugin from 'webpack-extension-reloader'
import config from './webpack.config.babel'

export default {
  ...config,
  plugins: [...config.plugins, new WebpackExtensionReloaderPlugin()]
}
