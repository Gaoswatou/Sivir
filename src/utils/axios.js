import Axios from 'axios'
import { Toast, Notify } from 'ieach'
import { getHashParams } from './util.js'
let toast = null

const TIMEOUT = 10000
const RETRY = 1
const axios = Axios.create({
  timeout: TIMEOUT,
})

axios.defaults.baseURL = './'

//请求拦截器
axios.interceptors.request.use(
  function (config) {
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
    let { random_str, hash, current_time } = getHashParams()
    config.data = Object.assign({}, config.data, {
      random_str: random_str,
      hash: hash,
      current_time: current_time,
    })
    config.retry = config.retry || RETRY

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

//响应拦截器
axios.interceptors.response.use(
  function (res) {
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
  function (err) {
    console.log('err: ', err)
    if (err.code == 'ECONNABORTED' && err.message.indexOf('timeout') != -1) {
      // 对超时错误进行处理
      var config = err.config
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(err)

      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0

      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // Reject with the error
        setTimeout(() => {
          toast && toast.clear()
        }, 500)

        let protocol = window.location.protocol
        let host = window.location.hostname
        let port = window.location.port
        let URL = protocol + '//' + host + ':' + port + '/#/timeout'
        window.location.href = URL
        return Promise.reject(err)
      }

      // Increase the retry count
      config.__retryCount += 1

      // Create new promise to handle exponential backoff
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve()
        }, config.retryDelay || 1)
      })

      // Return the promise in which recalls axios to retry the request
      return backoff.then(function () {
        return axios(config)
      })
    } else {
      // 对其他响应错误做点什么
      return Promise.reject(err)
    }
  }
)
export default axios
