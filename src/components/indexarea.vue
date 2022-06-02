<template>
  <div class="mask docs" id="idexarea" :class="{ active: type != 0 }">
    <div class="mask-info">
      <div class="mask-header row w">
        <div class="col v-m"><h2>请选择省份</h2></div>
        <div class="col v-m t-r">
          <a href="javascript:void(0);" class="mask-close" @click="hideDocsList"
            ><img src="@/assets/img/close.png" alt=""
          /></a>
        </div>
      </div>
      <div v-if="type == 2 || type == 4" style="margin-top: 10px;">
        <router-link
          :to="{ name: 'orgreg' }"
          style="width: 250px;margin: 0"
          class="v-m category__item"
          ><h3 class="headerh3">全国性组织/单位</h3>
        </router-link>
      </div>
      <div v-if="type == 3" style="margin-top: 10px;">
        <router-link
          :to="{ name: 'login', params: { type: 1 } }"
          style="width: 250px;margin: 0"
          class="v-m category__item"
          ><h3 class="headerh3">民政部</h3>
        </router-link>
      </div>
      <div style="margin-top: 10px;" v-if="type != 2">
        <h4 class="headerh3">请选择行业</h4>
      </div>
      <div class="category__content" style="margin-top: 10px;" v-if="type != 2">
        <a
          href="javascript:void(0);"
          v-for="item in industrylist"
          :key="item.id"
          class="category__item"
        >
          <span @click="getsubsite(item.url, item.enname, null, 1)" v-cloak>{{
            item.cnname
          }}</span>
        </a>
      </div>
      <div style="margin-top: 10px;">
        <h4 class="headerh3">请选择省份</h4>
      </div>
      <div class="category__content" style="margin-top: 10px;">
        <a
          v-for="el in nositelist"
          @click="getsubsite(el.url, el.enname, el.mzurl)"
          :key="el.id"
          href="javascript:void(0);"
          class="category__item"
        >
          <span v-cloak>{{ el.cnname }}</span>
        </a>
        <a
          v-for="el in firstDocsList"
          @click="getsubsite(el.url, el.enname, el.mzurl)"
          :key="el.id"
          href="javascript:void(0);"
          class="category__item"
          ><!-- .filter((obj)=>obj.catelevel==1) -->
          <span v-cloak>{{ el.cnname }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "idexarea",
  data: function() {
    return {
      nositelist: [], //无子站点列表
      firstDocsList: [], //有站点列表
      industrylist: [], //特殊站点，税务
      type: 0 //1=志愿者 2=队伍  3=管理部门
    };
  },
  created() {
    // this.utilscommit.request("nvsi_listWebDocs", null, this.callbackLevel1); //查询省级站点
    this.codeValue.listSiteFrontWeb("siteLevel1", null, this.callbackLevel1);
    // this.utilscommit.requestapi("listSiteFrontWeb", null, this.callbackLevel1);
  },
  methods: {
    callbackLevel1(data) {
      //省级站点返回结果
      if (data) {
        this.firstDocsList = data.listremovechild;
        this.industrylist = data.industrylist;
      }
    },
    showPage(type) {
      //供父元素调用切换弹出框类型
      this.type = type;
    },
    hideDocsList() {
      //关闭弹出层
      this.type = 0;
    },
    getsubsite(url, enname, mzurl, type) {
      //切换站点
      //跳转路径url处理
      if (window.location.host == "wuhan.yxybb.com") {
        url = "https://wuhan.yxybb.com";
      } else if (url && url.lastIndexOf("/") == url.length - 1) {
        url = url.substr(0, url.length - 1);
      }

      if (this.type == 3) {
        //管理员登录
        if (mzurl) {
          //外部链接
          window.open(mzurl);
        } else {
          //本地管理员登录
          this.$router.push({ name: "login", params: { type: 1 } });
        }
      } else if (this.type != 3 && enname == "shanghai") {
        //上海---外部子站
        window.open("http://www.shcvs.cn/gysh_cm.portal/index.html");
      } else if (this.type != 3 && enname == "beijing") {
        //北京-单独跳转
        window.open(url + "/subsite/beijing/home");
      } else if (this.type == 1) {
        //跳转注册页面
        window.open(url + "/subsite/" + enname + "/volreg");
      } else if (this.type == 2 && enname != "shuishou") {
        //跳转团体注册页面
        window.open(url + "/subsite/" + enname + "/orgreg");
      } else {
        //内部子站
        let path = "home";
        if (type) path = "project";
        window.open(url + "/subsite/" + enname + "/" + path);
      }
    }
  }
};
</script>
