<template>
  <div id="zykx">
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
                v-show="firstmune"
                @click="toUrl(firstmune.id, 2)"
                v-text="firstmune.albx6002"
              ></a>
              <a
                href="javascript:void(0);"
                v-if="secondmune"
                v-text="secondmune.albx6002"
              ></a>
            </div>
          </li>
        </ul>
        <ul class="row w">
          <!--主体-->
          <li class="col v-t g-16">
            <div class="wrapper">
              <div v-for="el in morevideoList" :key="el.id">
                <h2 class="subtitle">
                  {{ el.albx6002 }}
                  <a href="javascript:void(0);" @click="toVideo(el.id, 1)"
                    >更多</a
                  >
                </h2>
                <ul class="images images-large grid">
                  <li
                    class="grid-item g-8"
                    v-for="(elc, keyc) in el.newslist"
                    :key="keyc"
                  >
                    <a @click="toLink(elc)" href="javascript:void(0);">
                      <span
                        class="img"
                        :style="{
                          backgroundImage:
                            'url(' + common.changeImgsrc(elc.imgtitle) + ')'
                        }"
                      ></span>
                      <i class="oneline" v-text="elc.title"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <h2
                v-show="isshow == 1 && secondmune"
                class="subtitle"
                v-text="secondmune.albx6002"
              ></h2>
              <h2
                v-show="isshow == 1 && !secondmune"
                class="subtitle"
                v-text="firstmune.albx6002"
              ></h2>
              <ul class="images images-large grid" v-show="isshow == 1">
                <li
                  class="grid-item g-8"
                  v-for="el2 in videoList"
                  :key="el2.id"
                >
                  <!--  <a :attr="{href:'zxktinfo.html?newsid=' + el2.id,title:el2.title}"> -->
                  <a @click="toLink(el2)" href="javascript:void(0);">
                    <span
                      class="img"
                      :style="{
                        backgroundImage:
                          'url(' + common.changeImgsrc(el2.imgtitle) + ')'
                      }"
                    ></span>
                    <i class="oneline" v-text="el2.title"></i>
                  </a>
                </li>
              </ul>
              <paging
                v-show="isshow == 1"
                :pageCount="tolPage"
                :rangePage="pageSize"
                :initPage="pageNow"
                :totals="tolCount"
                :val="jumpPage"
                @pageEvent="pageEvent"
              >
              </paging>
            </div>
          </li>
          <!--右侧-->
          <zykxinfo-right></zykxinfo-right>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const ZykxinfoRight = () => import("@/components/newsinfo_right.vue"); //右侧
const paging = () => import("@/components/pagination.vue"); //分页

export default {
  name: "zykx",
  components: {
    ZykxinfoRight, //右侧
    paging //分页
  },
  data: function() {
    return {
      type: this.$route.params.type, //1=查询当前栏目，2=查询子栏目
      id: this.$route.params.id,
      firstmune: "", //一级栏目
      secondmune: "", //二级栏目
      morevideoList: [],
      videoList: [],
      isshow: 0, //是否展示单个列表
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1
    };
  },
  beforeMount() {
    this.getdate();
  },
  methods: {
    pageEvent: function(e) {
      //分页
      this.getMenuNews();
    },
    getdate: function() {
      let params = { menuid: this.id, areaid: "0" };
      this.utilscommit.request("nvsi_columnsByid", params, this.dateBack); //查询栏目名称
      if (this.type == 1) {
        //查询当前栏目信息
        this.getMenuNews();
      } else if (this.type == 2) {
        var zcwjParams = { menuid: this.id, areaid: "0" }; //四个图片列表
        this.utilscommit.request(
          "listChildColumns",
          zcwjParams,
          this.newsFourBack
        );
      }
    },
    dateBack(result) {
      if (result && result.data && result.data.firstmune) {
        this.firstmune = result.data.firstmune;
        if (result.data.secondmune) {
          //二级栏目
          this.secondmune = result.data.secondmune;
        }
      }
    },
    newsFourBack(data) {
      //四个图片列表
      if (data && data.data) {
        this.morevideoList = data.data; //四个图片列表结果
      } else if (this.type == 2) {
        //若子栏目查询无结果，则查询当前栏目
        this.getMenuNews();
      }
    },
    getMenuNews() {
      this.isshow = 1;
      var params2 = {
        newstype: this.id,
        pageSize: this.pageSize,
        pageNow: this.pageNow,
        areaid: "0"
      }; //相关类型的新闻
      this.utilscommit.request("nvsi_listNewsByType", params2, this.videoBack);
    },
    videoBack(result) {
      if (result && result.data) {
        this.videoList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.videoList = [];
        this.common.getTolData(this);
      }
    },
    toLink(el) {
      //跳转详情页
      if (el.jumptype == 1) {
        this.$router.push({
          name: "videoinfo",
          params: { id: el.id }
        });
      } else {
        // debugger
        window.open(el.videolink);
      }
    },
    toVideo: function(id, type) {
      //视频列表
      let url = this.$router.resolve({
        name: "video",
        params: { type: type, id: id }
      });
      window.open(url.href, "_blank");
    },
    toUrl(id, type) {
      this.$router.push({
        name: "video",
        params: { type: type, id: id }
      });
    }
  }
};
</script>
