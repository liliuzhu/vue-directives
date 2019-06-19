'use strict'
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const packageJSON = require('../package.json')

const env = require('../config/prod.env')


const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    "vue-directives.min": './src/directives/index.js',
    "vue-directives": './src/directives/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    library: 'VueDirectives',
    libraryTarget: "umd"
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  externals: {
    "vue": {
      root: 'Vue',
      commonjs2: 'vue',
      commonjs: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      test: /\.min.js$/i,
      extractComments: {
        condition:  'some',
        filename(file) {
          return `${file}.LICENSE`;
        },
        banner() {
          const banner =
            ' \n' +
            ' * vue-directives.js v' + packageJSON.version + '\n' +
            ' * (c) ' + new Date().getFullYear() + ' ' + packageJSON.author + '\n' +
            ' * Released under the MIT License.\n'
          return banner;
        }
      },
      uglifyOptions: {
        compress: {
          ecma: 5,
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
})

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
