<template>
  <div id="app">
    <!--页眉-->
    <header-body
      v-show="!(name === 'proShare') && !(name === 'groupShare')"
    ></header-body>
    <!--导航栏-->
    <navigation-bar
      v-show="!(name === 'proShare') && !(name === 'groupShare')"
    ></navigation-bar>
    <!-- 主体内容 -->
    <router-view />
    <rightTips />
    <!-- 页脚 -->
    <footer-body
      v-show="!(name === 'proShare') && !(name === 'groupShare')"
    ></footer-body>
  </div>
</template>

<script>
const HeaderBody = () => import("@/components/header.vue"); //页眉
const navigationBar = () => import("@/components/navigationBar1.vue"); //导航栏  //含 1 的是新版的导航，不含的是老版的导航
const FooterBody = () => import("@/components/footer.vue"); //页脚
const rightTips = () => import("@/components/rightTips.vue"); //页脚
export default {
  name: "App",
  components: {
    HeaderBody, //页眉
    navigationBar, //导航栏
    FooterBody, //页脚
    rightTips //右侧固定二维码展示
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  beforeCreate() {
    //Vue对象挂载到window下
    window.Vue = this;
  },
  data() {
    return {
      isRouterAlive: true,
      name: ""
    };
  },
  created() {
    this.name = this.$route.name;
    this.clearCookies(); //清缓存
    //安卓 苹果跳转到h5
    var userAgentInfo = navigator.userAgent;
    if (
      userAgentInfo.indexOf("Android") > 0 ||
      userAgentInfo.indexOf("iPhone") > 0
    ) {
      window.location.href = "https://chinavolunteer.mca.gov.cn/nvsidfh5/";
    }
  },
  watch: {
    $route(to, from) {
      this.name = to.name;
    }
  },
  methods: {
    reload() {
      //刷新页面
      this.isRouterAlive = false; //先关闭
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },
    clearCookies() {
      //清cookies
      // if (!this.common.getCookie("clear_c_all")) {
      //   this.utilscommit.requestOther(
      //     "SystemCheck?clearAll=" + new Date().getTime(),
      //     function(res) {
      //       Vue.common.addCookie("clear_c_all", new Date().getTime(), 1);
      //     }
      //   );
      // }
    }
  }
};
</script>

<style>
/*去掉百度地图水印的css*/
.BMap_cpyCtrl {
  display: none !important;
}
.anchorBL {
  display: none !important;
}
</style>
