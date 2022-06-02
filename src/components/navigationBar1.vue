<template>
  <div class="js-nav" id="navigationBar">
    <ul class="mid">
      <li v-for="(el, index) in columnsList" :key="index">
        <a
          href="javascript:void(0)"
          @click="getJump(el)"
          :class="{
            active: el.name == routename || el.name == routetype
          }"
          v-text="el.showname"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      routename: this.$route.name, //路由
      routetype: this.$route.params.name, //新闻列表页参数
      columnsList: [] //菜单列表
    };
  },
  beforeCreate() {
    window.VueB = this;
  },
  created() {
    this.getMenus();
  },
  methods: {
    getMenus() {
      //获取栏目列表
      this.codeValue.getNav(
        "columnsList",
        { sitename: "china" },
        this.datasback
      );
      // this.utilscommit.requestapi(
      //   "getNav",
      //   { sitename: "china" },
      //   this.datasback
      // );
    },
    datasback(data) {
      //栏目列表返回结果
      if (data) {
        this.columnsList = data;
        /* data.data.forEach(el => {
          if (el.name == "index") {
            this.$store.commit("saveLayoutid", el.layoutid);
          }
        }); */
      }
    },
    getJump(el) {
      //跳转
      if (
        el.name == "home" ||
        el.name == "index" ||
        el.name == "project" ||
        el.name == "group"
      ) {
        this.$router.push({
          name: el.name
        });
      } else {
        this.$router.push({
          name: "sitenews",
          params: { name: el.name }
        });
      }
    }
  },
  watch: {
    $route: function(to, from) {
      //监听路由是否变化
      this.routename = this.$route.name;
      this.routetype = this.$route.params.name;
    }
  }
};
</script>

<style scoped></style>
