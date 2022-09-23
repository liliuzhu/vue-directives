// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function karmaConfig (config) {
  config.set({
    client: {
      mocha: {
        timeout: 6000
      }
    },
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
// files：将要被测试的文件
// preprocessors：在引入文件前，需要用什么方式处理，我们看到了，包括webpack、sourcemap、coverage
// reporters：测试完成后的报告，我们需要mocha的报告和coverage的报告
// coverageReporter：代码覆盖率生成的报告文件地址和存在形式设置
// webpack：在这需要引入webpack的配置，我们见到顶部，引入了webpack.test.config.js文件，我们待会儿会介绍里面的配置
// webpackMiddleware：stats: 'errors-only'我们让webpack的编译过程不显示出来，除非编译报错
