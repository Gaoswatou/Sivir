const autoprefixer = require("autoprefixer");
// const pxtorem = require("postcss-pxtorem");
const postcssPxToViewport = require("postcss-px-to-viewport");
const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
const environment = require("./config/env"); // 引入获取命令行参数js
const { getDefaultUrl } = require("./config");
if (environment.requestHttp == "0") {
  // 获取默认请求地址
  environment.requestHttp = getDefaultUrl(environment.stage);
}

module.exports = {
  // 输出文件目录
  outputDir: environment.distName === "0" ? "dist" : environment.distName,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"));

    config.plugin("define").tap(args => {
      // 将参数传入项目中，可在main.js或者项目中的config,通过process.env 获取
      args[0]["process.env"].STAGE = JSON.stringify(environment.stage);
      args[0]["process.env"].URL = JSON.stringify(environment.requestHttp);
      args[0]["process.env"].PLATFORM = JSON.stringify(environment.platform);
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/_variable.scss";`
      },
      postcss: {
        plugins: [
          autoprefixer(),
          postcssPxToViewport({
            viewportWidth: 375,
            minPixelValue: 1
            // selectorBlackList: ["van"]
          })
        ]
      }
    }
  }
};
