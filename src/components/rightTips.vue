<template>
  <div class="gzh-code" style="bottom:35%">
    <div class="gc-div1" v-if="show">
      <img
        src="../assets/img/win-pop.png"
        style="width:40px;height:40px"
        alt=""
      />
      <div>官方微信</div>
      <div>公众号</div>
    </div>
    <div class="gc-div2" v-if="show">
      <img
        src="../assets/img/app-code.png"
        style="width:40px;height:40px"
        alt=""
      />
      <div>中国志愿</div>
      <div>APP</div>
    </div>
    <a href="javascript:void(0)" @click="backtop">
      <img
        src="../assets/img/top.png"
        style="width:40px;margin-top:10px;"
        alt=""
      />
      <div style="color:#333;margin-bottom: 8px;">TOP</div>
    </a>
    <a href="javascript:void(0)" @click="backtopx">
      <div style="color:#333;margin-bottom:10px;">
        {{ show ? "隐藏" : "显示" }}
      </div>
    </a>
    <div class="win-pop wp" style="top:40%;">
      <img class="wp" src="../assets/img/gzhonghao.png" style="" alt="" />
      <div style=" text-align: center;">
        <p style="font-size:12px;color:#333;margin:0;">
          扫码关注“中国志愿服务网”
        </p>
        <p style="font-size:12px;color:#333;">官方微信公众号</p>
      </div>
    </div>
    <div class="win-pop wp2" style="top:40%;">
      <img src="../assets/img/app.png" style="margin-top:7px;" alt="" />
      <div style=" text-align: center;">
        <p style="font-size:12px;color:#333;margin-left:3px;">扫码下载</p>
        <p style="font-size:12px;color:#333;">“中国志愿APP”参与志愿活动</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true //true显示,false隐藏
    };
  },
  methods: {
    backtop() {
      //回到顶部
      scrollTo(0, 0);
    },
    backtopx() {
      this.show = !this.show;
    }
  }
};
</script>
