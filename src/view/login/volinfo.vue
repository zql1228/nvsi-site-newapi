<template>
  <div id="volinfo">
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
              <a href="javascript:void(0);">志愿者</a>
            </div>
          </li>
        </ul>
        <div class="row w avatar" style="padding-left:0;">
          <div class="col v-t">
            <img :src="common.changeImgsrc(volInfo.photo)" @error="imgError" alt="" />
          </div>
          <div class="col v-t">
            <p class="avatar-tit mb-20">
              <em style="color:#333">{{ volInfo.albp0003 }}</em>
              <span class="button button-small"
                style="color:#fff;border-radius:20px;width:auto;height:24px;line-height:24px;margin-left:10px;padding:0 10px;font-size:12px;">实名志愿者</span>
            </p>
            <ul class="grid">
              <li class="grid-item g-8">
                <i>服务星级：</i>
                <span>{{ star }}</span>
              </li>
              <li class="grid-item g-16">
                <i>区域：</i>
                <span>{{ volInfo.albp0025 }}</span>
              </li>
              <li class="grid-item g-8">
                <i>服务时长：</i>
                <span>{{ volInfo.albp0089 || "0.0" }}</span><span>小时</span>
              </li>
              <li class="grid-item g-8">
                <i>积分：</i>
                <span>0</span>
              </li>
              <li class="grid-item g-8">
                <i>排名：</i>
                <span>999+</span>
              </li>
              <li class="grid-item g-8">
                <i>注册日期：</i>
                <span>{{ volInfo.albp0034 | ellipsisNos(10) }}</span>
              </li>
              <!--<li class="grid-item g-8">
                <i>志愿者编号：</i>
                <span>{{volInfo.albp0029}}</span>
              </li>-->
              <li class="grid-item g-16">
                <i>服务评价：</i>
                <span>守时程度：5.0 服务态度：5.0 专业水平：5.0</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="tabbar row w" style="margin-top:20px;">
          <div class="col v-t">
            <span class="active">特长和服务经历</span>
            <span>加入的项目</span>
            <span>加入的团体</span>
          </div>
          <!--  <div class="col v-m t-r">
            <a href="javascript:void(0);" @click="sendMessage(volInfo.albp0029,volInfo.albp0031)" class="button button-normal">给他发站内信</a>
          </div> -->
        </div>
        <!-- 特长和服务经历 -->
        <div class="tabbar-down" style="margin: 10px;line-height: 200%;">
          <p style="color: #008D03;"><span>特长：</span></p>
          <span>{{ volInfo.albp0039 || "无" }}</span>
          <p style="color: #008D03;"><span>服务经历：</span></p>
          <span>{{ volInfo.albp0040 || "无" }}</span>
        </div>
        <!-- 加入的项目 -->
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
                <td colspan="3" style="text-align: center;border-bottom: 1px #F6F3F7;">
                  <img src="../../assets/img/js-wujilu.png" />
                </td>
              </tr>
              <tr v-for="(el, index) in projectList" :key="index">
                <td class="left">
                  <span @click="toProjectInfo(el.id, el.areaid)" class="c-danger cursors" v-if="
                      el.albx0072 == 3 || el.albx0072 == 4 || el.albx0072 == 5
                    ">{{ el.albx0002 | ellipsis(25) }}</span>
                  <span v-else>{{ el.albx0002 | ellipsis(25) }}</span>
                </td>
                <td class="left">{{ el.albx0004 | ellipsisNos(10) }}</td>
                <td class="left">
                  <span v-show="el.albx0072 == 6 || el.albx0072 == 7">{{
                    el.albx0073 == 20
                      ? "补录中"
                      : el.albx0073 == 21
                      ? "已停用"
                      : "已作废"
                  }}</span><i v-show="
                      el.albx0072 == 5 || el.albx0072 == 3 || el.albx0072 == 4
                    ">{{
                      ((el.albx0073 == 16 ||
                        el.albx0073 == 14 ||
                        el.albx0073 == 15) &&
                        "运行中") ||
                        (el.albx0073 == 19 && "手动结项") ||
                        (el.albx0073 == 18 && "自动结项") ||
                        (el.albx0073 == 13 && "待启动")
                    }}</i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 加入的团体 -->
        <div class="tabbar-down" style="display:none;">
          <table class="table-list">
            <colgroup>
              <col width="50%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <tbody>
              <tr>
                <th>团体名称</th>
                <th>成员</th>
                <th>成立日期</th>
              </tr>
              <tr v-if="!groupList.length">
                <td colspan="3" style="text-align: center;border-bottom: 1px #F6F3F7;">
                  <img src="../../assets/img/js-wujilu.png" />
                </td>
              </tr>
              <tr v-for="(el, index) in groupList" :key="index">
                <td class="left">
                  <i @click="toOrgInfo(el.id, el.albe0012)" :title="el.albe0002" class="c-danger cursors">{{ el.albe0002 | ellipsis(25) }}</i>
                </td>
                <td class="left">{{ el.albe0056 || "0" }}</td>
                <td class="left">{{ el.albe0046 | ellipsisNos(10) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="nowIndex == 1 || nowIndex == 2">
          <pagination :pageCount="tolPage" :rangePage="pageSize" :initPage="pageNow" :totals="tolCount" :val="jumpPage" @pageEvent="pageEvent">
          </pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const pagination = () => import("@/components/pagination.vue"); //分页
import avatar from "../../assets/img/avatar1.png";

export default {
  name: "volinfo",
  components: {
    pagination //分页
  },
  data: function() {
    return {
      volnum: this.$route.params.volid, //志愿者编号
      albp0020: this.$route.params.areaid, //志愿者服务区域（不一定是当前服务区域）
      volInfo: {}, //志愿者信息
      groupList: [], //加入团体
      projectList: [], //加入项目
      nowIndex: "",
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1
    };
  },
  created() {
    window.Vues = this; //主体页面vue实例挂载
    this.getVolInfo();
  },
  mounted() {
    this.setData();
  },
  computed: {
    star: function() {
      if (
        !this.volInfo.albp0089 ||
        (this.volInfo.albp0089 && this.volInfo.albp0089 < 100)
      ) {
        return "暂无星级";
      } else if (this.volInfo.albp0089 >= 100 && this.volInfo.albp0089 < 300) {
        return "1星";
      } else if (this.volInfo.albp0089 >= 300 && this.volInfo.albp0089 < 600) {
        return "2星";
      } else if (this.volInfo.albp0089 >= 600 && this.volInfo.albp0089 < 1000) {
        return "3星";
      } else if (this.volInfo.albp0089 >= 1000) {
        return "4星";
      }
    }
  },
  methods: {
    setData: function() {
      $(".tabbar span").each(function(idx, el) {
        $(el).click(function() {
          Vues.nowIndex = idx;
          if (idx == 1 || idx == 2) {
            //刷新分页
            Vues.tolPage = 0;
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
    pageEvent: function(e) {
      //分页
      this.getList();
    },
    getList: async function() {
      this.common.getTolData(this);
      if (this.nowIndex == 1) {
        this.projectList = [];
        let params = {
          cardno: this.volnum,
          albx0084: "B",
          pageNum: this.pageNow,
          pageSize: this.pageSize
        };
        let { data: res } = await this.utilscommit.asyncReq(
          "listVolMyProjectsFortisWeb",
          params
        );
        if (res.code == 0 && res.data != "SELECT_NULL") {
          this.projectList = res.data.data;
          this.common.getTolData(this, res);
        }
      } else if (this.nowIndex == 2) {
        this.groupList = [];
        let params = {
          cardno: this.volnum,
          pageNum: this.pageNow,
          pageSize: this.pageSize
        };
        let { data: res } = await this.utilscommit.asyncReq(
          "queryMyTeamPageWeb",
          params
        );
        if (res.code == 0 && res.data) {
          this.groupList = res.data;
          this.common.getTolData(this, res);
        }
      }
    },
    getVolInfo: async function() {
      let params = {
        cardno: this.volnum
      };
      debugger
      let { data: res } = await this.utilscommit.asyncReq(
        "getVolunteerInfoOnSecret",
        params
      );
      if (res.code == 0 && res.data) {
        this.volInfo = res.data;
        this.getVolAlbp0039();
        this.getVolPhoto();
      }
    },
    async getVolAlbp0039() {
      let params = {
        tableName: "nvsi_albp0039",
        codeid: this.volInfo.albp0039
      };
      let { data: res } = await this.utilscommit.asyncReqH5(
        "getValueFromCodeId",
        params
      );
      if (res.code == 0 && res.data) {
        this.volInfo.albp0039 = res.data.value;
      }
    },
    // 获取志愿者头像
    async getVolPhoto() {
      let { data: res } = await this.utilscommit.asyncReq(
        "getVolunteerPhotoOnSecret",
        {
          cardno: this.volnum
        }
      );
      if (res.code == 0 && res.data) {
        this.$set(this.volInfo, "photo", res.data.photourl);
      }
    },
    imgError: function(el) {
      el.target.src = avatar;
    },
    toProjectInfo: function(projectid, areaid) {
      window.open(
        this.$router.resolve({
          name: "projectInfo",
          params: { id: projectid, areaid: areaid }
        }).href
      );
    },
    toOrgInfo: function(orgid, areaid) {
      window.open(
        this.$router.resolve({
          name: "groupInfo",
          params: { orgid: orgid, areaid: areaid }
        }).href
      );
    }
  }
};
</script>

<style>
.table-list th {
  text-align: left;
}
</style>
