const config = {
  // 开发环境网络请求地址
  dev: 'http://10.168.1.101:8080/config/',
  // 测试环境网络请求地址
  test: 'http://172.43.183.157:8080/config/',
  // 正式环境网络请求地址
  prod: 'https://micro-app.xmmc.edu.cn/config/',
}

const getDefaultUrl = (stage) => {
  return stage ? config[stage] : config['prod']
}
module.exports = {
  getDefaultUrl,
}
