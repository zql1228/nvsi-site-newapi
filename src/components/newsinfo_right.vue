<template>
  <li class="col v-t g-8 pl-40" id="zykxinfoRight">
    <div class="wrapper">
      <h2 class="subtitle subtitle-noline">热点新闻</h2>
      <ul class="list list-mini">
        <li class="row w" v-for="(item, index) in hotNewsList" :key="index">
          <a
            href="javascript:void(0);"
            class="col v-m oneline full"
            @click="getNewsInfo(item.id)"
          >
            <span class="istops" v-if="item.istop == 1">置顶</span>
            {{ item.title | ellipsis(29) }}
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper" v-show="picIsShow">
      <h2 class="subtitle subtitle-noline">热点图片</h2>
      <ul class="images images-v">
        <li v-for="(item, index) in hotImgList" :key="index">
          <a href="javascript:void(0);" @click="getNewsInfo(item.id)">
            <span
              class="img"
              :style="{
                backgroundImage:
                  'url(' + common.changeImgsrc(item.imgtitle) + ')'
              }"
            ></span>
            <i class="oneline" :title="item.title">
              {{ item.title | ellipsis(29) }}
            </i>
          </a>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: "zykxinfoRight",
  props: ["spliceNum", "picIsShow"],
  data: function() {
    return {
      hotNewsList: {},
      hotImgList: {}
    };
  },
  created() {
    this.getdataZykxInfoRight();
  },
  methods: {
    getdataZykxInfoRight() {
      //热点新闻
      this.utilscommit.request(
        "nvsi_hotNewsQuery",
        { areaid: "0" },
        this.hotBack
      ); //热点新闻
    },
    hotBack(data) {
      if (data && data.data) {
        let news = data.data;
        this.hotImgList = news.hotimagesnews.splice(0, this.spliceNum);
        this.hotNewsList = news.hotnews;
      }
    },
    getNewsInfo(newsid) {
      const newsUrl = this.$router.resolve({
        name: "newsinfo",
        params: { type: 1, id: newsid }
      });
      window.open(newsUrl.href, "_blank");
    }
  },
  watch: {
    spliceNum() {
      this.getdataZykxInfoRight();
    }
  }
};
</script>
