<template>
  <div id="infosearch">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);">
                <router-link tag="span" :to="{ name: 'home' }"
                  >首页</router-link
                >
              </a>
              <span>志愿信息查询</span>
            </div>
          </li>
        </ul>
        <div class="tabbar">
          <span class="active">志愿者信息查询</span>
          <span>志愿服务证书查询</span>
        </div>
        <!-- 志愿者信息查询 -->
        <ul class="tabbar-down row w">
          <li class="col v-t w">
            <h2 class="subtitle subtitle-margin subtitle-noline">
              志愿者信息查询
            </h2>
            <!-- 查询输入框 -->
            <div class="vote vote-form" style="display: flex">
              <!-- 证件号 -->
              <div style="display: flex;">
                <span style="margin-right: 20px">证件号查询</span>
                <div class="select">
                  <select v-model="idType" id="idType">
                    <option value="0">请选择证件类型</option>
                    <option
                      v-for="(el, index) in idTypeList"
                      :key="index"
                      :value="el.codeid"
                    >
                      {{ el.codevalue }}
                    </option>
                  </select>
                </div>
                <input
                  type="text"
                  class="input"
                  style="width: 200px; margin-left: 0; "
                  v-model="name"
                  maxlength="20"
                  placeholder="请输入完整证件号码"
                />
              </div>
              <span>姓名</span>
              <input
                type="text"
                class="input"
                style="width: 150px; "
                v-model="card"
                maxlength="20"
                placeholder="请输入姓名"
              />
              <span>图文验证码</span>
              <input
                type="text"
                class="input"
                style="width: 140px;margin-right:5px"
                v-model="imgcode"
                maxlength="4"
                placeholder="请输入图文验证码"
              />
              <div class="my_imgcode">
                <img
                  style="width: 100%"
                  :src="imgcodesrc"
                  alt=""
                  @click="getcode2"
                />
              </div>
              <a
                href="javascript:void(0);"
                class="button button-bold"
                @click="searchVol"
                >查询</a
              >
            </div>
            <!-- 查询结果列表展示 -->
            <h2 class="subtitle subtitle-margin subtitle-noline">查询结果</h2>
            <!-- 查询错误提示 -->
            <span class="tipErr" v-text="msg1"></span>
            <!-- 查询结果列表 -->
            <table class="table table_cell" v-if="volInfo">
              <colgroup>
                <col width="15%" />
                <col width="15%" />
                <col width="17%" />
                <col width="17%" />
                <col width="18%" />
                <col width="18%" />
              </colgroup>
              <tr>
                <th>姓名</th>
                <th>性别</th>
                <th>证件号码</th>
                <th>服务时长</th>
                <th>服务省份</th>
                <th>手机号</th>
              </tr>
              <tr v-for="(el, index) in volInfo" :key="index">
                <td>
                  <a
                    href="javascript:void(0);"
                    @click="toVolDetail(el.encryptCard, el.albp0020)"
                    ><em class="name_color">{{ el.albp0003 }}</em></a
                  >
                </td>
                <td>{{ el.albp0006 == 2 ? "女" : "男" }}</td>
                <td>
                  <p>{{ el.cartype }}</p>
                  <p>{{ el.cardno }}</p>
                </td>
                <td>
                  <span>{{ el.albp0089 || "0.00" }}</span
                  >小时
                </td>
                <!-- <td>
                   <div style="border-radius:5px;background:#0088e4;color:#fff;padding:2px 5px;cursor:pointer;width:85px">
                    下载服务证明
                  </div>
                </td> -->
                <td>
                  <a
                    v-if="el.albp0020"
                    :href="el.url"
                    target="_blank"
                    :title="el.cnname + '（' + el.url + '）'"
                    style="color: #cc0000"
                    >{{ el.albp0025 }}</a
                  >
                </td>
                <td>
                  {{ el.phone ? el.phone : "未绑定手机号" }}
                  <!-- <span v-if="el.albp0010" class="Unbind" @click="toNextStep(el.mobilephone,el.albp0010)">解绑手机号</span> -->
                </td>
              </tr>
            </table>
          </li>
        </ul>
        <!-- 志愿服务证书查询 -->
        <ul class="tabbar-down row w" style="display: none">
          <li class="col v-t w">
            <h2 class="subtitle subtitle-margin subtitle-noline">
              志愿服务证书查询<em style="color: #cc0000; font-size: 18px"></em>
            </h2>
            <!-- 查询条件输入框 -->
            <div class="vote vote-form">
              <span>证书编号</span>
              <input
                type="text"
                class="input"
                style="width: 530px"
                @blur="frontCheck"
                v-model="front"
                maxlength="18"
                placeholder="请输入志愿者证件号"
              />
              <span class="gray">—</span>
              <input
                type="text"
                class="input"
                style="width: 250px"
                @blur="backCheck"
                v-model="back"
                placeholder="请输入证书编号后部分"
              />
              <a
                href="javascript:void(0);"
                class="button button-bold"
                @click="searchServiceBook"
                >查询服务证书</a
              >
            </div>
            <h2 class="subtitle subtitle-margin subtitle-noline">查询结果</h2>
            <!-- 查询错误提示 -->
            <span class="tipErr" v-text="msg2"></span>
            <!-- 查询列表 -->
            <table class="table" v-if="certificateInfo">
              <colgroup>
                <col width="10%" />
                <col width="30%" />
                <col width="15%" />
                <col width="15%" />
                <col width="30%" />
              </colgroup>
              <tr>
                <th>姓名</th>
                <th>颁发机构</th>
                <th>证书编号</th>
                <th>服务时长</th>
                <th>颁发时间</th>
                <th>属地</th>
              </tr>
              <tr>
                <td>
                  <a
                    href="javascript:void(0);"
                    @click="
                      toVolDetail(
                        certificateInfo.albp1102,
                        certificateInfo.albp0020
                      )
                    "
                    ><em class="name_color">{{
                      certificateInfo.albp0003
                    }}</em></a
                  >
                </td>
                <td>{{ certificateInfo.albp1107 }}</td>
                <td>
                  {{
                    certificateInfo.albp1110 + "-" + certificateInfo.albp1103
                  }}
                </td>
                <td>{{ (certificateInfo.albp1106 || "0.0") + "小时" }}</td>
                <td>{{ certificateInfo.albp1104 | ellipsisNos(10) }}</td>
                <td>
                  {{ certificateInfo.cnname }}
                  <a
                    :href="certificateInfo.url"
                    target="_blank"
                    :title="
                      certificateInfo.cnname + '（' + certificateInfo.url + '）'
                    "
                  >
                    {{ ("（" + certificateInfo.url + "）") | ellipsis(36) }}
                  </a>
                </td>
              </tr>
            </table>
          </li>
        </ul>
        <!-- 分页 -->
        <!-- <pagination
          :pageCount="tolPage"
          :rangePage="pageSize"
          :initPage="pageNow"
          :totals="tolCount"
          :val="jumpPage"
          @pageEvent="pageEvent"
        >
        </pagination> -->
      </div>
    </div>

    <!-- 绑定手机 -->
    <!--  <div class="mask bind">
      <div class="mask-info" style="width: 420px; max-height: 705px; margin-left: -210px"> -->
    <!-- step1 输入手机号获取验证码 -->
    <!-- <div v-if="isbound==2">
          <div class="mask-header row w">
            <div class="col v-m">
              <h2 style="color: #000; width: 300px">解绑此手机号{{encryptPhone}}</h2>
            </div>
            <div class="col v-m t-r">
              <a href="javascript:void(0);" class="mask-close" @click="close"><img src="../../assets/img/close.png" alt=""/></a>
            </div>
          </div>
          <div class="unbindTips">
            注&nbsp;:&nbsp;解绑后&nbsp;,&nbsp;此手机号将不再接受到相关短信推送,请谨慎操作
          </div>
          <div style="padding: 20px 50px 0 0">
            <div class="form">
              <p class="form-label">请完整输入此手机号,&nbsp;信息一致</p>
              <input maxlength="11" style="width: 260px"  v-model="unboundPhone" @blur="checkPhone"/>
            </div>
            <span class="form-error"  v-if="phoneTip==1">
              <img src="../../assets/img/success.png" alt="" />
              <span>手机号码一致</span>
            </span>
            <span class="form-error"  v-if="phoneTip==2">
              <img src="../../assets/img/wrong.png" alt="" />
              <span>手机号码不一致,请重新输入</span>
            </span>
            <span class="form-error" v-if="phoneTip==3">
              <img src="../../assets/img/wrong.png" alt="" />
              <span>手机号码格式错误</span>
            </span>
            <div class="form">
              <p class="form-label">点击发送验证码,&nbsp;并填写</p>
              <div class="row w" style="display: inline-table">
                <div class="col v-m">
                  <input type="text" id="inputImgCode" maxlength="6" v-model="code"  @focus="clean"/>
                </div>
                <div class="col v-m pl-10" style="width: 70px">
                  <a
                    href="javascript:void(0);"
                    class="button"
                    style="
                      width: 110px;
                      background: #00adf7;
                      padding: 0 10px;
                      margin: 0;
                    "
                    @click="getCode"
                    >{{ codeButton }}</a>
                </div>
              </div>
            </div>
            <span class="form-error" v-if="codeErr==1">
              <img src="../../assets/img/wrong.png" alt="" />
              <span v-text="errTxt"></span>
            </span>
          </div>
          <div class="form t-c">
            <a
              href="javascript:void(0);"
              class="button"
              style="margin: 40px 0 15px 0"
              @click="unbind"
              >解除绑定</a>
          </div>
        </div> -->
    <!-- step2 解绑 -->
    <!--  <div v-else>
          <div class="mask-header row w">
            <div class="col v-m">
              <h2 style="color: #000; width: 300px">解绑此手机号{{encryptPhone}}</h2>
            </div>
            <div class="col v-m t-r">
              <a href="javascript:void(0);" class="mask-close" @click="comfirm"><img src="../../assets/img/close.png" alt=""/></a>
            </div>
          </div>
          <div class="form t-c my_fonts"> 手机号:&nbsp;&nbsp;{{phone}}</div>
          <div class="form t-c my_fonts">解绑成功</div>
          <div class="form t-c" style="margin: 60px 0;">
            <a
              style="width:120px;"
              href="javascript:void(0);"
              class="button"
              @click="comfirm"
              >确定</a>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
const pagination = () => import("@/components/pagination.vue"); //分页
export default {
  name: "infosearch",
  components: {
    pagination //分页
  },
  data() {
    return {
      context: this.common.getContent(),
      volInfo: "", //志愿者查询结果
      name: "", //证件号
      card: "", //姓名
      imgcode: "", //填写的图文验证码
      imgcodesrc: "", //图文验证码地址
      imgcodeid: "", //图文验证码标识
      msg1: "", //志愿者查询提示信息
      certificateInfo: "", //证书信息
      front: "", //编号前
      back: "", //编号后
      msg2: "", //提示
      idType: "", //证件类型
      idTypeList: {},
      // codeButton: "获取验证码", //按钮显示的内容
      // countdown: 60, //倒计时时间
      // phone:"",//点击解绑的手机号明文
      // encryptPhone:"",//点击解绑的手机号密文
      // unboundPhone:"",//解绑填写的手机号
      // phoneTip:"",//手机号提示
      // code:"",//输入的验证码
      // codeErr:"",//验证码除误显示  1是显示其他不显示
      // isbound:2,//2是显示解绑页面,其他是显示解绑成功页面
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 10, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1, //记录输入框中的值,
      errTxt: "" //错误提示
    };
  },
  created() {
    this.codeValue.codeValueQueryFortisWeb(
      "nvsi_albp0065",
      { tablename: "nvsi_albp0065" },
      this.getIdTypeList
    );
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albp0065" },
    //   this.getIdTypeList
    // );
  },
  mounted() {
    window.Vues = this; //主体页面vue实例挂载
    this.tabSpanClick(); //tab切换
    this.getcode2();
  },
  methods: {
    getcode2() {
      this.utilscommit.requestapi(
        //获取图文验证码
        "getImageCodeFortisWeb",
        {},
        this.imgCode
      );
    },
    imgCode(result) {
      this.imgcodeid = result.data.imgkey;
      this.imgcodesrc = result.data.img;
    },
    clean() {
      //清除验证码错误的提示
      this.codeErr = "";
      this.errTxt = "";
    },
    pageEvent(e) {
      //分页
      this.searchVol();
    },
    getIdTypeList(result) {
      console.log(result);
      let idTypeList = this.common.orderBy(result, "codeid", "asc");
      let idTypeLists = []; //去除军官证、士兵证、其他有效国籍旅行证件
      if (idTypeList) {
        for (let index = 0; index < idTypeList.length; index++) {
          if (index == 0 && idTypeList[0]) this.idType = idTypeList[0].codeid; //默认给第一个赋值
          if (index < 5) idTypeLists.push(idTypeList[index]);
        }
      }
      this.idTypeList = idTypeLists;
    },
    // 查询志愿者信息
    async searchVol() {
      this.volInfo = "";
      if (this.checked()) {
        let { data: res } = await this.utilscommit.asyncReq("cardnoOnWeb", {
          cardno: this.name
        });
        if (res.code != 0 || !res.data.cardno) {
          return (this.msg1 = "未查询到相关结果");
        }
        // 加密证件号
        this.encryptCard = res.data.cardno;
        // 获取志愿者信息
        console.log({
          cardno: this.name,
          imgkey: this.imgcodeid,
          code: this.imgcode.toLocaleUpperCase()
        });
        this.utilscommit.requestapi(
          "getVolunteerInfoOnWeb",
          {
            cardno: this.name,
            imgkey: this.imgcodeid,
            code: this.imgcode.toLocaleUpperCase()
          },
          this.searchVolBack
        );
      } else {
        this.tolCount = 0; //总条数
      }
    },
    // 查询志愿者信息回调
    searchVolBack(result) {
      if (
        result.code == 0 &&
        result.data &&
        this.card == result.data.albp0003
      ) {
        let array = [result.data];
        array.forEach(element => {
          element.cartype = this.getIdName(element.albp0004);
          // 证件号脱敏
          element.cardno = this.common.noDes(element.albp0005);
          //手机号脱敏
          element.phone = this.common.phoneDes(element.albp0010);
          if (element.albp0020) {
            // 获取服务区域
            element.enname = this.common.areaList.filter(
              item => item.areaid == result.data.albp0020.substring(0, 2)
            )[0].sname;
            // 根据服务区域获取name
            element.albp0025 = this.common.areaList.filter(
              item => item.areaid == result.data.albp0020.substring(0, 2)
            )[0].name;
          }

          //判断当前志愿者属地的跳转路径
          if (element.enname == "jiangsu") {
            element.url = "http://js.chinavolunteer.cn/jszy/home";
          } else if (element.enname == "hubei") {
            if (window.location.host == "wuhan.yxybb.com") {
              //测试
              element.url = "https://wuhan.yxybb.com/subsite/hubei/home";
            } else {
              //生产
              element.url =
                "http://hubei.chinavolunteer.mca.gov.cn/subsite/hubei/home";
            }
          } else {
            element.url =
              this.context +
              "/LEAP/dist/index.html#/" +
              element.enname +
              "/home";
          }
        });
        this.volInfo = array;
        this.msg1 = "";
      } else if (result.code == -1) {
        this.volInfo = "";
        this.msg1 = "验证码错误";
        this.getcode2();
      } else {
        this.volInfo = "";
        this.msg1 = "未查询到相关信息";
        this.getcode2();
      }
    },
    // 用户输入内容校验
    checked() {
      if (this.idType == "0") {
        this.msg1 = "请选择证件类型";
        return false;
      }
      if (this.name && this.card && this.imgcode) {
        if (this.idType == "01") {
          if (this.common.checkCardNo(this.name)) {
            if (this.common.checkName(this.card)) {
              return true;
            } else {
              this.msg1 = "请填写正确的姓名";
              return false;
            }
          } else {
            this.msg1 = "请输入正确的证件号";
            return false;
          }
        } else {
          return true;
        }
      } else {
        this.msg1 = "请将身份证号码、姓名、图文验证码全部填写完成";
        return false;
      }
    },
    // 设置证件类型code对应value
    getIdName(a) {
      let idName = "";
      switch (a) {
        case "01":
          idName = "内地居民身份证";
          break;
        case "02":
          idName = "香港居民身份证";
          break;
        case "03":
          idName = "澳门居民身份证";
          break;
        case "04":
          idName = "台湾居民身份证";
          break;
        case "05":
          idName = "护照";
          break;
        case "06":
          idName = "军官证";
          break;
        case "07":
          idName = "士兵证";
          break;
        case "99":
          idName = "其他有效国际旅行证件";
          break;
      }
      return idName;
    },
    // 根据志愿者证件号和志愿者编号查询服务证书
    searchServiceBook() {
      this.certificateInfo = "";
      if (this.frontCheck() && this.backCheck()) {
        let params = {
          albp1110: this.front,
          albp1103: this.back
        };
        console.log(params);
        this.utilscommit.requestapi(
          "getCertificateFortisWeb",
          params,
          this.serviceBookBack
        );
      }
    },
    // 查询服务证书回调
    async serviceBookBack(result) {
      if (result.code == 0 && result.data) {
        let { data: res } = await this.utilscommit.asyncReq("cardnoOnWeb", {
          cardno: result.data.albp1110
        });
        if (res.code == 0 && !res.data.cardno) {
          return (this.msg2 = "未查询到相关信息");
        }

        let info = result.data;
        if (info.enname == "jiangsu") {
          info.url = "http://js.chinavolunteer.cn/jszy/home";
        } else if (info.enname == "hubei") {
          if (window.location.host == "wuhan.yxybb.com") {
            //测试
            info.url = "https://wuhan.yxybb.com/subsite/hubei/home";
          } else {
            //生产
            info.url =
              "http://hubei.chinavolunteer.mca.gov.cn/subsite/hubei/home";
          }
        } else {
          info.url =
            this.context + "/LEAP/dist/index.html#/" + info.enname + "/home";
        }
        this.certificateInfo = { ...info, encryptCard: res.data.cardno };
        this.msg2 = "";
      } else {
        this.certificateInfo = "";
        this.msg2 = "未查询到相关信息";
      }
    },
    frontCheck() {
      var flag = true;
      this.msg2 = "";
      if (!this.front) {
        this.msg2 = "证书编号不能为空";
        flag = false;
      }
      return flag;
    },
    backCheck() {
      var flag = true;
      this.msg2 = "";
      if (!this.back) {
        this.msg2 = "证书编号不能为空";
        flag = false;
      }
      return flag;
    },
    toVolDetail(volnum, areaid) {
      window.open(
        this.$router.resolve({ path: `/volinfo/${volnum}/${areaid}` }).href
      );
    },
    tabSpanClick() {
      $(".tabbar span").each(function(idx, el) {
        $(el).click(function() {
          Vues.name = "";
          Vues.card = "";
          Vues.volInfo = "";
          Vues.msg1 = "";
          Vues.front = "";
          Vues.back = "";
          Vues.certificateInfo = "";
          Vues.msg2 = "";
          Vues.tolCount = 0; //总条数
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
          $(".tabbar-down")
            .eq(idx)
            .show()
            .siblings(".tabbar-down")
            .hide();
        });
      });
    }
    /*getCode() {//发送验证码请求
      if(this.checkPhone()){
        if (this.countdown < 60) {
          return;
        }
        this.utilscommit.request("nvsi_getMobileCodeWithNoValSM",{phonenum:this.unboundPhone},this.getCodeback)
      }
    },
    getCodeback:function(result){
      if(result.data==true){ this.timer1() }
    },
    timer1() {//倒计时方法
      if (this.countdown == 0) {
        this.codeButton = "获取验证码";
        this.countdown = 60;
        return;
      } else {
        this.codeButton = "重新发送" + this.countdown + "s";
        this.countdown--;
      }
      var _this = this;
      this.timer = setTimeout(function () {
        _this.timer1();
      }, 1000);
    },
      close() {
      this.unboundPhone=""
      this.phone=""
      this.encryptPhone=""
      this.phoneTip=""
      this.codeErr=""
      this.errTxt=""
      this.code=""
      $(".mask.bind").removeClass("active");
    },
   toNextStep: function(a,b){//点击解绑后传值,和打开弹框
      this.encryptPhone=b
      this.phone=a
      $(".mask.bind").addClass("active");
    }, 
    checkPhone: function(){//验证手机号是否一致
    if(!this.common.checkPhoneno(this.unboundPhone)){
            this.phoneTip=3
            return false;
     }else if(this.phone==this.unboundPhone){
            this.phoneTip=1
            return true;
     }else{
            this.phoneTip=2
            return false;
     }
    },
    checkCode:function(){//验证码格式验证
         if(this.code.length==6){
             return true
         }else{
              this.codeErr=1;
              this.errTxt='验证码错误';
             return false
         }
    },
    unbind:function(){//发送解除绑定请求
        if(this.checkPhone()&&this.checkCode()){
            this.utilscommit.request(
         "nvsi_listServiceUnbindPhone",{mobilephone:this.unboundPhone,albp0029:this.volInfo[0].albp0029,code:this.code},this.unbindBack)
        }
    }, 
    unbindBack:function(result){//解绑成功后
         if(result.code==0 && result.data){
            this.isbound=1
            this.volInfo=""
         }else{
            this.codeErr=1;
            this.errTxt=result.message;
         }     
    },
    comfirm:function(){
      this.unboundPhone=""
      this.phone=""
      this.encryptPhone=""
      this.phoneTip=""
      this.codeErr=""
      this.errTxt=""
      this.volInfo=""
      this.code=""
      this.isbound=2
      this.tolCount=0//总条数
      $(".mask.bind").removeClass("active");
    },*/
  }
};
</script>

<style scoped>
.table th {
  padding: 18px;
  text-align: left;
}
.table td {
  padding: 18px;
  text-align: left;
}
.select:after {
  right: 4px;
}
.select {
  width: 140px;
  height: 40px;
  box-sizing: border-box;
}
.vote span {
  line-height: 40px;
}
.table th {
  font-weight: bold;
}
.table th,
.table td {
  border: 1px solid #dfdfdf;
}
.table td:nth-child(1),
table td:nth-child(5) {
  color: #cc0000;
  font-weight: bold;
}
.unbindTips {
  color: #e2000e;
  font-size: 14px;
  text-align: left;
  margin-top: 20px;
}
.form {
  padding: 5px 0 0 0;
}
.form-label {
  color: #000;
  padding-bottom: 10px;
}
.mask-info {
  padding: 20px;
  padding-top: 0;
}
.form-error {
  margin: 10px 0;
  font-size: 12px;
}
.form-error img {
  height: 20px;
  margin-right: 5px;
}
.table_cell tr > td {
  padding: 10px 18px;
}
.Unbind {
  cursor: pointer;
  margin-left: 10px;
  padding: 2px 5px;
  color: #fff;
  background: #0088e4;
  border-radius: 5px;
  transition: 0.3s;
}
.Unbind:hover {
  opacity: 0.8;
}
.my_fonts {
  font-size: 22px;
  color: #000;
  margin: 40px 0;
  font-weight: 900;
}
.tipErr {
  color: red;
  display: inline-block;
  font-size: 18px;
  width: 100%;
  text-align: center;
}
.my_imgcode {
  width: 80px;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
}
</style>
