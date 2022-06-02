<template>
  <div id="news">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);"
                ><router-link tag="a" :to="{ name: 'home' }"
                  >首页</router-link
                ></a
              >
              <a
                href="javascript:void(0);"
                v-if="firstmune"
                @click="toUrl(firstmune)"
                v-text="firstmune.albx6002"
              ></a>
              <a
                href="javascript:void(0);"
                v-if="secondmune"
                @click="toUrl(secondmune)"
                v-text="secondmune.albx6002"
              ></a>
            </div>
          </li>
        </ul>
        <ul class="row w">
          <li class="col v-t g-16">
            <div class="detail wrapper">
              <h2 style="text-align: center;" v-text="newsinfo.title"></h2>
              <div class="detail-tips" style="text-align: center;">
                <span v-if="newsinfo.entrytime"
                  >日期：
                  <span>{{ newsinfo.entrytime | ellipsisNos(10) }}</span>
                </span>
                <span v-if="newsinfo.newsfrom"
                  >来源： <span>{{ newsinfo.newsfrom }}</span></span
                >
              </div>
              <div
                class="detail-content"
                style="word-wrap: break-word;word-break: break-all;"
                v-html="newsinfo.newscontent"
              ></div>
              <div v-if="newsinfo.attachments" class="attach">
                <h5>
                  附件
                  <a href="javascript:void(0);" @click="downloadFiles"
                    >全部下载</a
                  >
                </h5>
                <ul>
                  <li
                    v-for="(el, index) in newsinfo.files"
                    :key="index"
                    class="attach-li"
                  >
                    <span class="attach-title">
                      <i style="font-size: 16px;">{{ el.title + el.type }}</i>
                      <i style="display: block;color: #999;font-size: 14px;">{{
                        Math.ceil(el.size / 1024) + "k"
                      }}</i>
                    </span>
                    <span class="attach-button">
                      <a
                        href="javascript:void(0);"
                        @click="downloadFile(context + el.filepath)"
                        class="attach-down"
                        >下载</a
                      >
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <!--右侧-->
          <news-right></news-right>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const NewsRight = () => import("@/components/newsinfo_right.vue"); //右侧

export default {
  name: "news",
  components: {
    NewsRight //右侧
  },
  data: function() {
    return {
      context: this.common.getUrl(),
      id: this.$route.params.id,
      type: this.$route.params.type, //1=新闻id，2=栏目id
      newsinfo: {},
      firstmune: "", //一级栏目
      secondmune: "" //二级栏目
    };
  },
  beforeMount() {
    this.getdata();
  },
  methods: {
    getdata() {
      if (this.type == 1) {
        this.utilscommit.request(
          "nvsi_getNewsDetails",
          { id: this.id, areaid: "0" },
          this.callback_newsinfo
        ); //新闻详情
      } else if (this.type == 2) {
        this.utilscommit.request(
          "nvsi_columnsByid",
          { menuid: this.id },
          this.menuBack
        ); //栏目详情
      }
    },
    /* getMenu(menuid){//获取栏目信息
       let params1={ menuid:menuid,areaid:'0'};
       this.utilscommit.request("nvsi_columnsByid",params1,this.menuBack);//查询栏目信息
    }, */
    menuBack(result) {
      if (result && result.data) {
        this.secondmune = result.data;
        this.newsinfo = this.secondmune.newslist[0];
      }
      /* if (result && result.data && result.data.firstmune && result.data.firstmune.albx6002!="首页"){
          this.firstmune=result.data.firstmune;
          if(result.data.secondmune && result.data.secondmune.albx6002!="首页"){//二级栏目
            this.secondmune=result.data.secondmune;
          }
       } */
    },
    callback_newsinfo(data) {
      console.log(data);
      if (data && data.data) {
        let news = data.data;
        news.newscontent = news.newscontent.replace(
          /@serveruirl@LEAP/g,
          this.common.getUrl() + "/LEAP"
        );
        this.newsinfo = news;
        this.firstmune = news.menulist[0];
        if (news.menulist[1]) this.secondmune = news.menulist[1];
        // this.getMenu(this.newsinfo.newstype);
      }
    },
    toUrl(el) {
      let type = 2;
      if (el.albx6006 == 3 && el.albx6002 == "志愿头条") {
        //志愿头条
        type = 0;
      } else if (el.albx6003 == 2) {
        //二级栏目
        type = 1;
      }
      this.$router.push({
        name: "news",
        params: { type: type, id: el.id }
      });
    },
    downloadFiles: function() {
      //全部下载
      var files = this.newsinfo.files;
      for (var i = 0; i < files.length; i++) {
        this.down(this.context + files[i].filepath);
      }
    },
    downloadFile: function(path) {
      //下载
      this.down(path);
    },
    down: function(path) {
      if (this.isIE()) {
        // IE
        window.open(path, "_blank");
      } else {
        var a = document.createElement("a");
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", false, false);
        a.href = path;
        a.download = "";
        a.dispatchEvent(e);
      }
    },
    isIE: function() {
      return !!window.ActiveXObject || "ActiveXObject" in window;
    }
  }
};
</script>

<style>
.detail-content p span {
  display: inline;
}
.detail-content span,
.detail-content i,
.detail-content b {
  display: inline;
}
</style>
