import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'

const mode = process.env.NODE_ENV || 'development'

export default {
  mode,
  target: 'web',
  context: `${__dirname}/src`,
  entry: {
    background: './js/background',
    'content-scripts': './js/content-scripts',
    popup: './js/popup'
  },
  output: {
    path: `${__dirname}/app/`,
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|gif|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode)
      }
    }),
    new CopyWebpackPlugin([{
      from: 'manifest.json',
      transform: function (content, path) {
        return Buffer.from(JSON.stringify({
          ...JSON.parse(content.toString()),
          version: process.env.npm_package_version
        }))
      }
    }]),
    new HtmlWebpackPlugin({
      template: './html/popup.html',
      filename: './html/popup.html',
      chunks: ['popup']
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}
