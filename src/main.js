import Vue from "vue";
import App from "./App"; //入口
import router from "./router"; //路由
axios.defaults.withCredentials = true; //允许axios请求携带cookie等凭证
import VueAxios from "vue-axios"; //请求
import qs from "qs"; //qs库
import utilscommit from "./assets/js/utils.js"; //请求路径
import common from "./assets/js/common.js"; //基础包
import codeValue from "./assets/js/sessionstorageCodelvalue.js"; //获取代码表的方法包
import getMaps from "./assets/js/getMap.js"; //获取地图信息
import leaplogin from "./assets/js/login.js"; //leap登录/
import DatePicker from "vue2-datepicker"; //日期
import "vue2-datepicker/locale/zh-cn";
require("!vue-style-loader!css-loader!./assets/fonts/UniveConBol.css");
require("!vue-style-loader!css-loader!./assets/css/cropper.min.css");
require("!vue-style-loader!css-loader!./assets/css/base.css");
require("!vue-style-loader!css-loader!./assets/css/main.css");
require("!vue-style-loader!css-loader!../node_modules/vue2-datepicker/index.css");

//去除部分警告
Vue.config.productionTip = false;
//工具类
Vue.prototype.codeValue = codeValue;
Vue.prototype.utilscommit = utilscommit;
Vue.prototype.common = common;
Vue.prototype.getMaps = getMaps;
Vue.prototype.$qs = qs;
Vue.prototype.leaplogin = leaplogin;
Vue.prototype.$cryptoJS = CryptoJS; //加密

Vue.use(VueAxios, axios); //全局使用
Vue.prototype.$swal = swal;
Vue.use(DatePicker); //时间弹出层
Vue.use(VueLazyload, {
  error:
    "https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png",
  loading:
    "https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png"
}); //懒加载

Vue.config.productionTip = false;

Vue.filter("ellipsis", function(value, num) {
  //文本过滤，多余部分加省略号
  if (!value) return "";
  if (value.length > num) {
    return value.slice(0, num) + "...";
  }
  return value;
});

//文本过滤，多余部分加省略号
Vue.prototype.ellipsis = function(value, num) {
  if (!value) return "";
  if (value.length > num) {
    return value.slice(0, num) + "...";
  }
  return value;
};

Vue.filter("ellipsisNos", function(value, num) {
  //文本过滤
  if (!value) return "";
  if (value.length > num) {
    return value.slice(0, num);
  }
  return value;
});

Vue.filter("truncate", function(value, num, text) {
  //文本过滤
  if (!value) return "";
  if (value.length > num) {
    return value.slice(0, num) + text;
  }
  return value;
});

Vue.filter("addZero", (value = "") => {
  //数字补两个零
  if (!value) return "0.00";
  if (
    !["[object Number]", "[object String]"].includes(
      Object.prototype.toString.call(value)
    )
  ) {
    return value;
  }
  let num = value.toString().replace(/^(\d+)(\.\d+)?$/g, (big, ...args) => {
    let [a, b] = args;
    if (!b) b = ".";
    while (b.length <= 2) {
      b += "0";
    }
    return a + b;
  });
  return num;
});

// 邮箱脱敏
Vue.filter("emailDes", value => {
  let reg = new RegExp("(?<=.{2})[^@]+(?=.{2}@)", "g");
  return value.replace(reg, "*****");
});

// 数字补两个零
Vue.prototype.addZero = function(value) {
  if (!value) return "0.00";
  if (
    !["[object Number]", "[object String]"].includes(
      Object.prototype.toString.call(value)
    )
  ) {
    return value;
  }
  let num = value.toString().replace(/^(\d+)(\.\d+)?$/g, (big, ...args) => {
    let [a, b] = args;
    if (!b) b = ".";
    while (b.length <= 2) {
      b += "0";
    }
    return a + b;
  });
  return num;
};

Vue.prototype.date = function(value, type) {
  //截取前两位
  if (!value) return "";
  if (type == "MM-dd") {
    return value.substring(5, 10);
  } else if (type == "yyyy") {
    return value.substring(0, 4);
  } else {
    return value;
  }
};

Vue.prototype.truncate = function(value, num, text) {
  //处理字符串
  if (!value) return "";
  if (value.length > num) {
    return value.slice(0, num) + text;
  }
  return value;
};

Vue.prototype.firsttwo = function(str) {
  //截取前两位
  if (str && str.length > 2) str = str.substring(0, 2);
  return str;
};

Vue.prototype.exceptfirsttwo = function(str, length) {
  //保留前两位之后的
  if (str && str.length > length)
    str = str.substring(length, str.length) + "..."; //超过该长度，使用'...'代替
  if (str && str.length > 2) str = str.substring(2, str.length);
  return str;
};

// 过滤文本空字符、空格
Vue.prototype.ecellipsiSpace = function(text, num) {
  if (text) {
    var reg = /<[^<>]+>/g;
    text = text.replace(reg, "");
    text = text.replace(/&lt;[^&lt;&gt;]+&gt;/g, "");
    text = text.replace(/&nbsp;/gi, "");
    if (num && num > 0 && text.length > num) {
      text = text.substring(0, num) + "...";
    }
  }
  return text;
};

Vue.filter("protectEmail", function(value) {
  //隐藏邮箱中间数字
  return value.replace(value.substring(3, value.indexOf("@") - 1), "****");
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
