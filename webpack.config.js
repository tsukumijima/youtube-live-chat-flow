const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  target: 'web',
  context: `${__dirname}/src`,
  entry: {
    background: './background',
    'content-script': './content-script',
    options: './options'
  },
  output: {
    path: `${__dirname}/app/`,
    filename: '[name].js',
    publicPath: '../'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|gif|png|woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'manifest.json',
        transform: function(content) {
          return Buffer.from(
            JSON.stringify({
              ...JSON.parse(content.toString()),
              name: process.env.npm_package_productName,
              description: process.env.npm_package_description,
              version: process.env.npm_package_version
            })
          )
        }
      }
    ]),
    new HtmlWebpackPlugin({
      template: './assets/options.html',
      filename: './assets/options.html',
      chunks: ['options']
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      '~~': `${__dirname}/`,
      '~': `${__dirname}/src/`,
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}
