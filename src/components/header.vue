<template>
  <div>
    <div class="js-top-bar hearder" id="header">
      <div class="mid row">
        <div class="col t-l">
          <p style="margin-top:40px">
            <img src="@/assets/img/logo.png" alt="" />
          </p>
        </div>
        <div class="col t-r v-m">
          <div class="login-box" style="margin-bottom: -22px !important;">
            <dl class="address">
              <dt class="ab" @click="showsSite">站点切换</dt>
              <dt
                v-show="isshow"
                class="ab"
                @click="showsSite(1)"
                style="color:#e60012;margin:0 10px 0 15px"
              >
                请登录
              </dt>
              <dt v-show="isshow" class="ab" @click="showsSite(2)">
                志愿者注册
              </dt>
              <span v-show="isshow" style="margin-left: 0px;"> | </span>
              <dt v-show="isshow" class="ab" @click="showsSite(3)">
                志愿队伍注册
              </dt>
            </dl>
            <div
              style="display: inline-block;margin-bottom: 10px;"
              v-html="logInfo"
            ></div>
            <!-- <img
              src="../assets/img/login-img1.png"
              style="margin-bottom: 13px;"
              alt=""
            /> -->
          </div>
          <div
            class="js-search"
            style="margin-top: 10px;overflow: visible;background: #fff;"
          >
            <div class="js-select">
              <b class="js-select-core" v-text="searchname"></b>
              <ul class="js-select-options">
                <li
                  v-for="el in searchlist"
                  :key="el.type"
                  :class="{ active: searchtype == el.type }"
                  @click="
                    searchname = el.name;
                    searchtype = el.type;
                  "
                  v-text="el.name"
                ></li>
              </ul>
            </div>
            <input type="text" v-model="searchtext" />
            <button
              style="border-radius: 0 99px 99px 0;cursor: pointer"
              @click="toSearch"
            ></button>
          </div>
        </div>
      </div>
    </div>
    <div class="h_banner">
      <img src="@/assets/img/header_bg.png" alt="" />
    </div>

    <!--站点切换弹出层-->
    <div class="mask docs" id="docsall">
      <div class="mask-info">
        <div class="mask-header row w">
          <div class="col v-m"><h2>请选择站点</h2></div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closeMaskz"
              ><img src="../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div
          v-if="selectType == 3"
          @click="closeMaskz"
          style="margin-top: 10px;"
        >
          <router-link
            :to="{ name: 'orgreg' }"
            style="width: 250px;margin: 0"
            class="v-m category__item"
            ><h3 class="headerh3" style="font-weight:normal">
              全国性组织/单位
            </h3></router-link
          >
        </div>
        <div
          v-if="selectType == 1"
          @click="closeMaskz"
          style="margin-top: 10px;"
        >
          <router-link
            :to="{ name: 'login', params: { type: 2 } }"
            style="width: 250px;margin: 0"
            class="v-m category__item"
            ><h3 class="headerh3" style="font-weight:normal">
              全国性组织/单位
            </h3></router-link
          >
        </div>
        <div style="margin-top: 10px;" v-if="selectType != 3">
          <h4 class="headerh3" style="font-size:17px">请选择行业</h4>
        </div>
        <div style="margin-top: 10px;" v-if="selectType != 3">
          <!-- class="category__content" 区域选择框会导致添加该类的样式添加 display:none 的样式导致不显示 -->
          <a
            href="javascript:void(0);"
            v-for="item in industrylist"
            :key="item.id"
            class="category__item"
          >
            <span
              @click="getsubsite(item.url, item.enname, 1)"
              v-text="item.cnname"
            ></span>
          </a>
        </div>
        <div style="margin-top: 10px;">
          <h4 class="headerh3" style="font-size:17px">请选择省份</h4>
        </div>
        <div style="margin-top: 10px;">
          <!--  class="category__content" -->
          <a
            href="javascript:void(0);"
            v-for="item in docsListFirst"
            :key="item.id"
            class="category__item"
          >
            <span
              @click="getsubsite(item.url, item.enname)"
              v-text="item.cnname"
            ></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hearder",
  data: function() {
    return {
      areaid: "",
      docsListFirst: [],
      nositelist: [],
      industrylist: [], //特殊站点，税务
      userInfo: {},
      logInfo: "",
      selectType: "", //选择类型，1=登录；2=志愿队伍注册
      isshow: true,
      //全局搜索
      searchtype: 1,
      searchname: "新闻文章",
      searchlist: [
        { type: 1, name: "新闻文章" },
        { type: 2, name: "志愿项目" },
        { type: 3, name: "志愿队伍" }
      ],
      searchtext: "" //输入框
    };
  },
  created() {
    window.Vueh = this; //Vue对象挂载到window下
    this.searchinit(this.$route.name);
    this.codeValue.listSiteFrontWeb(
      "siteLevel1",
      { level: "1" },
      this.callbackLevel1
    );
    // this.utilscommit.requestapi(
    //   "listSiteFrontWeb",
    //   { level: "1" },
    //   this.callbackLevel1
    // ); // 省级站点
    this.getUserInfo();
    window.loginOut = this.loginOut;
    // window.toUserCenter = this.toUserCenter;
  },
  methods: {
    //getDocsList()
    searchinit(to) {
      //初始化搜索栏
      let idx = 0;
      if (to == "project" || to == "projectInfo") {
        //志愿团体
        idx = 1;
      } else if (to == "group" || to == "groupInfo") {
        //志愿项目
        idx = 2;
      } else if (to == "projectOrgMap") {
        //志愿地图
        idx = Vues.type == 0 ? 1 : 2;
      } else if (to != "news") {
        this.searchtext = "";
      }
      this.searchtype = idx + 1;
      this.searchname = this.searchlist[idx].name;
    },
    callbackLevel1(data) {
      //总站站点信息
      if (data) {
        let site = data;
        this.docsListFirst = data.listremovechild; //省级站点
        this.nositelist = site.nositelist;
        this.industrylist = site.industrylist;
      }
    },
    getUserInfo() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      if (userInfo) {
        this.userInfo = userInfo;
        if (this.userInfo.albe0053 && this.userInfo.albe0053 == 1) {
          //判断当前队伍是否为全国性的
          var path = this.common.getCookie("mgpath");
          let loginstatus = window.sessionStorage.getItem("nvsi_loginstatus"); //登录状态
          if (path && loginstatus && loginstatus == 2) {
            //有cookie
            this.isshow = false;
            this.logInfo =
              '<span style="font-size: 14px;display: inline;">您好！</span>' +
              '<a href="' +
              path +
              '" target="_blank">' +
              this.userInfo.albp0052 +
              "</a>&nbsp;&nbsp;&nbsp;" +
              '<a href="javascript:void(0);" onclick="loginOut()">退出</a>';
            window.sessionStorage.setItem("nvsi_loginstatus", 2); //全国组织登录
            window.sessionStorage.setItem("nvsi_loginOutType", 1); //登录状态
          } else {
            //无cookie
            this.loginOut();
          }
        }
      } else {
        this.userInfo = "";
      }
    },
    loginOut: function() {
      /* this.utilscommit.request("nvsi_loginOut", null, this.loginOutCheck);
    },
    loginOutCheck: function(result) {
      if (result && result.code == 0) { */
      //退出成功
      window.sessionStorage.removeItem("nvsi_loginstatus");
      if (window.sessionStorage.getItem("nvsi_loginOutType")) {
        window.sessionStorage.removeItem("nvsi_loginOutType");
        this.$router.push({ name: "login", params: { type: 2 } });
      }
      this.isshow = true;
      this.logInfo = "";
      // }
    },
    /*  toUserCenter: function() {
      if (this.userInfo) {
        if (this.userInfo.albp0056 == 1) {
          this.$router.push({ name: "usercenter" });
        } else {
          const path = this.common.getCookie("mgpath");
          if (path) {
            window.open(path);
          } else {
            this.loginOut();
          }
        }
      } else {
        this.$swal("登录信息已过期，是否重新登录？", {
          buttons: ["取消", "确定"]
        }).then(function(value) {
          if (value) {
            Vue.$router.push({
              name: "login",
              params: { type: 2 }
            });
          } else {
            Vue.$router.go(0); //刷新页面
          }
        });
      }
    }, */
    showsSite(type) {
      //打开切换站点
      this.selectType = type;
      $("#docsall").addClass("active");
    },
    closeMaskz() {
      //关闭切换站点
      $("#docsall").removeClass("active");
    },
    getsubsite(url, enname, type) {
      //切换站点  type==1为行业站点。默认跳转志愿项目
      if (window.location.host == "wuhan.yxybb.com") {
        url = "https://wuhan.yxybb.com";
      } else if (url && url.lastIndexOf("/") == url.length - 1) {
        url = url.substr(0, url.length - 1);
      }
      if (enname == "shanghai") {
        //上海跳转外部子站
        window.open("http://www.shcvs.cn/gysh_cm.portal/index.html");
      } else if (enname == "beijing") {
        //北京-单独跳转
        window.open(url + "/subsite/beijing/home");
      } else if (this.selectType == 1) {
        //跳转登录页面
        window.open(url + "/subsite/" + enname + "/login/2");
      } else if (this.selectType == 2) {
        //跳转注册页面
        window.open(url + "/subsite/" + enname + "/volreg");
      } else if (this.selectType == 3 && enname != "shuishou") {
        //跳转团体注册页面
        window.open(url + "/subsite/" + enname + "/orgreg");
      } else {
        //首页
        let path = "home";
        if (type) {
          path = "project";
        }
        window.open(url + "/subsite/" + enname + "/" + path);
      }
    },
    toSearch() {
      //全局搜索
      if (this.searchtext) {
        let routename = this.$route.name;
        if (this.searchtype == 2) {
          //项目
          if (routename == "project") {
            //当前页面
            Vues.projectName = this.searchtext; //全局搜索
            Vues.getProjectList();
          } else {
            this.$router.push({
              name: "project"
            });
          }
        } else if (this.searchtype == 3) {
          //队伍
          if (routename == "group") {
            //当前页面
            Vues.groupName = this.searchtext; //全局搜索
            Vues.getOrgList();
          } else {
            this.$router.push({
              name: "group"
            });
          }
        } else {
          //新闻文章
          this.$router.push({
            name: "news",
            params: { type: 5, id: this.searchtext }
          });
        }
      } else {
        this.$swal("请输入搜索关键字", { buttons: "确定" });
      }
    }
  },
  watch: {
    "$route.name"(to, from) {
      this.searchinit(to);
    }
  }
};
</script>
