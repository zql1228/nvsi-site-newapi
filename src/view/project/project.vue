<template>
  <div id="project">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <router-link tag="a" :to="{ name: 'home' }">首页</router-link>
              <router-link tag="a" :to="{ name: 'project' }"
                >志愿项目</router-link
              >
            </div>
          </li>
        </ul>
        <div class="section">
          <div class="category">
            <h2 class="category__title">项目区域</h2>
            <div class="category__content">
              <!-- <a
                href="javascript:void(0);"
                class="category__item active"
                @click="areaChoose($event)"
                >全部</a
              > -->
              <a
                href="javascript:void(0);"
                :class="
                  item.areaid == '100000000000000000'
                    ? 'category__item active'
                    : 'category__item'
                "
                v-for="(item, index) in firstAreaList"
                :key="index"
                @click="areaChoose($event, item.areaid, 1)"
                >{{ item.areaname }}</a
              >
            </div>
            <div class="category__wrap" style="display: none">
              <div class="category__content">
                <a
                  href="javascript:void(0);"
                  class="category__item active"
                  @click="areaChoose($event, firstArea, 2)"
                  >全部</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  v-for="item in secondAreaList"
                  :key="item.id"
                  @click="areaChoose($event, item.areaid, 2)"
                  >{{ item.areaname }}</a
                >
              </div>
            </div>
          </div>
          <div class="category">
            <h2 class="category__title">服务类别</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="serviceTypeChoose($event)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in typeList"
                :key="item.id"
                @click="serviceTypeChoose($event, item.albe0123)"
                >{{ item.albe0122 }}</a
              >
            </div>
          </div>
          <div class="category">
            <h2 class="category__title">项目状态</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="projectStateChoose($event, '')"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="projectStateChoose($event, '3')"
                >待启动</a
              >
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="projectStateChoose($event, '4')"
                >运行中</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="projectStateChoose($event, '5')"
                >已结项</a
              >
            </div>
          </div>
          <div class="category project-hide">
            <h2 class="category__title">报名范围</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="applyScopeChoose($event, '')"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in scopeList.filter(
                  obj => obj.codeid != 4 && obj.codeid != 5
                )"
                :key="item.id"
                @click="applyScopeChoose($event, item.codeid)"
                >{{ item.codevalue }}</a
              >
            </div>
          </div>
          <div class="category project-hide">
            <h2 class="category__title">服务对象</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="serviceObjChoose($event)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in objectList"
                :key="item.id"
                @click="serviceObjChoose($event, item.codeid)"
                >{{ item.codevalue }}</a
              >
            </div>
          </div>
          <div class="category project-hide">
            <h2 class="category__title">项目人数</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="numChoose($event)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '0')"
                >0</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '1-100')"
                >1-100</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '101-200')"
                >101-200</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '201-500')"
                >201-500</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '501-1000')"
                >501-1000</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                @click="numChoose($event, '1001')"
                >1000以上</a
              >
            </div>
          </div>
          <div class="category-handle">
            <span @click="getMoreHide($event)">收起</span>
            <span class="hidden" @click="getMoreShow($event)">更多条件</span>
          </div>
          <ul class="row w">
            <li class="col v-m" style="width: 90%">
              <span class="label">项目起止日期</span>
              <date-picker
                :lang="lang"
                v-model="startTime"
                style="width: 120px"
                valueType="format"
              ></date-picker>
              <span class="label">至</span>
              <date-picker
                :lang="lang"
                v-model="endTime"
                style="width: 120px"
                valueType="format"
              ></date-picker>
              <span class="label">项目编号</span>
              <input
                type="text"
                class="input"
                style="width: 180px; height: 34px"
                v-model="projectId"
                maxlength="18"
              />
              <span class="label">项目名称</span>
              <input
                type="text"
                class="input"
                style="width: 180px; height: 34px"
                v-model="projectName"
                maxlength="30"
              />
              <a
                href="javascript:void(0);"
                class="button button-small"
                @click="getProjectList"
                style="height: 34px; line-height: 34px"
                >搜索</a
              >
              <a
                href="javascript:void(0);"
                class="button button-small"
                style="
                  margin-left: 6px;
                  background-color: #ccc;
                  height: 34px;
                  line-height: 34px;
                "
                @click="restSearch($event)"
                >重置</a
              >
            </li>
            <!-- <li class="col v-m t-r">
              <div class="text-tab" style="margin-right: -10px">
                <a
                  href="javascript:void(0);"
                  id="list"
                  class="active"
                  @click="getList($event, 0)"
                >
                  列表</a
                >
                <a
                  href="javascript:void(0);"
                  id="map"
                  @click="getList($event, 1)"
                  >地图</a
                >
              </div>
            </li> -->
          </ul>
          <div id="getList">
            <ul class="panel-list">
              <!-- 没有结果时 -->
              <li
                class="panel-list__item"
                v-if="!querystatus && tolPage == 0"
                style="width: 100%; text-align: center"
              >
                <img src="@/assets/img/js-wujilu.png" />
              </li>
              <!-- 加载 -->
              <li
                class="panel-list__item"
                v-if="querystatus == 1 && tolPage == 0"
                style="width: 100%; text-align: center"
              >
                <img
                  src="@/assets/img/loader.png"
                  style="margin-right: 5px"
                /><span
                  style="
                    font-size: 16px;
                    color: #666666;
                    vertical-align: middle;
                  "
                  >加载中...</span
                >
              </li>
              <!-- 项目列表 -->
              <li
                class="panel-list__item"
                style="width: 25%"
                v-for="item in projectList"
                :key="item.id"
              >
                <div
                  class="panel-card"
                  @click="toProjectInfo(item.id, item.albx0021)"
                >
                  <img
                    :src="common.changeImgsrc(item.fileid)"
                    @error="imgError($event, item.defaultImg)"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-if="item.fileid"
                  />
                  <img
                    :src="item.defaultImg"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else-if="item.defaultImg"
                  />
                  <img
                    src="../../assets/img/i3.png"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else
                  />
                  <p class="t-c">
                    <a
                      href="javascript:void(0);"
                      class="button button-small warning round"
                      v-if="item.albx0072 == 3"
                      >待启动</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="button button-small success round"
                      v-if="item.albx0072 == 4"
                      >运行中</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="button button-small button-small round"
                      v-if="item.albx0072 == 5 || item.albx0072 == 6"
                      >已结项</a
                    >
                  </p>
                  <h2 class="panel-card__name">
                    <a href="javascript:void(0);" :title="item.albx0002">{{
                      item.albx0002 | ellipsis(12)
                    }}</a>
                  </h2>
                  <ul class="row w panel-card__info">
                    <li class="col v-m">
                      <h2>岗位</h2>
                      <!-- <p>{{item.albx0043 || '0'}}个</p> -->
                      <p
                        v-text="
                          item.albx0043 && item.albx0043 != 'null'
                            ? item.albx0043 + '个'
                            : '0个'
                        "
                      ></p>
                    </li>
                    <li class="col v-m">
                      <h2>目标</h2>
                      <!-- <p>{{item.albx0044 || '0'}}人</p> -->
                      <p
                        v-text="
                          item.albx0044 && item.albx0044 != 'null'
                            ? item.albx0044 + '个'
                            : '0个'
                        "
                      ></p>
                    </li>
                    <li class="col v-m">
                      <h2>报名</h2>
                      <!-- <p>{{item.albx0016 || '0'}}人</p> -->
                      <p
                        v-text="
                          item.albx0016 && item.albx0016 != 'null'
                            ? item.albx0016 + '个'
                            : '0个'
                        "
                      ></p>
                    </li>
                  </ul>
                  <div class="progress" style="text-align: left">
                    <span class="bar" :style="'width:' + item.progress"></span>
                  </div>
                  <p class="row w">
                    <span class="col v-m"
                      >项目进度：<b>{{ item.progress }}</b></span
                    >
                    <span class="col v-m t-r"
                      ><em
                        class="danger"
                        v-text="
                          (item.albx0072 == 3 && '离招募开始：') ||
                            (item.albx0072 == 4 && '离招募结束：') ||
                            ((item.albx0072 == 5 || item.albx0072 == 6) &&
                              '项目已结束：')
                        "
                      ></em
                      ><b>{{ item.days }}天</b></span
                    >
                  </p>
                </div>
              </li>
            </ul>
            <!-- 分页 -->
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
          <!-- 地图 -->
          <div id="getMap" style="display: none">
            <div
              class="map"
              style="height: 680px; margin-top: 30px"
              id="projectMap"
            ></div>
          </div>
        </div>
      </div>
      <!-- 推荐项目 -->
      <div
        class="tj-bj"
        v-lazy:background-image="tjBj"
        v-if="projectTjList.length"
        style="height: 440px"
      >
        <div class="mid">
          <div
            class="tabbar protabbar"
            style="margin-top: 40px; background: none"
          >
            <span
              class="active"
              style="
                display: block;
                position: relative;
                text-align: center;
                font-size: 18px;
                border-bottom: none;
                margin-left: 0;
              "
              >推荐项目</span
            >
          </div>
          <!-- <span @click="moreRecommend">更多</span> -->
          <ul class="panel-list" style="margin-top: 0">
            <li
              class="panel-list__item"
              style="width: 25%"
              v-for="item in projectTjList"
              :key="item.id"
            >
              <div
                class="panel-card"
                @click="toProjectInfo(item.id, item.albx0021)"
                style="background: rgb(255, 255, 255)"
              >
                <img
                  :src="common.changeImgsrc(item.fileid)"
                  @error="imgError($event, item.defaultImg)"
                  style="width: 260px; height: 170px"
                  alt=""
                  v-if="item.fileid"
                />
                <img
                  :src="item.defaultImg"
                  style="width: 260px; height: 170px"
                  alt=""
                  v-else-if="item.defaultImg"
                />
                <img
                  src="../../assets/img/i3.png"
                  style="width: 260px; height: 170px"
                  alt=""
                  v-else
                />
                <p class="t-c">
                  <a
                    href="javascript:void(0);"
                    class="button button-small warning round"
                    v-if="item.albx0072 == 2"
                    >招募待启动</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="button button-small success round"
                    v-if="item.albx0072 == 3"
                    >招募中</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="button button-small button-small round"
                    v-if="item.albx0072 == 4 || item.albx0072 == 5"
                    >招募已结束</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="button button-small button-small info round"
                    v-if="item.albx0072 == 6 || item.albx0072 == 7"
                    >已结项</a
                  >
                </p>
                <h2 class="panel-card__name">
                  <a href="javascript:void(0);" :title="item.albx0002">{{
                    item.albx0002 | ellipsis(12)
                  }}</a>
                </h2>
                <ul class="row w panel-card__info">
                  <li class="col v-m">
                    <h2>岗位</h2>
                    <!-- <p>{{item.albx0043 || '0'}}个</p> -->
                    <p
                      v-text="
                        item.albx0043 && item.albx0043 != 'null'
                          ? item.albx0043 + '个'
                          : '0个'
                      "
                    ></p>
                  </li>
                  <li class="col v-m">
                    <h2>目标</h2>
                    <!-- <p>{{item.albx0044 || '0'}}人</p> -->
                    <p
                      v-text="
                        item.albx0044 && item.albx0044 != 'null'
                          ? item.albx0044 + '个'
                          : '0个'
                      "
                    ></p>
                  </li>
                  <li class="col v-m">
                    <h2>报名</h2>
                    <!-- <p>{{item.albx0016 || '0'}}人</p> -->
                    <p
                      v-text="
                        item.albx0016 && item.albx0016 != 'null'
                          ? item.albx0016 + '个'
                          : '0个'
                      "
                    ></p>
                  </li>
                </ul>
                <div class="progress" style="text-align: left">
                  <span class="bar" :style="'width:' + item.progress"></span>
                </div>
                <p class="row w">
                  <span class="col v-m"
                    >项目进度：<b>{{ item.progress }}</b></span
                  >
                  <span class="col v-m t-r"
                    ><em
                      class="danger"
                      v-text="
                        (item.albx0072 == 3 && '离招募开始：') ||
                          (item.albx0072 == 4 && '离招募结束：') ||
                          ((item.albx0072 == 5 || item.albx0072 == 6) &&
                            '项目已结束：')
                      "
                    ></em
                    ><b>{{ item.days }}天</b></span
                  >
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const pagination = () => import("@/components/pagination.vue"); //分页
import i3 from "../../assets/img/i3.png";
import map_pro from "../../assets/img/map_pro.png";
export default {
  name: "project",
  components: {
    pagination //分页
  },
  data() {
    return {
      areaid: "",
      firstAreaList: [], //项目区域（一级区域）
      firstArea: "", //一级所选区域
      secondAreaList: [], //项目区域（二级区域）
      projectAreaId: "", //项目区域
      typeList: [], //服务类别
      serviceTypeId: "", //服务类型
      projectStateId: "04", //项目状态
      scopeList: [], //报名范围
      applyScope: "", //报名范围
      objectList: [], //服务对象
      serviceObj: "", //服务对象
      minCount: "", //最小人数
      maxCount: "", //最大人数
      recommend: "", //是否为推荐
      startTime: "",
      endTime: "",
      projectId: "", //项目id
      projectName: "", //项目名称
      projectList: [], //项目集合
      projectTjList: [], //推荐项目
      area_pos: [],
      markerArr: [],
      type: 0, //列表or地图
      lang: {
        //配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 12, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1, //记录输入框中的值
      tjBj: require("@/assets/img/tj-bg-img.png"),
      querystatus: 0 //查询状态
    };
  },
  created() {
    window.Vues = this;
    if (window.Vueh && Vueh.searchtype == 2) this.projectName = Vueh.searchtext; //全局搜索
    this.getdate();
    this.codeValue.codeValueQueryFortisWeb(
      "nvsi_albx0014",
      { tablename: "nvsi_albx0014" },
      this.callback_projectFwdx
    ); //服务对象
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albx0014" },
    //   this.callback_projectFwdx
    // ); //服务对象
    this.codeValue.codeValueQueryFortisWeb(
      "nvsi_albx0024",
      { tablename: "nvsi_albx0024" },
      this.callback_projectFwfw
    ); //报名范围
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albx0024" },
    //   this.callback_projectFwfw
    // ); //报名范围
    window.toProjectInfo = this.toProjectInfo;
  },
  mounted() {
    var type = this.common.getCookie("maptype");
    if (type) {
      this.type = type;
      $("#map")
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.common.deleteCookie("maptype");
    }
    this.getList(null, this.type);
  },
  methods: {
    pageEvent: function(e) {
      //分页
      this.getProjectList();
    },
    getdate() {
      this.utilscommit.requestapi(
        "getNextAreaListFortisWeb",
        { areaid: "" },
        this.callback_projectYjqy
      ); //一级区域
      this.utilscommit.requestapi(
        "getServiceTypeList",
        { areaid: "0" },
        this.callback_projectFwlb
      ); //服务类别
      /* this.utilscommit.request(
        "nvsi_listRecommendProject",
        { pageNow: 1, pageSize: 4 },
        this.callback_projectTj
      ); //推荐项目 */
    },
    callback_projectYjqy(data) {
      //一级区域
      if (data && data.data) {
        this.firstAreaList = this.common.orderBy(data.data, "areaid", "asc");
      }
    },
    callback_projectSjqy(result) {
      //二级区域
      if (result && result.data) {
        this.secondAreaList = this.common.orderBy(result.data, "areaid", "asc");
        if (this.projectAreaId) {
          $(".category__wrap")
            .find(".category__item")
            .first()
            .addClass("active")
            .siblings()
            .removeClass("active");
          $(".category__wrap").show();
        }
      } else {
        this.secondAreaList = {};
        $(".category__wrap").hide();
      }
    },
    callback_projectFwlb(data) {
      //服务类别
      if (data && data.data) {
        this.typeList = data.data;
      }
    },
    callback_projectFwdx(data) {
      //服务对象
      if (data) {
        this.objectList = this.common.orderBy(data, "codeid", "asc");
      }
    },
    callback_projectFwfw(data) {
      //报名范围
      if (data) {
        var ret = data;
        for (var i = 0; i < ret.length; i++) {
          if (ret[i].codeid == "4" || ret[i].codeid == "5") {
            ret.splice(i, 1);
          }
        }
        this.scopeList = ret; //报名范围
      }
    },
    callback_projectTj(data) {
      //推荐项目
      if (data && data.data) {
        let list = data.data;
        list.forEach(element => {
          if (element.albx0009) {
            let type = element.albx0009.split(",")[0];
            //type 为项目的服务类别第一项,静态图片只有 0001~0019 以及 0099 即parseInt(type)小于20的即可
            if (type && parseInt(type) < 20) {
              element.defaultImg = require("../../assets/img/prodefault/" +
                type +
                ".png");
            } else {
              element.defaultImg = require("../../assets/img/prodefault/0099.png");
            }
          } else {
            element.defaultImg = require("../../assets/img/prodefault/0099.png");
          }
        });
        this.projectTjList = list;
      }
    },
    areaChoose(e, areaid, layerNumber) {
      //区域选择
      this.projectAreaId = areaid;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.getProjectList();
      if (!layerNumber || areaid == "100000000000000000") {
        $(".category__wrap").hide();
      } else {
        if (1 == layerNumber && areaid != "100000000000000000") {
          this.firstArea = areaid;
          this.utilscommit.requestapi(
            "getNextAreaListFortisWeb",
            { areaid: areaid },
            this.callback_projectSjqy
          ); //二级区域
        }
      }
    },
    serviceTypeChoose(e, serviceTypeId) {
      //服务类型
      this.serviceTypeId = serviceTypeId;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.pageNow = 1;
      this.getProjectList();
    },
    projectStateChoose(e, statusId) {
      //项目状态
      this.projectStateId = statusId;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.pageNow = 1;
      this.getProjectList();
    },
    applyScopeChoose(e, applyScope) {
      //报名范围
      this.applyScope = applyScope;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.pageNow = 1;
      this.getProjectList();
    },
    serviceObjChoose(e, serviceObj) {
      //服务对象
      this.serviceObj = serviceObj;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.pageNow = 1;
      this.getProjectList();
    },
    numChoose(e, num) {
      //项目人数
      if (num) {
        if (num == "0") {
          this.minCount = "0";
          this.maxCount = "0";
        } else if (num == "1001") {
          this.minCount = "1001";
          this.maxCount = null;
        } else {
          this.minCount = num.substring(0, num.indexOf("-"));
          this.maxCount = num.substring(num.indexOf("-") + 1, num.length);
        }
      } else {
        this.minCount = null;
        this.maxCount = null;
      }
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.pageNow = 1;
      this.getProjectList();
    },
    restSearch() {
      //重置
      this.startTime = "";
      this.endTime = "";
      this.projectId = "";
      this.projectName = "";
    },
    getProjectList() {
      //加载项目数据
      if (this.projectName) Vueh.searchtext = this.projectName; //全局搜索
      if (this.type == 0) {
        //列表
        this.pageSize = 12;
        let params = {
          pageNum: this.pageNow,
          pageSize: this.pageSize,
          itemtag: "", // 项目标签
          itemcategory: "", // 项目类别
          min: this.minCount, // 项目人数（报名人数）起
          max: this.maxCount, // 项目人数（报名人数）止
          albx0072: this.projectStateId || 3, // 项目状态
          albx0072A: this.projectStateId ? null : 6, // 项目状态，查全部
          albx0024: this.applyScope, // 报名范围
          albx0004: this.startTime, // 项目日期起
          albx0005: this.endTime, // 项目日期止
          albx0013: this.projectId, // 项目编号
          albx0021:
            this.projectAreaId == "" ||
            this.projectAreaId == "100000000000000000"
              ? "100000000000000000"
              : this.projectAreaId, // 区域ID
          albx0014: this.serviceObj, // 服务对象
          albx0002: this.projectName, // 项目名称
          albx0009: this.serviceTypeId, // 服务类型
          code: "4" // 控制不显示不公开招募和结项的项目
        };
        // 在已结项中类别中才查询已结项和补录两种状态
        if (this.projectStateId == "5") {
          params.albx0073 = 18;
          params.albx0073A = 20;
          params.albx0072 = null;
          params.albx0072A = null;
        }
        // 判断当前选择的区域是一级区域还是二级区域
        if (params.albx0021.substr(2, 2) * 1 == 0) {
          params.axaa0001 = params.albx0021.substr(0, 2);
        } else {
          params.axaa0001 = params.albx0021.substr(0, 2);
          params.axaa0002 = params.albx0021.substr(0, 4);
        }
        this.querystatus = 1;
        this.projectList = [];
        this.common.getTolData(this);

        this.utilscommit.requestapi(
          "listProjectsFortisWeb",
          params,
          this.callback_project
        );
      } else if (this.type == 1) {
        //地图
        this.pageSize = 100;
        var data = {
          albx0021: this.projectAreaId, //项目区域
          albx0009: this.serviceTypeId, //服务类型
          albx0015: this.projectStateId, //项目状态
          albx0024: this.applyScope, //报名范围
          albx0014: this.serviceObj, //服务对象
          min: this.minCount, //最小人数
          max: this.maxCount, //最大人数
          albx0004: this.startTime, //项目日期起
          albx0005: this.endTime, //项目日期止
          albx0013: this.projectId, //项目ID
          albx0002: this.projectName, //项目名称
          // "areaid":this.areaid,
          pageNow: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.request(
          "nvsi_listProjectOnMap",
          data,
          this.callback_project
        ); //网站项目
      }
    },
    callback_project(data) {
      //获取项目数据
      this.querystatus = 0;
      if (data && data.data) {
        let list = data.data;
        //设置项目的默认图片-列表
        if (this.type == 0) {
          list.forEach(element => {
            if (element.albx0009) {
              let type = element.albx0009.split(",")[0];
              //type 为项目的服务类别第一项,静态图片只有 0001~0019 以及 0099 即parseInt(type)小于20的即可
              if (type && parseInt(type) < 20) {
                element.defaultImg = require("../../assets/img/prodefault/" +
                  type +
                  ".png");
              } else {
                element.defaultImg = require("../../assets/img/prodefault/0099.png");
              }
            } else {
              element.defaultImg = require("../../assets/img/prodefault/0099.png");
            }
          });
        }
        this.projectList = list;
        this.common.getTolData(this, data); //获取分页数据
      } else {
        this.projectList = [];
        this.common.getTolData(this);
      }
      if (this.type == 1) {
        this.getMapData();
      } else {
        $("html, body").animate({ scrollTop: $("#header").offset().top }, 20); //以20毫秒的速度向header标签滚动
      }
    },
    getMoreHide(e) {
      $(".project-hide").hide();
      $(e.target)
        .addClass("hidden")
        .siblings()
        .removeClass("hidden");
    },
    getMoreShow(e) {
      $(".project-hide").show();
      $(e.target)
        .addClass("hidden")
        .siblings()
        .removeClass("hidden");
    },
    getList(e, type) {
      this.type = type;
      this.getProjectList();
      if (e) {
        $(e.target)
          .addClass("active")
          .siblings()
          .removeClass("active");
      }
      if (type == 0) {
        $("#getList").show();
        $("#getMap").hide();
      } else {
        $("#getList").hide();
        $("#getMap").show();
      }
    },
    getMapData() {
      this.area_pos = [];
      this.markerArr = [];
      if (this.projectList) {
        for (var a = 0; a < this.projectList.length; a++) {
          var gaddress = this.projectList[a].albx0012;
          if (!gaddress) gaddress = "";
          this.area_pos.push({
            title: this.projectList[a].albx0002,
            content:
              "联系人：" +
              this.projectList[a].albx0025 +
              "<br>地区：" +
              gaddress +
              "<br><br>" +
              "<a href='javascript:void(0);' onclick='toProjectInfo(\"" +
              this.projectList[a].id +
              '","' +
              this.projectList[a].albx0021 +
              "\")'>查看详情</a>",
            point:
              this.projectList[a].albx0035 + "," + this.projectList[a].albx0036
          });
        }
        for (var i = 0; i < this.area_pos.length; i++) {
          this.markerArr.push({
            title: this.area_pos[i].title,
            content: this.area_pos[i].content,
            point: this.area_pos[i].point,
            isOpen: 0,
            icon: { w: 21, h: 25, l: 46, t: 21, x: 6, lb: 15 }
          });
        }
      }
      this.getMaps.initMap(
        this.markerArr,
        "projectMap",
        this.projectList[0],
        map_pro
      ); //创建和初始化地图
    },
    toProjectInfo(id, areaid) {
      window.open(
        this.$router.resolve({ path: `/projectInfo/${id}/${areaid}` }).href
      );
    },
    imgError(el, defaultImg) {
      if (defaultImg) {
        el.target.src = defaultImg;
      } else {
        el.target.src = i3;
      }
    },
    moreRecommend() {
      this.recommend = "1";
      this.getProjectList();
      $(".tj-bj").hide();
      $(".recommend").show();
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$router.go(0); //刷新页面
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      this.$router.go(0); //刷新页面
    }
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
