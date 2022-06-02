<template>
  <div id="homebody">
    <!--中间部分-->
    <div class="js-bg-img">
      <div class="mid">
        <!-- 头条 -->
        <div
          class="info"
          v-if="headerNew && headerNew.newslist && headerNew.newslist[0]"
        >
          <a
            href="javascript:void(0);"
            class="info-tit oneline"
            @click="toNewsInfoMore(headerNew.newslist[0])"
            ><em>头条</em>{{ headerNew.newslist[0].title }}</a
          >
          <p
            class="twoline"
            style="display: inline-block;vertical-align: middle;"
            v-text="ecellipsiSpace(headerNew.newslist[0].newscontent, 75)"
          ></p>
          <a
            href="javascript:void(0);"
            @click="toNewsMore(headerNew)"
            class="top_moretitle"
          >
            更多</a
          >
        </div>
        <div class="mid row " style="margin-top:27px">
          <!-- 轮播图 -->
          <div
            class="col v-t"
            style="width:560px;"
            @mouseenter="stopAuto"
            @mouseleave="startAuto"
          >
            <div
              class="swiper-container slideBox"
              style="display: inline-block;"
            >
              <div class="swiper-wrapper" @click="toCSlide">
                <div
                  class="swiper-slide"
                  v-for="item in slideNews"
                  :key="item.id"
                >
                  <a href="javascript:void(0);">
                    <img
                      :src="common.changeImgsrc(item.imgtitle)"
                      width="100%"
                      onerror="this.src='https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png'"
                    />
                    <span v-cloak>{{ item.title | ellipsis(25) }}</span>
                  </a>
                </div>
              </div>
              <div class="paginations"></div>
            </div>
          </div>
          <!-- 信息动态 (模块1) -->
          <div class="col v-t" style="padding-left:50px;" v-if="gzdt">
            <h2 class="title js-line">
              <img
                src="../assets/img/icon.png"
                alt=""
                style="margin-right:6px;vertical-align: middle;"
              />
              <p
                v-text="truncate(gzdt.showname, 9, '')"
                style="display: inline-block;margin-left: -10px;"
              ></p>
              <a
                href="javascript:void(0);"
                @click="toNewsMore(gzdt)"
                class="title-more"
                >更多</a
              >
            </h2>
            <ul class="list">
              <li
                class="row w"
                v-for="(el, index) in gzdt.newslist"
                :key="index"
              >
                <a
                  href="javascript:void(0);"
                  @click="toNewsInfoMore(el)"
                  class="col v-m oneline"
                  v-cloak
                  ><span class="istops" v-if="el.istop == 1">置顶</span>
                  {{ truncate(el.title, 30, "...") }}</a
                >
                <span
                  class="col v-m t-r"
                  v-text="truncate(el.entrytime, 10, '')"
                ></span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 功能模块（注册登录等） -->
        <h2 class="title t-c js-m-t-50">全国志愿服务信息系统</h2>
        <ul
          class="grid system js-lr-6"
          style="display: flex; justify-content: space-around"
        >
          <li class="grid-item js-rl-6" style="width: 25%">
            <a @click="showDocsList(1)">
              <div class="">
                <img
                  src="@/assets/img/icon1.png"
                  style="height: 55px;"
                  alt=""
                />
              </div>
              <div class="">
                <em>志愿者</em
                ><span>志愿者实名注册<br />查询参加志愿队伍、志愿项目</span>
              </div>
            </a>
          </li>
          <li class="grid-item">
            <a @click="showDocsList(2)">
              <div class="">
                <img
                  src="@/assets/img/icon2.png"
                  style="height: 55px;"
                  alt=""
                />
              </div>
              <div class="">
                <em>志愿队伍</em
                ><span> 志愿队伍注册、审核<br />招募志愿者、管理项目 </span>
              </div>
            </a>
          </li>
          <!-- <li class="grid-item">
            <router-link tag="a" to="/projectOrgMap" target="_blank">
              <div class="">
                <img
                  src="@/assets/img/icon4.png"
                  style="height: 55px;"
                  alt=""
                />
              </div>
              <div class="">
                <em>志愿地图</em><span>附近的志愿队伍<br />附近的志愿项目</span>
              </div>
            </router-link>
          </li> -->
          <li class="grid-item">
            <router-link tag="a" to="/infosearch">
              <div class="">
                <img
                  src="@/assets/img/icon5.png"
                  style="height: 55px;"
                  alt=""
                />
              </div>
              <div class="">
                <em>志愿服务证明</em
                ><span>志愿者信息查询<br />志愿服务证书查询</span>
              </div>
            </router-link>
          </li>
          <li class="grid-item">
            <a href="javascript:void(0);" @click="showDocsList(3)">
              <div class="">
                <img
                  src="@/assets/img/icon6.png"
                  style="height: 55px;"
                  alt=""
                />
              </div>
              <div class=""><em>管理部门</em><span>管理部门登录</span></div>
            </a>
          </li>
        </ul>
        <!-- banner图 -->
        <a class="js-bar" v-if="hotImg.imgpath"
          ><img
            style="cursor:pointer;"
            :src="common.changeImgsrc(hotImg.imgpath)"
            alt=""
            @click="toTheme(hotImg)"
        /></a>
        <div class="row w js-m-t-50">
          <!-- 政策文件 (模块2) -->
          <div class="col v-t g-12 pr-46" v-if="zcwj">
            <h2 class="title">
              <img
                src="../assets/img/icon.png"
                alt=""
                style="margin-right:6px;vertical-align: middle;"
              />
              <p
                v-text="truncate(zcwj.showname, 9, '')"
                style="display: inline-block;margin-left: -10px;"
              ></p>
              <a
                href="javascript:void(0);"
                @click="toNewsMore(zcwj)"
                class="title-more"
                >更多</a
              >
            </h2>
            <ul class="list  list-small">
              <!-- list-rank -->
              <li class="row w " v-for="el in zcwj.newslist" :key="el.id">
                <!-- active -->
                <a
                  href="javascript:void(0);"
                  @click="toNewsInfoMore(el)"
                  class="col v-m oneline"
                  v-cloak
                  ><span class="istops" v-if="el.istop == 1">置顶</span>
                  {{ truncate(el.title, 30, "...") }}</a
                >
                <span
                  class="col v-m t-r"
                  v-text="truncate(el.entrytime, 10, '')"
                ></span>
              </li>
            </ul>
          </div>
          <!-- 通知公告 (模块3) -->
          <div class="col v-t g-12 pl-46" v-if="tzgg">
            <h2 class="title">
              <img
                src="../assets/img/icon.png"
                alt=""
                style="margin-right:6px;vertical-align: middle;"
              />
              <p
                v-text="truncate(tzgg.showname, 9, '')"
                style="display: inline-block;margin-left: -10px;"
              ></p>
              <a
                href="javascript:void(0);"
                @click="toNewsMore(tzgg)"
                class="title-more"
                >更多</a
              >
            </h2>
            <ul class="list list-small">
              <li class="row w" v-for="el in tzgg.newslist" :key="el.id">
                <a
                  href="javascript:void(0);"
                  @click="toNewsInfoMore(el)"
                  class="col v-m oneline"
                  v-cloak
                  ><span class="istops" v-if="el.istop == 1">置顶</span>
                  {{ truncate(el.title, 25, "...") }}</a
                >
                <span
                  class="col v-m t-r"
                  v-text="truncate(el.entrytime, 10, '')"
                ></span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 媒体报道 (模块4) -->
        <div class="media-coverage" v-if="mtbd">
          <div>
            <div class="js-date">
              <h2 class="title">
                <p
                  v-text="truncate(mtbd.showname, 9, '')"
                  style="display: contents;"
                ></p>
                <a
                  href="javascript:void(0);"
                  @click="toNewsMore(mtbd)"
                  class="title-more"
                  style="width:36px;height:17px;padding:2px 2px 2px 4px;line-height:13px;right:-6px;bottom:10px;font-weight:bold;box-sizing:border-box"
                  >更多</a
                >
              </h2>
              <div>
                <img src="../assets/img/news.png" alt="" />
              </div>
            </div>
            <!-- 左 -->
            <div
              class="fr js-nwes-box"
              v-if="mtbd.newslist && mtbd.newslist[0]"
            >
              <!--  v-for="(el,index) in mtbd" :key="el.id" v-if="index==0" -->
              <div class="js-img">
                <img
                  v-lazy="common.changeImgsrc(mtbd.newslist[0].imgtitle)"
                  alt=""
                />
              </div>
              <div class="js-report-box">
                <a
                  class="js-title"
                  href="javascript:void(0);"
                  @click="toNewsInfoMore(mtbd.newslist[0])"
                  v-text="truncate(mtbd.newslist[0].title, 33, '...')"
                ></a>
                <p v-text="truncate(mtbd.newslist[0].content, 55, '...')"></p>
                <p class="row source_width">
                  <span class="col t-l top-source"
                    ><img src="@/assets/img/js-cike.png" alt=""/><b
                      v-text="truncate(mtbd.newslist[0].entrytime, 10, '')"
                    ></b
                  ></span>
                  <span
                    class="col t-r mtbd-source"
                    v-if="mtbd.newslist[0].newsfrom"
                    ><img
                      src="@/assets/img/js-news.png"
                      alt=""
                      style="margin-left:7px"/><b
                      v-text="
                        mtbd.newslist[0].newsfrom.length > 13
                          ? truncate(mtbd.newslist[0].newsfrom, 13, '...')
                          : mtbd.newslist[0].newsfrom
                      "
                    ></b
                  ></span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <!-- 右上 -->
            <div class="js-new-top" v-if="mtbd.newslist && mtbd.newslist[1]">
              <!--  v-for="(el,index) in mtbd " :key="el.id" v-if="index==1" -->
              <div class="js-report-box" style="width: 62%;">
                <a
                  class="js-title"
                  href="javascript:void(0);"
                  @click="toNewsInfoMore(mtbd.newslist[1])"
                  v-text="truncate(mtbd.newslist[1].title, 22, '...')"
                ></a>
                <p v-text="truncate(mtbd.newslist[1].content, 70, '...')"></p>
                <p class="row source_width">
                  <span class="col t-l top-source"
                    ><img src="@/assets/img/js-cike.png" alt=""/><b
                      v-text="truncate(mtbd.newslist[1].entrytime, 10, '')"
                    ></b
                  ></span>
                  <span
                    class="col t-r mtbd-source"
                    v-if="mtbd.newslist[1].newsfrom"
                    ><img
                      src="@/assets/img/js-news.png"
                      alt=""
                      style="margin-left:7px"/><b
                      v-text="mtbd.newslist[1].newsfrom"
                    ></b
                  ></span>
                </p>
              </div>
              <img
                class="js-news-img fr"
                v-lazy="common.changeImgsrc(mtbd.newslist[1].imgtitle)"
                alt=""
              />
            </div>
            <!-- 右下 -->
            <div v-if="mtbd.newslist && mtbd.newslist[2]">
              <!-- v-for="(el,index) in mtbd " :key="el.id" v-if="index==2" -->
              <div class="js-report-box fr" style="width: 62%;">
                <a
                  class="js-title"
                  v-text="truncate(mtbd.newslist[2].title, 22, '...')"
                  href="javascript:void(0);"
                  @click="toNewsInfoMore(mtbd.newslist[2])"
                ></a>
                <p v-text="truncate(mtbd.newslist[2].content, 70, '...')"></p>
                <p class="row source_width">
                  <span class="col t-l top-source"
                    ><img src="@/assets/img/js-cike.png" alt=""/><b
                      v-text="truncate(mtbd.newslist[2].entrytime, 10, '')"
                    ></b
                  ></span>
                  <span
                    class="col t-r mtbd-source"
                    v-if="mtbd.newslist[2].newsfrom"
                    ><img
                      src="@/assets/img/js-news.png"
                      alt=""
                      style="margin-left:7px"/><b
                      v-text="mtbd.newslist[2].newsfrom"
                    ></b
                  ></span>
                </p>
              </div>
              <img
                class="js-news-img"
                v-lazy="common.changeImgsrc(mtbd.newslist[2].imgtitle)"
                alt=""
              />
            </div>
          </div>
        </div>
        <!-- 地图 -->
        <div class="tab js-m-t-50 tabarea">
          <span class="active">全国</span>
          <!-- <span>领域</span> -->
        </div>
        <div class="js-map-data">
          <div class="map" id="chart1" style="height:640px;"></div>
          <div class="data">
            <h2 class="title title-small">
              <em v-text="countData.provincename || '全国'"></em
              >志愿服务数据统计
            </h2>
            <ul class="stat grid">
              <li>
                <em
                  v-if="countData.provincename != '新疆/兵团'"
                  v-text="fixNum(countData.volnum, 3)"
                ></em>
                <em
                  v-else
                  v-text="
                    fixNum(countData.volnum, 3) +
                      '/' +
                      fixNum(countData.btItem.volnum, 3)
                  "
                ></em>
                <span>实名志愿者总数(人)</span>
              </li>
              <li>
                <em
                  v-if="countData.provincename != '新疆/兵团'"
                  v-text="fixNum(countData.orgnum, 2)"
                ></em>
                <em
                  v-else
                  v-text="
                    fixNum(countData.orgnum, 2) +
                      '/' +
                      fixNum(countData.btItem.orgnum, 2)
                  "
                ></em>
                <span>志愿队伍总数(个)</span>
              </li>
              <li>
                <em
                  v-if="countData.provincename != '新疆/兵团'"
                  v-text="fixNum(countData.pronum, 2)"
                ></em>
                <em
                  v-else
                  v-text="
                    fixNum(countData.pronum, 2) +
                      '/' +
                      fixNum(countData.btItem.pronum, 2)
                  "
                ></em>
                <span>志愿项目总数(个)</span>
              </li>
              <!-- <li><em v-text="addZero(fixNum(countData.timenum))"></em><span>服务时间总数(万小时)</span></li> -->
              <li>
                <em
                  v-if="countData.provincename != '新疆/兵团'"
                  v-text="fixNum(countData.timenum, 1)"
                ></em
                ><em
                  v-else
                  v-text="
                    fixNum(countData.timenum, 1) +
                      '/' +
                      fixNum(countData.btItem.timenum, 1)
                  "
                ></em>
                <span>服务时间总数(小时)</span>
              </li>
              <li>
                <em
                  v-if="countData.provincename != '新疆/兵团'"
                  v-text="fixNum(countData.timevolnum)"
                ></em
                ><em
                  v-else
                  v-text="
                    fixNum(countData.timevolnum) +
                      '/' +
                      fixNum(countData.btItem.timevolnum)
                  "
                ></em
                ><span>记录时间人数(人)</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="js-map-data" style="display:none">
          <div class="map type">
            <span
              :class="{ active: areaCount.type == 1 }"
              @click="getAreaCount(1, $event)"
              ><b>扶贫济困</b>志愿者</span
            >
            <span
              class="two"
              :class="{ active: areaCount.type == 2 }"
              @click="getAreaCount(2, $event)"
              ><b>社区</b>志愿者</span
            >
            <span
              class="three"
              :class="{ active: areaCount.type == 3 }"
              @click="getAreaCount(3, $event)"
              ><b>青年</b>志愿者</span
            >
            <span
              class="four"
              :class="{ active: areaCount.type == 4 }"
              @click="getAreaCount(4, $event)"
              ><b>文明</b>志愿者</span
            >
            <span
              class="four"
              :class="{ active: areaCount.type == 5 }"
              @click="getAreaCount(5, $event)"
              ><b>文化</b>志愿者</span
            >
            <span
              class="five"
              :class="{ active: areaCount.type == 6 }"
              @click="getAreaCount(6, $event)"
              ><b>医疗</b>志愿者</span
            >
            <span
              :class="{ active: areaCount.type == 7 }"
              @click="getAreaCount(7, $event)"
              ><b>教育</b>志愿者</span
            >
            <span
              class="two"
              :class="{ active: areaCount.type == 8 }"
              @click="getAreaCount(8, $event)"
              ><b>助残</b>志愿者</span
            >
            <span
              class="three"
              :class="{ active: areaCount.type == 9 }"
              @click="getAreaCount(9, $event)"
              ><b>巾帼</b>志愿者</span
            >
            <span
              :class="{ active: areaCount.type == 10 }"
              @click="getAreaCount(10, $event)"
              ><b>消防</b>志愿者</span
            >
            <span
              class="four"
              :class="{ active: areaCount.type == 11 }"
              @click="getAreaCount(11, $event)"
              ><b>红十字</b>志愿者</span
            >
          </div>
          <div class="data">
            <h2 class="title title-small" style="color:#666;" id="voltj">
              <em v-text="areaCount.name"></em>志愿者统计
            </h2>
            <ul class="stat grid">
              <li>
                <em v-text="areaCountData.albe1503 || 0"></em
                ><span>实名志愿者总数(人)</span>
              </li>
              <li class="stat-all">
                <em v-text="addZero(areaCountData.albe1504)"></em
                ><span>服务时间总数</span>
              </li>
              <li class="stat-time">
                <em v-text="areaCountData.albe1505 || 0"></em
                ><span>记录时间人数</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 志愿风采 （模块5） -->
        <div
          class="elegant-demeanor-box js-m-t-50"
          style="margin-bottom:0;"
          v-if="zyfclist"
        >
          <h2 class="title">
            <img
              src="../assets/img/icon.png"
              alt=""
              style="margin-right:6px;vertical-align: middle;"
            />
            <p
              v-text="truncate(zyfclist.showname, 9, '')"
              style="display: inline-block;margin-left: -10px;"
            ></p>
          </h2>
          <div class="demeanor-tab tab-news">
            <span
              v-for="(el, index) in zyfclist.menulist"
              :key="el.id"
              v-text="truncate(el.showname, 6, '...')"
              :class="{ active: zyfctype == index }"
              @click="getZyfctype(index)"
            ></span>
          </div>
          <div class="news-list" v-show="zyfctype == 0">
            <ul class="elegant-demeanor">
              <home-list
                style="display: inline;"
                :list="zyz"
                listtype="0"
                showimg="1"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zyz"
                listtype="1"
                showimg="2"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zyz"
                listtype="2"
                showimg="1"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zyz"
                listtype="3"
                showimg="2"
              ></home-list>
            </ul>
          </div>
          <div class="news-list" v-show="zyfctype == 1">
            <ul class="elegant-demeanor">
              <home-list
                style="display: inline;"
                :list="zytt"
                listtype="0"
                showimg="1"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zytt"
                listtype="1"
                showimg="2"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zytt"
                listtype="2"
                showimg="1"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zytt"
                listtype="3"
                showimg="2"
              ></home-list>
            </ul>
          </div>
          <div class="news-list" v-show="zyfctype == 2">
            <ul class="elegant-demeanor">
              <home-list
                style="display: inline;"
                :list="zyxm"
                listtype="0"
                showimg="1"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zyxm"
                listtype="1"
                showimg="2"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zyxm"
                listtype="2"
                showimg="1"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zyxm"
                listtype="3"
                showimg="2"
              ></home-list>
            </ul>
          </div>
          <div class="news-list" v-show="zyfctype == 3">
            <ul class="elegant-demeanor">
              <home-list
                style="display: inline;"
                :list="zysq"
                listtype="0"
                showimg="1"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zysq"
                listtype="1"
                showimg="2"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zysq"
                listtype="2"
                showimg="1"
              ></home-list>
              <home-list
                style="display: inline;"
                :list="zysq"
                listtype="3"
                showimg="2"
              ></home-list>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <indexarea ref="registerType"></indexarea>

    <!-- 首页固定窗口 -->
    <div class="pop-notice" v-if="!isshow">
      <p class="close" @click="toCloseTips"></p>
      <h2>全国志愿服务信息系统（2.0版）全面上线试运行</h2>
      <p>
        为更好服务全国志愿服务工作，由民政部升级开发建设的全国志愿服务信息系统（中国志愿服务网）2.0版（<em
          style="color: yellow;font-weight: bold;"
          >https://chinavolunteer.mca.gov.cn</em
        >）已全面上线试运行。欢迎广大志愿者、志愿服务队伍登录使用民政部官方志愿服务信息系统（中国志愿服务网），并提出宝贵意见建议。我们将持续优化系统功能、提升用户体验，为您提供更加优质便捷服务。
      </p>
      <div style="text-align:center;margin-top:30px;">
        <a href="javascript:void(0);" v-if="isshow_times > 0"
          >{{ isshow_times }}秒</a
        >
        <a
          href="javascript:void(0);"
          v-if="isshow_times == 0"
          @click="toCloseTips"
          >关闭</a
        >
      </div>
    </div>
  </div>
</template>

<script>
const HomeList = () => import("@/components/home_list.vue"); //列表
const indexarea = () => import("@/components/indexarea.vue"); //列表
var _this = "";
export default {
  name: "homebody",
  components: {
    HomeList, //列表组件
    indexarea //弹出层组件
  },
  data: function() {
    return {
      modularName: [], //模块名称
      slideNews: {}, //轮播图
      headerNew: {}, //头条
      hotImg: {}, //图文专题
      gzdt: {}, //工作动态
      tzgg: {}, //通知公告
      mtbd: {}, //媒体报道
      zcwj: {}, //政策文件
      zyfclist: {}, //志愿风采集合
      zyfctype: 0, //志愿风采类型
      zyz: "", //志愿者
      zytt: "", //志愿团体
      zyxm: "", //志愿项目
      zysq: "", //志愿社区
      allcountData: {}, //全国数据
      countData: {}, //地图右侧统计数据
      chartData: {}, //地图
      areaCountData: {}, //领域统计数据
      areaCount: { name: "扶贫济困", type: 1 },
      timer: "",
      // showtype:0,//分享状态
      //首页弹窗
      isshow: this.common.getCookie("isallshow"),
      isshow_times: 16, //倒计时
      zyfctypetimer: "" //底部志愿风采定时器
    };
  },
  beforeRouteEnter(to, from, next) {
    var url = location.search;
    if (url) {
      console.log(url);
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      let code = theRequest.code; //微信code
      let diq = theRequest.diq.split("-")[0]; //域名
      let diqx = theRequest.diq.split("-")[1]; //站点名
      let diqy = theRequest.diq.split("-")[2]; //页面切换判断
      if (diqy == 1) {
        window.location = `http://${diq}/subsite/${diqx}/login/2?code=${code}`;
      }
      // console.log(theRequest);
      // console.log(code);
      // window.location = `http://${diq}.chinavolunteer.mca.gov.cn/NVSI/LEAP/dist/index.html?code=${code}#/${diqx}/home`;
      //  window.location = `https://wuhan.yxybb.com/NVSI/LEAP/dist/index.html?code=${code}#/${diqx}/home`;
    }

    next();
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  created() {
    _this = this;
    //打开版本提示
    if (!this.isshow) this.isshow_setTimes();
    this.getdata(); //获取首页数据信息
    // this.getAreaCount(1);//获取右侧领域信息
  },
  mounted() {
    this.getdyDate();
    this.getZyfctype(this.zyfctype);
  },
  methods: {
    getdata() {
      //新闻信息
      this.utilscommit.requestapi(
        "getSiteIndexLayout",
        { sitename: "china" },
        this.newsBack
      );

      this.utilscommit.requestapi(
        "listSpecialColumn",
        {
          type: "1",
          albx6209: "0"
        },
        this.hotImgBack
      );
      //地图信息
      this.utilscommit.requestapi(
        "listVolunteerNumFortisWeb",
        { areaid: 0 },
        this.chartDataBack
      );
      //地图右侧数据
      this.utilscommit.requestapi(
        "countServiceDataFortisWeb",
        { areaid: 0 },
        this.countDataBack
      );
    },
    newsBack(data) {
      if (data) {
        let list = data;
        list.forEach(item => {
          if (item.componentname == "swiper") {
            //轮播图
            this.slideNews = item.news.newslist; //轮播图
            const _this = this;
            this.$nextTick(function() {
              //dom完成之后实现轮播效果
              _this.swiper = new Swiper(".swiper-container", {
                pagination: ".paginations",
                autoplay: 3000, //自动轮播时间
                //autoplayDisableOnInteraction: false,//用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
                paginationClickable: true, //实现小圆点点击
                loop: true, //循环轮播
                simulateTouch: false
              });
            });
          }
          if (item.positionindex == 1 && item.news) this.headerNew = item.news;
          //头条
          else if (item.positionindex == 3 && item.news) this.gzdt = item.news;
          //信息动态
          else if (item.positionindex == 4 && item.news) this.zcwj = item.news;
          //政策文件
          else if (item.positionindex == 5 && item.news) this.tzgg = item.news;
          //通知公告
          else if (item.positionindex == 6 && item.news) this.mtbd = item.news;
          //媒体报道
          else if (item.positionindex == 7 && item.news) {
            //志愿风采
            this.zyfclist = item.news;
            if (this.zyfclist.menulist.length) {
              for (let i = 0; i < this.zyfclist.menulist.length; i++) {
                if (this.zyfclist.menulist[i]) {
                  var news = this.zyfclist.menulist[i];
                  if (i == 0) this.zyz = news.newslist; //志愿者
                  if (i == 1) this.zytt = news.newslist; //志愿队伍
                  if (i == 2) this.zyxm = news.newslist; //志愿项目
                  if (i == 3) this.zysq = news.newslist; //志愿社区
                }
              }
            }
          }
        });
      }
    },
    hotImgBack(data) {
      if (data && data.code == 0) {
        this.hotImg = data.data[0];
      }
    },
    /* newsBack(data) {
      //新闻信息返回
      if (data && data.data) {
        let list = data.data;
        if (list.hottitle && list.hottitle[0]) {
          //头条
          let headerNew = list.hottitle[0];
          headerNew.showtype = 3;
          this.headerNew = headerNew;
        }
        if (list.hotimg) this.hotImg = list.hotimg[0]; //图文专题
        if (list.lbtnewlist) {
          this.slideNews = list.lbtnewlist; //轮播图
          this.$nextTick(function() {
            //dom完成之后实现轮播效果
            _this.swiper = new Swiper(".swiper-container", {
              pagination: ".paginations",
              autoplay: 3000, //自动轮播时间
              //autoplayDisableOnInteraction: false,//用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
              paginationClickable: true, //实现小圆点点击
              loop: true, //循环轮播
              simulateTouch: false
            });
          });
        }
        if (list.modularlist) {
          //模块列表
          this.modularName = list.modularlist;
          for (let j = 0; j < this.modularName.length; j++) {
            let modular = this.modularName[j];
            //模块一
            if (
              modular &&
              modular.albx6016 &&
              modular.albx6016 == 1 &&
              modular.newslist
            )
              this.gzdt = modular.newslist;
            //模块二
            if (
              modular &&
              modular.albx6016 &&
              modular.albx6016 == 2 &&
              modular.newslist
            )
              this.tzgg = modular.newslist;
            //模块三
            if (
              modular &&
              modular.albx6016 &&
              modular.albx6016 == 3 &&
              modular.newslist
            )
              this.zcwj = modular.newslist;
            //模块四
            if (
              modular &&
              modular.albx6016 &&
              modular.albx6016 == 4 &&
              modular.newslist
            )
              this.mtbd = modular.newslist;
            //模块五
            if (modular && modular.zyfclist) {
              this.zyfclist = modular.zyfclist;
              for (let i = 0; i < this.zyfclist.length; i++) {
                if (this.zyfclist[i]) {
                  var news = this.zyfclist[i];
                  if (i == 0) this.zyz = news.newslist; //志愿者
                  if (i == 1) this.zytt = news.newslist; //志愿队伍
                  if (i == 2) this.zyxm = news.newslist; //志愿项目
                  if (i == 3) this.zysq = news.newslist; //志愿社区
                }
              }
            }
          }
        }
      }
    }, */
    chartDataBack(data) {
      //地图返回数据
      if (data && data.data) {
        var obj = data.data.volnum;
        var datas = [];
        var btItem = {}; //兵团的数据
        if (obj) {
          let t = 0;
          for (var i = 0; i < obj.length; i++) {
            var data = {};
            data.areaid = obj[i].areaid;
            data.name = obj[i].provincename;
            if (data.name == "南海诸岛") t++;
            if (data.name == "新疆建设兵团") {
              btItem = obj[i];
            }
            data.value = obj[i].volnum;
            data.info = obj[i];
            datas.push(data);
          }
          datas.forEach(item => {
            //单独处理新疆以及兵团的数据
            if (item.name == "新疆") {
              if (btItem.provincename) {
                item.btItem = btItem;
              } else {
                item.btItem = {
                  orgnum: 0,
                  pronum: 0,
                  provincename: "新疆建设兵团",
                  timenum: 0,
                  timevolnum: 0,
                  volnum: 0
                };
              }
            }
          });
          if (t == 0)
            datas.push({
              name: "南海诸岛",
              areaid: "99",
              value: 0,
              info: {
                orgnum: 0,
                pronum: 0,
                provincename: "南海诸岛",
                timenum: 0,
                timevolnum: 0,
                volnum: 0
              }
            });
        }
        this.chartData = datas;
        this.getMaps();
      }
    },
    getMaps() {
      //初始化大公鸡
      let chart1 = document.getElementById("chart1");
      if (this.chartData.length > 0 && chart1) {
        var myChart = echarts.init(chart1);
        var option = {
          tooltip: {
            trigger: "item",
            formatter: function(p) {
              //悬浮框显示数据
              var tip;
              var name, value;
              if (p.name == "新疆") {
                name = "新疆/兵团";
                value = p.value + "/" + p.data.btItem.volnum;
              } else {
                name = p.name;
                value = p.value;
              }
              tip = p.seriesName + "<br />" + name + "：" + value;
              return tip;
            }
          },
          dataRange: {
            show: true,
            orient: "vertical",
            min: 0,
            max: 10000000,
            text: ["高   [实名志愿者数量]", "低"],
            splitNumber: 0,
            color: ["#ff6361", "#FFECD6"],
            textStyle: {
              color: "#333"
            }
          },
          toolbox: {
            show: false
          },
          series: [
            {
              name: "志愿者数量",
              type: "map",
              zoom: 1.2,
              mapType: "china",
              mapLocation: {
                x: "left"
              },
              selectedMode: "single",
              itemStyle: {
                normal: {
                  borderColor: "#90DDFF",
                  label: {
                    show: true,
                    color: "#333"
                  }
                },
                emphasis: { label: { show: true } }
              },
              label: {
                normal: {
                  show: true, //显示省份标签
                  formatter: function(p) {
                    //地图显示省份名称
                    var txtCon;
                    if (p.name == "新疆") {
                      p.name = "新疆/兵团";
                    }
                    txtCon = p.name;
                    return txtCon;
                  }
                }
              },
              data: this.chartData
            }
          ]
        };
        myChart.setOption(option);
        myChart.on("mouseover", function(data) {
          //鼠标悬浮上移事件
          if (data.data && data.data.info) {
            let info;
            if (data.data.info.provincename == "新疆") {
              data.data.info.provincename = "新疆/兵团";
              data.data.info.btItem = data.data.btItem;
            }
            info = data.data.info;
            _this.countData = info;
          }
        });
        myChart.on("mouseout", function(data) {
          //鼠标移出地图事件globalout
          _this.countData = _this.allcountData;
        });
      }
    },
    countDataBack(data) {
      //地图右侧数据结果
      if (data && data.data) {
        this.countData = data.data;
        this.allcountData = this.countData;
      }
    },
    getAreaCount(type, el) {
      //查询领域统计数据
      this.areaCount.type = type;
      this.getdyDate();
      if (el) {
        var name = el.path[0].innerText;
        if (name.indexOf("志愿者") != -1)
          name = name.substring(0, name.length - 3);
        this.areaCount.name = name;
      }
      this.utilscommit.request(
        "nvsi_areacountServiceData",
        { type: type },
        this.areaCountDataBack
      );
    },
    areaCountDataBack(data) {
      //领域统计数据
      if (data && data.data) this.areaCountData = data.data;
    },
    showDocsList(type) {
      //点击弹出层
      this.$refs.registerType.showPage(type); //子元素方法调用展示弹出层
    },

    toNewsInfoMore(el) {
      window.open(
        this.$router.resolve({
          name: "sitenewsInfo",
          params: { id: el.id }
        }).href
      );
    },
    toNewsMore: function(el) {
      window.open(
        this.$router.resolve({
          name: "sitenews",
          params: { name: el.name }
        }).href
      );
    },
    toTheme(el) {
      //专题专栏详情页
      window.open(el.albx6206);
    },
    getZyfctype(zyfcindex) {
      //获取志愿风采列表（循环展示）
      if (this.zyfctypetimer) {
        clearTimeout(this.zyfctypetimer);
        this.zyfctypetimer = null;
      }
      this.zyfctype = zyfcindex;
      this.zyfctypetimer = setTimeout(function() {
        _this.zyfctype++;
        if (_this.zyfctype > 3) {
          _this.zyfctype = 0;
        }
        _this.getZyfctype(_this.zyfctype);
      }, 6000);
    },
    getdyDate() {
      //获取动态切换
      $(".tabarea span").each(function(idx, el) {
        $(el).click(function() {
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
          $(".js-map-data")
            .eq(idx)
            .show()
            .siblings(".js-map-data")
            .hide();
        });
      });
    },
    stopAuto() {
      //鼠标移入时停止轮播
      if (_this.swiper) _this.swiper.stopAutoplay();
    },
    startAuto() {
      //鼠标移出时开始轮播
      if (_this.swiper) _this.swiper.startAutoplay();
      //this.swiper.autoplay.start()
    },
    toCSlide() {
      //查询相关新闻
      if (_this.swiper)
        toNewsInfoMore(this.slideNews[_this.swiper.activeLoopIndex]);
    },
    toCloseTips() {
      //关闭页面试运行弹出层
      this.common.addCookie("isallshow", "true", 1000);
      this.isshow = "true";
      clearTimeout(this.timer); // 清除定时器
      this.timer = null;
    },
    isshow_setTimes: function() {
      //设置超时
      if (this.isshow_times > 0) {
        this.isshow_times--;
        let _this = this;
        this.timer = setTimeout(function() {
          _this.isshow_setTimes();
        }, 1000);
      }
    },
    fixNum(num, type) {
      //数字精确到万  type=1时长
      if (num) {
        if (type == 3 && num > 100000000) {
          return (parseInt(num) / 100000000).toFixed(2) + "亿";
        } else if (type != 2 || (type == 2 && num > 10000)) {
          return Math.round(parseInt(num) / 10000) + "万";
        } else {
          return num;
        }
      } else if (type == 1) {
        return "0.00";
      } else {
        return 0;
      }
    }
  }
};
</script>

<style src="../assets/css/swiper.css"></style>
<style scoped>
.hidden {
  display: none;
}
.picScroll-left .hd {
  margin-top: 0;
  top: 30%;
}

.swiper-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 560px;
  height: 365px;
}
.top_moretitle {
  margin-left: 20px;
  display: inline-block;
  width: 38px;
  line-height: 16px;
  border-radius: 10px;
  background: #cc0000;
  border: 1px solid #cc0000;
  font-size: 12px;
  color: #fff;
  text-align: center;
  bottom: 29px;
  font-weight: normal;
  transition: 0.3s;
}
.top_moretitle:hover {
  background: #fff;
  color: #cc0000;
}
.paginations {
  position: absolute;
  z-index: 20;
  bottom: 25px;
  width: 100%;
}

.js-right-fixed {
  position: fixed;
  right: 0;
  top: 50%;
  margin-top: -184px;
  z-index: 100;
  width: 150px;
  text-align: center;
  height: 368px;
}
.js-right-fixed_bottom {
  margin-top: 65px;
  border-top-left-radius: 99px;
  border-bottom-left-radius: 99px;
  background: #ed3c3c
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAABHNCSVQICAgIfAhkiAAAAeZJREFUWIW9l9t1wjAMhiUmyAhsULpBOkHZoHSCsgEZgU5ANqAbNBuQDegG0Am+Plg+uG5uBlOdw0N80WfLv2QjkmDAHNgBRy52AN6AIsVXCnTDsJ2ARW7ocgQawvPtPArtmK1zAP2ZptgJeLkFujEn19qRlDMHCmB/AzC21VTwZ0boNDiwvQMUOlJNA+hcRI6TzyTdWlV99B+zoKO6I1REZAGU/kNF/mW33hpVfRK57Hj5D1ARkRKrbB5cDgwWEfkWkddc8BD8MDK4UtU6E/yi7pFUaMJZuAvjfENqVVPALR23Da6GN1eCmzFwJzRaQAl8XAXG1ebY6jFozyIqXCSGjuLgJ8RlcpsCHFjIkv7jqIS/V1/WCgasusI9k6Be38MsDd/j9pmI1FHbPV6L8+i79uIKldl0Tr3BcE/gbg3hcnMLnDJDvXjXuMuod+CZTO9jE1YLtHHfH2EBtYiIqk57K/VDd4H/L1UdzhYLOYNhGZ7/YrtcAQuL4DTB4irQoW+COdzjHobPBttZwahMsIX5SIucKX3fBed3tWtNOIugv7BFxak6GV7bqsuovTDYOl4YrmYfroYGjtZ2TjsLa1/4ny1CZyDPU8p2WFlYwf09+bSfLw5eUJOElFynzXGc562qnlP8/AAgOjUazRtRMgAAAABJRU5ErkJggg==)
    no-repeat 24px center;
  padding: 11px 16px 11px 70px;
}
.js-right-fixed_bottom span {
  display: inline-block;
  width: 56px;
  font-size: 14px;
  color: #fff;
}

/* .swiper-pagination-switch {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: #555;
  margin: 0 5px;
  opacity: 0.8;
  border: 1px solid #fff;
  cursor: pointer;
}
.swiper-active-switch {
  background: #fff;
} */
.pop-notice {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(../assets/img/showtip_bg.png) no-repeat center center;
  width: 730px;
  /* height: 520px; */
  background-size: 100% 100%;
  font-size: 16px;
  color: #fff;
  outline: 1000px solid rgba(0, 0, 0, 0.5);
  padding: 30px 50px;
  box-sizing: border-box;
  z-index: 1000;
}
.pop-notice h2 {
  text-align: center;
  margin: 0 0 20px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #fff;
}
.pop-notice p {
  line-height: 1.6;
  text-indent: 2em;
  margin: 0 0 20px 0;
}
.pop-notice a {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background: rgba(255, 255, 255, 0.85);
  min-width: 120px;
  text-align: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 20px;
  text-decoration: none;
  font-size: 16px;
  color: #e64845;
  cursor: pointer;
}
.pop-notice .close {
  margin: 0;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  background: url(../assets/img/showtip_close.png) no-repeat center center;
  cursor: pointer;
}
</style>
