<template>
  <div id="zykx">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <router-link tag="a" :to="{ name: 'home' }">首页</router-link>
              <a
                href="javascript:void(0);"
                v-if="firstmune"
                @click="toNews(2, firstmune.id)"
                v-text="firstmune.albx6002"
              ></a>
              <a
                v-if="secondmune"
                href="javascript:void(0);"
                v-text="secondmune.albx6002"
              ></a>
            </div>
          </li>
        </ul>
        <ul class="row w">
          <!--主体-->
          <li class="col v-t g-16">
            <div class="wrapper" :style="heightObj">
              <div v-show="showtype == 3">
                <div v-for="el in newsfourList" :key="el.id">
                  <h2 class="subtitle">
                    {{ el.albx6002 }}
                    <a href="javascript:void(0);" @click="toNews(1, el.id)"
                      >更多</a
                    >
                  </h2>
                  <ul class="list list-small" v-show="type < 3">
                    <li
                      class="row w"
                      v-for="news in el.newslist"
                      :key="news.id"
                    >
                      <a
                        href="javascript:void(0);"
                        class="col v-m oneline"
                        :title="news.title"
                        @click="getNewsInfo(news.id)"
                      >
                        <span class="istops" v-if="news.istop == 1">置顶</span>
                        {{ news.title | ellipsis(36) }}
                      </a>
                      <span class="col v-m t-r">
                        {{ news.entrytime | ellipsisNos(10) }}
                      </span>
                    </li>
                  </ul>
                  <ul class="images images-large grid" v-show="type >= 3">
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
              </div>
              <h2
                v-show="showtype != 3"
                class="subtitle"
                v-text="newstitle"
              ></h2>
              <div v-show="showtype == 4 && type != 5" class="wrapper-tab">
                <a
                  href="javascript:void(0);"
                  v-for="(el, index) in newsfourList"
                  :key="index"
                  v-text="el.albx6002"
                  :class="{ active: id === el.id }"
                  @click="toNowColumns(el.id)"
                ></a>
              </div>
              <ul
                v-show="showtype != 3 && (type < 3 || type == 5)"
                class="list list-bold"
              >
                <li class="row w" v-for="(item, key) in newsList" :key="key">
                  <a
                    href="javascript:void(0);"
                    class="col v-m oneline"
                    :title="item.title"
                    @click="getNewsInfo(item.id)"
                  >
                    <span class="istops" v-if="item.istop == 1">置顶</span>
                    {{ item.title | ellipsis(36) }}
                  </a>
                  <span class="col v-m t-r">
                    {{ item.entrytime | ellipsisNos(10) }}
                  </span>
                </li>
              </ul>
              <ul
                class="images images-large grid"
                v-show="showtype != 3 && (type == 3 || type == 4)"
              >
                <li
                  class="grid-item g-8"
                  v-for="(elc, keyc) in newsList"
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
              <paging
                v-show="showtype != 3"
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
          <zykxinfo-right
            :spliceNum="spliceNum"
            :picIsShow="picIsShow"
          ></zykxinfo-right>
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
      id: this.$route.params.id,
      type: this.$route.params.type, //1=查询当前栏目，2=查询子栏目,0=新闻头条 ，3=查询子栏目视频，4=查询当前视频,5=查询全局搜索列表
      showtype: 0, //1=单个新闻的类型；2=多个新闻的类型且无子栏目；3=多个新闻的有子栏目,但是不超过4个子栏目；4=新闻超过4个子栏目   注意：分页目前只有2和4类型的才有
      newsfourList: [],
      newsList: [],
      // menulist:[],//栏目名称
      newstitle: "", //新闻栏目名称
      firstmune: "", //一级栏目
      secondmune: "", //二级栏目
      //show:2,//展示栏目 1=当前栏目，2=四个子栏目以内，3=超过四个子栏目
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 15, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1,
      heightObj: {}, // 新闻内容区高度
      spliceNum: 2, // 图片数组截取数量
      picIsShow: true // 是否显示右侧图片
    };
  },
  beforeMount() {
    this.getdate();
  },
  methods: {
    pageEvent: function(e) {
      //分页
      this.getNewList();
    },
    getdate: function() {
      if (this.type == 0) {
        this.utilscommit.request(
          "nvsi_gettopNewsList",
          { pageSize: this.pageSize, pageNow: this.pageNow },
          this.topNewsBack
        );
      } else if (this.type == 1 || this.type == 4) {
        //当前栏目下新闻
        this.getNewList();
      } else if (this.type == 5) {
        //查询全局搜索列表
        this.secondmune = { albx6002: this.id };
        this.newstitle = this.id;
        this.showtype = 0;
        this.utilscommit.request(
          "nvsi_searchNewsQuery",
          {
            areaid: 0,
            name: this.id,
            pageSize: this.pageSize,
            pageNow: this.pageNow
          },
          this.searchNewsBack
        );
      } else {
        //子栏目新闻
        let params = { menuid: this.id };
        this.utilscommit.request("nvsi_columnsByid", params, this.newsBack);
      }
    },
    topNewsBack(result) {
      this.newstitle = "志愿头条";
      this.firstmune = { albx6002: this.newstitle };
      if (result && result.data) {
        this.newsList = result.data;
        this.tolCount = result.datacount;
        this.tolPage = result.pagecount;
        // this.common.getTolData(this,result);
      } else {
        this.newsList = [];
        this.tolCount = 0;
        this.tolPage = 0;
        // this.common.getTolData(this);
      }
    },
    newsBack(result) {
      if (result && result.data) {
        let news = result.data;
        this.showtype = news.type;
        if (this.showtype == 2) {
          //2=多个类型无子栏目
          this.newsList = news.newslist;
          this.tolCount = news.datacount;
          this.tolPage = news.pagecount;
          // this.common.getTolData(this,news);
          this.heightObj = {
            height: "845px"
          };
          this.spliceNum = 2;
          this.picIsShow = true;
        } else if (this.showtype == 3) {
          //3=多个新闻的有子栏目,但是不超过4个子栏目
          this.newsfourList = news.menulist;
          if (news.albx6002 == "研究培训") {
            this.spliceNum = 1;
            this.picIsShow = true;
            this.heightObj = {
              height: "608px"
            };
          } else {
            this.spliceNum = 4;
            this.picIsShow = true;
            this.heightObj = {};
          }
        } else if (this.showtype == 4) {
          //4=新闻超过4个子栏目
          this.newsfourList = news.menulist; //栏目名称
          this.newsList = news.menulist[0].newslist;
          this.id = this.newsfourList[0].id;
          this.tolCount = news.datacount;
          this.tolPage = news.pagecount;
          // this.common.getTolData(this,news);
        }
        this.secondmune = news;
        this.newstitle = news.albx6002;
      } else {
        if (this.showtype == 2 || this.showtype == 4) {
          //2=多个类型无子栏目，4=新闻超过4个子栏目
          this.newsList = [];
          this.tolCount = 0;
          this.tolPage = 0;
          // this.common.getTolData(this);
        }
      }
    },
    getNewList() {
      //查询当前栏目新闻
      var params2 = {
        menuid: this.id,
        pageSize: this.pageSize,
        pageNow: this.pageNow
      }; //相关类型的新闻
      this.utilscommit.request("nvsi_newsByid", params2, this.menuNewsBack);
    },
    menuNewsBack(result) {
      if (result && result.data) {
        let news = result.data;
        if (news.menulist && this.type != 2) {
          //有栏目
          let lastmenu = news.menulist[0];
          if (news.menulist.length == 2) {
            this.firstmune = news.menulist[0];
            lastmenu = news.menulist[1];
          }
          this.secondmune = lastmenu;
          this.newstitle = lastmenu.albx6002;
        }
        this.newsList = news.newslist;
        this.tolCount = result.datacount;
        this.tolPage = result.pagecount;
        // this.common.getTolData(this,result);
      } else {
        this.newsList = [];
        this.tolCount = 0;
        this.tolPage = 0;
        // this.common.getTolData(this);
      }
    },
    searchNewsBack(data) {
      //全局搜索结果
      if (data && data.data) {
        this.newsList = data.data;
        this.tolCount = data.datacount;
        this.tolPage = data.pagecount;
        // this.common.getTolData(this,data);
      } else {
        this.newsList = [];
        this.tolCount = 0;
        this.tolPage = 0;
        // this.common.getTolData(this);
      }
    },
    toNowColumns(id) {
      //跳转其他新闻栏目
      this.id = id;
      this.getNewList();
    },
    getNewsInfo(newsid) {
      //跳转新起一页
      let newsUrl = this.$router.resolve({ path: `/newsinfo/${1}/${newsid}` });
      window.open(newsUrl.href, "_blank");
    },
    toNews: function(type, newsid) {
      //单个新闻列表
      if (newsid) {
        type = this.type == 3 ? 4 : this.type == 4 ? 3 : type; //视频
        let url = this.$router.resolve({ path: `/news/${type}/${newsid}` });
        window.open(url.href, "_blank");
      }
    },
    toLink(el) {
      if (el.jumptype == 1) {
        this.$router.push({
          name: "videoinfo",
          params: { id: el.id }
        });
      } else {
        window.open(el.videolink);
      }
    }
  },
  watch: {
    "$route.params"(to, from) {
      //监听路由是否变化
      if (to != from) {
        this.firstmune = "";
        this.secondmune = "";
        this.type = to.type;
        this.id = to.id;
        this.newsfourList = [];
        this.newsList = [];
        this.newstitle = ""; //新闻栏目名称
        // this.common.getTolData(this);
        this.tolCount = 0;
        this.tolPage = 0;
        this.pageSize = 15; //每页条数
        this.pageNow = 1; //当前页
        this.getdate();
        if (this.type != 5) Vueh.searchtext = "";
        Vueh.searchinit(this.$route.name);
      }
    }
  }
};
</script>
<style scoped>
/* .col.v-t.g-16 .wrapper {
  height: 845px;
} */

.wrapper .list.list-bold li {
  padding: 15px 16px 15px 16px;
}
</style>
