function getAppClient() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/wisedu/i) == 'wisedu') {
    return 'wisedu'
  } else if (ua.match(/wxwork/i) == 'wxwork') {
    return 'wxwork'
  } else if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return 'wx'
  } else {
    return 'h5'
  }
}
let env = getAppClient()
localStorage.setItem('env', env)
if (env === 'wisedu') {
  // 动态添加今日jssdk 资源文件
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://static.campushoy.com/openjs/cpdaily.js'
  document.getElementsByTagName('head')[0].appendChild(script)

  document.addEventListener('deviceready', () => {
    // 所有JSAPI须在此之后调用
    window._campus = campus
    campus.toggleNavbar({
      show: false, //展示与否，true-展示/false-不展示
      success: function () {},
      fail: function () {},
    })
  })
} else if (env === 'wxwork') {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
  document.getElementsByTagName('head')[0].appendChild(script)
  window._wx = wx
}
