const path = require('path')
const webpack = require("webpack")
const TsukuyomiPlugin = require('@dx/tsukuyomi/plugin/webpack')

const plugins = [
  new TsukuyomiPlugin({
    compress: true,
    mangle: true,
    'encrypt-string': {
      percent: 100
    },
    'split-string': {
      percent: 100
    }
  })
]

module.exports = {
  context: __dirname,

  entry: {
    // 由于webpack的技术原因，下面的模块依赖了入口，就必须写成数组的形式，否则报错
    'utf8': ['./src/utf8'],
    'base64': ['./src/base64'],

    'simple16': './src/simple16',
    'xxtea': './src/xxtea',
    'zero': './src/zero',

    'E': './src/E',
    'E2': './src/E2',
    'E3': './src/E3',
    'E4': './src/E4'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    library: 'dx',
    libraryTarget: 'umd'
  },

  plugins: plugins
}