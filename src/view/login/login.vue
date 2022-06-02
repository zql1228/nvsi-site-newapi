<template>
  <div id="login">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);">
                <router-link tag="span" :to="{ name: 'home' }">首页</router-link>
              </a>
              <span v-show="type == 1">管理部门</span><span v-show="type == 2">全国性组织/单位</span><span> 登录</span>
            </div>
          </li>
        </ul>
        <div class="row w login" style="background: #fff;">
          <div class="col v-t">
            <img src="../../assets/img/login.png" style="height: 450px;width: 754px;" />
          </div>
          <div class="col v-t white">
            <h2 v-cloak>
              {{ type == 1 ? "管理部门" : "全国性组织/单位" }}登录
            </h2>
            <div class="login-wrap">
              <div class="login-input">
                <img src="../../assets/img/user.png" />
                <input type="text" id="username" v-model="username" @blur="usernameCheck" @keypress.enter="login" placeholder="请输入用户名" maxlength="30" />
              </div>
              <span class="login-tips" id="usernameTips"></span>
              <div class="login-input">
                <img src="../../assets/img/pwd.png" />
                <input type="password" id="password" v-model="password" @blur="passwordCheck" @keypress.enter="login" placeholder="请输入密码" maxlength="30" />
                <img src="../../assets/img/hide.png" alt="" class="pwd_img" v-show="imgShow == 0" @click="changeType($event, 'imgShow', 1)" />
                <img src="../../assets/img/show.png" alt="" class="pwd_img" v-show="imgShow == 1" @click="changeType($event, 'imgShow', 0)" />
              </div>
              <span class="login-tips" id="passwordTips"></span>
              <div class="login-input" style="line-height: 2.1;">
                <img src="../../assets/img/yzm.png" alt="" />
                <input type="text" placeholder="请输入验证码" id="code" v-model="imgCode" @change="imgCodeCheck" maxlength="4"
                  onchange="value=value.replace(/[^0-9a-zA-Z]/g,'').slice(0,4);" style="display: inline-block;width: 60%;" />
                <span @click="getImgCode" id="imgCode" style="  margin-left: 10px;
                    cursor: pointer;
                    border: 1px solid #dfdfdf;
                    text-align: center;
                    width: 35%;
                    height: 46px;
                    border-radius: 4px;
                    float: right;">
                  <img id="reg_image" style="left: 250px;top: 6px;" src="" alt="" />
                </span>
              </div>
              <span class="login-tips" id="imgCodeTips"></span>
              <a href="javascript:void(0);" class="button" :class="isclick ? '' : 'btn_disabled'" @click="login" @keypress.enter="login">{{ isclick ? "登 录" : "登 录 中..." }}</a>
              <div class="row w" v-show="type != 1">
                <router-link class="col v-m login-txt" tag="a" :to="{ name: 'orgreg' }">立即注册</router-link>
                <router-link class="col v-m t-r login-txt" tag="a" :to="{ name: 'forgetpwd1', params: { type: 2 } }">忘记密码?</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      type: this.$route.params.type,
      username: "",
      password: "",
      imgCode: "",
      imgKey: "", // 图文验证码缓存key
      userInfo: {},
      showPop: true,
      imgShow: 0,
      isclick: true // 是否可以点击登录按钮
    };
  },
  created() {
    this.userInfoCheck();
  },
  watch: {
    "$route.params.type": function(to, from) {
      if (to != from) {
        this.type = to;
        this.username = "";
        this.password = "";
        this.imgCode = "";
        $("#code").val("");
        this.formTip("username", "");
        this.formTip("password", "");
        this.formTip("imgCode", "");
        this.getImgCode(); //初始化图文验证码
      }
    }
  },
  mounted() {
    this.getImgCode(); //初始化图文验证码
  },
  methods: {
    userInfoCheck: function() {
      this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      if (this.userInfo) {
        var path = this.common.getCookie("mgpath");
        let loginstatus = window.sessionStorage.getItem("nvsi_loginstatus"); //登录状态
        if (
          path &&
          this.userInfo.albe0053 &&
          this.userInfo.albe0053 == 1 &&
          loginstatus &&
          loginstatus == 2
        ) {
          //全国性组织类型的已登录
          this.$router.push({ name: "home" });
          Vueh.getUserInfo(); //获取页眉用户信息
        }
      }
    },
    login: function() {
      if (!this.isclick) {
        return;
      }
      if (this.usernameCheck() && this.passwordCheck() && this.imgCodeCheck()) {
        // 响应之前禁止登录按钮
        this.isclick = false;
        let params = {
          username: this.username,
          password: this.password,
          code: this.imgCode.toLocaleUpperCase(),
          imgkey: this.imgKey,
          sign: "1" //传验证码必传字段
        };
        this.utilscommit.requestapi(
          "LEAPLoginFortisWeb",
          params,
          this.loginOtherBack
        );
      }
    },
    loginOtherBack(res) {
      if (res.code == 0) {
        // let id = res.data.cursessionid;
        let headTxt = window.location.origin + "/volunteer/redirect";
        let url = "";
        let eninfo = this.utilscommit.getSM4().encrypt(
          JSON.stringify({
            username: this.username,
            password: this.password
          })
        );
        let info = eninfo.replace(/\+/g, "%2B").replace(/\&/g, "%26");
        if (this.type == 1) {
          //管理部门
          let manage = res.data.manage;
          if (manage) {
            // url = headTxt + "mcaworkbench/" + id;
            url = headTxt + "?type=mcaworkbench&userinfo=" + info;
          } else {
            this.$swal("未查询到该管理部门!");
            this.getImgCode();
            return (this.isclick = true);
          }
        } else if (this.type == 2) {
          // 队伍
          let team = res.data.team;
          if (team) {
            if (team.albe0026 && team.albe0026 == "3") {
              //停用的队伍
              this.$swal(
                "您的账号已被停用，如有问题请联系所在区域民政管理部门",
                {
                  buttons: "确定"
                }
              );
              this.getImgCode();
              return (this.isclick = true);
            } else if (!team.albe0053) {
              //非全国性队伍
              this.$swal("请选择队伍所在站点登录!", {
                buttons: "确定"
              });
              this.getImgCode();
              return (this.isclick = true);
            } else {
              // url = headTxt + "teamworkbench/" + id;
              url = headTxt + "?type=teamworkbench&userinfo=" + info;
              window.sessionStorage.setItem("nvsi_loginstatus", 2); //全国组织登录
              window.sessionStorage.setItem("userInfo", JSON.stringify(team)); //用户信息
            }
          } else {
            this.$swal("未查询到该队伍信息!");
            this.getImgCode();
            return (this.isclick = true);
          }
        }
        this.common.addCookie("mgpath", url, 0.5);
        if (this.type == 2) Vueh.getUserInfo(); //获取页眉用户信息
        this.isclick = true;
        window.open(url, "_blank");
        this.$router.push({
          name: "home"
        });
      } else {
        this.$swal(res.message);
        this.getImgCode();
        this.isclick = true;
      }
    },
    usernameCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.username) {
        tip = "用户名不能为空";
        flag = false;
      }
      this.formTip("username", tip);
      return flag;
    },
    passwordCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.password) {
        tip = "密码不能为空";
        flag = false;
      } /* else if (!this.common.checkPW(this.password)) {
          tip='用户名或密码错误';
          flag = false;
        } */
      this.formTip("password", tip);
      return flag;
    },
    imgCodeCheck: function() {
      if (!this.imgCode) {
        this.formTip("imgCode", "验证码不能为空");
        return false;
      } else {
        this.formTip("imgCode", "");
        /* this.utilscommit.requestapi(
          "verificationCodeFortisWeb",
          { code: this.imgCode, imgkey: this.imgKey },
          this.imgCodeCheckBack
        ); */
        return true;
      }
    },
    imgCodeCheckBack: function(data) {
      if (data.code == 0 && data.data) {
        this.codeFlag = true;
        this.formTip("imgCode", "");
      } else {
        let message = "验证码错误";
        if (data.message) message = data.message;
        this.formTip("imgCode", message);
        this.getImgCode();
      }
    },
    getImgCode: function() {
      this.imgCode = "";
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.getImgBack
      );
    },
    getImgBack: function(data) {
      if (data && data.data) {
        $("#reg_image").attr("src", data.data.img);
        this.imgKey = data.data.imgkey;
      }
    },
    formTip: function(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    },
    changeType(el, name, type) {
      //密码框小眼睛点击事件切换
      this.imgShow = type;
      if (type == 0) {
        //隐藏
        el.target.parentNode.children[1].type = "password";
      } else if (type == 1) {
        //显示
        el.target.parentNode.children[1].type = "text";
      }
    }
  }
};
</script>

<style scoped>
.father {
  position: relative;
  display: flex;
}
.popwindow {
  width: 280px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  box-sizing: border-box;
  color: #000;
  font-size: 14px;
  padding: 5px;
  position: absolute;
  right: -220px;
  top: -75px;
  /* display: none; */
}
.hide {
  display: none;
}
.red {
  color: red !important;
}
.login-input {
  margin: 5px 0;
}
.login-tips {
  display: inline-block;
  font-size: 14px;
}
.login-input img.pwd_img {
  left: 330px;
  top: 12px;
}
.btn_disabled {
  background: rgb(121, 120, 120);
}
</style>
