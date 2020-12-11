const autoprefixer = require('autoprefixer')
// const pxtorem = require("postcss-pxtorem");
const postcssPxToViewport = require('postcss-px-to-viewport')
const path = require('path') //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

const port = process.env.port || process.env.npm_config_port || 2048 // dev port
module.exports = {
  // 输出文件目录
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))

    config.plugin('define').tap((args) => {
      return args
    })
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/_variable.scss";`,
      },
      postcss: {
        plugins: [
          autoprefixer(),
          postcssPxToViewport({
            viewportWidth: 375,
            minPixelValue: 1,
            // selectorBlackList: ["van"]
          }),
        ],
      },
    },
  },
  devServer: {
    host: 'localhost',
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // before: require('./mock/mock-server.js')
    proxy: {
      '/api': {
        target: 'http:/10.168.1.110:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
}
