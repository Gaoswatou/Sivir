const config = {
  // 开发环境网络请求地址
  dev: "http://10.168.1.101:8080/wts_server/",
  // 测试环境网络请求地址
  test: "https://micro-app-test.xmmc.edu.cn/wts_server/",
  // 正式环境网络请求地址
  prod: "https://micro-app.xmmc.edu.cn/wts_server/",
};

const getDefaultUrl = (stage) => {
  return stage ? config[stage] : config["prod"];
};
module.exports = {
  getDefaultUrl,
};
