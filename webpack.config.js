const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

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
    publicPath: './'
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
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(css|jpg|gif|png|woff|woff2|eot|ttf)$/,
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
      'icon.png',
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
      template: './options.html',
      filename: './options.html',
      chunks: ['options']
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin()
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
