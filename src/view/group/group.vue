<template>
  <div id="group">
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
              <a href="javascript:void(0);">
                <router-link tag="span" :to="{ name: 'group' }"
                  >志愿队伍</router-link
                >
              </a>
            </div>
          </li>
        </ul>
        <div class="section">
          <div class="category">
            <h2 class="category__title">队伍属地</h2>
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
                v-for="item in firstAreaList"
                :key="item.id"
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
          <div class="category project-hide">
            <h2 class="category__title">单位类型</h2>
            <div class="category__content">
              <a
                href="javascript:void(0);"
                class="category__item active"
                @click="orgTypeChoose($event)"
                >全部</a
              >
              <a
                href="javascript:void(0);"
                class="category__item"
                v-for="item in orgTypeList"
                :key="item.id"
                @click="orgTypeChoose($event, item.codeid)"
                >{{ item.codevalue }}</a
              >
            </div>
          </div>
          <div class="category project-hide">
            <h2 class="category__title">队伍人数</h2>
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
            <li class="col v-m" style="width: 91%">
              <span class="label">队伍登记日期</span>
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
              <span class="label">队伍联络编号</span>
              <input
                type="text"
                class="input"
                style="width: 200px; height: 34px"
                v-model="groupId"
                maxlength="18"
              />
              <span class="label">队伍名称</span>
              <input
                type="text"
                class="input"
                style="width: 200px; height: 34px"
                v-model="groupName"
                maxlength="30"
              />
              <a
                href="javascript:void(0);"
                class="button button-small"
                @click="getOrgList"
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
              <div class="text-tab" style="margin-right:-10px;">
                <a
                  href="javascript:void(0);"
                  @click="getList($event, 0)"
                  class="active"
                  >列表</a
                >
                <a href="javascript:void(0);" @click="getList($event, 1)"
                  >地图</a
                >
              </div>
            </li> -->
          </ul>
          <div id="getList">
            <ul class="panel-list panel-lists">
              <li
                class="panel-list__item"
                v-if="tolPage == 0 && !querystatus"
                style="width: 100%; text-align: center"
              >
                <img src="@/assets/img/js-wujilu.png" />
              </li>

              <li
                class="panel-list__item"
                style="width: 100%; text-align: center"
                v-if="tolPage == 0 && querystatus == 1"
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
              <li
                class="panel-list__item"
                style="width: 25%"
                v-for="(item, index) in groupList"
                :key="index"
                @click="toGroupInfo(item.id, item.albe0012)"
              >
                <div class="panel-card">
                  <img
                    :src="common.changeImgsrc(item.orgphoto, 1)"
                    @error="imgError($event, item.defaultImg)"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-if="item.orgphoto"
                  />
                  <img
                    :src="item.defaultImg"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else-if="item.defaultImg"
                  />
                  <img
                    src="../../assets/img/i1.png"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else
                  />
                  <h2 class="panel-card__name" style="margin-top: 20px">
                    <a href="javascript:void(0);" :title="item.albe0002">{{
                      item.albe0002 | ellipsis(12)
                    }}</a>
                  </h2>
                  <p class="row w">
                    <span class="col v-m"
                      >队伍人数：{{ item.albe0056 || "0" }}</span
                    >
                    <span class="col v-m t-r">分项满意度</span>
                  </p>
                  <ul class="row w panel-card__info">
                    <li class="col v-m">
                      <img src="../../assets/img/t1.png" alt="" />
                      <h2>培训</h2>
                      <p>5.0</p>
                    </li>
                    <li class="col v-m">
                      <img src="../../assets/img/t2.png" alt="" />
                      <h2>合作</h2>
                      <p>5.0</p>
                    </li>
                    <li class="col v-m">
                      <img src="../../assets/img/t3.png" alt="" />
                      <h2>计划</h2>
                      <p>5.0</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
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
          <div id="getMap" style="display: none">
            <div
              class="map"
              style="height: 680px; margin-top: 30px"
              id="groupMap"
            ></div>
          </div>
        </div>
      </div>
      <!-- 推荐队伍 -->
      <div
        class="tj-bj"
        v-lazy:background-image="tjBj"
        v-show="groupTjList.length"
        style="height: 410px"
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
              >推荐队伍</span
            >
          </div>
          <ul class="panel-list panel-lists" style="margin-top: 0">
            <li
              class="panel-list__item"
              style="width: 25%"
              v-for="(item, index) in groupTjList"
              :key="index"
              @click="toGroupInfo(item.id, item.albe0012)"
            >
              <div class="panel-card" style="background: rgb(255, 255, 255)">
                <img
                  :src="common.changeImgsrc(item.orgphoto, 1)"
                  @error="imgError($event, item.defaultImg)"
                  style="width: 260px; height: 170px"
                  alt=""
                  v-if="item.orgphoto"
                />
                <img
                  :src="item.defaultImg"
                  style="width: 260px; height: 170px"
                  alt=""
                  v-else-if="item.defaultImg"
                />
                <img
                  src="../../assets/img/i1.png"
                  style="width: 260px; height: 170px"
                  alt=""
                  v-else
                />
                <h2 class="panel-card__name" style="margin-top: 20px">
                  <a href="javascript:void(0);" :title="item.albe0002">{{
                    item.albe0002 | ellipsis(12)
                  }}</a>
                </h2>
                <p class="row w">
                  <span class="col v-m"
                    >队伍人数：{{ item.albe0056 || "0" }}</span
                  >
                  <span class="col v-m t-r">分项满意度</span>
                </p>
                <ul class="row w panel-card__info">
                  <li class="col v-m">
                    <img src="../../assets/img/t1.png" alt="" />
                    <h2>培训</h2>
                    <p>5.0</p>
                  </li>
                  <li class="col v-m">
                    <img src="../../assets/img/t2.png" alt="" />
                    <h2>合作</h2>
                    <p>5.0</p>
                  </li>
                  <li class="col v-m">
                    <img src="../../assets/img/t3.png" alt="" />
                    <h2>计划</h2>
                    <p>5.0</p>
                  </li>
                </ul>
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
import i1 from "../../assets/img/i1.png";
import map_org from "../../assets/img/map_org.png";
export default {
  name: "group",
  components: {
    pagination //分页
  },
  data() {
    return {
      areaid: "", //站点区域
      firstAreaList: [], //团体属地（一级区域）
      firstArea: "", //一级所选区域
      secondAreaList: [], //团体属地（二级区域）
      typeList: [], //服务类别
      serviceTypeId: "", //服务类型
      orgTypeList: [], //团体类型
      orgTypeId: "", //团体类型
      minCount: "", //最小人数
      maxCount: "", //最大人数
      startTime: "",
      endTime: "",
      groupId: "", //团体联络编号
      groupName: "", //团体名称
      orgDependAreaid: "", //团体属地
      groupList: "", //团体集合
      groupTjList: "", //推荐团体
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
      jumpPage: 1, //记录输入框中的值,
      tjBj: require("@/assets/img/tj-bg-img.png"),
      querystatus: 0 //查询状态
    };
  },
  created() {
    window.Vues = this;
    if (window.Vueh && Vueh.searchtype == 3) this.groupName = Vueh.searchtext; //全局搜索
    window.toGroupInfo = this.toGroupInfo;
  },
  mounted() {
    this.getdate(); //初始化请求数据
    this.getOrgList();
  },
  methods: {
    pageEvent: function(e) {
      //分页
      this.getOrgList();
    },
    getdate() {
      this.codeValue.getNextAreaListFortisWeb(
        "areaid",
        { areaid: "" },
        this.callback_projectYjqy
      ); //一级区域
      // this.utilscommit.requestapi(
      //   "getNextAreaListFortisWeb",
      //   { areaid: "" },
      //   this.callback_projectYjqy
      // ); //一级区域
      this.codeValue.getServiceTypeList(
        "areaidServiceTypeList",
        { areaid: "0" },
        this.callback_projectFwlb
      ); //服务类别
      // this.utilscommit.requestapi(
      //   "getServiceTypeList",
      //   { areaid: "0" },
      //   this.callback_projectFwlb
      // ); //服务类别
      this.codeValue.codeValueQueryFortisWeb(
        //团体类型
        "nvsi_albe0005",
        { tablename: "nvsi_albe0005" },
        this.callback_projectTtlx
      );
      // this.utilscommit.requestapi(
      //   "codeValueQueryFortisWeb",
      //   { tablename: "nvsi_albe0005" },
      //   this.callback_projectTtlx
      // ); //团体类型
      // this.utilscommit.request("nvsi_listRecommendGroup",{"pageNow":1,"pageSize":4},this.callback_groupTj);//推荐团体

      this.codeValue.queryTeamPageWeb(
        "groupTjList",
        { albe0036: 1, areaid: "100000000000000000", pageSize: 4, pageNum: 1 },
        this.callback_groupTj
      );
      // this.utilscommit.requestapi(
      //   "queryTeamPageWeb",
      //   { albe0036: 1, areaid: "100000000000000000", pageSize: 4, pageNum: 1 },
      //   this.callback_groupTj
      // ); //推荐团体
    },
    callback_projectYjqy(data) {
      //一级区域
      if (data) {
        this.firstAreaList = this.common.orderBy(data, "areaid", "asc");
      }
    },
    callback_projectSjqy(data) {
      //二级区域
      if (data && data.data) {
        this.secondAreaList = this.common.orderBy(data.data, "areaid", "asc");
        if (this.orgDependAreaid) {
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
      if (data) {
        this.typeList = data;
      }
    },
    callback_projectTtlx(data) {
      //团体类型
      if (data) {
        this.orgTypeList = this.common.orderBy(data, "orderid", "asc");
      }
    },
    callback_groupTj(data) {
      //推荐团体
      if (data) {
        let list = data;
        list.forEach(element => {
          let provinceId = element.albe0012.slice(0, 2);
          if (provinceId == "98") {
            //新疆兵团
            element.defaultImg = require("../../assets/img/grodefault/65.png");
          } else {
            element.defaultImg = require("../../assets/img/grodefault/" +
              provinceId +
              ".png");
          }
        });
        this.groupTjList = list;
      }
    },
    areaChoose(e, areaid, layerNumber) {
      //区域选择
      this.orgDependAreaid = areaid;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.pageNow = 1;
      this.getOrgList();
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
      this.getOrgList();
    },
    orgTypeChoose(e, statusId) {
      //团体类型
      this.orgTypeId = statusId;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.pageNow = 1;
      this.getOrgList();
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
      this.getOrgList();
    },
    restSearch() {
      //重置
      this.startTime = "";
      this.endTime = "";
      this.groupId = "";
      this.groupName = "";
    },
    getOrgList: function() {
      //获取团体列表
      if (this.groupName) Vueh.searchtext = this.groupName; //全局搜索
      if (this.type == 0) {
        //列表
        this.pageSize = 12;
        // var projectParam = {
        //   dependarea: this.orgDependAreaid, //团体属地
        //   orgtype: this.orgTypeId, //团体类型
        //   servicetype: this.serviceTypeId, //服务类型
        //   min: this.minCount, //最小人数
        //   max: this.maxCount, //最大人数
        //   start: this.startTime, //项目日期起
        //   end: this.endTime, //项目日期止
        //   idnum: this.groupId, //团体ID
        //   name: this.groupName, //团体名称
        //   // "areaid":this.areaid,
        //   pageNow: this.pageNow,
        //   pageSize: this.pageSize
        // };
        if (this.orgDependAreaid) {
          var b = this.orgDependAreaid;
        } else {
          if (this.areaid) {
            var b = this.areaid;
          } else {
            var b = "110000000000000000";
          }
        }
        var projectParam = {
          albe0036: 0, //非推荐
          areaId: b, //团体属地
          pageNum: this.pageNow, //当前页数
          pageSize: this.pageSize, //每页条数
          albe0002: this.groupName, //团体名称
          albe0017: this.serviceTypeId, //服务类型
          albe0003: this.orgTypeId, //队伍类型
          albe0041: this.groupId, //团体ID
          albe0056Start: this.minCount, //最小人数
          albe0056End: this.maxCount, //最大人数
          albe0046Start: this.startTime, //项目日期起
          albe0046End: this.endTime //项目日期止
        };
        //debugger;
        this.querystatus = 1;
        this.groupList = {};
        this.common.getTolData(this);
        this.utilscommit.requestapi(
          "queryTeamPageWeb",
          projectParam,
          this.listOrgBack
        );
      } else if (this.type == 1) {
        //地图
        this.pageSize = 100;
        var data = {
          dependarea: this.orgDependAreaid, //团体属地
          orgtype: this.orgTypeId, //团体类型
          servicetype: this.serviceTypeId, //服务类型
          min: this.minCount, //最小人数
          max: this.maxCount, //最大人数
          start: this.startTime, //项目日期起
          end: this.endTime, //项目日期止
          idnum: this.groupId, //团体ID
          name: this.groupName, //团体名称
          // "areaid":this.areaid,
          pageNow: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.request(
          "nvsi_listGroupsOnMap",
          data,
          this.listOrgBack
        );
      }
    },
    listOrgBack: function(result) {
      this.querystatus = 0;
      if (result && result.data) {
        let list = result.data;
        list.forEach(element => {
          let provinceId = element.albe0012.slice(0, 2);
          if (provinceId == "98") {
            //新疆兵团
            element.defaultImg = require("../../assets/img/grodefault/65.png");
          } else {
            element.defaultImg = require("../../assets/img/grodefault/" +
              provinceId +
              ".png");
          }
        });
        this.groupList = list;
        this.common.getTolData(this, result);
      } else {
        this.groupList = {};
        this.common.getTolData(this);
      }
      if (this.type == 1) {
        this.getGroupMapData();
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
      this.getOrgList();
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
    getGroupMapData() {
      this.area_pos = [];
      this.markerArr = [];
      if (this.groupList && this.groupList.length) {
        for (var a = 0; a < this.groupList.length; a++) {
          var gaddress = this.groupList[a].albe0038;
          if (!gaddress) gaddress = "";
          this.area_pos.push({
            title: this.groupList[a].albe0002,
            content:
              "联系人：" +
              this.groupList[a].albe0018 +
              "<br>地区：" +
              gaddress +
              "<br><br>" +
              "<a href='javascript:void(0);' onclick='toGroupInfo(\"" +
              this.groupList[a].id +
              '","' +
              this.groupList[a].albe0012 +
              "\")'>查看详情</a>",
            point: this.groupList[a].albe0050 + "," + this.groupList[a].albe0051
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
        "groupMap",
        this.groupList[0],
        map_org
      ); //创建和初始化地图
    },
    toGroupInfo(id, areaid) {
      window.open(
        this.$router.resolve({ path: `/groupInfo/${id}/${areaid}` }).href
      );
    },
    imgError(el, defaultImg) {
      if (defaultImg) {
        el.target.src = defaultImg;
      } else {
        el.target.src = i1;
      }
    }
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
