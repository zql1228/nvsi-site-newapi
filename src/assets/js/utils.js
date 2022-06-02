function context() {
  // var pathname = window.location.pathname;
  // var context = "/nvsidfapis/NVSI"; //开发环境
  // if (pathname != "/")
  //   context = pathname.substring(0, pathname.substr(1).indexOf("/") + 1); //生产环境
  // return context;
  return "/nvsidfapis/NVSIDF"; //测试
  // return "/nvsidfapis/NVSI";
}

//上传图片至服务器
const uploadImg = function(fileparam, areaid, callbackOne) {
  let config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  //添加请求头
  Vue.$http
    .post(
      context() + "/restservices/web/nvsi_insertUploadImg/query?str=" + areaid,
      fileparam,
      config
    ) //服务器
    .then(response => {
      callbackOne(response.data);
    });
};

//上传图片至服务器
const uploadIDPMImg = function(fileparam, callbackOne) {
  let config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  //添加请求头
  Vue.$http
    .post(
      context() + "/restservices/rest/idpm_insertUploadImg/query",
      fileparam,
      config
    ) //服务器
    .then(response => {
      callbackOne(response.data);
    });
};

//上传多张图片至服务器
const uploadImgs = function(fileparam, areaid, callbackOne) {
  let config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  //添加请求头
  Vue.$http
    .post(
      context() + "/restservices/web/nvsi_UploadImgs/query?str=" + areaid,
      fileparam,
      config
    ) //服务器
    .then(response => {
      callbackOne(response.data);
    });
};

//团体注册
const orgRegister = function(fileparam, areaid, callbackOne) {
  let config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  //添加请求头
  Vue.$http
    .post(
      context() +
        "/restservices/web/nvsi_insertOrgRegisterInfo/query?str=" +
        areaid,
      fileparam,
      config
    ) //服务器
    .then(response => {
      callbackOne(response.data);
    });
};

//发送请求 ----   hash模式发送异步请求-post
const request = function(name, bean, callbackAll) {
  if (null != bean) {
    const vueParam = {
      bean: JSON.stringify({
        encryData: getSM4().encrypt(JSON.stringify(bean))
      })
    }; //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam);
  }
  //当加密的后的字符串中含有 from 字段统一替换成  @@fr@@
  if (bean && bean.indexOf("from") != -1) {
    bean = bean.replace(/from/g, "@@fr@@");
  }
  Vue.axios
    .post(context() + "/restservices/web/" + name + "/query", bean, {
      headers: { ip: localStorage.getItem("ip") }
    })
    .then(res => {
      callbackAll(res.data);
    });
};

//图片上传
const uploadapi = function(bean, callbackAll) {
  //debugger;
  let config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  //添加请求头
  const b = new FormData();
  b.append("name", bean);
  Vue.axios
    .post(context() + "/restservices/webapi/uploadWeb/query", b, config)
    .then(res => {
      callbackAll(res.data);
    });
};

const requestapi = function(name, bean, callbackAll) {
  if (null != bean) {
    const vueParam = {
      bean: JSON.stringify({
        encryData: getSM4().encrypt(JSON.stringify(bean))
      })
    }; //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam);
  }
  //当加密的后的字符串中含有 from 字段统一替换成  @@fr@@
  if (bean && bean.indexOf("from") != -1) {
    bean = bean.replace(/from/g, "@@fr@@");
  }
  Vue.axios
    .post(context() + "/restservices/webapi/" + name + "/query", bean, {
      headers: { ip: localStorage.getItem("ip") }
    })
    .then(res => {
      callbackAll(res.data);
    });
};

//发送请求 ----   hash模式发送异步请求-get
const synchrequest = function(name, bean, callbackAll) {
  if (null != bean) {
    //const vueParam={ bean : JSON.stringify({encryData:encryptMD5(JSON.stringify(bean))})};//md5加密
    bean = {
      bean: JSON.stringify({
        encryData: getSM4().encrypt(JSON.stringify(bean))
      })
    }; //sm4_cdc加密
  }
  Vue.axios
    .get(context() + "/restservices/web/" + name + "/query", { params: bean })
    .then(res => {
      callbackAll(res.data);
    });
};

const getSM4 = function(key) {
  //SM4  .encrypt();//加密    .decrypt()//解密
  // 引用sm4包进行加密
  const SM4 = require("longrise-sm4"); //require("gm-crypt").sm4;new window.SM4(sm4Config);//
  if (!key) key = "p6fl4gN1brNfflKK"; //默认
  let sm4Config = {
    //配置sm4参数
    key: key, //key:十六进制的字符串
    mode: "cbc", // 加密的方式有两种，ecb（默认）和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
    iv: "longrise12345678", //cbc加密的向量iv
    cipherType: "text" // 默认base64
  };
  let sm4 = new SM4(sm4Config);
  return sm4; //加密
};

// 返回加密的参数
const paramsEncry = bean => {
  const vueParam = {
    bean: JSON.stringify({
      encryData: getSM4().encrypt(JSON.stringify(bean))
    })
  };
  bean = Vue.$qs.stringify(vueParam);
  return bean;
};

//发送请求 ----   hash模式发送请求
const request_onlyaxios = function(name, bean, callbackAll) {
  if (null != bean) {
    const vueParam = {
      bean: JSON.stringify({ encryData: encryptMD5(JSON.stringify(bean)) })
    };
    bean = Vue.$qs.stringify(vueParam);
  }
  Vue.axios
    .post(context() + "/restservices/web/" + name + "/query", bean)
    .then(res => {
      callbackAll(res.data);
    });
};

const encryptMD5 = function(word) {
  //加密
  var key = Vue.$cryptoJS.enc.Utf8.parse("y4FKxjmp5OqRaVSE");
  var srcs = Vue.$cryptoJS.enc.Utf8.parse(word);
  var encrypted = Vue.$cryptoJS.AES.encrypt(srcs, key, {
    mode: Vue.$cryptoJS.mode.ECB,
    padding: Vue.$cryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

const requestOther = function(name, callbacks) {
  //特殊请求方法
  Vue.axios
    .get(context() + "/" + name, {
      headers: { ip: localStorage.getItem("ip") }
    })
    .then(res => {
      if (res && res.data) {
        callbacks(res.data);
      } else {
        callbacks();
      }
    }); /* .catch(catchres=>{
    console.log("请求异常",catchres)
  }); */
};
//临时未加密的请求
/* const requestapiR = function(name, bean, callbackAll) {
  if (bean) {
    const vueParam = {
      bean: JSON.stringify(bean)
    };
    bean = Vue.$qs.stringify(vueParam);
  }
  Vue.axios
    .post(context() + "/restservices/webapi/" + name + "/query", bean)
    .then(res => {
      callbackAll(res.data);
    });
}; */

// 可以使用async/await阻塞的请求方式
const asyncUpload = bean => {
  let config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  //添加请求头
  const b = new FormData();
  b.append("cardphoto1", bean, bean.name);
  return Vue.axios.post(
    context() + "/restservices/webapi/uploadForAppeal/query",
    b,
    config
  );
};

/**
 * 可以使用async/await阻塞的请求
 * @param {*} name
 * @param {*} bean
 * @return {*} axios
 */
const asyncReq = (name, bean) => {
  if (bean) {
    const vueParam = {
      bean: JSON.stringify({
        encryData: getSM4().encrypt(JSON.stringify(bean))
      })
    }; //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam);
  }
  //当加密的后的字符串中含有 from 字段统一替换成  @@fr@@
  if (bean && bean.indexOf("from") != -1) {
    bean = bean.replace(/from/g, "@@fr@@");
  }
  return Vue.axios.post(
    context() + "/restservices/webapi/" + name + "/query",
    bean,
    {
      headers: { ip: localStorage.getItem("ip") }
    }
  );
};

const asyncReqH5 = (name, bean) => {
  if (bean) {
    const vueParam = {
      bean: JSON.stringify({
        encryData: getSM4().encrypt(JSON.stringify(bean))
      })
    }; //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam);
  }
  //当加密的后的字符串中含有 from 字段统一替换成  @@fr@@
  if (bean && bean.indexOf("from") != -1) {
    bean = bean.replace(/from/g, "@@fr@@");
  }
  return Vue.axios.post(
    context() + "/restservices/H5api/" + name + "/query",
    bean,
    {
      headers: { ip: localStorage.getItem("ip") }
    }
  );
};

export default {
  context,
  asyncUpload,
  uploadapi, //新图片上传
  uploadImg, //上传图片至服务器
  uploadImgs, //上传多张图片至服务器
  request, //获取请求数据（包含bean参数）
  requestapi,
  synchrequest, //get异步请求
  request_onlyaxios, //仅ajax下载
  orgRegister, //团体注册
  uploadIDPMImg, //测试总集的上传
  getSM4,
  requestOther,
  // requestapiR,
  paramsEncry,
  asyncReq,
  asyncReqH5
};
