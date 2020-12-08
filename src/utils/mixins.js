const wx = require('weixin-js-sdk')
window._wx = wx
export const JssdkMixins = {
  data() {
    return {
      Env: '',
    }
  },
  created() {
    this.$nextTick(() => {
      this.Env = localStorage.getItem('env')
      localStorage.getItem('env') === 'wisedu' && this.wiseduJssdkConfig()
      localStorage.getItem('env') === 'wxwork' && this.corWechatJssdkConfig()
      localStorage.getItem('env') === 'wx' && this.corWechatJssdkConfig()
    })
  },
  methods: {
    /**
     * 【今日校园】获取js-sdk config
     */
    wiseduJssdkConfig() {
      let jsApiList = [
        'scan',
        'geolocation',
        'goToSystemSetting',
        'checkPermissions',
        'launchApp',
      ]
      document.addEventListener('deviceready', () => {
        this.$axios({
          url: `common/js_api/wisedu/jssdk/config?url=${encodeURI(
            window.location.href
          )}`,
          method: 'get',
          data: {},
        }).then((res) => {
          console.log('js_api_config_res: ', res)
          window._campus.config({
            client_id: res.client_id, //必填，app的唯一标识
            timestamp: res.timestamp, //必填，生成签名的时间戳
            noncestr: res.noncestr, //必填，生成签名的随机串
            signature: res.signature, //必填，签名
            jsApiList: jsApiList, //必填，需要使用的JS接口列表，所有JS接口列表
            success: () => {
              this.$notify({
                type: 'success',
                message: '今日jsdk功能初始化成功',
                duration: 1000,
              })
            },
            fail: (ret) => {
              this.$notify({
                type: 'danger',
                message: '今日jssdk功能初始化失败',
                duration: 1000,
              })
              console.log('今日jssdk功能初始化失败:\n' + JSON.stringify(ret))
            },
          })
        })
      })
    },
    /**
     * 【企业微信/微信】获取js-sdk config
     */
    corWechatJssdkConfig() {
      let that = this
      let jsApiList = ['scanQRCode', 'getLocation']
      this.$axios({
        url: `common/js_api/wx_work/jssdk/config?url=${window.location.href}`,
        method: 'get',
        data: {},
      }).then((res) => {
        console.log('jssdk/config::res: ', JSON.stringify(res))
        console.log('wx: ', wx)

        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，企业微信的corpID
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: jsApiList, // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        })
        wx.ready(function () {
          console.log('wxready: ')

          that.$notify({
            type: 'success',
            message: '企微js功能初始化成功',
            duration: 1000,
          })
        })
        wx.error(function (res) {
          console.log('wxerror: ', res)
          that.$notify({
            type: 'danger',
            message: '初始化失败：' + JSON.stringify(res),
            duration: 2000,
          })
        })
      })
    },
  },
}
