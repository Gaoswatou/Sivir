import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
import moment from 'moment-timezone'
import axios from './utils/axios.js'
import ieach from 'ieach'
import 'ieach/lib/index.css'
// import fastClick from 'fastclick'
// fastClick.attach(document.body)

import * as util from './utils/util.js'
//调试
import VConsole from 'vconsole'
new VConsole()

// 将时区设置成亚洲上海
moment.tz.setDefault('Asia/Shanghai')
Vue.config.productionTip = false

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
