import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
import moment from 'moment-timezone'
import axios from 'axios'
import ieach from 'ieach'
import { Toast, Notify } from 'ieach'
import 'ieach/lib/index.css'
// import fastClick from 'fastclick'
// fastClick.attach(document.body)

import * as util from './utils/util.js'
//调试
import VConsole from 'vconsole'
new VConsole()

//开启toast多例模式
// Toast.allowMultiple();

// 将时区设置成亚洲上海
moment.tz.setDefault('Asia/Shanghai')
Vue.config.productionTip = false
let toast = null
axios.defaults.baseURL = process.env.URL

//请求拦截器
axios.interceptors.request.use(
  function(config) {
    //是否展示loading
    if (!config.hiddenLoad) {
      toast = Toast.loading({
        forbidClick: true,
        overlay: true,
        duration: 0,
      })
    }
    //设置token
    let token = window.localStorage.getItem('token')
    if (!config.withoutToken && token) {
      config.headers['X-Access-Token'] = token
    } else {
      config.headers['X-Access-Token'] &&
        delete config.headers['X-Access-Token']
    }
    //设置请求固定参数
    let { random_str, hash, current_time } = util.getHashParams()
    config.data = Object.assign({}, config.data, {
      random_str: random_str,
      hash: hash,
      current_time: current_time,
    })

    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

//响应拦截器
axios.interceptors.response.use(
  function(res) {
    // 对响应数据做点什么
    setTimeout(() => {
      toast && toast.clear()
    }, 500)

    if (res.data.code == '200' || res.data.code == '0') {
      return res.data.result
    } else {
      Notify({
        type: 'danger',
        message: res.data.message,
        duration: 1500,
      })
      return Promise.reject(res.data.message)
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

Vue.prototype.$moment = window._moment = moment
window._router = router
Vue.prototype.$axios = window._axios = axios
Vue.prototype.$baseUrl = axios.defaults.baseURL
window._util = Vue.prototype.$util = util

Vue.use(ieach)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
