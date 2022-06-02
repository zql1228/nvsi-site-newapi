<template>
  <div id="home_list" v-if="news && news.id">
    <li>
      <!-- .filter((obj)=>index==listtype) -->
      <img
        v-show="showimg == 1 && news.imgtitle"
        v-lazy="common.changeImgsrc(news.imgtitle)"
        @error="imgError"
        alt=""
      />
      <img
        v-show="showimg == 1 && !news.imgtitle"
        src="https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png"
        alt=""
      />
      <div class="js-report-box fr">
        <a
          href="javascript:void(0);"
          @click="toNewsInfo(news.id)"
          v-text="truncate(news.title, 14, '...')"
          class="js-title"
        ></a>
        <p v-text="truncate(news.content, 48, '...')"></p>
        <p class="row">
          <span class="col t-l"
            ><img src="@/assets/img/js-cike.png" alt=""/><b
              v-text="truncate(news.entrytime, 10, '')"
            ></b
          ></span>
          <span class="col t-r" v-show="news.newsfrom"
            ><img
              src="@/assets/img/js-news.png"
              alt=""
              style="margin-left:5px"/><b
              v-text="truncate(news.newsfrom, 12, '...')"
            ></b
          ></span>
        </p>
      </div>
      <img
        v-show="showimg == 2 && news.imgtitle"
        v-lazy="common.changeImgsrc(news.imgtitle)"
        @error="imgError"
        alt=""
      />
      <img
        v-show="showimg == 2 && !news.imgtitle"
        src="https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png"
        alt=""
      />
    </li>
  </div>
</template>

<script>
// import errorimage from '@/assets/img/imgmtbd.png';
export default {
  name: "home_list",
  props: ["list", "listtype", "showimg"],
  data() {
    return {
      errorimage:
        "https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png"
    };
  },
  methods: {
    toNewsInfo: function(newsid) {
      //跳转二级栏目
      window.open(
        this.$router.resolve({
          name: "sitenewsInfo",
          params: { id: newsid }
        }).href
      );
    },
    imgError(news) {
      news.target.src = this.errorimage;
    }
  },
  computed: {
    news() {
      if (this.listtype && this.list) {
        return this.list[this.listtype];
      } else {
        return { imgtitle: null };
      }
    }
  }
};
</script>

<style scoped>
.col b {
  font-size: 12px;
  color: #999999;
}
</style>
