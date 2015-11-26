var path = require('path');
var webpack = require("webpack");

var plugins = [];
var minimize = process.argv.indexOf('--no-minimize') === -1;

if (minimize) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({

    }));
}

module.exports = {
    context: __dirname,

    entry: {
        // 由于webpack的技术原因，下面的模块依赖了入口，就必须写成数组的形式，否则报错
        'utf8': ['./src/utf8'],
        'base64': ['./src/base64'],

        'E': './src/E',
        'simple16': './src/simple16',
        'xxtea': './src/xxtea',
        'zero': './src/zero'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: minimize ? '[name].min.js' : '[name].js',

        libraryTarget: 'umd'
    },

    plugins: plugins
}