<template>
  <div id="groupInfo">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);"
                ><router-link tag="span" :to="{ name: 'home' }"
                  >首页</router-link
                ></a
              >
              <a href="javascript:void(0);"
                ><router-link tag="span" :to="{ name: 'group' }"
                  >志愿队伍</router-link
                ></a
              >
              <a href="javascript:void(0);">志愿队伍详情</a>
            </div>
          </li>
        </ul>
        <div class="section">
          <div class="row w">
            <div class="col v-t" style="padding-right:50px;">
              <div class="row w">
                <div class="col v-t" style="width:38%;">
                  <img
                    :src="common.changeImgsrc(groupInfo.orgphoto, 1)"
                    @error="imgError"
                    style="height: 158px;width: 260px;"
                    alt=""
                    v-if="groupInfo.orgphoto"
                  />
                  <img
                    :src="groupInfo.defaultImg"
                    style="height: 158px;width: 260px;"
                    alt=""
                    v-else-if="groupInfo.defaultImg"
                  />
                  <img
                    src="../../assets/img/i1.png"
                    style="height: 158px;width: 260px;"
                    alt=""
                    v-else
                  />
                </div>
                <div class="col v-t">
                  <h2 class="h2">{{ groupInfo.albe0002 }}</h2>
                  <table class="table-info">
                    <colgroup>
                      <col width="40%" />
                      <col width="60%" />
                    </colgroup>
                    <tr>
                      <th colspan="2" style="padding-bottom: 10px;">
                        队伍联络编号：<em class="c-danger">{{
                          groupInfo.albe0041
                        }}</em>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        人员规模：<em class="c-danger">{{
                          groupInfo.albe0016
                        }}</em>
                      </th>
                      <th>
                        正式人员：<em class="c-danger">{{
                          groupInfo.albe0056 ? groupInfo.albe0056 : 0
                        }}</em>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="2" style="padding-top:10px;">
                        <span class="v-m">队伍分享到：</span>
                        <div style="display:inline-block;" class="v-m">
                          <a href="javascript:void(0);" @click="toWB">
                            <img src="../../assets/img/wb-1.png" alt="" />
                          </a>
                          <a href="javascript:void(0);" @click="showtype = 1">
                            <img src="../../assets/img/vx-1.png" alt="" />
                          </a>
                          <a href="javascript:void(0);" @click="showtype = 2">
                            <img src="../../assets/img/qq-1.png" alt="" />
                          </a>
                        </div>
                      </th>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="arrow-box">
                <table class="table-info">
                  <colgroup>
                    <col width="15%" />
                    <col width="35%" />
                    <col width="15%" />
                    <col width="35%" />
                  </colgroup>
                  <tr>
                    <th>区域：</th>
                    <td>{{ groupInfo.albe0038 }}</td>
                    <th>加入方式：</th>
                    <td>{{ groupInfo.joinway }}</td>
                  </tr>
                  <tr>
                    <th>成立日期：</th>
                    <td>{{ groupInfo.albe0015 | ellipsisNos(10) }}</td>
                    <!-- <th v-show="groupInfo.albe0004">联络团体：</th> -->
                    <th
                      v-show="
                        groupInfo.albe0063 !== '0' || groupInfo.albe0065 !== '0'
                      "
                    >
                      联络组织：
                    </th>
                    <td
                      v-show="groupInfo.albe0063 && groupInfo.albe0063 !== '0'"
                    >
                      <a
                        href="javascript:void(0);"
                        @click="
                          toLinkGroup(groupInfo.albe0004, groupInfo.linkareaid)
                        "
                      >
                        <em class="c-danger">{{ groupInfo.linkgroup }}</em>
                      </a>
                    </td>
                    <td
                      v-show="groupInfo.albe0065 && groupInfo.albe0065 !== '0'"
                    >
                      <a
                        href="javascript:void(0);"
                        @click="
                          toLinkGroup(groupInfo.albe0066, groupInfo.linkareaid)
                        "
                      >
                        <em class="c-danger">{{ groupInfo.linkgroup }}</em>
                      </a>
                    </td>
                    <th
                      v-show="
                        groupInfo.albe0063 == '0' && groupInfo.albe0065 == '0'
                      "
                    >
                      登记机关：
                    </th>
                    <td
                      v-show="
                        groupInfo.albe0063 == '0' && groupInfo.albe0065 == '0'
                      "
                    >
                      {{ groupInfo.albe0007 }}
                    </td>
                  </tr>
                  <tr>
                    <th>详细地址：</th>
                    <td>{{ groupInfo.albe0013 }}</td>
                    <th></th>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div class="tabbar" style="margin-top:20px;">
                <span class="active">队伍简介</span>
                <span>发起的项目</span>
                <!-- <span>留言咨询</span> -->
                <!-- <div v-html="applyButton" style="margin-top: -32px;text-align: right;"></div> -->
              </div>
              <!-- 团体简介 -->
              <div class="tabbar-down">
                <p
                  v-html="ecellipsiSpace(groupInfo.albe0032)"
                  style="padding: 18px;"
                ></p>
                <p
                  v-if="!groupInfo.albe0032"
                  style="width: 100%;text-align: center;"
                >
                  <img src="../../assets/img/js-wujilu.png" />
                </p>
              </div>
              <!-- 发起的项目 -->
              <div class="tabbar-down" style="display:none;">
                <table class="table-list">
                  <colgroup>
                    <col width="50%" />
                    <col width="25%" />
                    <col width="25%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>项目名称</th>
                      <th>立项日期</th>
                      <th>项目状态</th>
                    </tr>
                    <tr v-if="!projectList.length">
                      <td
                        colspan="3"
                        style="text-align: center;border-bottom: 1px #F6F3F7;"
                      >
                        <img src="../../assets/img/js-wujilu.png" />
                      </td>
                    </tr>
                    <tr v-for="item in projectList" :key="item.id">
                      <td class="left">
                        <em
                          class="pointer"
                          :title="item.albx0002"
                          @click="toProjectInfo(item.id, item.albx0021)"
                          >{{ item.albx0002 | ellipsis(20) }}</em
                        >
                      </td>
                      <td class="left">
                        {{ item.albx0031 | ellipsisNos(10) }}
                      </td>
                      <td class="left">
                        <i
                          v-if="
                            item.albx0015 == 2 ||
                              item.albx0015 == 3 ||
                              item.albx0015 == 4 ||
                              item.albx0015 == 5
                          "
                          >运行中</i
                        >
                        <em v-if="item.albx0015 == 6 || item.albx0015 == 7"
                          >已结项</em
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 留言咨询 -->
              <div class="tabbar-down" style="display:none;">
                <!-- <div class="load"> -->
                <!-- <textarea class="textarea" rows="4" placeholder="在这里畅所欲言吧～" v-model="leaveContent" maxlength="200" style="height: 146px;"></textarea>
                  <a href="javascript:void(0);" style="margin-top: 15px;" class="button" @click="publish(1)">发布评论</a> -->
                <h2 class="subtitle subtitle-plain">最新留言</h2>
                <p
                  v-if="!mainMessageList.length"
                  style="width: 100%;text-align: center;"
                >
                  <img src="../../assets/img/js-wujilu.png" />
                </p>
                <ul class="activity">
                  <li class="row w" v-for="el in mainMessageList" :key="el.id">
                    <div class="col v-t">
                      <img
                        :src="common.changeImgsrc(el.photo)"
                        @error="imgError2"
                        alt=""
                      />
                    </div>
                    <div class="col v-t">
                      <h3 class="activity-tit">
                        <a
                          href="javascript:void(0);"
                          @click="
                            toDetailInfo(
                              el.albp0029,
                              el.albp0020,
                              el.orgid,
                              el.albe0012
                            )
                          "
                          ><em>{{ el.showname }}</em></a
                        >
                        <span>{{ el.albx4006 | ellipsisNos(19) }}</span>
                        <!-- <a href="javascript:void(0);" @click="showReply(el.id,el.albp0029 || el.orgid,el)"><em>回复</em></a> -->
                      </h3>
                      <div class="activity-info">{{ el.albx4003 }}</div>
                      <div class="message-child">
                        <div
                          class="row w line-message"
                          v-for="el2 in el.sublist"
                          :key="el2.id"
                        >
                          <h3 class="activity-tit" style="margin-top: 10px;">
                            <a
                              href="javascript:void(0);"
                              @click="
                                toDetailInfo(
                                  el2.volnum1,
                                  el2.area1,
                                  el2.orgid1,
                                  el2.area3
                                )
                              "
                              ><em>{{ el2.name1 || el2.name3 }}</em></a
                            >
                            <span>回复</span>
                            <a
                              href="javascript:void(0);"
                              @click="
                                toDetailInfo(
                                  el2.volnum2,
                                  el2.area2,
                                  el2.orgid2,
                                  el2.area4
                                )
                              "
                              ><em>{{ el2.name2 || el2.name4 }}</em></a
                            >
                            <span>{{ el2.albx4006 | ellipsisNos(19) }}</span>
                            <!-- <a href="javascript:void(0);" @click="showReply(el.id,el2.volnum1 || el2.orgid1,el2)"><em>回复</em></a> -->
                          </h3>
                          <div class="activity-info">{{ el2.albx4003 }}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <!-- </div> -->
              </div>
              <div v-if="nowIndex == 1 || nowIndex == 2">
                <pagination
                  :pageCount="tolPage"
                  :rangePage="pageSize"
                  :initPage="pageNow"
                  :totals="tolCount"
                  :val="jumpPage"
                  @pageEvent="pageEvent"
                >
                </pagination>
              </div>
            </div>
            <div class="col v-t" style="width:30%;">
              <h2 class="subtitle subtitle-noline" style="margin-top:-10px;">
                队伍联系人
              </h2>
              <div class="link-info">
                <h2 v-if="groupInfo.albe0018">{{ groupInfo.albe0018 }}</h2>
                <p
                  v-if="groupInfo.albe0047 == 1 && groupInfo.albe0019"
                  v-text="'手机：' + groupInfo.albe0019"
                ></p>
                <p
                  v-if="groupInfo.albe0048 == 1 && groupInfo.albe0020"
                  v-text="'电话：' + groupInfo.albe0020"
                ></p>
                <p
                  v-if="groupInfo.albp0054"
                  :text="'邮箱：' + groupInfo.albp0054"
                ></p>
                <!-- <p class="row w">
                  <span class="col v-m" style="padding-right:10px;">
                    <a
                      href="javascript:void(0);"
                      @click="showComplain"
                      class="button outline"
                      >我要投诉</a
                    >
                  </span>
                  <span class="col v-m" style="padding-left:10px;">
                    <a href="javascript:void(0);" class="button outline" @click="sendMessage(groupid,groupInfo.albe0037)">给他发站内信</a>
                  </span>
                </p> -->
              </div>
              <h2 class="subtitle subtitle-noline subtitle-margin">服务评价</h2>
              <div class="info-detail">
                <p>对项目开展培训的满意度：5.00</p>
                <p>与志愿队伍合作的满意度：5.00</p>
                <p>项目执行与计划的符合度：5.00</p>
              </div>
              <h2 class="subtitle subtitle-noline subtitle-margin">队伍地址</h2>
              <div class="link-info">
                <p>{{ groupInfo.albe0013 }}</p>
                <p class="row w">
                  <span class="col v-m" style="padding-right:10px;">
                    <a
                      href="javascript:void(0);"
                      class="button outline"
                      @click="showMapg"
                      >查看地图</a
                    >
                  </span>
                  <span class="col v-m" style="padding-left:10px;"> </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 地图 -->
    <div class="mask mapgroupinfo">
      <div
        class="mask-info"
        style="width:700px;max-height:705px;margin-left:-350px;"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>地图</h2></div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closeMapg">
              <img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div>
          <div id="groupinfomap" style="height:380px;"></div>
        </div>
      </div>
    </div>
    <!-- 我要投诉 -->
    <div class="mask complain">
      <div
        class="mask-info"
        style="width:700px;max-height:705px;margin-left:-350px;top: 50%;"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>我要投诉</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              @click="closeComplain"
              class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <ul class="grid" style="margin-top: 10px;">
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>被投诉对象：</p>
              <input
                :value="groupInfo.albe0002"
                readonly
                placeholder="请输入被投诉对象"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px;"
              id="objTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人姓名：</p>
              <input
                type="text"
                v-model="name"
                @blur="nameCheck"
                maxlength="20"
                placeholder="请输入投诉人姓名"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px;height: 17px;color: red;"
              id="nameTips"
            ></span>
          </li>
          <li class="grid-item g-24">
            <div class="form">
              <p class="form-label"><em>*</em>投诉内容：</p>
              <textarea
                rows="2"
                v-model="content"
                @blur="contentCheck"
                maxlength="100"
                class="form_textarea"
                placeholder="请输入投诉内容"
              ></textarea>
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px;height: 17px;color: red;"
              id="contentTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人身份证号码：</p>
              <input
                type="text"
                v-model="card"
                @blur="cardCheck"
                maxlength="18"
                placeholder="请输入投诉人身份证号码"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px;height: 17px;color: red;"
              id="cardTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>投诉人手机号码：</p>
              <input
                type="text"
                v-model="phone"
                @blur="phoneCheck"
                maxlength="11"
                placeholder="请输入投诉人手机号码"
              />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px;height: 17px;color: red;"
              id="phoneTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>图文验证码：</p>
              <div class="row w" style="display: inline-table;">
                <div class="col v-m">
                  <input
                    type="text"
                    id="inputImgCode"
                    v-model="imgcode"
                    maxlength="4"
                    @blur="imgCodeCheck"
                    placeholder="请输入图文验证码"
                  />
                </div>
                <div
                  class="col v-m pl-10"
                  style="width:130px;"
                  @click="changeImgCode"
                >
                  <img
                    id="reg_image"
                    class="button button-line"
                    style="width: 100%;padding: 1px 1px 2px 5px;"
                  />
                </div>
              </div>
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px;height: 17px;color: red;"
              id="imgCodeTips"
            ></span>
          </li>
          <!-- <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>验证码：</p>
              <div class="row w" style="display: inline-table;">
                <div class="col v-m">
                  <input type="text" id="code" v-model="code" @blur="codeCheck" oninput="value=value.replace(/[^\d]/g,'')" maxlength="6" placeholder="请输入验证码">
                </div>
                <div class="col v-m pl-10" style="width:130px;"><button class="button button-line" id="codebutton" @click="getCode" v-text="codeButton" style="font-size: 14px;width: 100%;"></button></div>
              </div>
            </div>
            <span class="form-error" style="padding: 5px 0 0 20px;height: 17px;color: red;" id="codeTips"></span>
          </li> -->
        </ul>
        <div class="form t-c">
          <a
            href="javascript:void(0);"
            class="button"
            style="margin-top: 5px;"
            @click="onSubmit"
            >提交</a
          >
        </div>
      </div>
    </div>

    <!-- 微信分享 -->
    <share :showtype="showtype" type="group"></share>
  </div>
</template>

<script>
const pagination = () => import("@/components/pagination.vue"); //分页
const share = () => import("@/components/share.vue"); //分享
import QRCode from "qrcodejs2";
import i1 from "../../assets/img/i1.png";
import avatar from "../../assets/img/avatar.png";
export default {
  name: "groupInfo",
  components: {
    pagination,
    share //分页
  },
  data: function() {
    return {
      groupid: this.$route.params.orgid,
      areaid: this.$route.params.areaid,
      groupInfo: {}, //团体信息
      basicInfo: [], //该用户团体信息
      mbNum: 0, //正式成员数
      projectList: [], //发布的项目列表
      content: "",
      name: "",
      card: "",
      phone: "",
      imgcode: "",
      // code:'',
      // codeButton:"获取验证码",
      // countdown:60,
      // imgCodeFlag:false,
      mainMessageList: {}, //主留言列表
      nowIndex: 0, //当前tab页索引
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1, //记录输入框中的值
      // timer:'',//定时器
      //分享参数
      showtype: 0,
      imgkey: "" //图文验证码的key
    };
  },
  created() {
    window.Vues = this; //主体页面vue实例挂载
    this.getdate();
  },
  mounted() {
    this.clickTabbarSpan();
  },
  methods: {
    pageEvent: function(e) {
      //分页
      this.getList();
    },
    getdate() {
      // this.utilscommit.request("nvsi_getOrgInfo",{"areaid":this.areaid,"groupid":this.groupid}, this.callback_groupinformation);//团体详情
      this.utilscommit.requestapi(
        "getTeamInfoWeb",
        { areaid: this.areaid, id: this.groupid },
        this.callback_groupinformation
      ); //团体详情
    },
    getList: function() {
      //
      if (this.nowIndex == 1) {
        var proParam = {
          albx0021: this.groupInfo.albe0012,
          teamId: this.groupid,
          pageNum: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.requestapi(
          "queryTeamProPageWeb",
          proParam,
          this.callback_groupinfoPro
        ); //发起的项目
      } else if (this.nowIndex == 2) {
        var data = {
          ofid: this.groupid,
          type: "1",
          areaid: this.areaid,
          pageNow: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.request(
          "nvsi_listMainMessage",
          data,
          this.mainMessageBack
        );
      }
    },
    mainMessageBack: function(result) {
      if (result && result.data) {
        this.mainMessageList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.projectList = {};
        this.common.getTolData(this);
      }
    },
    callback_groupinformation(result) {
      if (result && result.data) {
        let item = result.data;
        let provinceId = item.albe0012.slice(0, 2);
        if (provinceId == "98") {
          //新疆兵团
          item.defaultImg = require("../../assets/img/grodefault/65.png");
        } else {
          item.defaultImg = require("../../assets/img/grodefault/" +
            provinceId +
            ".png");
        }
        this.groupInfo = item;
      }
    },
    callback_groupinfoPro(data) {
      if (data && data.data) {
        this.projectList = data.data;
        this.common.getTolData(data);
      } else {
        this.projectList = [];
        this.common.getTolData();
      }
    },
    toWB() {
      var e = encodeURIComponent(window.location.href);
      var t = encodeURIComponent(document.title);
      var s =
        "http://service.weibo.com/share/share.php?title=" +
        t +
        " &url=" +
        e +
        "l &source=bookmark &appkey=2992571369 &pic=0 &ralateUid=#_loginLayer_1520419214343";
      window.open(s);
    },
    showMapg() {
      //查看地图
      var map = new BMap.Map("groupinfomap");
      var point = new BMap.Point(116.404, 39.915);
      if (
        this.groupInfo.albe0050 &&
        this.groupInfo.albe0051 &&
        this.groupInfo.albe0050 != 0 &&
        this.groupInfo.albe0051 != 0
      )
        point = new BMap.Point(
          this.groupInfo.albe0050,
          this.groupInfo.albe0051
        );
      map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
      map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
      map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
      map.enableScrollWheelZoom(); //启用滚轮放大缩小
      // 选择地图类型 (默认是地图,卫星,三维),这里只引用了地图和卫星两种
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP]
        })
      );
      map.setCurrentCity("北京市"); // 设置地图显示的城市 此项是必须设置的
      var mkr = new BMap.Marker(point);
      map.addOverlay(mkr);
      $(".mask.mapgroupinfo").addClass("active");
    },
    closeMapg() {
      $(".mask.mapgroupinfo").removeClass("active");
    },
    closeVX: function() {
      $("#qrcode").empty();
      $(".mask.vxg").removeClass("active");
    },
    showComplain: function() {
      this.changeImgCode();
      this.countdown == 0;
      $(".mask.complain").addClass("active");
    },
    closeComplain: function() {
      $(".mask.complain").removeClass("active");
      $(".form-error").html("");
      this.content = this.name = this.card = this.phone = this.imgcode = "";
    },
    contentCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.content) {
        tip = "投诉内容不能为空";
        flag = false;
      }
      this.formTip("content", tip);
      return flag;
    },
    nameCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.name) {
        tip = "投诉人姓名不能为空";
        flag = false;
      }
      this.formTip("name", tip);
      return flag;
    },
    cardCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.card) {
        tip = "身份证号码不能为空";
        flag = false;
      } else if (!this.common.checkCardNo(this.card)) {
        tip = "请填写正确的身份证号码";
        flag = false;
      }
      this.formTip("card", tip);
      return flag;
    },
    phoneCheck: function() {
      var tip = "";
      var flag = true;
      if (!this.phone) {
        tip = "手机号码不能为空";
        flag = false;
      } else if (!this.common.checkPhoneno(this.phone)) {
        tip = "请填写正确的手机号码";
        flag = false;
      }
      this.formTip("phone", tip);
      return flag;
    },
    /*  codeCheck:function () {
        var tip='';
        var flag = true;
        var type = 1;
        if(!this.code) {
          tip='验证码不能为空';
          flag = false;
          type = 2;
        } else if (this.code.length!=6) {
          tip='请输入6位手机验证码';
          flag = false;
          type = 2;
        }
        if(!flag&&this.status==1){
          $('#code').focus();
          this.status = 0;
        }
        this.formTip("code",tip,type);
        return flag;
      }, */
    changeImgCode: function() {
      this.imgcode = "";
      this.utilscommit.request(
        "nvsi_getImageCode",
        null,
        this.changeImgCodeBack
      );
    },
    changeImgCodeBack(data) {
      //图片验证码获取结果
      if (data && data.data) {
        $("#reg_image").attr("src", data.data.img);
        this.imgkey = data.data.imgkey;
      }
    },
    imgCodeCheck: function() {
      // this.imgCodeFlag = false;
      this.tip = "";
      this.type = 1;
      var flag = true;
      if (!this.imgcode) {
        this.tip = "图文验证码不能为空";
        this.type = 2;
        flag = false;
      }
      if (!flag && this.status == 1) {
        $("#inputImgCode").focus();
        this.status = 0;
      }
      this.formTip("imgCode", this.tip, this.type);
      return flag;
      /*  else{
          this.imgcode = this.common.trimAll(this.imgcode).toUpperCase();
          this.utilscommit.request('nvsi_getImgCodeCheck',{"imgcode":this.imgcode,imgkey:this.imgkey},this.callback3);
        } */
    },
    /*  callback3:function (result) {
        if (result) {
          if (result.data) {
            this.imgCodeFlag = true;
          } else {
            this.tip = result.message;
            this.type = 2;
            Vues.changeImgCode()
          }
        }
        if(this.status==1){
          $('#inputImgCode').focus();
          this.status = 0;
        }
        this.formTip("imgCode",this.tip,this.type);
      }, */
    /* getCode:function () {
        this.status = 1;
        if (!this.contentCheck() || !this.nameCheck() || !this.cardCheck() || !this.phoneCheck() || !this.imgCodeFlag) {
          return null;
        }
        var code = this.common.trimAll(this.imgcode).toUpperCase();
        var data = {
          "name":"NVSI",
          "phonenum":this.phone,
          "userflag":"NVSI",
          "areaid":"0",
          "imgCode":code,
          imgkey:this.imgkey
        };
        this.utilscommit.request("nvsi_getMobileCode",data,this.getPhoneCodeBack);
      },
      getPhoneCodeBack:function (result) {
        if(result) {
          this.setTime();
        }
      },
      setTime:function () {
        if (this.countdown == 0) {
         $('#codebutton').removeAttr('disabled');
          this.codeButton = "获取验证码";
          this.countdown = 60;
          return;
        } else {
          $('#codebutton').attr('disabled',true);
          this.codeButton=this.countdown + "s";
          this.countdown--;
        }
        this.timer=setTimeout(function() {
          Vues.setTime();
        },1000);
      }, */
    onSubmit: function() {
      //提交投诉
      /* if (!this.imgCodeFlag) {
          this.imgCodeCheck();
          $('#inputImgCode').focus();
        } */
      if (
        this.contentCheck() &&
        this.nameCheck() &&
        this.cardCheck() &&
        this.phoneCheck() &&
        this.imgCodeCheck()
      ) {
        var data = {
          albx3702: "2",
          albx3703: this.groupid, //被投诉对象
          albx3715: this.groupInfo.albe0002, //被投诉对象名称
          albx3704: this.name, //投诉者姓名
          albx3705: this.card, //身份证
          albx3706: this.phone, //手机
          albx3710: this.content, //内容
          areaid: this.areaid,
          code: this.imgcode,
          imgkey: this.imgkey
        };
        this.utilscommit.request("nvsi_insertComplain", data, function(result) {
          if (result) {
            if (result.data) {
              Vues.closeComplain();
              Vues.$swal("投诉提交成功！", { buttons: "确定" });
            } else {
              Vues.$swal(result.message, { buttons: "确定" }).then(() => {
                Vues.changeImgCode();
              });
            }
          }
        });
      }
    },
    clickTabbarSpan() {
      $(".tabbar span").each(function(idx, el) {
        if (Vues.nowIndex) {
          $(el).removeClass("active");
          $(".tabbar-down")
            .eq(Vues.nowIndex)
            .show()
            .siblings(".tabbar-down")
            .hide();
          $(".tabbar-down")
            .eq(Vues.nowIndex)
            .show()
            .siblings(".tabbar-down")
            .hide();
          $(".tabbar-down")
            .eq(Vues.nowIndex)
            .show()
            .siblings(".tabbar-down")
            .hide();
        }
        $(el).click(function() {
          Vues.nowIndex = idx;
          if (idx == 1 || idx == 2) {
            //刷新项目列表和留言
            Vues.pageNow = 1;
            Vues.getList();
          }
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
    },
    imgError(el) {
      el.target.src = i1;
    },
    imgError2(el) {
      el.target.src = avatar;
    },
    toLinkGroup(orgid, areaid) {
      window.open(
        this.$router.resolve({ path: `/groupInfo/${orgid}/${areaid}` }).href
      );
    },
    toProjectInfo: function(projectid, areaid) {
      window.open(
        this.$router.resolve({ path: `/projectInfo/${projectid}/${areaid}` })
          .href
      );
    },
    toDetailInfo: function(volnum, albp0020, orgid, albe0012) {
      if (volnum) {
        window.open(
          this.$router.resolve({ path: `/volinfo/${volnum}/${albp0020}` }).href
        );
      } else if (orgid) {
        window.open(
          this.$router.resolve({ path: `/groupInfo/${orgid}/${albe0012}` }).href
        );
      }
    },
    formTip(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    }
  }
};
</script>

<style scoped>
.mask.complain.active .mask-info {
  transform: translateY(-50%) scale(1);
}
.activity-tit em {
  font-size: 16px;
  color: #2c5abd;
  font-weight: normal;
  margin: 0;
  padding-bottom: 15px;
}
.activity-tit span {
  margin: 0 15px 0 15px;
}
.line-message {
  border-top: 1px solid #f0f0f0;
}
.table-list th {
  text-align: left;
}
.table-list .pointer {
  cursor: pointer;
  color: #2c5abd;
}
.form input,
.form textarea,
.input,
.textarea {
  line-height: 20px;
  height: 33px;
}
.button-line {
  line-height: 33px;
}
.button {
  height: 33px;
  line-height: 33px;
}
.form .form_textarea {
  height: 70px;
  font-family: Arial;
}
.form .form_textarea::-webkit-input-placeholder {
  color: #bbb;
  font-family: microsoft yahei;
}
</style>
