const path = require('path')
const webpack = require("webpack")
// const TsukuyomiPlugin = require('@dx/tsukuyomi/plugin/webpack')

const minimize = process.argv.indexOf('-p') > -1
// const plugins = [
//   new TsukuyomiPlugin({
//     compress: true,
//     mangle: true,
//     'encrypt-string': {
//       percent: 100
//     },
//     'split-string': {
//       percent: 100
//     }
//   })
// ]

module.exports = {
  mode: 'production',
  context: __dirname,

  entry: {
    'utf8': './src/utf8',
    'base64': './src/base64',

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

  optimization: {
    minimize: minimize
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }
    ]
  },
}
