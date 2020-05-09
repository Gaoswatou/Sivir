import md5 from 'js-md5'
import moment from 'moment-timezone'
// 将时区设置成亚洲上海
moment.tz.setDefault('Asia/Shanghai')

/**
 * 引入图片压缩类
 */
import { compressImage } from './CompressImageUtils'
export const compressImageFunc = compressImage

/**
 * 日期格式转化为时间戳
 */
function getUnixTime(dateStr) {
  var newstr = dateStr.replace(/-/g, '/')
  var date = new Date(newstr)
  var time_str = date.getTime().toString()
  return time_str.substr(0, 10)
}
/**
 * 获取指定长度的随机字符串
 */
function getRandomStr(len) {
  len = len || 32
  var $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length
  var str = ''
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}
/**
 * 获取请求参数中的时间戳、salt、hash
 */
export const getHashParams = () => {
  let current_time = getUnixTime(
    moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  )
  let random_str = getRandomStr(12)
  let salt = 'luqixiuzijiayougan'
  let hash = md5(current_time + random_str + salt)
  return {
    current_time,
    random_str,
    hash,
  }
}
/**
 *
 * 下载canvas图片
 */
export const downLoadCanvas = (url, name = 'image') => {
  var oA = document.createElement('a')
  oA.download = name // 设置下载的文件名，默认是'下载'
  oA.href = url
  document.body.appendChild(oA)
  oA.click()
  oA.remove() // 下载之后把创建的元素删除
}
/**
 * 根据状态获取对应的css class名称
 */
export const getStatusClass = (status) => {
  let classResult = ''
  switch (status) {
    case 1:
      classResult = 'green'
      break
    case 2:
      classResult = 'yellow'
      break
    case 3:
      classResult = 'red'
      break

    default:
      break
  }
  return classResult
}

/**
 * 获取随机验证码
 */
export const getRandomVerCode = (codeLength) => {
  // 所需随机抽取的样本数组
  let nums = new Array(
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    'A',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
  )
  // 初始化 拼接字符串
  let str = ''
  let oriStr = ''
  //颜色需要的数组元素
  let nums1 = new Array(
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
  )
  let n1 = ''
  //字号需要的数组元素
  let nums2 = new Array('3', '4', '5', '6')
  let n2
  for (let i = 0; i < codeLength; i++) {
    //遍历拼接颜色色值 eg 000000
    for (let j = 0; j < 6; j++) {
      let k = Math.floor(Math.random() * 100) % 16
      n1 = n1 + nums1[k]
    }
    //每次生成一个随机的字号
    let o = Math.floor(Math.random() * 100) % 8
    n2 = nums2[o]
    //每次生成一个0 - 61 之间的 number 作为随机获取验证码的下标
    let p = Math.floor(Math.random() * 1000) % 62
    //拼接验证码  随机颜色 随机字号 随机抽取大小写字母和数字
    str += "<font color='#" + n1 + "' size='" + n2 + "'>" + nums[p] + '</font>'
    oriStr += nums[p]
  }
  return { oriStr, str }
}
/**
 * 根据value返回text （字典数据处理）
 */
export const getSelections = (arr, val) => {
  let res = arr.find((el) => {
    return el.value == val
  })
  return res.title
}
