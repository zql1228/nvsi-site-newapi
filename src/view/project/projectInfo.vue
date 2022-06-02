<template>
  <div id="newsbody">
    <!--中间部分-->
    <div class="main bannerimg">
      <div class="mid">
        <ul class="row w">
          <li class="col">
            <div class="router">
              <span>当前位置：</span>
              <a href="javascript:void(0);"
                ><router-link tag="a" :to="{ name: 'home' }"
                  >首页</router-link
                ></a
              >
              <a href="javascript:void(0);"
                ><router-link tag="a" :to="{ name: 'project' }"
                  >志愿项目</router-link
                ></a
              >
              <a href="javascript:void(0);">志愿项目详情</a>
            </div>
          </li>
        </ul>
        <div class="section">
          <div class="row w">
            <div class="col v-t" style="padding-right: 50px">
              <div class="row w">
                <div class="col v-t" style="width: 38%">
                  <img
                    :src="projectInfo.fileid"
                    @error="imgError"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-if="projectInfo.fileid"
                  />
                  <img
                    :src="projectInfo.defaultImg"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else-if="projectInfo.defaultImg"
                  />
                  <img
                    src="../../assets/img/i3.png"
                    style="width: 260px; height: 170px"
                    alt=""
                    v-else
                  />
                </div>
                <div class="col v-t">
                  <h2 class="h2">
                    {{ projectInfo.albx0002 }}
                    <span
                      style="width: 88px; padding: 0"
                      v-text="
                        (projectInfo.albx0072 == 3 && '待启动') ||
                          (projectInfo.albx0072 == 4 && '运行中') ||
                          ((projectInfo.albx0072 == 5 ||
                            projectInfo.albx0072 == 6) &&
                            '已结项') ||
                          ''
                      "
                      v-bind:class="
                        (projectInfo.albx0072 == 2 &&
                          'button button-small warning round') ||
                          (projectInfo.albx0072 == 3 &&
                            'button button-small success round') ||
                          ((projectInfo.albx0072 == 5 ||
                            projectInfo.albx0072 == 4) &&
                            'button button-small round') ||
                          ((projectInfo.albx0072 == 7 ||
                            projectInfo.albx0072 == 6) &&
                            'button button-small info round')
                      "
                    ></span>
                  </h2>
                  <table class="table-info">
                    <colgroup>
                      <col width="21%" />
                      <col width="79%" />
                    </colgroup>
                    <tr>
                      <th>项目编号：</th>
                      <td>
                        <em v-text="projectInfo.albx0013"></em>
                      </td>
                    </tr>
                    <tr>
                      <th>服务类别：</th>
                      <td>
                        <span
                          v-for="item in projectInfo.albx0009l"
                          class="button outline"
                          :key="item.id"
                          >{{ item }}</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th>项目分享到：</th>
                      <td>
                        <a href="javascript:void(0);" @click="toWB">
                          <img src="../../assets/img/wb-1.png" alt="" />
                        </a>
                        <a href="javascript:void(0);" @click="showtype = 1">
                          <img src="../../assets/img/vx-1.png" alt="" />
                        </a>
                        <a href="javascript:void(0);" @click="showtype = 2">
                          <img src="../../assets/img/qq-1.png" alt="" />
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="arrow-box">
                <table class="table-info">
                  <colgroup>
                    <col width="13%" />
                    <col width="37%" />
                    <col width="15%" />
                    <col width="35%" />
                  </colgroup>
                  <tr>
                    <th>项目地点：</th>
                    <td>{{ projectInfo.albx0003 }}</td>
                    <th>发布日期：</th>
                    <td>{{ projectInfo.albx0031 | ellipsisNos(10) }}</td>
                  </tr>
                  <tr>
                    <th>项目日期：</th>
                    <td>
                      {{ projectInfo.albx0004 | ellipsisNos(10) }} 至
                      {{ projectInfo.albx0005 | ellipsisNos(10) }}
                    </td>
                    <!-- <th>招募日期：</th>
                    <td>
                      {{ projectInfo.albx0004 | ellipsisNos(10) }} 至
                      {{ projectInfo.albx0005 | ellipsisNos(10) }}
                    </td> -->
                    <th>服务对象：</th>
                    <td>{{ projectInfo.albx0014l }}</td>
                  </tr>
                  <tr>
                    <th>志愿者保障:</th>
                    <td>{{ projectInfo.albx0019l }}</td>
                  </tr>
                </table>

                <!-- <div style="font-weight: 400; color: #808080; padding-top: 3px">
                  服务时间描述:
                  <span style="color: #333; padding-left: 13px">{{
                    projectInfo.albx0010
                  }}</span>
                </div> -->
              </div>
              <table
                class="table-list grid"
                v-for="(item, index) in jobList"
                :key="index"
              >
                <thead>
                  <tr>
                    <th colspan="3" align="left">
                      <span class="item"
                        >岗位{{ index + 1 }}：<i>{{ item.albx0072 }}</i></span
                      >
                      <span class="item"
                        >计划招募：<i>{{ item.albx0077 }}</i></span
                      >
                      <span class="item"
                        >已招募：<i>{{ item.albx0079 }}</i></span
                      >
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>岗位编号</th>
                    <th>岗位描述</th>
                    <th>岗位条件</th>
                  </tr>
                  <tr>
                    <td align="left">{{ item.albx0073 }}</td>
                    <td align="left">{{ item.albx0074 }}</td>
                    <td align="left">{{ item.albx0075 }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="tabbar" style="margin-top: 20px">
                <span class="active">项目详情</span>
                <span>报名信息</span>
                <!-- <span>讨论区</span>
                <span>项目动态</span> -->
                <span>时长公示</span>
              </div>
              <!-- 项目信息 -->
              <div class="tabbar-down">
                <p
                  v-if="!projectInfo.albx0018"
                  style="width: 100%; text-align: center"
                >
                  <img src="../../assets/img/js-wujilu.png" />
                </p>
                <p
                  v-if="projectInfo.albx0018"
                  v-html="ecellipsiSpace(projectInfo.albx0018)"
                  style="padding: 18px; word-break: break-all"
                ></p>
              </div>
              <!-- 最新报名 -->
              <div class="tabbar-down" style="display: none">
                <table class="table-list">
                  <colgroup>
                    <col width="15%" />
                    <col width="30%" />
                    <col width="20%" />
                    <col width="20%" />
                    <!-- <col width="15%" /> -->
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>姓名</th>
                      <th>岗位</th>
                      <th>服务时长</th>
                      <th>报名时间</th>
                      <!-- <th>操作</th> -->
                    </tr>
                    <tr v-if="!applyList.length">
                      <td
                        colspan="5"
                        style="text-align: center; border-bottom: 1px #f6f3f7"
                      >
                        <img src="../../assets/img/js-wujilu.png" />
                      </td>
                    </tr>
                    <tr v-for="el in applyList" :key="el.id">
                      <td align="left">
                        <i
                          class="c-danger pointer name_color"
                          :title="el.albp0003"
                          @click="toVolInfo(el.albp0005, el.albp0020)"
                          >{{ el.albp0003 }}</i
                        >
                      </td>
                      <td align="left">{{ el.albx0072 }}</td>
                      <td align="left">{{ el.albx0083 | addZero }}小时</td>
                      <td align="left">{{ el.albx0056 | ellipsisNos(10) }}</td>
                      <!-- <td align="left">
                        <a
                          href="javascript:void(0);"
                          class="c-danger"
                          @click="showComplain(el.albp0029, el.albp0003)"
                          >我要投诉</a
                        >
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 时长公示 -->
              <div class="tabbar-down" style="display: none">
                <table class="table-list">
                  <colgroup>
                    <col width="15%" />
                    <col width="15%" />
                    <col width="65%" />
                    <!-- <col width="15%"> -->
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>姓名</th>
                      <th>服务时长</th>
                      <th>备注</th>
                      <!-- <th>操作</th> -->
                    </tr>
                    <tr v-if="!timePublicList.length">
                      <td
                        colspan="4"
                        style="text-align: center; border-bottom: 1px #f6f3f7"
                      >
                        <img src="../../assets/img/js-wujilu.png" />
                      </td>
                    </tr>
                    <tr v-for="el in timePublicList" :key="el.id">
                      <td align="left">
                        <i
                          class="pointer c-danger name_color"
                          :title="el.albp0003"
                          @click="toVolInfo(el.albp0005, el.albp0020)"
                          >{{ el.albp0003 }}</i
                        >
                      </td>
                      <td align="left">{{ el.albx0172 | addZero }}小时</td>
                      <td align="left">{{ el.albp0057 }}</td>
                      <!-- <td class="left"><a href="javascript:void(0);" class="c-danger" @click="inform(el.id,el.albp0029,el.albx0172)">举报</a> (<span>{{el.count || 0}}</span>)</td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 讨论区 -->
              <div class="tabbar-down" style="display: none">
                <!-- <div class="load">
                  <textarea class="textarea" rows="4" placeholder="在这里畅所欲言吧～" v-model="leaveContent" maxlength="200" style="height: 146px;"></textarea>
                  <a href="javascript:void(0);" style="margin-top: 15px;" class="button" @click="publish(1)">发布评论</a> -->
                <h2 class="subtitle subtitle-plain">最新讨论</h2>
                <p
                  v-if="!mainMessageList.length"
                  style="width: 100%; text-align: center"
                >
                  <img src="../../assets/img/js-wujilu.png" />
                </p>
                <ul class="activity">
                  <li class="row w" v-for="el in mainMessageList" :key="el.id">
                    <div class="col v-t">
                      <img
                        :src="common.changeImgsrc(el.photo)"
                        @error="imgError3"
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
                      </h3>
                      <div class="activity-info">{{ el.albx4003 }}</div>
                      <div class="message-child">
                        <div
                          class="row w line-message"
                          v-for="el2 in el.sublist"
                          :key="el2.id"
                        >
                          <h3 class="activity-tit" style="margin-top: 10px">
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
                          </h3>
                          <div class="activity-info">{{ el2.albx4003 }}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <!-- </div> -->
              </div>
              <!-- 项目动态 -->
              <div class="tabbar-down" style="display: none">
                <h2 class="subtitle subtitle-plain">最新动态</h2>
                <p
                  v-if="!dynamicList.length"
                  style="width: 100%; text-align: center"
                >
                  <img src="../../assets/img/js-wujilu.png" />
                </p>
                <ul class="activity" v-if="dynamicList.length > 0">
                  <li class="row w" v-for="(el, key) in dynamicList" :key="key">
                    <div class="col v-t">
                      <img
                        v-if="!el.imgpath"
                        src="../../assets/img/avatar.png"
                        alt=""
                      />
                      <img
                        v-if="el.imgpath"
                        :src="common.changeImgsrc(el.imgpath)"
                        width="64px"
                        height="64px"
                        alt=""
                      />
                    </div>
                    <div class="col v-t">
                      <h3 class="activity-tit">
                        {{ el.albx0417
                        }}<span>{{ el.createtime | ellipsisNos(15) }}</span>
                      </h3>
                      <div class="activity-info" v-text="el.albx0404"></div>
                      <ul class="activity-img" v-if="el.photolist">
                        <li v-for="(els, keys) in el.photolist" :key="keys">
                          <img
                            v-if="els.imgpath"
                            :src="common.changeImgsrc(els.imgpath)"
                            width="80px"
                            height="80px"
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              <div
                v-if="
                  nowIndex == 1 ||
                    nowIndex == 2 ||
                    nowIndex == 3 ||
                    nowIndex == 4
                "
              >
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
            <div class="col v-t" style="width: 30%">
              <h2 class="subtitle subtitle-noline" style="margin-top: -10px">
                项目发起人
              </h2>
              <div class="row w handup" style="margin: 20px 0 40px 0">
                <div class="col v-m">
                  <img
                    :src="projectInfo.groupfileid"
                    @error="imgError2"
                    style="width: 93px; height: 93px"
                    alt=""
                    v-if="projectInfo.groupfileid"
                  />
                  <img
                    v-else-if="projectInfo.grodefaultImg"
                    :src="projectInfo.grodefaultImg"
                    style="width: 93px; height: 93px"
                    alt=""
                  />
                  <img
                    v-else
                    src="../../assets/img/i1.png"
                    alt=""
                    style="width: 93px; height: 93px"
                  />
                </div>
                <div class="col v-m">
                  <h2>
                    <a
                      href="javascript:void(0);"
                      style="color: #2c5abd"
                      @click="
                        toGroupInfo(projectInfo.groupId, projectInfo.albe0012)
                      "
                      >{{ projectInfo.albe0002 }}</a
                    >
                  </h2>
                  <p v-if="projectInfo.albe0013">
                    地址：{{ projectInfo.albe0013 }}
                  </p>
                </div>
              </div>
              <h2 class="subtitle subtitle-noline subtitle-margin">
                项目联系人
              </h2>
              <div class="link-info">
                <h2 v-if="projectInfo.albx0025">{{ projectInfo.albx0025 }}</h2>
                <p v-if="projectInfo.albx0027 == 1 && projectInfo.albx0026">
                  手机：{{ projectInfo.albx0026 }}
                </p>
                <p v-if="projectInfo.albx0039 == 1 && projectInfo.albx0028">
                  电话：{{ projectInfo.albx0028 }}
                </p>
                <p v-if="projectInfo.albx0030">
                  邮箱：{{ projectInfo.albx0030 }}
                </p>
                <!-- <p class="row w">
                  <span class="col v-m" style="padding-right: 10px">
                    <a
                      href="javascript:void(0);"
                      class="button outline"
                      @click="showComplain(projectid, projectInfo.albx0002)"
                      >我要投诉</a
                    >
                  </span>
                  <span class="col v-m" style="padding-left: 10px">
                    <a href="javascript:void(0);" class="button outline" @click="sendMessage(groupInfo.id,groupInfo.albe0037)">给他发站内信</a>
                  </span>
                </p> -->
              </div>
              <h2 class="subtitle subtitle-noline subtitle-margin">项目地址</h2>
              <div class="link-info">
                <p :if="projectInfo.albx0003">{{ projectInfo.albx0003 }}</p>
                <p class="row w">
                  <span class="col v-m" style="padding-right: 10px">
                    <a
                      href="javascript:void(0);"
                      class="button outline"
                      @click="showMapp"
                      >查看地图</a
                    >
                  </span>
                  <span class="col v-m" style="padding-left: 10px"> </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--地图-->
    <div class="mask map">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px"
      >
        <div class="mask-header row w">
          <div class="col v-m"><h2>地图</h2></div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" class="mask-close" @click="closeMapp"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div>
          <div id="map" style="height: 380px"></div>
        </div>
      </div>
    </div>

    <!-- 微信分享 -->
    <!-- <div class="mask vxp">
      <div class="mask-info" style="overflow: unset;width:350px;max-height:450px;margin-left:0;transform: translate(-50%,-50%);">
        <div class="mask-header row w">
          <div class="col v-m"><h2>微信分享</h2></div>
          <div class="col v-m t-r"><a href="javascript:void(0);" class="mask-close" @click="closeVX"><img src="../../assets/img/close.png" alt=""></a></div>
        </div>
        <div class="VX_code" style="margin-top: 10px;">
          <div class="qrcode" ref="qrcodeproject"></div>
          <p style="text-align: center;margin-top: 10px;">打开微信扫一扫分享</p>
        </div>
      </div>
    </div> -->

    <!-- 我要投诉 -->
    <div class="mask complain">
      <div
        class="mask-info"
        style="width: 700px; max-height: 705px; margin-left: -350px; top: 50%"
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
        <ul class="grid" style="margin-top: 10px">
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>被投诉对象：</p>
              <input :value="objname" readonly placeholder="请输入被投诉对象" />
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px"
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
              style="padding: 5px 0 0 20px; height: 17px; color: red"
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
              style="padding: 5px 0 0 20px; height: 17px; color: red"
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
              style="padding: 5px 0 0 20px; height: 17px; color: red"
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
              style="padding: 5px 0 0 20px; height: 17px; color: red"
              id="phoneTips"
            ></span>
          </li>
          <li class="grid-item g-12">
            <div class="form">
              <p class="form-label"><em>*</em>图文验证码：</p>
              <div class="row w" style="display: inline-table">
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
                  style="width: 130px"
                  @click="changeImgCode"
                >
                  <img
                    id="reg_image"
                    class="button button-line"
                    style="width: 100%; padding: 1px 1px 2px 5px"
                  />
                </div>
              </div>
            </div>
            <span
              class="form-error"
              style="padding: 5px 0 0 20px; height: 17px; color: red"
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
            style="margin-top: 5px"
            @click="onSubmit"
            >提交</a
          >
        </div>
      </div>
    </div>

    <!-- 微信分享 -->
    <share :showtype="showtype" type="pro"></share>
  </div>
</template>

<script>
var _this = "";
const pagination = () => import("@/components/pagination.vue"); //分页
const share = () => import("@/components/share.vue"); //分享
import i3 from "../../assets/img/i3.png";
import i1 from "../../assets/img/i1.png";
import avatar from "../../assets/img/avatar.png";
import Vue from "vue";

export default {
  name: "newsbody",
  components: {
    pagination,
    share //分页
  },
  inject: ["reload"],
  data() {
    return {
      areaid: this.$route.params.areaid,
      projectid: this.$route.params.id,
      projectInfo: {}, //项目信息
      groupInfo: {}, //团体信息
      jobList: [], //岗位信息
      applyJobId: "", //岗位id
      applyList: {}, //最新报名列表
      timePublicList: {}, //时长公示列表
      nowIndex: 0,
      objname: "", //被投诉对象名称
      obj: "", //被投诉对象id
      content: "", //投诉内容
      name: "", //投诉人姓名
      card: "", //投诉人身份证
      phone: "", //投诉人手机
      imgcode: "", //图文验证码
      // code:'',//手机验证码
      // codeButton:"获取验证码",
      // countdown:60,
      // imgCodeFlag:false,
      //讨论区
      mainMessageList: [], //主评论列表
      dynamicList: [], //动态列表
      //分页参数
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 8, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1, //记录输入框中的值
      timer: "", //定时器
      //分享参数
      showtype: 0,
      imgkey: "" //图文验证码的key
    };
  },
  /* computed: {
    currentTabComponent: function () {
      return 'pro_' + this.currentTab.name.toLowerCase();//对字母转换成小写
    }
  }, */
  created() {
    this.getdate();
    _this = this;
  },
  mounted() {
    this.setData();
    this.changeImgCode();
  },
  methods: {
    setData: function() {
      $(".tabbar span").each(function(idx, el) {
        if (_this.nowIndex) {
          $(el).removeClass("active");
          if (idx == _this.nowIndex) {
            $(el).addClass("active");
          }
          $(".tabbar-down")
            .eq(_this.nowIndex)
            .show()
            .siblings(".tabbar-down")
            .hide();
        }
        $(el).click(function() {
          _this.nowIndex = idx;
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
    getdate() {
      this.utilscommit.requestapi(
        "getProjectInfoFortisWeb",
        { albx0021: this.areaid, proId: this.projectid },
        // { albx0021: this.areaid, proId: 'f177c10247e047f8a64a79e360ddf02d' },
        this.callback_projectinfo
      );
    },
    callback_projectinfo(result) {
      //项目详情
      if (result && result.data) {
        let list = result.data;
        //项目的默认图片
        if (list.albx0009) {
          let type = list.albx0009.split(",")[0];
          //type 为项目的服务类别第一项,静态图片只有 0001~0019 以及 0099 即parseInt(type)小于20的即可
          //type.length==4  是为了防止后台数据出现问题的情况
          if (type && type.length == 4 && parseInt(type) < 20) {
            list.defaultImg = require("../../assets/img/prodefault/" +
              type +
              ".png");
          } else {
            list.defaultImg = require("../../assets/img/prodefault/0099.png");
          }
        } else {
          list.defaultImg = require("../../assets/img/prodefault/0099.png");
        }
        //该项目的队伍默认图片
        let provinceId = list.albx0021.slice(0, 2);
        if (provinceId == "98") {
          //新疆兵团
          list.grodefaultImg = require("../../assets/img/grodefault/65.png");
        } else {
          list.grodefaultImg = require("../../assets/img/grodefault/" +
            provinceId +
            ".png");
        }
        list.albx0009l = list.albx0009l && list.albx0009l.split(",");
        this.projectInfo = list;
        /* this.utilscommit.request(
          "nvsi_getProjectGroupInfo",
          { areaid: this.areaid, projectid: this.projectid },
          this.callback_projectgInfo
        ); //获取发布项目团体信息 */
        this.utilscommit.requestapi(
          "ProjectPostFortisWeb",
          { areaid: this.areaid, projectid: this.projectid },
          this.callback_projectgw
        ); //查询项目下岗位信息
      }
    },
    callback_projectgInfo(result) {
      //获取发布项目团体信息
      if (result && result.data) {
        this.groupInfo = result.data;
      }
    },
    callback_projectgw(result) {
      //查询项目下岗位信息
      if (result && result.data) {
        this.jobList = result.data;
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
    showMapp: function() {
      var map = new BMap.Map("map");
      var point = new BMap.Point(116.404, 39.915);
      if (
        this.projectInfo.albx0035 &&
        this.projectInfo.albx0036 &&
        this.projectInfo.albx0035 != 0 &&
        this.projectInfo.albx0036 != 0
      )
        point = new BMap.Point(
          this.projectInfo.albx0035,
          this.projectInfo.albx0036
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
      $(".mask.map").addClass("active");
    },
    formTip(el, tip) {
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    },
    pageEvent: function(e) {
      //分页
      this.getList();
    },
    getList() {
      if (this.nowIndex == 1) {
        this.applyList = [];
        /* this.utilscommit.request(
          "nvsi_listJoinProjectMembers",
          {
            areaid: this.areaid,
            projectid: this.projectid,
            pageNow: this.pageNow,
            pageSize: this.pageSize
          },
          this.applyListBack
        ); */
        // 查询项目报名信息
        let params = {
          areaid: this.projectInfo.albx0021,
          proId: this.projectid,
          albx0084: "B",
          pageNum: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.requestapi(
          "volSignUpProjectListFortisWeb",
          params,
          this.applyListBack
        );
        /* } else if (this.nowIndex == 2) {
        var data = {
          ofid: this.projectid,
          type: "2",
          areaid: this.areaid,
          pageNow: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.request(
          "nvsi_listMainMessage",
          data,
          this.mainMessageBack
        );
      } else if (this.nowIndex == 3) {
        this.utilscommit.request(
          "nvsi_dynamicList",
          {
            projectid: this.projectid,
            pageNow: this.pageNow,
            pageSize: this.pageSize
          },
          this.dynamicListBack
        ); */
        // } else if (this.nowIndex == 4) {
      } else if (this.nowIndex == 2) {
        /* this.utilscommit.request(
          "nvsi_listProjectTimePublic",
          {
            areaid: this.areaid,
            projectid: this.projectid,
            pageNow: this.pageNow,
            pageSize: this.pageSize
          },
          this.publicListBack
        ); */
        this.timePublicList = [];
        // 查询项目时长公示
        let params = {
          areaid: this.projectInfo.albx0021, // 项目区划
          albx0176: this.projectid, // 项目id
          pageNum: this.pageNow,
          pageSize: this.pageSize
        };
        this.utilscommit.requestapi(
          "timeFortisWeb",
          params,
          this.publicListBack
        );
      }
    },
    applyListBack: function(result) {
      // debugger
      if (result && result.data) {
        this.applyList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.applyList = {};
        this.common.getTolData(this);
      }
    },
    mainMessageBack: function(result) {
      if (result && result.data) {
        this.mainMessageList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.mainMessageList = {};
        this.common.getTolData(this);
      }
    },
    publicListBack: function(result) {
      if (result && result.data) {
        this.timePublicList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.timePublicList = {};
        this.common.getTolData(this);
      }
    },
    dynamicListBack: function(result) {
      if (result && result.data) {
        this.dynamicList = result.data;
        this.common.getTolData(this, result);
      } else {
        this.timePublicList = {};
        this.common.getTolData(this);
      }
    },
    showComplain: function(id, name) {
      this.objname = name;
      this.obj = id;
      $(".mask.complain").addClass("active");
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
    /* codeCheck:function () {
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
      /* else{
        this.imgcode = this.common.trimAll(this.imgcode).toUpperCase();
        this.utilscommit.request('nvsi_getImgCodeCheck',{"imgcode":this.imgcode,imgkey:this.imgkey},this.callback3);
      } */
    },
    /* callback3:function (result) {
      if (result) {
        if (result.data) {
          this.imgCodeFlag = true;
        } else {
          this.tip = result.message;
          this.type = 2;
          _this.changeImgCode();
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
      if(result.data) {
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
        _this.setTime();
      },1000);
    }, */
    onSubmit: function() {
      //提交投诉
      /*  if (!this.imgCodeFlag) {
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
          albx3702: "3",
          albx3703: this.obj, //被投诉对象
          albx3715: this.objname, //被投诉对象名称
          albx3704: this.name, //投诉者姓名
          albx3705: this.card, //身份证
          albx3706: this.phone, //手机
          albx3710: this.content, //内容
          albx3713: "1",
          albx3714: this.groupInfo.id,
          areaid: this.areaid,
          code: this.imgcode,
          imgkey: this.imgkey
        };
        this.utilscommit.request("nvsi_insertComplain", data, function(result) {
          if (result) {
            if (result.data) {
              _this.closeComplain();
              _this.$swal("投诉提交成功", { button: "确认" });
            } else {
              _this.$swal(result.message, { button: "确认" }).then(() => {
                _this.changeImgCode();
              });
            }
          }
        });
      }
    },
    imgError(el) {
      if (this.projectInfo.defaultImg) {
        el.target.src = this.projectInfo.defaultImg;
      } else {
        el.target.src = i3;
      }
    },
    imgError2(el) {
      if (this.projectInfo.grodefaultImg) {
        el.target.src = this.projectInfo.grodefaultImg;
      } else {
        el.target.src = i1;
      }
    },
    imgError3(el) {
      el.target.src = avatar;
    },
    toGroupInfo: function(orgid, areaid) {
      window.open(
        this.$router.resolve({ path: `/groupInfo/${orgid}/${areaid}` }).href
      );
    },
    toVolInfo: function(volnum, albp0020) {
      window.open(
        this.$router.resolve({ path: `/volinfo/${volnum}/${albp0020}` }).href
      );
    },
    closeMapp() {
      //关闭地图
      $(".mask.map").removeClass("active");
    },
    closeVX: function() {
      //关闭微信
      $("#qrcode").empty();
      $(".mask.vxp").removeClass("active");
    },
    closeComplain: function() {
      //关闭投诉
      $(".mask.complain").removeClass("active");
      $(".form-error").html("");
      this.objname = this.obj = this.content = this.name = this.card = this.phone = this.imgcode = this.code =
        "";
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
    }
  },
  watch: {
    nowIndex: function(newval, oldval) {
      if (newval == 1 || newval == 2 || newval == 3 || newval == 4) {
        //刷新最新报名、讨论区、时长公示
        this.pageNow = 1;
        this.getList();
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/base.css";
@import "../../assets/css/main.css";
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
#picker {
  background: url("../../assets/img/camera.png") no-repeat center center;
}
.hides {
  display: none;
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
