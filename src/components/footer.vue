<template>
  <div id="footers">
    <div class="footer">
      <div class="mid">
        <div class="row w">
          <div class="col v-m g-18">
            <div class="footer-link">
              <a href="error.html">友情链接</a>：
              <a
                v-for="item in yqljNewList"
                :key="item.id"
                :href="item.linkurl"
                :title="item.name"
                style="padding-right: 20px;"
                >{{ item.name }}</a
              >
            </div>
            <div class="row w">
              <p class="col v-m t-l g-16">
                <span>客服电话：4006818148转8</span>
                <b style="margin-left:35px"
                  >技术支持：深圳市永兴元科技股份有限公司</b
                ><br />客服QQ群：922238617<b style="margin-left:35px"
                  >推荐浏览器：<span
                    style="cursor: pointer;color: #fff;"
                    title="点击下载谷歌浏览器稳定版"
                    @click="
                      toOpenUrl(
                        'https://baoku.360.cn/sinfo/104384025_4000914.html'
                      )
                    "
                    >谷歌浏览器（点击安装）</span
                  ></b
                ><br />版权所有：中华人民共和国民政部<b style="margin-left:35px"
                  ><span>ICP备案编号：京ICP备13012430号</span>
                </b>
              </p>
              <div class="col v-m t-r footer-num">
                <div class="t-l">
                  <p>浏览网站人数统计</p>
                  <div>
                    <span v-for="item in numList" :key="item.id">
                      {{ item }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="width:390px">
            <img
              style="margin-left:38px;"
              src="../assets/img/qrcode2.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footers",
  data: function() {
    return {
      yqljNewList: [],
      numList: ["0", "0", "0", "0", "0", "0", "0", "0"] //人数
    };
  },
  created() {
    this.getdatafooter();
  },
  methods: {
    getdatafooter() {
      this.codeValue.listLinksFortisWeb(
        "yqljNewList",
        { areaid: 0 },
        this.callbackfooter1
      );
      // this.utilscommit.requestapi(
      //   "listLinksFortisWeb",
      //   { areaid: 0 },
      //   this.callbackfooter1
      // );

      this.codeValue.insertWebPageViewFortisWeb(
        "siteweb",
        { name: "siteweb" },
        this.callbackfooter2
      ); //在线人数
      // this.utilscommit.requestapi(
      //   "insertWebPageViewFortisWeb",
      //   { name: "siteweb" },
      //   this.callbackfooter2
      // ); //在线人数
    },
    callbackfooter1(data) {
      if (data) {
        this.yqljNewList = data;
      }
    },
    callbackfooter2(data) {
      if (data) {
        this.pageViewCount(data);
      }
    },
    toOpenUrl(url) {
      //打开相关链接
      window.open(url);
    },
    pageViewCount(result, list) {
      //计算人数

      var re = result;
      if (re > 2147483648) {
        re = 2147483648; //int 长度限制没有改
      }
      var lists = list ? list : new Array();
      var num = parseInt(re / 10);
      lists.push(re % 10);
      if (num != 0) {
        this.pageViewCount(num, lists);
      } else {
        for (var m = 0; m < 8; m++) {
          if (m < lists.length && lists[m]) {
            this.$set(this.numList, 7 - m, lists[m]);
          }
        }
      }
    }
  }
};
</script>
