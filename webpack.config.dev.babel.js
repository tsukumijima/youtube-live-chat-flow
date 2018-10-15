import WebpackChromeExtensionReloaderPlugin from 'webpack-chrome-extension-reloader'
import config from './webpack.config.babel'

export default {
  ...config,
  plugins: [...config.plugins, new WebpackChromeExtensionReloaderPlugin()]
}
