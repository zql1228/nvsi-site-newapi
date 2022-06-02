import utils from "./utils";
const SM4 = bean => {
  if (null != bean) {
    const vueParam = {
      bean: JSON.stringify({
        encryData: utils.getSM4().encrypt(JSON.stringify(bean))
      })
    }; //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam);
  }
  //当加密的后的字符串中含有 from 字段统一替换成  @@fr@@
  if (bean && bean.indexOf("from") != -1) {
    bean = bean.replace(/from/g, "@@fr@@");
  }
  return bean;
};

const codeValueQueryFortisWeb = (name, bean, callbackAll) => {
  //name为 nvsi_albp0065证件类型表 nvsi_albp1009申诉状态表 nvsi_albe0005团体类型 nvsi_albx0014服务对象 nvsi_albx0024报名范围
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(
        utils.context() + "/restservices/webapi/codeValueQueryFortisWeb/query",
        bean,
        {
          headers: {
            ip: localStorage.getItem("ip")
          }
        }
      )
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const getNextAreaListFortisWeb = (name, bean, callbackAll) => {
  //查询区划 只查询缓存一级区划
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(
        utils.context() + "/restservices/webapi/getNextAreaListFortisWeb/query",
        bean,
        {
          headers: {
            ip: localStorage.getItem("ip")
          }
        }
      )
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const getServiceTypeList = (name, bean, callbackAll) => {
  //查询服务类别 name areaidServiceTypeList
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(
        utils.context() + "/restservices/webapi/getServiceTypeList/query",
        bean,
        {
          headers: {
            ip: localStorage.getItem("ip")
          }
        }
      )
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const queryTeamPageWeb = (name, bean, callbackAll) => {
  //查询推荐团体
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(
        utils.context() + "/restservices/webapi/queryTeamPageWeb/query",
        bean,
        {
          headers: {
            ip: localStorage.getItem("ip")
          }
        }
      )
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const getTeamTypeList = (name, bean, callbackAll) => {
  //查询 nameorgTypeInfo组织类型
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(
        utils.context() + "/restservices/webapi/getTeamTypeList/query",
        bean,
        {
          headers: {
            ip: localStorage.getItem("ip")
          }
        }
      )
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const getCodeValue = (name, bean, callbackAll) => {
  //查询 name nvsi_albe0042团体提供 nvsi_albe0043团体需要
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(utils.context() + "/restservices/webapi/getCodeValue/query", bean, {
        headers: {
          ip: localStorage.getItem("ip")
        }
      })
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const getIndustryCategoryList = (name, bean, callbackAll) => {
  //查询 name industryList所属行业
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(
        utils.context() + "/restservices/webapi/getIndustryCategoryList/query",
        bean,
        {
          headers: {
            ip: localStorage.getItem("ip")
          }
        }
      )
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const listLinksFortisWeb = (name, bean, callbackAll) => {
  //查询 name yqljNewList友情链接
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(
        utils.context() + "/restservices/webapi/listLinksFortisWeb/query",
        bean,
        {
          headers: {
            ip: localStorage.getItem("ip")
          }
        }
      )
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const insertWebPageViewFortisWeb = (name, bean, callbackAll) => {
  //查询 name siteweb在线人数
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(
        utils.context() +
          "/restservices/webapi/insertWebPageViewFortisWeb/query",
        bean,
        {
          headers: {
            ip: localStorage.getItem("ip")
          }
        }
      )
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data.sum));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const listSiteFrontWeb = (name, bean, callbackAll) => {
  //查询 name siteLevel1站点信息 site省级站点返回结果
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(
        utils.context() + "/restservices/webapi/listSiteFrontWeb/query",
        bean,
        {
          headers: {
            ip: localStorage.getItem("ip")
          }
        }
      )
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

const getNav = (name, bean, callbackAll) => {
  //查询 name columnsList栏目列表
  if (window.sessionStorage.getItem(name)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
  } else {
    bean = SM4(bean);
    Vue.axios
      .post(utils.context() + "/restservices/webapi/getNav/query", bean, {
        headers: {
          ip: localStorage.getItem("ip")
        }
      })
      .then(res => {
        window.sessionStorage.setItem(name, JSON.stringify(res.data.data));
        callbackAll(JSON.parse(window.sessionStorage.getItem(name)));
      });
  }
};

export default {
  codeValueQueryFortisWeb,
  getNextAreaListFortisWeb,
  getServiceTypeList,
  queryTeamPageWeb,
  getTeamTypeList,
  getCodeValue,
  getIndustryCategoryList,
  listLinksFortisWeb,
  insertWebPageViewFortisWeb,
  listSiteFrontWeb,
  getNav
};
