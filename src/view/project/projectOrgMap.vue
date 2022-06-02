<template>
  <div id="project">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <router-link tag="a" :to="{ name: 'home' }">首页</router-link
              ><!-- </a> -->
              <router-link tag="a" :to="{ name: 'projectOrgMap' }"
                >志愿地图</router-link
              ><!-- </a> -->
            </div>
          </li>
        </ul>
        <div class="section">
          <div class="searchtop" id="getproject" :class="hide ? 'hidden' : ''">
            <div class="category">
              <h2 class="category__title">项目区域</h2>
              <div class="category__content">
                <a
                  href="javascript:void(0);"
                  class="category__item active"
                  @click="areaChoose($event)"
                  >全部</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  v-for="(item, index) in firstAreaList"
                  :key="index"
                  @click="areaChoose($event, item.areaid, 1)"
                  >{{ item.areaname }}</a
                >
              </div>
              <div class="category__wrap" style="display: none;">
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
                  v-for="item in serviceTypeList"
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
                  @click="projectStateChoose($event)"
                  >全部</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  @click="projectStateChoose($event, '02')"
                  >招募待启动</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item active"
                  @click="projectStateChoose($event, '03')"
                  >招募中</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  @click="projectStateChoose($event, '45')"
                  >招募已结束</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  @click="projectStateChoose($event, '67')"
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
                  @click="applyScopeChoose($event, '-4')"
                  >全部</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  v-for="item in scopeList"
                  v-show="item.codeid != 4"
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
                  v-for="item in serviceObjList"
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
          </div>
          <div class="searchtop" :class="hide ? '' : 'hidden'">
            <div class="category">
              <h2 class="category__title">队伍属地</h2>
              <div class="category__content">
                <a
                  href="javascript:void(0);"
                  class="category__item active"
                  @click="areaChoose($event)"
                  >全部</a
                >
                <a
                  href="javascript:void(0);"
                  class="category__item"
                  v-for="item in firstAreaList"
                  :key="item.id"
                  @click="areaChoose($event, item.areaid, 1)"
                  >{{ item.areaname }}</a
                >
              </div>
              <div class="category__wrap" style="display: none;">
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
                  v-for="item in serviceTypeList"
                  :key="item.id"
                  @click="serviceTypeChoose($event, item.albe0123)"
                  >{{ item.albe0122 }}</a
                >
              </div>
            </div>
            <div class="category  project-hide">
              <h2 class="category__title">队伍类型</h2>
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
          </div>
          <div class="category-handle">
            <span @click="getMoreHide($event)">收起</span>
            <span class="hidden" @click="getMoreShow($event)">更多条件</span>
          </div>
          <ul class="row w">
            <li
              class="col v-m"
              style="width:85%;"
              id="getproject"
              :class="hide ? 'hidden' : ''"
            >
              <span class="label">项目起止日期</span>
              <date-picker
                :lang="lang"
                v-model="startTime"
                style="width:120px;"
                valueType="format"
              ></date-picker>
              <span class="label">至</span>
              <date-picker
                :lang="lang"
                v-model="endTime"
                style="width:120px;"
                valueType="format"
              ></date-picker>
              <span class="label">项目编号</span>
              <input
                type="text"
                class="input"
                style="width:180px;height: 34px;"
                v-model="idNum"
                maxlength="18"
              />
              <span class="label">项目名称</span>
              <input
                type="text"
                class="input"
                style="width:180px;height: 34px;"
                v-model="name"
                maxlength="30"
              />
              <a
                href="javascript:void(0);"
                class="button button-small"
                @click="getMapList"
                style="height: 34px;line-height: 34px;"
                >搜索</a
              >
              <a
                href="javascript:void(0);"
                class="button button-small"
                style="margin-left: 6px;background-color: #ccc;height: 34px;line-height: 34px;"
                @click="restSearch($event)"
                >重置</a
              >
            </li>
            <li class="col v-m" style="width:86%" :class="hide ? '' : 'hidden'">
              <span class="label">队伍登记日期</span>
              <date-picker
                :lang="lang"
                v-model="startTime"
                style="width:120px;"
                valueType="format"
              ></date-picker>
              <span class="label">至</span>
              <date-picker
                :lang="lang"
                v-model="endTime"
                style="width:120px;"
                valueType="format"
              ></date-picker>
              <span class="label">队伍联络编号</span>
              <input
                type="text"
                class="input"
                style="width:170px;height: 34px;"
                v-model="idNum"
                maxlength="18"
              />
              <span class="label">队伍名称</span>
              <input
                type="text"
                class="input"
                style="width:170px;height: 34px;"
                v-model="name"
                maxlength="30"
              />
              <a
                href="javascript:void(0);"
                class="button button-small"
                @click="getMapList"
                style="height: 34px;line-height: 34px;"
                >搜索</a
              >
              <a
                href="javascript:void(0);"
                class="button button-small"
                style="margin-left: 6px;background-color: #ccc;height: 34px;line-height: 34px;"
                @click="restSearch($event)"
                >重置</a
              >
            </li>
            <li class="col v-m t-r">
              <div class="text-tab">
                <a
                  href="javascript:void(0);"
                  id="project"
                  class="active"
                  @click="getList($event, 0)"
                  >志愿项目</a
                >
                <a
                  href="javascript:void(0);"
                  id="group"
                  @click="getList($event, 1)"
                  >志愿队伍</a
                >
              </div>
            </li>
          </ul>
          <!-- 地图 -->
          <div>
            <div
              class="map"
              style="height:680px;margin-top:30px;"
              id="map"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import map_pro from "../../assets/img/map_pro.png";
import map_org from "../../assets/img/map_org.png";
export default {
  data() {
    return {
      firstAreaList: {}, //一级区域
      secondAreaList: {}, //二级区域
      serviceTypeList: {}, //服务类别
      scopeList: {}, //报名范围
      serviceObjList: {}, //服务对象
      // projectList:{},//项目列表
      orgMapList: {},
      orgTypeList: {}, //队伍类型
      projectMapList: {}, //项目地图列表
      projectArea: "", //项目区域
      firstArea: "",
      dependarea: "",
      orgType: "",
      serviceType: "", //服务类别
      projectState: "03", //项目状态
      applyScope: "", //报名范围
      serviceObj: "", //服务对象
      minCount: "", //最小人数
      maxCount: "", //最大人数
      startTime: "", //日期起
      endTime: "", //日期止
      idNum: "", //ID
      name: "", //名称
      type: 0, //项目和队伍切换
      area_pos: [],
      markerArr: [],
      lang: {
        //配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      hide: false
    };
  },
  created() {
    window.Vues = this;
    if (window.Vueh && Vueh.searchtext) this.name = Vueh.searchtext;
    window.toGroupInfo = this.toGroupInfo;
    window.toProjectInfo = this.toProjectInfo;
    this.codeValue.codeValueQueryFortisWeb(
      "nvsi_albx0014",
      { tablename: "nvsi_albx0014" },
      this.callback_projectFwdx
    );
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albx0014" },
    //   this.callback_projectFwdx
    // ); //服务对象
    this.codeValue.codeValueQueryFortisWeb(
      "nvsi_albx0024",
      { tablename: "nvsi_albx0024" },
      this.callback_projectFwfw
    );
    // this.utilscommit.requestapi(
    //   "codeValueQueryFortisWeb",
    //   { tablename: "nvsi_albx0024" },
    //   this.callback_projectFwfw
    // ); //报名范围
  },
  mounted() {
    this.getData();
    this.getMapList();
  },
  methods: {
    getData() {
      //获取页面首次加载数据
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
      this.utilscommit.requestapi(
        "codeValueQueryFortisWeb",
        { tablename: "nvsi_albe0005" },
        this.callback_projectTtlx
      ); //团体类型
    },
    callback_projectYjqy(result) {
      //获取一级区域列表
      if (result && result.data) {
        this.firstAreaList = this.common.orderBy(result.data, "areaid", "asc");
      }
    },
    callback_projectFwlb(result) {
      //获取服务类别列表
      if (result && result.data) {
        this.serviceTypeList = result.data;
      }
    },
    callback_projectTtlx(result) {
      //获取队伍类别列表
      if (result && result.data) {
        this.orgTypeList = this.common.orderBy(result.data, "orderid", "asc");
      }
    },
    callback_projectFwdx(result) {
      //获取服务对象列表
      if (result) {
        this.serviceObjList = result;
      }
    },
    callback_projectFwfw(result) {
      //获取报名范围
      if (result) {
        var ret = result;
        for (var i = 0; i < ret.length; i++) {
          if (ret[i].codeid == "4" || ret[i].codeid == "5") {
            ret.splice(i, 1);
          }
        }
        this.scopeList = ret; //报名范围
      }
    },
    areaChoose(e, areaid, layerNumber) {
      //区域选择
      this.projectArea = areaid;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.initPage = 1;
      this.getMapList();
      if (!layerNumber) {
        //全部
        $(".category__wrap").hide();
      } else {
        if (1 == layerNumber) {
          //一级区域
          this.firstArea = areaid;
          this.utilscommit.requestapi(
            "getNextAreaListFortisWeb",
            { areaid: areaid },
            this.callback_projectSjqy
          ); //二级区域
        }
      }
    },
    serviceTypeChoose(e, serviceType) {
      //服务类型选择
      this.serviceType = serviceType;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.getMapList();
    },
    projectStateChoose(e, statusId) {
      //志愿项目状态选择
      this.projectState = statusId;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.getMapList();
    },
    applyScopeChoose(e, applyScope) {
      //志愿项目报名范围
      this.applyScope = applyScope;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.getMapList();
    },
    serviceObjChoose(e, serviceObj) {
      //志愿项目服务对象
      this.serviceObj = serviceObj;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.getMapList();
    },
    numChoose(e, num) {
      //人数
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
      this.getMapList();
    },
    orgTypeChoose(e, statusId) {
      //队伍类型
      this.orgType = statusId;
      $(e.target)
        .addClass("active")
        .siblings()
        .removeClass("active");
      this.getMapList();
    },
    callback_projectSjqy(result) {
      //区域选择返回结果
      if (result && result.data) {
        this.secondAreaList = this.common.orderBy(result.data, "areaid", "asc"); //二级区域
        if (this.projectArea) {
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
    getMapList() {
      //获取地图数据
      if (window.Vueh) Vueh.searchtext = this.name;
      if (this.type == 0) {
        //志愿项目
        var data = {
          albx0021: this.projectArea, //项目区域
          albx0009: this.serviceType, //服务类型
          albx0015: this.projectState, //项目状态
          albx0024: this.applyScope, //报名范围
          albx0014: this.serviceObj, //服务对象
          min: this.minCount, //最小人数
          max: this.maxCount, //最大人数
          albx0004: this.startTime, //项目日期起
          albx0005: this.endTime, //项目日期止
          albx0013: this.idNum, //项目ID
          albx0002: this.name, //项目名称
          pageNow: 1,
          pageSize: 1000
        };
        this.utilscommit.request(
          "nvsi_listProjectOnMap",
          data,
          this.callback_projectmap
        );
      } else if (this.type == 1) {
        //志愿队伍
        var data = {
          dependarea: this.dependarea, //团体属地
          orgtype: this.orgType, //团体类型
          servicetype: this.serviceType, //服务类型
          min: this.minCount, //最小人数
          max: this.maxCount, //最大人数
          start: this.startTime, //项目日期起
          end: this.endTime, //项目日期止
          idnum: this.idnum, //团体ID
          name: this.name, //团体名称
          pageNow: 1,
          pageSize: 1000
        };
        this.utilscommit.request(
          "nvsi_listGroupsOnMap",
          data,
          this.callback_groupmap
        );
      }
    },
    callback_projectmap(result) {
      //地图数据返回结果(项目)
      if (result.data) {
        this.projectMapList = result.data;
      } else {
        this.projectMapList = [];
      }
      this.showMap();
    },
    callback_groupmap(result) {
      //地图数据返回结果(队伍)
      if (result.data) {
        this.orgMapList = result.data;
      } else {
        this.orgMapList = [];
      }
      this.showMap();
    },
    getList(e, type) {
      //项目和队伍切换
      this.type = type;
      Vueh.searchinit(this.$route.name);
      this.getMapList();
      if (e) {
        $(e.target)
          .addClass("active")
          .siblings()
          .removeClass("active");
      }
      if (type == 0) {
        this.hide = false;
      } else {
        this.hide = true;
      }
    },
    showMap() {
      //显示地图
      this.area_pos = [];
      this.markerArr = [];
      if (this.type == 0) {
        if (this.projectMapList) {
          for (var a = 0; a < this.projectMapList.length; a++) {
            var gaddress = this.projectMapList[a].albx0012;
            if (!gaddress) gaddress = "";
            this.area_pos.push({
              title: this.projectMapList[a].albx0002,
              content:
                "联系人：" +
                this.projectMapList[a].albx0025 +
                "<br>地区：" +
                gaddress +
                "<br><br>" +
                "<a href='javascript:void(0);' onclick='toProjectInfo(\"" +
                this.projectMapList[a].id +
                '","' +
                this.projectMapList[a].albx0021 +
                "\")'>查看详情</a>",
              point:
                this.projectMapList[a].albx0035 +
                "," +
                this.projectMapList[a].albx0036
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
          "map",
          this.projectMapList[0],
          map_pro
        ); //创建和初始化地图
      } else {
        if (this.orgMapList) {
          for (var a = 0; a < this.orgMapList.length; a++) {
            var gaddress = this.orgMapList[a].albe0038;
            if (!gaddress) gaddress = "";
            this.area_pos.push({
              title: this.orgMapList[a].albe0002,
              content:
                "联系人：" +
                this.orgMapList[a].albe0018 +
                "<br>地区：" +
                gaddress +
                "<br><br>" +
                "<a href='javascript:void(0);' onclick='toGroupInfo(\"" +
                this.orgMapList[a].id +
                '","' +
                this.orgMapList[a].albe0012 +
                "\")'>查看详情</a>",
              point:
                this.orgMapList[a].albe0050 + "," + this.orgMapList[a].albe0051
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
          "map",
          this.orgMapList[0],
          map_org
        ); //创建和初始化地图
      }
    },
    toProjectInfo(id, areaid) {
      window.open(
        this.$router.resolve({ path: `/projectInfo/${id}/${areaid}` }).href
      );
    },
    toGroupInfo(id, areaid) {
      window.open(
        this.$router.resolve({ path: `/groupInfo/${id}/${areaid}` }).href
      );
    },
    getMoreHide(e) {
      //收起搜索条件
      $(".project-hide").hide();
      $(e.target)
        .addClass("hidden")
        .siblings()
        .removeClass("hidden");
    },
    getMoreShow(e) {
      //展开条件
      $(".project-hide").show();
      $(e.target)
        .addClass("hidden")
        .siblings()
        .removeClass("hidden");
    },
    restSearch() {
      //重置
      this.start = "";
      this.end = "";
      this.idNum = "";
      this.name = "";
    }
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
