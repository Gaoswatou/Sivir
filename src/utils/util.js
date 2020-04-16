import md5 from "js-md5";
import moment from "moment-timezone";
// 将时区设置成亚洲上海
moment.tz.setDefault("Asia/Shanghai");

/**
 * 日期格式转化为时间戳
 */
function getUnixTime(dateStr) {
  var newstr = dateStr.replace(/-/g, "/");
  var date = new Date(newstr);
  var time_str = date.getTime().toString();
  return time_str.substr(0, 10);
}
/**
 * 获取指定长度的随机字符串
 */
function getRandomStr(len) {
  len = len || 32;
  var $chars =
    "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var str = "";
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}
/**
 * 获取请求参数中的时间戳、salt、hash
 */
export const getHashParams = () => {
  let current_time = getUnixTime(
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  );
  let random_str = getRandomStr(12);
  let salt = "luqixiuzijiayougan";
  let hash = md5(current_time + random_str + salt);
  return {
    current_time,
    random_str,
    hash
  };
};
/**
 *
 * 下载canvas图片
 */
export const downLoadCanvas = (url, name = "image") => {
  var oA = document.createElement("a");
  oA.download = name; // 设置下载的文件名，默认是'下载'
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
};
/**
 * 根据状态获取对应的css class名称
 */
export const getStatusClass = status => {
  let classResult = "";
  switch (status) {
    case 1:
      classResult = "green";
      break;
    case 2:
      classResult = "yellow";
      break;
    case 3:
      classResult = "red";
      break;

    default:
      break;
  }
  return classResult;
};
