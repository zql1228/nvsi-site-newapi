<template>
  <div class="js-nav" id="navigationBar">
    <ul class="mid">
      <li v-for="(el, index) in columnsList" :key="index">
        <a
          href="javascript:void(0)"
          @click="getJump(el)"
          :class="{ active: el.albx6009 == routename || el.id == id }"
          v-text="truncate(el.albx6002, 5, '')"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navigationBar",
  data: function() {
    return {
      id: this.$route.params.id,
      routename: this.$route.name,
      columnsList: [] //菜单列表
    };
  },
  created() {
    this.getdatas();
  },
  methods: {
    getdatas() {
      //获取栏目列表
      let projectParam = {
        pageNow: 1,
        pageSize: 10,
        menutype: 1,
        areaid: "0",
        isshow: 1
      };
      this.utilscommit.request(
        "nvsi_listWebColumns",
        projectParam,
        this.datasback
      );
    },
    datasback(data) {
      //栏目列表返回结果
      if (data && data.data) {
        this.columnsList = data.data;
      }
    },
    getJump(el) {
      //跳转
      if (el.albx6006 == 5) {
        //跳转外部链接
        window.open(el.albx6009);
      } else if (el.albx6006 == 4 || el.albx6006 == 2) {
        //多个子栏目的新闻  或者 视频
        let type = el.albx6006 == 4 ? 2 : 3;
        this.$router.push({ name: "news", params: { type: type, id: el.id } });
      } else if (el.albx6006 == 1) {
        //单个新闻
        this.$router.push({ name: "newsinfo", params: { type: 2, id: el.id } });
      } /* else if(el.albx6006==2){//视频
              this.$router.push({name: "video", params: {type:2,id:el.id}});
            } */ else if (
        el.albx6009
      ) {
        //默认栏目
        this.$router.push({ name: el.albx6009 });
      }
    }
  },
  watch: {
    $route: function(to, from) {
      //监听路由是否变化
      if (
        !to.meta.type &&
        window.location.host != "chinavolunteer.mca.gov.cn" &&
        window.location.host != "wuhan.yxybb.com" &&
        window.location.host.substring(0, 7) != "192.168"
      ) {
        window.location.href =
          "https://chinavolunteer.mca.gov.cn/site" + to.path; //固定总站地址
      }
      this.routename = this.$route.name;
      this.id = this.$route.params.id;
      //this.$router.go(0);//刷新页面
    }
  }
};
</script>

<style scoped></style>
