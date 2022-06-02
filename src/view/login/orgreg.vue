<template>
  <div id="orgreg">
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
              <span>全国性组织/单位注册</span>
            </div>
          </li>
        </ul>
        <ul class="row w" style="background: #fff">
          <li class="col v-t w white">
            <div class="tabbar">
              <router-link class="active" tag="a" :to="{ name: 'orgreg' }"
                >全国性组织/单位注册</router-link
              >
            </div>
            <ul class="flow">
              <li class="active">选择队伍类型</li>
              <li>账户信息</li>
              <li>基本信息</li>
              <li>登记信息</li>
              <li>联系人信息</li>
              <li>负责人信息</li>
            </ul>
            <img src="../../assets/img/shadow.png" alt="" style="width: 100%" />
            <!--选择队伍类型-->
            <div class="tabbar-down">
              <h2 class="subtitle subtitle-margin subtitle-noline">
                选择队伍类型
              </h2>
              <div class="zy-page">
                <div class="zy-section">
                  <ul class="zy-login-list">
                    <li>
                      <div class="zy-login-list-panel">
                        <img src="@/assets/img/icon23.png" alt="" />
                        <h2>志愿服务组织</h2>
                        <p>
                          在民政部门依法登记成立，以开展志愿服务为宗旨的非营利性组织。<i
                            >（志愿服务组织可以采取社会团体、社会服务机构、基金会等组织形式。）</i
                          >
                        </p>
                        <a href="javascript:void(0);" @click="zreoCheck(2)"
                          >点击注册</a
                        >
                      </div>
                    </li>
                    <li>
                      <div class="zy-login-list-panel">
                        <img src="@/assets/img/icon21.png" alt="" />
                        <h2>其他开展志愿服务活动的法人组织</h2>
                        <p>
                          志愿服务组织以外的，依法开展志愿服务活动的法人组织。<i
                            >（其他开展志愿服务活动的法人组织可以采取党政机关、教育事业单位、卫生事业单位、科技事业单位、文化事业单位、社会福利事业单位、其他事业单位、群团组织、居民委员会、村民委员会、社会组织等组织形式。）</i
                          >
                        </p>
                        <a href="javascript:void(0);" @click="zreoCheck(3)"
                          >点击注册</a
                        >
                      </div>
                    </li>
                    <li>
                      <div class="zy-login-list-panel">
                        <img src="@/assets/img/icon22.png" alt="" />
                        <h2>志愿服务团体</h2>
                        <p>
                          经社区或单位同意成立的，以开展志愿服务为宗旨，尚未依法登记的团体，大多采取志愿服务队等形式组建，一般也称为志愿服务团队。
                        </p>
                        <a href="javascript:void(0);" @click="zreoCheck(1)"
                          >点击注册</a
                        >
                      </div>
                    </li>
                  </ul>
                  <div class="zy-tips">
                    <img src="@/assets/img/icon7.png" alt="" />
                    <p>
                      注册不同类型的队伍需提交不同的信息和材料，请谨慎选择需要注册的队伍类型。选择错误会导致注册无法通过审核。
                    </p>
                  </div>
                  <div class="zy-file">
                    <img src="@/assets/img/icon8.png" alt="" />
                    <p>志愿服务团体类型注册文件：注册申请表扫描件.doc</p>
                    <div class="zy-file-button">
                      <!-- <input type="file" name="file" id="file"> -->
                      <label for="file" @click="downfile">下载</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--账号信息-->
            <div class="tabbar-down" style="display: none">
              <h2 class="subtitle subtitle-margin subtitle-noline">账户信息</h2>
              <div class="grid g-16 auto">
                <div class="grid-item g-14 form">
                  <p class="form-label"><em>*</em>用户名：</p>
                  <input
                    type="text"
                    id="username"
                    v-model="newUserInfo.albp0052"
                    @blur="usernameCheck"
                    @focus="usernameTip"
                    maxlength="20"
                    oninput="this.value=this.value.replace(/[^\w_.]/g,'');"
                    placeholder="请输入用户名"
                  />
                  <p
                    class="form-error w warn-tip right-tip"
                    style="margin-top: 0"
                    id="usernameTips"
                  >
                    用户名长度6～20个字符，以字母a～z开头，且只能由字母、数字0～9和下划线组成
                  </p>
                </div>
                <div class="grid-item g-14 form">
                  <p class="form-label"><em>*</em>密码：</p>
                  <input
                    type="password"
                    id="password"
                    v-model="newUserInfo.albp0053"
                    @blur="passwordCheck"
                    @focus="passwordTip"
                    maxlength="20"
                    placeholder="请输入密码"
                  /><!-- oninput="this.value=this.value.replace(/[^\w_.]/g,'');" -->
                  <img
                    src="../../assets/img/hide.png"
                    alt=""
                    class="pwd_img"
                    v-show="imgShow == 0"
                    @click="changeType($event, 'imgShow', 1)"
                  />
                  <img
                    src="../../assets/img/show.png"
                    alt=""
                    class="pwd_img"
                    v-show="imgShow == 1"
                    @click="changeType($event, 'imgShow', 0)"
                  />
                  <p
                    class="form-error w warn-tip right-tip"
                    style="margin-top: 0"
                    id="passwordTips"
                  >
                    密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母
                  </p>
                </div>
                <div class="grid-item g-14 form">
                  <p class="form-label"><em>*</em>确认密码：</p>
                  <input
                    type="password"
                    id="repeatpw"
                    v-model="newUserInfo.repeatpw"
                    @blur="repeatPWCheck"
                    maxlength="20"
                    placeholder="请输入确认密码"
                  /><!-- oninput="this.value=this.value.replace(/[^\w_.]/g,'');" -->
                  <img
                    src="../../assets/img/hide.png"
                    alt=""
                    class="pwd_img"
                    v-show="imgShow1 == 0"
                    @click="changeType($event, 'imgShow1', 1)"
                  />
                  <img
                    src="../../assets/img/show.png"
                    alt=""
                    class="pwd_img"
                    v-show="imgShow1 == 1"
                    @click="changeType($event, 'imgShow1', 0)"
                  />
                  <p
                    class="form-error w warn-tip right-tip"
                    id="repeatpwTips"
                  ></p>
                </div>
                <div class="t-c pt-30">
                  <a
                    href="javascript:void(0);"
                    @click="gotoStep(0)"
                    class="button"
                    style="margin-right: 150px"
                    >上一步</a
                  >
                  <a
                    href="javascript:void(0);"
                    @click="firstCheck"
                    class="button"
                    >下一步</a
                  >
                </div>
              </div>
            </div>
            <!--基本信息-->
            <div class="tabbar-down" style="display: none">
              <h2 class="subtitle subtitle-margin subtitle-noline">基本信息</h2>
              <ul class="grid" style="margin-top: 10px">
                <li class="grid-item g-12">
                  <div class="form">
                    <p class="form-label">
                      <em>*</em><span id="orgname">队伍名称：</span>
                      <span style="font-size: 14px; color: #666" id="orgtip"
                        >（{{
                          loginType == 1
                            ? "建议填写为“XX志愿者协会、联合会、基金会、组织”等形式"
                            : "请与统一社会信用代码证书机构名称保持一致"
                        }}）</span
                      >
                    </p>
                    <input
                      type="text"
                      id="groupName"
                      v-model="newUserInfo.albe0002"
                      @blur="groupNameCheck"
                      maxlength="50"
                      placeholder="请输入队伍名称"
                      onchange="this.value=this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'').slice(0,20);"
                    />
                  </div>
                  <span class="form-error down-tip" id="groupNameTips"></span>
                </li>
                <li class="grid-item g-12">
                  <div class="form">
                    <p class="form-label"><em>*</em>详细地址：</p>
                    <div class="row w">
                      <div class="col v-m">
                        <input
                          type="text"
                          id="address"
                          v-model="detailAddress"
                          maxlength="50"
                          placeholder="请选择详细地址"
                          readonly
                        /><!--  @blur="detailedAddressCheck" -->
                      </div>
                      <div class="col v-m pl-10" style="width: 90px">
                        <a
                          href="javascript:void(0);"
                          class="button button-line"
                          @click="showMap"
                          >选择</a
                        >
                      </div>
                    </div>
                  </div>
                  <span
                    class="form-error down-tip"
                    id="detailAddressTips"
                  ></span>
                </li>
                <li class="grid-item g-12">
                  <div class="form">
                    <p class="form-label"><em>*</em>区域：</p>
                    <div class="row w">
                      <div class="col v-m">
                        <input
                          type="text"
                          value="全国"
                          placeholder="请选择区域"
                          readonly
                        /><!-- id="orgArea" -->
                      </div>
                      <!-- <div class="col v-m pl-10" style="width:90px;">
                        <a href="javascript:void(0);" @click="chooseArea" class="button button-line">选择</a>
                      </div> -->
                    </div>
                  </div>
                  <span class="form-error down-tip" id="orgAreaTips"></span>
                </li>
                <li class="grid-item g-12">
                  <div class="form">
                    <p class="form-label"><em>*</em>计划招募人数：</p>
                    <input
                      type="text"
                      id="volNum"
                      v-model="newUserInfo.albe0016"
                      maxlength="8"
                      placeholder="请输入计划招募人数"
                      @blur="volNumCheck"
                      oninput="this.value=this.value.replace(/[^\d]/g,'');if(this.value==0)value='';"
                    />
                  </div>
                  <span class="form-error down-tip" id="volNumTips"></span>
                </li>
                <!-- <li class="grid-item g-12">
                  <div class="form">
                    <p class="form-label">队伍微博：</p>
                    <input type="text"  v-model="newUserInfo.albe0039" maxlength="250"  placeholder="请输入队伍微博" onchange="this.value=this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'').slice(0,20);">
                  </div>
                  <span class="form-error down-tip"></span>
                </li> -->

                <li class="grid-item g-12">
                  <div class="form">
                    <p class="form-label">
                      <em>*</em>
                      <span id="orgforunit" v-if="loginType == 1"
                        >同意其成立的单位（社区）名称：</span
                      >
                      <span id="orgforunit" v-else>主管单位名称：</span>
                    </p>
                    <input
                      type="text"
                      v-if="loginType == 1"
                      id="orgUnit"
                      v-model="newUserInfo.albe0011"
                      @blur="orgunitChange"
                      maxlength="50"
                      placeholder="请输入同意其成立的单位（社区）名称"
                      onchange="this.value=this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'').slice(0,50);"
                    />
                    <input
                      type="text"
                      v-else
                      id="orgUnit"
                      v-model="newUserInfo.albe0011"
                      @blur="orgunitChange"
                      maxlength="50"
                      placeholder="请输入主管单位名称"
                      onchange="this.value=this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'').slice(0,50);"
                    />
                  </div>
                  <span class="form-error down-tip" id="orgUnitTips"></span>
                </li>
                <li class="grid-item g-12" v-if="loginType > 1">
                  <div class="form">
                    <p class="form-label"><em>*</em>统一社会信用代码：</p>
                    <input
                      type="text"
                      v-model="newUserInfo.albe0008"
                      maxlength="20"
                      placeholder="请输入统一社会信用代码"
                      @blur="tyCodeCheck"
                    />
                  </div>
                  <span class="form-error down-tip" id="tyCodeTips"></span>
                </li>
                <li class="grid-item g-12">
                  <div class="form">
                    <p class="form-label">成立日期：</p>
                    <date-picker
                      style="width: 100%"
                      :lang="lang"
                      v-model="newUserInfo.albe0015"
                      valueType="format"
                      :disabled-date="common.notAfterToday"
                      placeholder="请选择成立日期"
                    ></date-picker>
                  </div>
                  <span class="form-error down-tip"></span>
                </li>
                <li class="grid-item g-12">
                  <div class="form">
                    <p class="form-label">
                      <span
                        >队伍网址：<span style="font-size: 14px; color: #666"
                          >（格式如：http://....或者https://....）</span
                        ></span
                      >
                    </p>
                    <input
                      type="text"
                      v-model="newUserInfo.albe0040"
                      maxlength="250"
                      placeholder="请输入队伍网址"
                      @blur="albe0040Change"
                    />
                  </div>
                  <span class="form-error down-tip" id="albe0040Tips"></span>
                </li>
                <li class="grid-item g-12" v-if="loginType == 1">
                  <div class="form">
                    <p class="form-label col v-m" style="width: 150px">
                      <span>是否法人组织直属队：</span>
                    </p>
                    <div class="col v-m t-l">
                      <label for="yes1" class="radio">
                        <input
                          type="radio"
                          id="yes1"
                          name="radio1"
                          value="1"
                          disabled
                        />
                        <span></span>
                        <i>是</i>
                      </label>
                      <label for="no1" class="radio">
                        <input
                          type="radio"
                          id="no1"
                          name="radio1"
                          value="0"
                          checked
                          disabled
                        />
                        <span></span>
                        <i>否</i>
                      </label>
                    </div>
                  </div>
                  <span class="form-error down-tip"></span>
                </li>
                <li class="grid-item g-12" id="islink">
                  <div class="form">
                    <p class="form-label col v-m" style="width: 150px">
                      <em>*</em><span>是否有联络组织：</span>
                    </p>
                    <div class="col v-m t-l">
                      <label for="yes" class="radio">
                        <input
                          type="radio"
                          id="yes"
                          name="radio"
                          value="1"
                          v-model="isLink"
                        />
                        <span></span>
                        <i>是</i>
                      </label>
                      <label for="no" class="radio">
                        <input
                          type="radio"
                          id="no"
                          name="radio"
                          value="0"
                          v-model="isLink"
                        />
                        <span></span>
                        <i>否</i>
                      </label>
                    </div>
                  </div>
                  <span class="form-error down-tip"></span>
                </li>
                <li class="grid-item g-12">
                  <div class="form">
                    <p class="form-label">
                      <em>*</em>
                      <span id="orgfortype" v-if="loginType == 1"
                        >同意其成立的单位（社区）类型：</span
                      >
                      <span id="orgfortype" v-else>组织类型：</span>
                    </p>

                    <div class="select">
                      <select
                        id="orgType"
                        v-model="orgType"
                        @change="orgTypeCheck"
                      >
                        <option value="0">请选择</option>
                        <option
                          v-for="el in orgTypeList"
                          :key="el.id"
                          :value="el.codeid"
                          v-text="el.codevalue"
                        ></option>
                      </select>
                    </div>
                  </div>
                  <span class="form-error down-tip" id="orgTypeTips"></span>
                </li>
                <li class="grid-item g-12" id="link" v-if="isLink == 1">
                  <div class="form">
                    <p class="form-label"><em>*</em>联络组织：</p>
                    <div class="row w">
                      <div class="col v-m">
                        <input
                          type="text"
                          id="linkOrg"
                          v-model="linkOrgName"
                          maxlength="20"
                          readonly="readonly"
                          @change="linkOrgCheck"
                          placeholder="请选择联络组织"
                        />
                      </div>
                      <div class="col v-m pl-10" style="width: 90px">
                        <a
                          href="javascript:void(0);"
                          class="button button-line"
                          @click="showLinkOrg"
                          >选择</a
                        >
                      </div>
                    </div>
                  </div>
                  <span class="form-error down-tip" id="linkOrgTips"></span>
                </li>

                <li class="grid-item g-12" v-if="loginType > 1">
                  <div class="form">
                    <p class="form-label"><em>*</em>登记部门：</p>
                    <input
                      type="text"
                      v-if="loginType == 2"
                      value="民政部门"
                      maxlength="20"
                      readonly
                    />
                    <input
                      type="text"
                      v-if="loginType == 3"
                      value="其他"
                      maxlength="20"
                      readonly
                    />
                  </div>
                  <span class="form-error down-tip" id="orgWebTips"></span>
                </li>
                <li
                  class="grid-item g-12"
                  v-if="(loginType == 1 && isLink == 0) || loginType > 1"
                >
                  <div class="form">
                    <p class="form-label"><em>*</em>登记机关：</p>
                    <input
                      type="text"
                      value="民政部"
                      maxlength="20"
                      placeholder="请输入登记机关"
                      readonly
                    />
                  </div>
                  <span class="form-error down-tip" id="orgWebTips"></span>
                </li>
                <!-- <li class="grid-item g-12" v-if="loginType>1">
                  <div class="form">
                    <p class="form-label"><em>*</em>统一社会信用代码：</p>
                    <input type="text"  v-model="newUserInfo.albe0008" maxlength="20" placeholder="请输入统一社会信用代码" @blur="tyCodeCheck">
                  </div>
                  <span class="form-error down-tip" id="tyCodeTips"></span>
                </li> -->
                <li class="grid-item g-12" v-if="loginType == 1 && isLink == 0">
                  <!-- :style="codeHide" -->
                  <div class="form">
                    <p class="form-label">
                      <em>*</em><span>同意其成立的单位（社区）名称：</span>
                    </p>
                    <input
                      type="text"
                      id="unitName"
                      v-model="albe0057"
                      maxlength="50"
                      readonly="readonly"
                      placeholder="请输入同意其成立的单位（社区）名称"
                    />
                  </div>
                  <span class="form-error down-tip" id="unitNameTips"></span>
                </li>
                <li class="grid-item g-12" v-if="loginType == 1 && isLink == 0">
                  <!-- :style="aHide" -->
                  <div class="form">
                    <p class="form-label">
                      <em>*</em
                      ><span>同意其成立的单位（社区）统一社会信用代码：</span>
                    </p>
                    <input
                      type="text"
                      id="unitCode"
                      v-model="newUserInfo.albe0061"
                      maxlength="20"
                      @blur="forUnitCodeCheck"
                      placeholder="请输入同意其成立的单位（社区）统一社会信用代码"
                    />
                  </div>
                  <span class="form-error down-tip" id="unitCodeTips"></span>
                </li>
                <li class="grid-item g-12" v-if="loginType == 1 && isLink == 0">
                  <!-- :style="aHide" -->
                  <div class="form">
                    <p class="form-label">
                      <em>*</em><span>同意其成立的单位（社区）联系人：</span>
                    </p>
                    <input
                      type="text"
                      id="unitLink"
                      v-model="newUserInfo.albe0058"
                      maxlength="20"
                      @blur="forUnitLinkNameCheck"
                      placeholder="请输入同意其成立的单位（社区）联系人"
                    />
                  </div>
                  <span class="form-error down-tip" id="unitLinkTips"></span>
                </li>
                <li class="grid-item g-12" v-if="loginType == 1 && isLink == 0">
                  <!-- :style="aHide" -->
                  <div class="form">
                    <p class="form-label">
                      <em>*</em><span>同意其成立的单位（社区）联系电话：</span>
                    </p>
                    <input
                      type="text"
                      id="unitPhone"
                      v-model="newUserInfo.albe0059"
                      maxlength="12"
                      @blur="forUnitLinkPhoneCheck"
                      placeholder="请输入同意其成立的单位（社区）联系电话"
                    />
                  </div>
                  <span class="form-error down-tip" id="unitPhoneTips"></span>
                </li>
                <li class="grid-item g-24" v-if="loginType == 1 && isLink == 0">
                  <!-- :style="aHide" -->
                  <div class="form">
                    <label for="agree" class="radio" style="margin-right: 5px">
                      <input
                        type="checkbox"
                        id="agree"
                        name="radioo"
                        v-model="isOk"
                      />
                      <span></span>
                      <i></i>
                    </label>
                    <p
                      class="form-label"
                      style="
                        margin: 10px;
                        vertical-align: middle;
                        display: inline-block;
                        color: red;
                      "
                    >
                      <em>*</em
                      ><span
                        >本团体郑重承诺所提交的申报材料均真实、合法。如有不实之处，愿负相应的法律责任，并承担由此产生的一切后果</span
                      >
                    </p>
                  </div>
                  <span class="form-error down-tip" id="agreeTips"></span>
                </li>
                <li class="grid-item g-24">
                  <div class="form">
                    <p class="form-label">
                      <em>*</em>服务类别：<em>（最多选择4项）</em>
                    </p>
                    <div class="checkbox-fixed">
                      <label
                        class="checkbox"
                        v-for="(el, index) in serviceTypeList"
                        :key="index"
                        :for="el.id"
                      >
                        <input
                          type="checkbox"
                          name="checkbox"
                          :id="el.id"
                          :value="el.albe0123"
                          v-model="serviceType"
                          @change="serviceTypeCheck"
                          :disabled="
                            serviceType.length > 3 &&
                              serviceType.indexOf(el.albe0123) == -1
                          "
                        />
                        <span></span>
                        <i :title="el.albe0122">{{
                          el.albe0122 | ellipsis(10)
                        }}</i>
                      </label>
                    </div>
                  </div>
                  <span class="form-error down-tip" id="serviceTypeTips"></span>
                </li>
                <!-- <li class="grid-item g-24" >
                  <div class="form">
                    <p class="form-label">所属行业：</p>
                    <div class="checkbox-fixed">
                      <label class="checkbox" v-for="(el,index) in industryList" :key="index" :for="el.id">
                        <input type="checkbox" name="checkbox" :id="el.id" :value="el.albe2203" v-model="industry" @change="industryCheck">
                        <span></span>
                        <i :title="el.albe2202">{{el.albe2202 | ellipsis(10)}}</i>
                      </label>
                    </div>
                  </div>
                  <span class="form-error down-tip" id="industryTips"></span>
                </li> -->
                <li class="grid-item g-24">
                  <div class="form">
                    <p class="form-label">队伍提供：</p>
                    <div class="checkbox-fixed">
                      <label
                        class="checkbox"
                        v-for="(el, index) in orgGiveList"
                        :key="index"
                        :for="el.id"
                      >
                        <input
                          type="checkbox"
                          name="checkbox"
                          :id="el.id"
                          :value="el.codeid"
                          v-model="orgGive"
                        />
                        <span></span>
                        <i :title="el.codevalue">{{
                          el.codevalue | ellipsis(10)
                        }}</i>
                      </label>
                    </div>
                  </div>
                </li>
                <li class="grid-item g-24">
                  <div class="form">
                    <p class="form-label">队伍需要：</p>
                    <div class="checkbox-fixed">
                      <label
                        class="checkbox"
                        v-for="(el, index) in orgNeedList"
                        :key="index"
                        :for="el.id"
                      >
                        <input
                          type="checkbox"
                          name="checkbox"
                          :id="el.id"
                          :value="el.codeid"
                          v-model="orgNeed"
                        />
                        <span></span>
                        <i :title="el.codevalue">{{
                          el.codevalue | ellipsis(10)
                        }}</i>
                      </label>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="t-c pt-30">
                <a
                  href="javascript:void(0);"
                  @click="gotoStep(1)"
                  class="button"
                  style="margin-right: 150px"
                  >上一步</a
                >
                <a
                  href="javascript:void(0);"
                  @click="secondCheck"
                  class="button"
                  >下一步</a
                >
              </div>
            </div>
            <!--登记信息-->
            <div class="tabbar-down" style="display: none">
              <!-- style="display: none;" -->
              <h2 class="subtitle subtitle-margin subtitle-noline">登记信息</h2>
              <div class="grid auto">
                <div class="grid-item form" v-if="loginType > 1">
                  <p class="form-label">
                    <em>*</em><span>统一社会信用代码证：</span>
                  </p>
                  <div class="row w" style="dispaly: flex; position: relative">
                    <div
                      class="col v-m pl-10"
                      style="padding: 20px 10px; position: relative"
                    >
                      <a
                        href="javascript:void(0);"
                        @click="uploadImg"
                        class="button button-line"
                        style="width: 110px; margin-right: 20px"
                        >选择上传</a
                      >
                      <span
                        style="font-size: 15px; color: #666; padding: 10px"
                        v-if="file.name"
                      ></span>
                      <div style="display: inline-block">
                        <p
                          class="form-error w warn-tip"
                          id="fileTips"
                          style="padding-left: 30px"
                        >
                          请上传统一社会信用代码证
                        </p>
                        <input
                          id="file"
                          type="file"
                          @change="changeImages"
                          accept="image/*"
                          hidden
                        />
                      </div>
                      <div
                        style="
                          position: absolute;
                          right: 20px;
                          top: 50%;
                          margin-top: -20px;
                        "
                      >
                        <a
                          href="javascript:void(0);"
                          @click="showImages"
                          class="button button-line"
                          style="
                            width: 90px;
                            marign-left: 20px;
                            margin-right: 20px;
                          "
                          >查看</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid-item form" id="zjphoto1" v-if="loginType == 1">
                  <p class="form-label">
                    <em>*</em><span id="filetitle1">注册申请表扫描件：</span>
                  </p>
                  <div class="row w" style="dispaly: flex; position: relative">
                    <div
                      class="col v-m pl-10"
                      style="padding: 20px 10px; position: relative"
                    >
                      <a
                        href="javascript:void(0);"
                        @click="upimg1"
                        class="button button-line"
                        style="width: 110px; margin-right: 20px"
                        >选择上传</a
                      >
                      <span
                        id="up_file1"
                        style="font-size: 15px; color: #666; padding: 10px"
                      ></span>
                      <div style="display: inline-block">
                        <p
                          class="form-error w warn-tip"
                          id="file1Tips"
                          style="padding-left: 30px"
                        >
                          请上传注册申请表扫描件
                        </p>
                        <input
                          id="file1"
                          type="file"
                          @change="changeImg1"
                          accept="image/*"
                          hidden
                        />
                      </div>
                      <div
                        style="
                          position: absolute;
                          right: 20px;
                          top: 50%;
                          margin-top: -20px;
                        "
                      >
                        <a
                          href="javascript:void(0);"
                          @click="downfile"
                          class="button button-line"
                          style="width: 90px; margin-right: 20px"
                          id="downfile"
                          >下载模板</a
                        >
                        <a
                          href="javascript:void(0);"
                          @click="showimg1"
                          class="button button-line"
                          style="
                            width: 90px;
                            marign-left: 20px;
                            margin-right: 20px;
                          "
                          >查看</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid-item form" id="zjphoto2" v-if="false">
                  <p class="form-label">
                    <em>*</em><span id="filetitle2">负责人手持身份证照：</span>
                  </p>
                  <div class="row w" style="dispaly: flex; position: relative">
                    <div
                      class="col v-m pl-10"
                      style="padding: 20px 10px; position: relative"
                    >
                      <a
                        href="javascript:void(0);"
                        @click="upimg2"
                        class="button button-line"
                        style="width: 110px; margin-right: 20px"
                        >选择上传</a
                      >
                      <span
                        id="up_file2"
                        style="font-size: 15px; color: #666; padding: 10px"
                      ></span>
                      <div style="display: inline-block">
                        <p
                          class="form-error w warn-tip"
                          id="file2Tips"
                          style="padding-left: 30px"
                        >
                          请上传负责人手持身份证照
                        </p>
                        <input
                          id="file2"
                          type="file"
                          @change="changeImg2"
                          accept="image/*"
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style="
                      position: absolute;
                      right: 20px;
                      top: 50%;
                      margin-top: -20px;
                    "
                  >
                    <a
                      href="javascript:void(0);"
                      @click="showHoldIdCard"
                      class="button button-line"
                      style="width: 90px; margin-right: 20px"
                      >示例图片</a
                    >
                    <a
                      href="javascript:void(0);"
                      @click="showimg2"
                      class="button button-line"
                      style="width: 90px; margin-right: 20px"
                      >查看</a
                    >
                    <!-- <a href="javascript:void(0);" @click="downimg2" class="button button-line" style="width: 90px;marign-left:20px;">下载模板</a> -->
                  </div>
                </div>
              </div>
              <div class="t-c pt-30">
                <a
                  href="javascript:void(0);"
                  @click="gotoStep(2)"
                  class="button"
                  style="margin-right: 150px"
                  >上一步</a
                >
                <a href="javascript:void(0);" @click="thirdCheck" class="button"
                  >下一步</a
                >
              </div>
            </div>
            <!--联系人信息-->
            <div class="tabbar-down" style="display: none">
              <!-- style="display: none;" -->
              <h2 class="subtitle subtitle-margin subtitle-noline">
                联系人信息
              </h2>
              <div class="grid g-16 auto">
                <div class="grid-item g-14 form">
                  <p class="form-label">
                    <em>*</em
                    ><span
                      >联系人姓名：（若姓名中涉及标点符号，请使用中文字符圆点，同右侧样式“·”）</span
                    >
                  </p>
                  <input
                    type="text"
                    id="linkName"
                    v-model="newUserInfo.albe0018"
                    @blur="linkNameCheck"
                    @focus="linkNameTip"
                    placeholder="请输入联系人姓名"
                    maxlength="20"
                  />
                  <p class="form-error w warn-tip right-tip" id="linkNameTips">
                    联系人姓名不能为空
                  </p>
                </div>
                <div class="grid-item g-14 form">
                  <p class="form-label"><em>*</em>联系人手机：</p>
                  <div class="row w" style="display: inline-table">
                    <div class="col v-m">
                      <input
                        type="text"
                        id="linkPhone"
                        v-model="newUserInfo.albe0019"
                        @blur="linkPhoneCheck"
                        @focus="linkPhoneTip"
                        placeholder="请输入联系人手机"
                        maxlength="11"
                      />
                    </div>
                    <div class="col v-m pl-10" style="width: 130px">
                      <div class="select">
                        <select v-model="albe0047">
                          <option value="0">不公开</option>
                          <option value="1">公开</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p class="form-error w warn-tip right-tip" id="linkPhoneTips">
                    联系人手机号码不能为空
                  </p>
                </div>
                <div class="grid-item g-14 form">
                  <p class="form-label">
                    <span
                      >联系人电话：<span style="font-size: 14px; color: #666"
                        >（格式如：XXXX-XXXXXXXX）</span
                      ></span
                    >
                  </p>
                  <div class="row w" style="display: inline-table">
                    <div class="col v-m">
                      <input
                        type="text"
                        id="linkTelPhone"
                        v-model="newUserInfo.albe0020"
                        @blur="linkTelPhoneCheck"
                        maxlength="13"
                        placeholder="请输入联系人电话"
                      />
                    </div>
                    <div class="col v-m pl-10" style="width: 130px">
                      <div class="select">
                        <select v-model="albe0048">
                          <option value="0">不公开</option>
                          <option value="1">公开</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p
                    class="form-error w warn-tip right-tip"
                    id="linkTelPhoneTips"
                  ></p>
                </div>
                <div class="grid-item g-14 form">
                  <p class="form-label"><em>*</em>电子邮箱：</p>
                  <input
                    type="text"
                    id="linkEmail"
                    v-model="newUserInfo.albe0049"
                    @blur="linkEmailCheck"
                    @focus="linkEmailTip"
                    maxlength="50"
                    placeholder="请输入电子邮箱"
                  />
                  <p class="form-error w warn-tip right-tip" id="linkEmailTips">
                    <!-- 电子邮箱不能为空 -->
                  </p>
                </div>
                <div class="grid-item g-14 form">
                  <p class="form-label">联系人QQ</p>
                  <input
                    type="text"
                    id="linkQQ"
                    v-model="newUserInfo.albe0021"
                    @blur="linkQQCheck"
                    maxlength="12"
                    placeholder="请输入联系人QQ"
                  />
                  <p
                    class="form-error w warn-tip right-tip"
                    id="linkQQTips"
                  ></p>
                </div>
              </div>
              <div class="t-c pt-30">
                <a
                  href="javascript:void(0);"
                  @click="gotoStep(3)"
                  class="button"
                  style="margin-right: 150px"
                  >上一步</a
                >
                <a href="javascript:void(0);" @click="forthCheck" class="button"
                  >下一步</a
                >
              </div>
            </div>
            <!--负责人信息-->
            <div class="tabbar-down" style="display: none">
              <!-- style="display: none;" -->
              <h2 class="subtitle subtitle-margin subtitle-noline">
                负责人信息
              </h2>
              <div class="grid g-16 auto">
                <div class="grid-item g-14 form">
                  <p class="form-label">
                    <em>*</em
                    ><span
                      >负责人姓名：（若姓名中涉及标点符号，请使用中文字符圆点，同右侧样式“·”）</span
                    >
                  </p>
                  <input
                    type="text"
                    id="mainName"
                    v-model="newUserInfo.albe0022"
                    @blur="mainNameCheck"
                    @focus="mainNameTip"
                    maxlength="20"
                    placeholder="请输入负责人姓名"
                  />
                  <p class="form-error w warn-tip right-tip" id="mainNameTips">
                    负责人姓名不能为空
                  </p>
                </div>
                <div class="grid-item g-14 form">
                  <p class="form-label"><em>*</em>负责人身份证：</p>
                  <input
                    type="text"
                    id="mainCard"
                    v-model="newUserInfo.albe0023"
                    @blur="mainCardCheck"
                    @focus="mainCardTip"
                    maxlength="18"
                    placeholder="请输入负责人身份证"
                  />
                  <p class="form-error w warn-tip right-tip" id="mainCardTips">
                    负责人身份证不能为空
                  </p>
                </div>
                <div class="grid-item g-14 form">
                  <p class="form-label"><em>*</em>负责人手机：</p>
                  <input
                    type="text"
                    id="mainPhone"
                    v-model="newUserInfo.albe0024"
                    @blur="mainPhoneCheck"
                    @focus="mainPhoneTip"
                    maxlength="11"
                    placeholder="请输入负责人手机"
                  />
                  <p class="form-error w warn-tip right-tip" id="mainPhoneTips">
                    负责人手机不能为空
                  </p>
                </div>
                <div class="grid-item g-14 form">
                  <p class="form-label"><em>*</em>图文验证码：</p>
                  <div class="row w" style="display: inline-table">
                    <div class="col v-m">
                      <input
                        type="text"
                        id="inputImgCode"
                        maxlength="4"
                        @blur="imgCodeCheck"
                        oninput="value=value.replace(/[^0-9a-zA-Z]/g,'')"
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
                  <p
                    class="form-error w warn-tip right-tip"
                    id="imgCodeTips"
                  ></p>
                </div>
              </div>
              <div class="t-c pt-30">
                <a
                  href="javascript:void(0);"
                  @click="gotoStep(4)"
                  class="button"
                  style="margin-right: 150px"
                  >上一步</a
                >
                <a
                  href="javascript:void(0);"
                  @click="fifthCheck"
                  class="button"
                  id="register"
                  >提交注册</a
                >
              </div>
              <div
                class="agreement"
                style="
                  height: 110px;
                  line-height: 22px;
                  margin: 20px auto 0;
                  overflow-y: scroll;
                "
              >
                <p>
                  本网站及与本网站链接的网站，仅提供志愿者、志愿服务队伍、志愿服务机构及其它与此相关联之志愿服务项目。志愿者、志愿服务队伍、志愿服务机构以及因其它任何目的进入本网站的访问者接受本协议书条款，注册成为中国志愿服务网网站会员，并遵守本协议所述之条款使用本网站所提供之服务。如果您不接受本声明之条款，请勿使用本网站。接受本声明之条款，您将遵守本协议之规定。
                </p>
                <br />
                <p>1.信息的发布</p>
                <br />
                <p>·不得发布任何违反有关法律规定信息；</p>
                <p>·不得发布任何与本网站志愿服务目的不适之信息；</p>
                <p>·不得发布任何不完整、虚假的信息；</p>
                <p>·用户对所发布的信息承担完全责任。</p>
                <br />
                <p>2.信息的使用</p>
                <br />
                <p>
                  ·志愿服务队伍、志愿服务机构仅可就志愿服务目的使用志愿者之个人信息；
                </p>
                <p>
                  ·志愿者仅可因参加某志愿服务项目，使用志愿服务队伍、志愿服务机构发布之项目招募信息；
                </p>
                <p>·本网站提供的其它信息，仅与其相应内容有关的目的而被使用；</p>
                <p>·不得将任何本网站的信息用作任何商业目的。</p>
                <br />
                <p>3.信息的公开</p>
                <br />
                <p>
                  在本网站所登录的任何信息，均有可能被任何本网站的访问者浏览，也可能被错误使用。本网站对此将不予承担任何责任。
                </p>
                <br />
                <p>4.信息的准确性</p>
                <br />
                <p>
                  任何在本网站发布的信息，均必须符合合法、准确、及时、完整的原则。但本网站将不能保证所有由第三方提供的信息，或本网站自行采集的信息完全准确。使用者了解，对这些信息的使用，需要经过进一步核实。本网站对访问者未经自行核实误用本网站信息造成的任何损失不予承担任何责任。
                </p>
                <br />
                <p>5.信息更改与删除</p>
                <br />
                <p>
                  除了信息的发布者外，任何访问者不得更改或删除他人发布的任何信息。本网站有权根据其判断保留修改或删除任何不适信息之权利。
                </p>
                <br />
                <p>6.版权、商标权</p>
                <br />
                <p>
                  本网站的图形、图像、文字及其程序等均属中国志愿服务网网站之版权，受商标法及相关知识产权法律保护，未经中国志愿服务网网站书面许可，任何人不得下载、复制、再使用。在本网发布信息之商标，归其相应的商标所有权人，受商标法保护。
                </p>
                <br />
                <p>7、注册信息使用</p>
                <br />
                <p>
                  注册会员所提供的个人信息将会被中国志愿服务网网站统计、汇总，在我们的严格管理下，为中国志愿服务网网站的合作者提供依据。中国志愿服务网网站会不定期地通过注册会员留下的电子邮件、电话或通信地址同该会员保持联系。
                </p>
                <br />
                <p>
                  中国志愿服务网网站承诺：在未经访问者授权同意的情况下，中国志愿服务网网站不会将访问者的个人资料泄露给第三方。但以下情况除外。
                </p>
                <p>·根据执法单位之要求或为公共之目的向相关单位提供个人资料；</p>
                <p>
                  ·由于您将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露；
                </p>
                <p>
                  ·由于计算机2000年问题、黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营之不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等；
                </p>
                <p>
                  ·由于与中国志愿服务网网站链接的其它网站所造成之个人资料泄露及由此而导致的任何法律争议和后果；
                </p>
                <p>·为免除访问者在生命、身体或财产方面之急迫危险。</p>
                <br />
                <p>8.自责</p>
                <br />
                <p>
                  所有使用本网站的用户，对使用本网站信息和在本网站发布信息的被使用，承担完全责任。本网站对任何因使用本网站而产生的第三方之间的纠纷，不负任何责任。
                </p>
                <br />
                <p>9.服务终止</p>
                <br />
                <p>本网站有权在预先通知或不予通知的情况下终止任何免费服务。</p>
                <br />
                <p>10.争议处理</p>
                <br />
                <p>
                  本网站因正常的系统维护、系统升级，或者因网络拥塞而导致网站不能访问，本网站不承担任何责任。
                </p>
                <br />
                <p>11.免责条款</p>
                <br />
                <p>
                  本网并无随时监视此网址，但保留对其实施实时监视的权利。对于他方输入的，不是本网发布的材料，本网概不负任何法律责任。对于其他网址链接在本网址的内容，本网概不负法律责任。
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--注册提示框-->
    <div class="mask regInfo">
      <div class="mask-info">
        <div class="mask-header row w">
          <div class="col v-m"><h2>提示</h2></div>
        </div>
        <div class="mask-content">
          <p>
            请仔细确认您注册的队伍是否为<em
              style="color: #cc0000; font-weight: bold"
              >全国性</em
            >的志愿队伍，如果不是请切换到您所属的省级站点进行注册。
          </p>
        </div>
        <div class="mask-footer form">
          <a
            href="javascript:void(0);"
            class="button cancel"
            @click="closeReginfo"
            >取消</a
          >
          <a href="javascript:void(0);" class="button" @click="exitReg"
            >是，继续注册</a
          >
        </div>
      </div>
    </div>

    <!--图片预览窗口-->
    <div class="mask showimg">
      <div class="mask-info">
        <div class="mask-header row w">
          <div class="col v-m"><h2>查看文件</h2></div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" @click="closeImg" class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="text-align: center">
          <div id="filesrc"></div>
        </div>
      </div>
    </div>

    <!--手持证件照片预览窗口-->
    <div class="mask holdIdCard">
      <div class="mask-info">
        <div class="mask-header row w">
          <div class="col v-m"><h2>示例图片</h2></div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" @click="closeImg" class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px">
          <div><img src="../../assets/img/holdidcard.jpg" alt="" /></div>
        </div>
      </div>
    </div>

    <!--联络团体选择弹窗-->
    <div class="mask linkorg">
      <div class="mask-info" style="max-height: 702px">
        <div class="mask-header row w">
          <div class="col v-m"><h2>请选择联络队伍</h2></div>
          <div class="col v-m t-r">
            <a
              href="javascript:void(0);"
              @click="closeLinkOrg"
              class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div class="vote-form" style="padding: 25px 0">
          <span>队伍名称：</span>
          <input
            type="text"
            class="input"
            style="width: 220px; margin: 0px 20px 0px 0px"
            v-model="searchOrgName"
            maxlength="30"
            placeholder="请输入队伍名称"
          />
          <span>队伍联络编号：</span>
          <input
            type="text"
            class="input"
            style="width: 190px; margin: 0px 20px 0px 0px"
            v-model="searchOrgID"
            maxlength="30"
            placeholder="请输入队伍联络编号"
          />
          <a
            href="javascript:void(0);"
            class="button button-large"
            @click="showLinkOrgx"
            >查找</a
          >
        </div>
        <div class="tabbar-down">
          <!-- 团体信息 -->
          <table class="user-table">
            <colgroup>
              <col width="10%" />
              <col width="30%" />
              <col width="45%" />
              <col width="15%" />
            </colgroup>
            <tr>
              <th>序号</th>
              <th>队伍联络编号</th>
              <th>队伍名称</th>
              <th>操作</th>
            </tr>
            <tr
              v-if="
                tolPage == 0 &&
                  (searchOrgName || searchOrgID) &&
                  querystatus == 0
              "
            >
              <td colspan="4">
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
              </td>
            </tr>
            <tr v-if="tolPage == 0 && querystatus == 1">
              <td colspan="4">
                <img src="@/assets/img/js-wujilu.png" />
              </td>
            </tr>
            <tr v-for="(el, index) in linkOrgList" :key="index">
              <td class="left">{{ (pageNow - 1) * 5 + index + 1 }}</td>
              <td class="left">{{ el.albe0041 }}</td>
              <td class="left">{{ el.albe0002 }}</td>
              <td class="left">
                <em
                  @click="toGroupInfo(el.id, el.albe0012)"
                  class="pointer"
                  style="margin-right: 10px"
                  >查看</em
                >
                <em @click="chooseOrg(el.id, el.albe0002)" class="pointer"
                  >选择</em
                >
              </td>
            </tr>
          </table>

          <paging
            :pageCount="tolPage"
            :rangePage="pageSize"
            :initPage="pageNow"
            :totals="tolCount"
            :val="jumpPage"
            @pageEvent="pageEvent"
          >
          </paging>
        </div>
      </div>
    </div>

    <!-- 地图 -->
    <div class="mask map">
      <div class="mask-info" style="max-height: 659px">
        <div class="mask-header row w">
          <div class="col v-m"><h2>地图定位</h2></div>
          <div class="col v-m t-r">
            <a href="javascript:void(0);" @click="closeMap" class="mask-close"
              ><img src="../../assets/img/close.png" alt=""
            /></a>
          </div>
        </div>
        <div style="margin: 10px">
          <input
            type="text"
            class="input"
            style="width: 300px"
            placeholder="请输入详细地址或点击地图选中"
            id="mapValue"
            onchange="this.value=this.value.replace(/[^\u4E00-\u9FA5]/g,'').slice(0,20);"
          />
          <a href="javascript:void(0);" id="searchAddress" class="button"
            >搜索</a
          >
          <div
            id="searchResultPanel"
            style="
              border: 1px solid #c0c0c0;
              width: 150px;
              height: auto;
              display: none;
            "
          ></div>
        </div>
        <div>
          <div id="map" style="height: 450px"></div>
        </div>
        <div style="text-align: center; margin: 0 auto">
          <a
            href="javascript:void(0);"
            @click="saveAddress"
            class="button button-line"
            >设置完成</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const paging = () => import("@/components/pagination.vue"); //分页

export default {
  name: "orgreg",
  components: { paging },
  data() {
    return {
      file2h: "", //上传图片2通过上传图片处理后接口
      file1h: "", //上传图片1通过上传图片处理后接口
      loginType: "1", //登记类型
      newUserInfo: {}, //注册信息
      usernameFlag: false, //用户名校验
      allorgTypeList: [], //原团体类型下拉
      orgTypeList: [], //团体类型下拉
      orgTypeFlag: false, //统一社会信用代码校验
      //统一社会信用代码证 html
      filehtml: "",
      file: "", //文件
      code: "", //手机验证码
      imgCodeFlag: false, //图文验证码校验
      groupNameFlag: false, //团体名校验
      orgGiveList: [], //团体提供列表
      orgGive: [], //团体提供的value
      status: 0, //聚焦状态
      nowIndex: "0", //当前步数
      detailAddress: "", //详细地址
      isSelected: false, //是否通过地图选择地址
      lng: "", //经度
      lat: "", //纬度
      allLng: "",
      allLat: "",
      orgType: "0",
      albe0047: "1",
      albe0048: "1",
      serviceTypeList: [], //服务类型
      serviceType: [],
      industryList: [], //所属行业
      industry: [],
      orgNeedList: [], //团体需要
      orgNeed: [],
      lang: {
        //配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      isClick: true, //注册按钮状态
      imgkey: "", //图文验证码
      imgcode: "", //图文验证码
      //团体注册
      isLink: 1, //联络组织
      linkOrgName: "", //联络组织名称
      searchOrgID: "", //查询团体id
      searchOrgName: "", //查询团体名
      albe0057: "", //同意其成立的单位（社区）名称
      isOk: false, //是否同意
      //联络组织弹窗分页参数
      linkOrgList: [], //联络团体
      tolCount: 0, //总条数
      tolPage: 0, //总页数
      pageSize: 5, //每页条数
      pageNow: 1, //当前页
      jumpPage: 1,
      querystatus: 0, //直属组织列表|| 联络组织列表 查询状态  0=未查询   1=已查询
      imgShow: 0,
      imgShow1: 0,
      rpointlng: 116.404,
      rpointlat: 39.915
    };
  },
  created() {
    window.Vues = this; //主体页面vue实例挂载
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        Vues.rpointlng = r.point.lng;
        Vues.rpointlat = r.point.lat;
      },
      { enableHighAccuracy: true }
    );
    this.codeValue.getTeamTypeList(
      "orgTypeInfo",
      { tableName: "nvsi_albe0005" },
      this.orgTypeInfo
    );
    // this.utilscommit.requestapi(
    //   "getTeamTypeList",
    //   { tableName: "nvsi_albe0005" },
    //   this.orgTypeInfo
    // ); //组织类型
    this.codeValue.getCodeValue(
      "nvsi_albe0042",
      { tableName: "nvsi_albe0042" },
      this.orgGiveInfo
    ); //团体提供
    // this.utilscommit.requestapi(
    //   "getCodeValue",
    //   { tableName: "nvsi_albe0042" },
    //   this.orgGiveInfo
    // ); //团体提供
    this.codeValue.getServiceTypeList(
      "areaidServiceTypeList",
      { areaid: 0 },
      this.serviceTypeInfo
    ); //服务类别
    // this.utilscommit.requestapi(
    //   "getServiceTypeList",
    //   { areaid: 0 },
    //   this.serviceTypeInfo
    // ); //服务类别
    this.codeValue.getIndustryCategoryList(
      "industryList",
      { areaid: 0 },
      this.industryInfo
    ); //所属行业
    // this.utilscommit.requestapi(
    //   "getIndustryCategoryList",
    //   null,
    //   this.industryInfo
    // ); //所属行业
    this.codeValue.getCodeValue(
      "nvsi_albe0043",
      { tableName: "nvsi_albe0043" },
      this.orgNeedInfo
    ); //团体需要
    // this.utilscommit.requestapi(
    //   "getCodeValue",
    //   { tableName: "nvsi_albe0043" },
    //   this.orgNeedInfo
    // ); //团体需要
  },
  mounted() {
    this.changeImgCode();
  },
  methods: {
    gotoStep: function(step) {
      //->上一步
      if (step < 6) {
        $(".flow li").each(function(idx, el) {
          if (Vues.nowIndex >= 0) {
            $(el).removeClass("active");
            if (idx == step) {
              $(el).addClass("active");
              Vues.nowIndex = step;
            }
            $(".tabbar-down")
              .eq(step)
              .show()
              .siblings(".tabbar-down")
              .hide();
          }
        });
      } else {
        this.$swal("注册完成", { buttons: "确定" });
      }
    },
    zreoCheck: function(loginType) {
      //第0步：选择类型
      this.loginType = loginType;
      $(".mask.regInfo").addClass("active");
    },
    exitReg() {
      this.gotoStep(1);
      $(".mask.regInfo").removeClass("active");
    },
    closeReginfo() {
      $(".mask.regInfo").removeClass("active");
    },
    firstCheck: function() {
      //->第一步：账户信息校验
      this.status = 1;
      if (!this.usernameFlag) {
        this.usernameCheck();
      } else if (this.passwordCheck() && this.repeatPWCheck()) {
        this.gotoStep(2);
      }
    },
    secondCheck: function() {
      //->第二步，基本信息校验
      this.status = 1;
      if (!this.groupNameFlag) {
        //校验队伍名称
        this.groupNameCheck();
      } else if (!this.orgTypeFlag) {
        //校验统一社会信用代码
        this.tyCodeCheck();
        return;
      } else if (this.loginType == 1 && this.orgType == 0) {
        let tip = "";
        let flag = true;
        tip = "同意其成立的单位（社区）类型不能为空";
        flag = false;
        this.formTip("orgType", tip);
        return flag;
      } else if (
        this.detailedAddressCheck() &&
        this.volNumCheck() &&
        this.orgunitChange() &&
        this.orgTypeCheck() &&
        this.albe0040Change() &&
        this.linkOrgCheck() &&
        this.tyCodeCheck() &&
        this.forUnitNameCheck() &&
        this.forUnitCodeCheck() &&
        this.forUnitLinkNameCheck() &&
        this.forUnitLinkPhoneCheck() &&
        this.forUnitAgreeCheck() &&
        this.serviceTypeCheck()
      ) {
        this.gotoStep(3);
      }
    },
    thirdCheck: function() {
      //-->登记信息校验
      this.status = 1;
      if (this.file || this.file1) {
        this.gotoStep(4);
      } else {
        this.formTip2("file", "请上传统一社会信用代码证", 2);
      }
    },
    forthCheck: function() {
      //->第四步校验
      this.status = 1;
      if (
        this.linkNameCheck() &&
        this.linkPhoneCheck() &&
        this.linkTelPhoneCheck() &&
        this.linkEmailCheck() &&
        this.linkQQCheck()
      ) {
        this.gotoStep(5);
      }
    },
    fifthCheck: function() {
      //->第五步校验
      this.status = 1;
      if (
        this.mainNameCheck() &&
        this.mainCardCheck() &&
        this.mainPhoneCheck() &&
        this.imgCodeCheck() &&
        (this.file || this.file1) &&
        this.isClick
      ) {
        let logintype = parseInt(this.loginType) - 1;
        let param = new FormData(); //创建form对象
        if (this.file && this.loginType > 1)
          param.append("file1", this.file, this.file.name); //统一社会信用代码证
        if (this.file1 && this.loginType == 1)
          param.append("file1", this.file1, this.file1.name); //注册申请表扫描件
        if (this.file2) param.append("file2", this.file2, this.file2.name); //负责人手持身份证照

        param.append("code", this.imgcode); //图文证码
        param.append("imgkey", this.imgkey); //图文验证码

        param.append("sitetype", 1); //总站
        param.append(
          "userinfo",
          JSON.stringify({
            //账户信息
            albp0052: this.newUserInfo.albp0052, //用户名
            albp0053: this.newUserInfo.albp0053, //密码
            albp0056: "3", //用户类型
            albp0058: "1", //是否有效
            albp0076: "1" //是否全国性服务组织
          })
        );
        param.append(
          "orginfo",
          JSON.stringify({
            //团体信息
            albe0002: this.newUserInfo.albe0002.trim(), //团体名
            albe0003: this.loginType + "", //登记状态
            albe0004: this.newUserInfo.albe0004, //联络组织名称
            albe0005: this.orgType, //团体类型
            albe0006: logintype, //登记部门
            albe0007: "民政部", //登记机关
            albe0008: this.newUserInfo.albe0008, //统一社会信用代码
            albe0009: "100000000000000000", //登记机关区域id
            //albe0010:'',//团体编号
            albe0011: this.newUserInfo.albe0011, //团体所属单位
            albe0012: "100000000000000000", //服务区域
            albe0013: this.detailAddress, //详细地址
            //albe0014:'',//邮编
            albe0015: this.newUserInfo.albe0015, //成立日期
            albe0016: this.newUserInfo.albe0016, //规模人数
            albe0017: this.serviceType.join(","), //服务类别
            albe0018: this.newUserInfo.albe0018, //联系人
            albe0019: this.newUserInfo.albe0019, //联系人手机
            albe0020: this.newUserInfo.albe0020, //联系人电话
            albe0021: this.newUserInfo.albe0021, //联系人QQ
            albe0022: this.newUserInfo.albe0022, //负责人
            albe0023: this.newUserInfo.albe0023, //负责人身份证
            albe0024: this.newUserInfo.albe0024, //负责人手机
            //albe0025:''this.newUserInfo.'',//团体头像
            albe0026: "2", //团体状态
            albe0027: "0", //团体是否公开
            albe0028: "1", //成员加入方式
            albe0036: "0", //是否推荐
            albe0039: this.newUserInfo.albe0039, //微博
            albe0040: this.newUserInfo.albe0040, //网址
            albe0042: this.orgGive.join(","), //团体提供
            albe0043: this.orgNeed.join(","), //团体需要
            albe0047: this.albe0047, //联系人手机是否公开
            albe0048: this.albe0048, //联系人座机是否公开
            albe0049: this.newUserInfo.albe0049, //联系人邮箱
            albe0050: this.lng + "", //经度
            albe0051: this.lat + "", //纬度
            albe0053: "1", //是否为管理单位
            albe0054: "1", //是否提交审核
            albe0065: "0", //是否直属法人组织
            albe2203: this.industry, //所属行业

            albe0057: this.albe0057, //同意成立的 单位
            albe0058: this.newUserInfo.albe0058, //同意成立单位联系人
            albe0059: this.newUserInfo.albe0059, //同意成立单位联系电话
            albe0061: this.newUserInfo.albe0061, //同意成立单位统一社会信用代码
            albe0063: this.isLink //是否有联络团体
          })
        );
        let jfile1 = JSON.stringify(this.file1);
        let jfile2 = JSON.stringify(this.file2);
        console.log(jfile1);
        console.log(jfile2);
        if (!this.file2) {
          jfile2 = "";
        }

        if (this.file && this.loginType > 1) jfile1 = JSON.stringify(this.file);
        if (this.file1 && this.loginType == 1)
          jfile1 = JSON.stringify(this.file1);
        if (this.file2) jfile2 = JSON.stringify(this.file2); //负责人手持身份证照

        let imgcodex = "" + this.imgcode;
        imgcodex = imgcodex.toUpperCase();
        var data = {
          albe0044: this.file1h, //注册申请扫描表
          albe0045: this.file2h, //手持身份证照片
          code: imgcodex, //图文验证码
          imgkey: this.imgkey, //图文验证码key

          sitetype: 1, //总站
          albp0052: this.newUserInfo.albp0052, //用户名
          albp0053: this.newUserInfo.albp0053, //密码
          albp0056: "3", //用户类型
          albp0058: "1", //是否有效
          albp0076: "1", //是否全国性服务组织
          //团体信息
          albe0002: this.newUserInfo.albe0002.trim(), //团体名
          albe0003: this.loginType, //登记状态
          albe0004: this.newUserInfo.albe0004, //联络组织名称
          albe0005: this.orgType, //团体类型
          albe0006: logintype, //登记部门
          albe0007: "民政部", //登记机关
          albe0008: this.newUserInfo.albe0008, //统一社会信用代码
          albe0009: "100000000000000000", //登记机关区域id
          //albe0010:'',//团体编号
          albe0011: this.newUserInfo.albe0011, //团体所属单位
          albe0012: "100000000000000000", //服务区域
          albe0013: this.detailAddress, //详细地址
          //albe0014:'',//邮编
          albe0015: this.newUserInfo.albe0015, //成立日期
          albe0016: this.newUserInfo.albe0016, //规模人数
          albe0017: this.serviceType.join(","), //服务类别
          albe0018: this.newUserInfo.albe0018, //联系人
          albe0019: this.newUserInfo.albe0019, //联系人手机
          albe0020: this.newUserInfo.albe0020, //联系人电话
          albe0021: this.newUserInfo.albe0021, //联系人QQ
          albe0022: this.newUserInfo.albe0022, //负责人
          albe0023: this.newUserInfo.albe0023, //负责人身份证
          albe0024: this.newUserInfo.albe0024, //负责人手机
          //albe0025:''this.newUserInfo.'',//团体头像
          albe0026: "2", //团体状态
          albe0027: "0", //团体是否公开
          albe0028: "1", //成员加入方式
          albe0036: "0", //是否推荐
          albe0039: this.newUserInfo.albe0039, //微博
          albe0040: this.newUserInfo.albe0040, //网址
          albe0042: this.orgGive.join(","), //团体提供
          albe0043: this.orgNeed.join(","), //团体需要
          albe0047: this.albe0047, //联系人手机是否公开
          albe0048: this.albe0048, //联系人座机是否公开
          albe0049: this.newUserInfo.albe0049, //联系人邮箱
          albe0050: this.lng, //经度
          albe0051: this.lat, //纬度
          albe0053: "1", //是否为管理单位
          albe0054: "1", //是否提交审核
          albe0065: "0", //是否直属法人组织
          albe2203: this.industry, //所属行业

          albe0057: this.albe0057, //同意成立的 单位
          albe0058: this.newUserInfo.albe0058, //同意成立单位联系人
          albe0059: this.newUserInfo.albe0059, //同意成立单位联系电话
          albe0061: this.newUserInfo.albe0061, //同意成立单位统一社会信用代码
          albe0063: this.isLink //是否有联络团体
        };
        this.isClick = false;
        $("#register").css({ background: "gray", opacity: "1" }); //修改注册按钮状态
        this.utilscommit.requestapi("teamRegister", data, this.regCommitBack);
      }
    },
    orgTypeInfo: function(result) {
      //->组织类型结果
      if (result) {
        this.allorgTypeList = result;
        this.orgTypeList = this.allorgTypeList.nomallist;
      }
    },
    orgGiveInfo: function(result) {
      //团体提供
      this.orgGiveList = this.common.orderBy(result, "codeid", "asc");
    },
    orgNeedInfo: function(result) {
      //团体需要
      this.orgNeedList = this.common.orderBy(result, "codeid", "asc");
    },
    serviceTypeInfo: function(result) {
      //服务类别
      if (result) {
        this.serviceTypeList = result;
      }
    },
    industryInfo: function(result) {
      //所属行业
      if (result) {
        this.industryList = result;
      }
    },
    //联络组织
    pageEvent: function(e) {
      //分页
      if (e > this.tolPage) {
        this.pageNow = this.tolPage;
      } else if (e < 1) {
        this.pageNow = 1;
      } else {
        this.pageNow = e;
      }
      this.showLinkOrg();
    },
    chooseOrg: function(id, name) {
      //选择查询联络组织列表
      this.linkOrgName = name;
      this.newUserInfo.albe0004 = id;
      this.newUserInfo.albe0066 = null;
      this.closeLinkOrg();
    },
    closeLinkOrg: function() {
      //关闭联络组织信息
      $(".mask.linkorg").removeClass("active");
      this.searchOrgID = "";
      this.searchOrgName = "";
    },
    toGroupInfo: function(id, areaid) {
      window.open(
        this.$router.resolve({
          name: "groupInfo",
          params: { data1: id, data2: areaid }
        }).href
      );
    },
    showLinkOrgx: function() {
      this.pageNow = 1;
      this.showLinkOrg();
    },
    showLinkOrg: function() {
      //打开联络组织弹窗
      $(".mask.linkorg").addClass("active"); //nvsi_listLinkOrg
      this.linkOrgList = {};
      this.tolCount = 0;
      this.tolPage = 0;
      this.querystatus = 0;
      this.utilscommit.requestapi(
        "getDirecGroupWeb",
        {
          type: 1,
          areaid: "100000000000000000",
          albe0002: this.searchOrgName,
          albe0041: this.searchOrgID,
          pageSize: this.pageSize,
          pageNum: this.pageNow
        },
        this.linkOrgInfo
      );
    },
    linkOrgInfo: function(result) {
      console.log(result);
      //获取列表结果
      this.querystatus = 1;
      if (result && result.data) {
        this.linkOrgList = result.data;
        this.tolCount = result.totalCount;
        this.tolPage = result.pageCount;
      } else {
        this.linkOrgList = {};
        this.tolCount = 0;
        this.tolPage = 0;
      }
    },
    groupNameCheck: function() {
      //->组织名称校验
      this.groupNameFlag = false;
      var el = $("#groupName");
      var val = this.newUserInfo.albe0002;
      this.tip = "";
      if (!val) {
        this.tip = "队伍名称不能为空";
        if (this.status == 1) {
          el.focus();
          this.status = 0;
        }
        this.formTip("groupName", this.tip);
      } else if (
        this.loginType != 1 &&
        val &&
        this.newUserInfo.albe0011 &&
        val != this.newUserInfo.albe0011
      ) {
        //如果注册为组织且队伍名称和主管单位都存在,且不相等
        this.tip = "队伍名称与统一社会信用代码证书机构名称不一致";
        if (this.status == 1) {
          el.focus();
          this.status = 0;
        }
        this.formTip("groupName", this.tip);
      } else {
        this.utilscommit.requestapi(
          "checkTeamNameWeb",
          { albe0002: val, areaId: 100000000000000000 },
          this.groupNameCheckBack
        );
      }
    },
    groupNameCheckBack: function(result) {
      //->校验组织名称的唯一性
      if (result) {
        if (result.code == 0) {
          this.tip = "";
          this.groupNameFlag = true;
        } else {
          this.tip = result.message;
        }
      }
      if (this.status == 1) {
        $("#groupName").focus();
        this.status = 0;
      }
      this.formTip("groupName", this.tip);
    },
    detailedAddressCheck: function() {
      //-》详细地址
      var val = this.detailAddress;
      var tip = "";
      var flag = true;
      if (!this.detailAddress) {
        tip = "详细地址不能为空";
        flag = false;
      }
      this.formTip("detailAddress", tip);
      return flag;
    },
    volNumCheck: function() {
      //->志愿者人数
      var el = $("#volNum");
      var val = el.val();
      var tip = "";
      var flag = true;
      if (!val) {
        tip = "请填写计划招募人数";
        flag = false;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip("volNum", tip);
      return flag;
    },
    orgunitChange: function() {
      //->主管单位名称校验
      if (this.isLink == 0) {
        this.albe0057 = this.newUserInfo.albe0011;
      }
      var el = $("#orgUnit");
      var val = el.val();
      var tip = "";
      var flag = true;
      if (!val) {
        if (this.loginType == 1) {
          tip = "同意其成立的单位（社区）名称不能为空";
        } else if (this.loginType > 1) {
          tip = "主管单位名称不能为空";
        }
        flag = false;
      } else {
        if (this.loginType != 1 && this.newUserInfo.albe0011) {
          //如果注册为组织且队伍名称和主管单位都存在,且不相等
          this.newUserInfo.albe0002 = this.newUserInfo.albe0011;
          this.groupNameCheck();
        }
        if (this.newUserInfo.albe0008) {
          this.tyCodeCheck();
        }
        if (this.newUserInfo.albe0061) {
          this.forUnitCodeCheck();
        }
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip("orgUnit", tip);
      return flag;
    },
    linkOrgCheck: function() {
      //联络团体
      var val = this.linkOrgName;
      var tip = "";
      var flag = true;
      if (this.isLink == 1 && !val) {
        tip = "请选择联络团体";
        flag = false;
      }
      if (!flag && this.status == 1) {
        $("#linkOrg").focus();
        this.status = 0;
      }
      this.formTip("linkOrg", tip);
      return flag;
    },
    albe0040Change() {
      //校验队伍网址
      if (
        this.newUserInfo.albe0040 &&
        !this.common.checkWebsite(this.newUserInfo.albe0040)
      ) {
        this.formTip("albe0040", "队伍网址不合法");
        return false;
      } else {
        this.formTip("albe0040", "");
        return true;
      }
    },
    orgTypeCheck: function() {
      //->组织类型校验
      var el = $("#orgType");
      var val = this.orgType;
      var tip = "";
      var flag = true;
      if (this.loginType == 3 || this.loginType == 2) {
        if (this.orgType == "0") {
          tip = "组织类型不能为空";
          flag = false;
        }
      }

      if (this.isLink == 0) {
        if (this.orgType == "0") {
          if (this.loginType == 1) {
            tip = "同意其成立的单位（社区）类型不能为空";
          } else {
            tip = "组织类型不能为空";
          }
          flag = false;
        } else if (this.loginType == 1) {
          this.forUnitCodeCheck();
        } else {
          this.tyCodeCheck();
        }
      } else {
        this.orgTypeFlag = true;
      }

      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip("orgType", tip);
      return flag;
    },
    tyCodeCheck: function() {
      //->统一社会信用代码校验
      var val = this.newUserInfo.albe0008;
      var tip = "";
      var flag = true;
      if (!val && this.loginType > 1) {
        tip = "统一社会信用代码不能为空";
        flag = false;
      } else {
        this.unicodeCheck(val); //校验统一社会信用代码
      }
      if (this.orgTypeFlag || tip) this.formTip("tyCode", tip);
      return flag;
    },
    unicodeCheck(unicode) {
      //校验统一社会信用代码
      this.orgTypeFlag = false;
      if (
        (this.loginType == 1 || this.loginType == 3) &&
        (this.orgType == "09" || this.orgType == "10")
      ) {
        //校验村居
        this.utilscommit.requestapi(
          "checkCunJu",
          { unicode: unicode },
          this.unicodeCheckBack
        );
      } else if (
        (this.loginType == 3 && this.orgType == "16") ||
        this.loginType == 2
      ) {
        //校验统一社会信用代码
        this.utilscommit.requestapi(
          "checkShzh",
          { unicode: unicode },
          this.unicodeCheckBack
        );
      } else if (
        this.loginType == 1 &&
        this.orgType == "16" &&
        this.isLink == 0
      ) {
        //isLink是否有联络组织
        this.utilscommit.requestapi(
          "checkShzh",
          { unicode: unicode },
          this.unicodeCheckBack
        );
      } else {
        this.orgTypeFlag = true;
        this.formTip("unitCode", "");
        this.formTip("tyCode", "");
      }
    },
    unicodeCheckBack(data) {
      //校验统一社会信用代码结果
      if (data && data.data) {
        this.orgTypeFlag = true;
        this.formTip("unitCode", "");
        this.formTip("tyCode", "");
        if (
          (this.loginType == 1 || this.loginType == 3) &&
          (this.orgType == "09" || this.orgType == "10")
        ) {
          if (
            this.newUserInfo.albe0011 &&
            data.data[0].orgname !== this.newUserInfo.albe0011
          ) {
            if (this.loginType == 1) {
              if (this.status == 1) {
                //点击下一步才聚焦选中
                $("#unitCode").focus();
                this.status = 0;
              }
              this.formTip(
                "unitCode",
                "统一社会信用代码与同意其成立的单位（社区）名称不匹配"
              );
            } else {
              if (this.status == 1) {
                //点击下一步才聚焦选中
                $("#tyCode").focus();
                this.status = 0;
              }
              this.formTip("tyCode", "统一社会信用代码与主管单位名称不匹配");
            }
            this.orgTypeFlag = false;
          }
        } else if (
          this.newUserInfo.albe0011 &&
          data.data[0].aaae0103 !== this.newUserInfo.albe0011
        ) {
          //主管名称存在,且名称与返回值不一致
          if (this.loginType == 1) {
            if (this.status == 1) {
              //在点击下一步才聚焦
              $("#unitCode").focus();
              this.status = 0;
            }
            this.formTip(
              "unitCode",
              "统一社会信用代码与同意其成立的单位（社区）名称不匹配"
            );
          } else {
            if (this.status == 1) {
              //在点击下一步才聚焦
              $("#tyCode").focus();
              this.status = 0;
            }
            this.formTip("tyCode", "统一社会信用代码与主管单位名称不匹配");
          }
          this.orgTypeFlag = false;
        }
      } else if (this.loginType == 1) {
        if (this.orgType == "09" || this.orgType == "10") {
          //居民委员会 和 村民委员会
          this.formTip("unitCode", "村居统—社会信用代码不存在");
        } else {
          this.formTip(
            "unitCode",
            "同意其成立的单位（社区）统一社会性用代码未录入社会组织法人库"
          );
        }
      } else {
        if (this.orgType == "09" || this.orgType == "10") {
          //居民委员会 和 村民委员会
          this.formTip("tyCode", "村居统—社会信用代码不存在");
        } else {
          this.formTip("tyCode", "统一社会信用代码未录入社会组织法人库");
        }
      }
    },
    forUnitNameCheck: function() {
      //同意其成立的单位（社区）名称
      var el = $("#unitName");
      var val = el.val();
      var tip = "";
      var flag = true;
      if (this.isLink == 0 && this.loginType == 1 && !val) {
        tip = "同意其成立的单位（社区）名称不能为空";
        flag = false;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip("unitName", tip);
      return flag;
    },
    forUnitCodeCheck: function() {
      //同意其成立的单位（社区）统一社会信用代码
      var el = $("#unitCode");
      var val = el.val();
      var tip = "";
      var flag = true;
      if (this.isLink == 0 && this.loginType == 1 && !val) {
        //loginType   登记类型为
        tip = "同意其成立的单位（社区）统一社会性用代码不能为空";
        flag = false;
      } else {
        this.unicodeCheck(val); //校验统一社会信用代码
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      if (this.orgTypeFlag || tip) this.formTip("unitCode", tip);
      return flag;
    },
    forUnitLinkNameCheck: function() {
      //同意其成立的单位（社区）联系人
      var el = $("#unitLink");
      var val = el.val();
      var tip = "";
      var flag = true;
      if (
        this.isLink == 0 &&
        this.loginType == 1 &&
        !this.newUserInfo.albe0058
      ) {
        tip = "同意其成立的单位（社区）联系人名称不能为空";
        flag = false;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip("unitLink", tip);
      return flag;
    },
    forUnitLinkPhoneCheck: function() {
      //单位（社区）联系人电话
      var el = $("#unitPhone");
      var tip = "";
      var flag = true;
      if (
        this.isLink == 0 &&
        this.loginType == 1 &&
        !this.newUserInfo.albe0059
      ) {
        tip = "同意其成立的单位（社区）联系电话不能为空";
        flag = false;
      } else if (
        this.isLink == 0 &&
        this.loginType == 1 &&
        !this.common.checkPhoneno(this.newUserInfo.albe0059)
      ) {
        tip = "请填写正确的单位（社区）联系电话";
        flag = false;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip("unitPhone", tip);
      return flag;
    },
    forUnitAgreeCheck: function() {
      //协议
      var el = $("#agree");
      var val = this.isOk;
      var tip = "";
      var flag = true;
      if (this.isLink == 0 && this.loginType == 1 && !val) {
        tip = "请同意以上协议";
        flag = false;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip("agree", tip);
      return flag;
    },
    serviceTypeCheck: function() {
      //->服务类别
      var tip = "";
      var flag = true;
      if (this.serviceType.length > 0) {
        var sList = [];
        var array = [];
        for (let i = 0; i < this.serviceTypeList.length; i++) {
          sList.push(this.serviceTypeList[i].albe0123);
        }
        for (let i = 0; i < this.serviceType.length; i++) {
          if (sList.indexOf(this.serviceType[i]) > -1) {
            array.push(this.serviceType[i]);
          }
        }
        this.serviceType = array;
        if (array.length > 4) {
          tip = "服务类别最多选择四项";
          flag = false;
        }
      } else {
        tip = "请选择服务类别！";
        flag = false;
      }
      this.formTip("serviceType", tip);
      return flag;
    },
    industryCheck: function() {
      //->所属行业
      var tip = "";
      var flag = true;
      if (this.serviceType.length > 0) {
        var sList = [];
        var array = [];
        for (let i = 0; i < this.industryList.length; i++) {
          sList.push(this.industryList[i].albe2203);
        }
        for (let i = 0; i < this.industry.length; i++) {
          if (sList.indexOf(this.industry[i]) > -1) {
            array.push(this.industry[i]);
          }
        }
        this.industry = array;
      } else {
        tip = "请选择所属行业！";
        flag = false;
      }
      this.formTip("industry", tip);
      return flag;
    },
    //登记信息
    closeImg: function() {
      //关闭文件
      $(".mask.showimg").removeClass("active");
      $(".mask.holdIdCard").removeClass("active");
    },
    showImages: function() {
      //->查看文件
      if (this.filehtml) {
        $("#filesrc").html(this.filehtml);
        $(".mask.showimg").addClass("active");
      } else {
        this.$swal("请先上传文件", { buttons: "确认" });
      }
    },
    showimg1: function() {
      if (!this.filesrc) {
        this.$swal("请先上传文件", { buttons: "确定" });
        return false;
      }
      $("#filesrc").html(this.filesrc);
      $(".mask.showimg").addClass("active");
    },
    showimg2: function() {
      if (!this.filesrc1) {
        this.$swal("请先上传文件", { buttons: "确定" });
        return false;
      }
      $("#filesrc").html(this.filesrc1);
      $(".mask.showimg").addClass("active");
    },
    showHoldIdCard: function() {
      $(".mask.holdIdCard").addClass("active");
    },
    downfile: function() {
      //志愿服务团队账号申请表
      // var url =
      //   this.common.getUrl() +
      //   "/LEAP/NVSIModule/NVSIResource/Templet/VolunteerTeamApplication.doc";
      var url =
        "https://chinavolunteer.mca.gov.cn/NVSI/LEAP/NVSIModule/NVSIResource/Templet/VolunteerTeamApplication.doc";
      window.open(url);
    },
    upimg1: function() {
      $("#file1").val("");
      $("#file1").click();
    },
    upimg2: function() {
      $("#file2").val("");
      $("#file2").click();
    },
    changeImg1: function(e) {
      var file = e.target.files[0];
      let fileVal = this.common.checkFile(file, 2048);
      if (fileVal) return this.$swal(fileVal, { buttons: "确定" });
      let that = this;
      //获取浏览器图片
      let reader = new FileReader();
      // 调用reader.readAsDataURL()方法，把图片转成base64
      reader.readAsDataURL(file);
      //监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
      reader.onload = function() {
        file.src = this.result;
        that.filesrc =
          '<img src="' + file.src + '" alt="" width="500" height="700">';
      };
      $("#up_file1").html('<span id="img1">' + file.name + "</span>");
      this.file1 = file;
      this.utilscommit.uploadapi(this.file1, this.file1Check);
      // this.file1Check();
    },
    changeImg2: function(e) {
      var file = e.target.files[0];
      let fileVal = this.common.checkFile(file, 2048);
      if (fileVal) return this.$swal(fileVal, { buttons: "确定" });
      let that = this;
      //获取浏览器图片
      let reader = new FileReader();
      // 调用reader.readAsDataURL()方法，把图片转成base64
      reader.readAsDataURL(file);
      //监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
      reader.onload = function() {
        file.src = this.result;
        that.filesrc1 =
          '<img src="' +
          file.src +
          '" alt="" width="460" height="322" style="margin-top: 30px;">';
      };
      $("#up_file2").html('<span id="img2">' + file.name + "</span>");
      this.file2 = file;
      this.utilscommit.uploadapi(this.file2, this.file2Check);
      // this.file2Check();
    },
    file1Check: function(src) {
      var tip = "";
      var flag = true;
      var type = 1;
      if (src) {
        if (src.code !== 0) {
          if (this.loginType > 1) {
            tip = "上传统一社会信用代码证失败";
          } else {
            tip = "上传注册申请表扫描件失败";
          }
          flag = false;
          type = 2;
        } else {
          this.file1h = JSON.stringify(src.data);
        }
      }
      if (!this.file1) {
        if (this.loginType > 1) {
          tip = "请上传统一社会信用代码证";
        } else {
          tip = "请上传注册申请表扫描件";
        }
        flag = false;
        type = 2;
      }
      this.formTip2("file1", tip, type);
      return flag;
    },
    file2Check: function(src) {
      var tip = "";
      var flag = true;
      var type = 1;
      if (src) {
        if (src.code !== 0) {
          if (!this.file2 && this.loginType == 1) {
            tip = "上传负责人手持身份证照失败";
            flag = false;
            type = 2;
          }
        } else {
          this.file2h = JSON.stringify(src.data);
        }
      }

      if (!this.file2 && this.loginType == 1) {
        tip = "请上传负责人手持身份证照";
        flag = false;
        type = 2;
      }
      this.formTip2("file2", tip, type);
      return flag;
    },
    formTip: function(el, tip) {
      //->统一性校验渲染
      $("#" + el + "Tips")
        .html(tip)
        .css("color", "red");
    },
    usernameCheck: function() {
      //->用户名校验
      this.usernameFlag = false;
      var val = this.newUserInfo.albp0052;
      this.tip = "";
      this.type = 1;
      if (!val || !this.common.checkUsername(val)) {
        this.tip =
          "用户名长度6～20个字符，以字母a～z开头，且只能由字母、数字0～9和下划线组成";
        this.type = 2;
        this.formTip2("username", this.tip, this.type);
      } else {
        // this.utilscommit.request(
        //   "nvsi_getUserNameCheck",
        //   { username: val },
        //   this.usernameBack
        // );
        this.utilscommit.requestapi(
          "getVolNameCheckFortisWeb",
          { albp0052: val },
          this.usernameBack
        );
      }
    },
    usernameBack: function(result) {
      //->用户唯一性校验
      if (result) {
        if (result.code == 0) {
          $("#usernameTips").css("margin-top", "10px");
          this.usernameFlag = true;
        } else {
          this.type = 2;
          this.tip = result.message;
          $("#usernameTips").css("margin-top", "10px");
        }
      }
      if (this.status == 1) {
        $("#username").focus();
        this.status = 0;
      }
      this.formTip2("username", this.tip, this.type);
    },
    usernameTip: function() {
      //->聚焦
      var tip =
        "用户名长度6～20个字符，以字母a～z开头，且只能由字母、数字0～9和下划线组成";
      $("#usernameTips").css("margin-top", "0");
      this.formTip2("username", tip, 3);
    },
    passwordCheck: function() {
      //->密码校验
      var el = $("#password");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 1;
      if (!this.common.checkPW(val)) {
        tip = "密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母";
        $("#passwordTips").css("margin-top", "0");
        flag = false;
        type = 2;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      if (flag) {
        $("#passwordTips").css("margin-top", "10px");
      }
      this.formTip2("password", tip, type);
      return flag;
    },
    passwordTip: function() {
      //密码失焦
      var tip = "密码长度为8-20个字符，且必须同时包含数字、大写字母和小写字母";
      $("#passwordTips").css("margin-top", "0");
      this.formTip2("password", tip, 3);
    },
    repeatPWCheck: function() {
      //->确认密码
      var el = $("#repeatpw");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 1;
      if (!val) {
        tip = "确认密码不能为空";
        flag = false;
        type = 2;
      } else if (val != $("#password").val()) {
        tip = "两次输入密码不一致";
        flag = false;
        type = 2;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("repeatpw", tip, type);
      return flag;
    },
    linkNameCheck: function() {
      //->联系人姓名校验
      var el = $("#linkName");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 1;
      if (!val) {
        tip = "联系人姓名不能为空";
        flag = false;
        type = 2;
      } else if (!this.common.checkName(val)) {
        tip = "请正确填写姓名";
        flag = false;
        type = 2;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("linkName", tip, type);
      return flag;
    },
    linkNameTip: function() {
      //联系人姓名失焦
      var tip = "联系人姓名不能为空";
      this.formTip2("linkName", tip, 3);
    },
    linkPhoneCheck: function() {
      //->；联系人手机
      var el = $("#linkPhone");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 1;
      if (!val) {
        tip = "联系人手机不能为空";
        flag = false;
        type = 2;
      } else if (!this.common.checkPhoneno(val)) {
        tip = "请正确填写手机号码";
        flag = false;
        type = 2;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("linkPhone", tip, type);
      return flag;
    },
    linkPhoneTip: function() {
      //聚焦
      var tip = "联系人手机不能为空";
      this.formTip2("linkPhone", tip, 3);
    },
    linkTelPhoneCheck: function() {
      //联系人电话
      var el = $("#linkTelPhone");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 4;
      if (val) {
        if (!this.common.checkTelPhoneno(val)) {
          tip = "请正确填写电话号码";
          flag = false;
          type = 2;
        } else {
          type = 1;
        }
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("linkTelPhone", tip, type);
      return flag;
    },
    linkEmailCheck: function() {
      //电子邮箱校验
      var el = $("#linkEmail");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 4;
      if (val) {
        if (!this.common.checkEmail(val)) {
          tip = "请正确填写电子邮箱";
          flag = false;
          type = 2;
        } else {
          type = 1;
        }
      } else {
        tip = "电子邮箱不能为空";
        flag = false;
        type = 2;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("linkEmail", tip, type);
      return flag;
    },
    linkEmailTip: function() {
      //电子邮箱聚焦
      var tip = "电子邮箱不能为空";
      this.formTip2("linkEmail", tip, 3);
    },
    linkQQCheck: function() {
      //联系人QQ
      var el = $("#linkQQ");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 4;
      if (val) {
        if (!this.common.checkqqphoneno(val)) {
          tip = "请正确填写QQ";
          flag = false;
          type = 2;
        } else {
          type = 1;
        }
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("linkQQ", tip, type);
      return flag;
    },
    mainNameCheck: function() {
      //->负责人姓名
      var el = $("#mainName");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 1;
      if (!val) {
        tip = "负责人姓名不能为空";
        flag = false;
        type = 2;
      } else if (!this.common.checkName(val)) {
        tip = "请正确填写姓名";
        flag = false;
        type = 2;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("mainName", tip, type);
      return flag;
    },
    mainNameTip: function() {
      //-》负责人姓名聚焦
      var tip = "负责人姓名不能为空";
      this.formTip2("mainName", tip, 3);
    },
    mainCardCheck: function() {
      //->负责人身份证
      var el = $("#mainCard");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 1;
      if (!val) {
        tip = "负责人身份证不能为空";
        flag = false;
        type = 2;
      } else if (!this.common.checkCardNo(val)) {
        tip = "请填写正确的身份证号码";
        flag = false;
        type = 2;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("mainCard", tip, type);
      return flag;
    },
    mainCardTip: function() {
      //-》负责人身份证
      var tip = "负责人身份证不能为空";
      this.formTip2("mainCard", tip, 3);
    },
    mainPhoneCheck: function() {
      //->负责人手机
      var el = $("#mainPhone");
      var val = el.val();
      var tip = "";
      var flag = true;
      var type = 1;
      if (!val) {
        tip = "负责人手机不能为空";
        flag = false;
        type = 2;
      } else if (!this.common.checkPhoneno(val)) {
        tip = "请正确填写手机号码";
        flag = false;
        type = 2;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("mainPhone", tip, type);
      return flag;
    },
    mainPhoneTip: function() {
      var tip = "负责人手机不能为空";
      this.formTip2("mainPhone", tip, 3);
    },
    imgCodeCheck: function() {
      //->图文验证码
      var el = $("#inputImgCode");
      this.tip = "";
      this.type = 1;
      var flag = true;
      var code = el.val();
      this.imgcode = code;
      if (!code) {
        this.tip = "图文验证码不能为空";
        flag = false;
        this.type = 2;
      }
      if (!flag && this.status == 1) {
        el.focus();
        this.status = 0;
      }
      this.formTip2("imgCode", this.tip, this.type);
      return flag;
    },
    changeImgCode: function() {
      //->获取图文验证码
      $("#inputImgCode").val("");
      this.utilscommit.requestapi(
        "getImageCodeFortisWeb",
        null,
        this.changeImgCodeBack
      );
    },
    changeImgCodeBack(data) {
      //->图片验证码获取结果
      if (data && data.data) {
        $("#reg_image").attr("src", data.data.img);
        this.imgkey = data.data.imgkey;
      }
    },
    formTip2: function(el, tip, type) {
      if (type == 1) {
        //
        $("#" + el + "Tips")
          .html("&nbsp")
          .removeClass("warn-tip")
          .removeClass("wrong-tip")
          .addClass("right2-tip");
      } else if (type == 2) {
        $("#" + el + "Tips")
          .html(tip)
          .removeClass("right2-tip")
          .removeClass("warn-tip")
          .addClass("wrong-tip");
      } else if (type == 3) {
        $("#" + el + "Tips")
          .html(tip)
          .removeClass("right2-tip")
          .removeClass("wrong-tip")
          .addClass("warn-tip");
      } else if (type == 4) {
        //清空
        $("#" + el + "Tips")
          .html(tip)
          .removeClass("warn-tip")
          .removeClass("wrong-tip")
          .removeClass("right2-tip");
      }
    },
    uploadImg: function() {
      //->上传统一信用代码证
      $("#file").val("");
      $("#file").click();
    },
    changeImages: function(e) {
      //->上传图片后的校验
      var file = e.target.files[0];
      let fileVal = this.common.checkFile(file, 200);
      if (fileVal) return this.$swal(fileVal, { buttons: "确定" });
      let that = this;
      //获取浏览器图片
      let reader = new FileReader();
      // 调用reader.readAsDataURL()方法，把图片转成base64
      reader.readAsDataURL(file);
      //监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
      reader.onload = function() {
        file.src = this.result;
        that.filehtml =
          '<img src="' + file.src + '" alt="" width="500" height="700">';
      };
      /* $("#fileTips").text(file.name); */
      this.formTip2("file", file.name, 4);
      this.file = file;
    },
    showMap: function() {
      //->打开地图定位界面
      if (!this.isSelected && this.detailAddress) {
        if (!(this.detailAddress === this.mapInfo)) {
          this.mapInfo = this.detailAddress;
          this.utilscommit.requestapi(
            "getAreaInMapWeb",
            { location: this.detailAddress },
            function(result) {
              if (result && result.data && result.data.location) {
                Vues.allLng = Vues.lng = result.data.location.lng;
                Vues.allLat = Vues.lat = result.data.location.lat;
                Vues.setMap();
              }
            }
          );
        } else {
          this.lng = this.allLng;
          this.lat = this.allLat;
          this.setMap();
        }
      } else {
        this.setMap();
      }
    },
    setMap: function() {
      //->设置地图定位信息
      var address = null;
      var local = null;
      var Lng = null;
      var Lat = null;
      var ac = null;
      var point = null;
      var map = new BMap.Map("map");
      var mkr = new BMap.Marker();
      if (this.lng && this.lat) {
        point = new BMap.Point(this.lng, this.lat);
        mkr = new BMap.Marker(point);
        map.addOverlay(mkr);
      } else {
        point = new BMap.Point(this.rpointlng, this.rpointlat);
      }
      map.centerAndZoom(point, 12);
      map.enableDragging(); //启用地图拖拽事件
      map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
      map.enableKeyboard(); //启用键盘上下左右键移动地图
      map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
      map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
      map.addEventListener("click", showInfo);
      $(".mask.map").addClass("active");
      var geoc = new BMap.Geocoder();
      ac = new BMap.Autocomplete({
        input: "map",
        location: map
      });
      ac.addEventListener("onhighlight", function(e) {
        //鼠标放在下拉列表上的事件

        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str =
          "FromItem<br />index = " +
          e.fromitem.index +
          "<br />value = " +
          value;
        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str +=
          "<br />ToItem<br />index = " +
          e.toitem.index +
          "<br />value = " +
          value;
        document.getElementById("searchResultPanel").innerHTML = str;
      });
      ac.addEventListener("onconfirm", function(e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        document.getElementById("searchResultPanel").innerHTML =
          "onconfirm<br />index = " +
          e.item.index +
          "<br />myValue = " +
          myValue;
        //setPlace();
      });
      function myFun() {
        var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
        map.centerAndZoom(pp, 18);
        Lng = pp.lng;
        Lat = pp.lat;
        Vues.allLng = pp.lng;
        Vues.allLat = pp.lat;
        map.addOverlay(new BMap.Marker(pp)); //添加标注
        getMapAddress(pp, "搜索"); //获取经纬度地址
      }
      function setPlace() {
        map.clearOverlays(); //清除地图上所有覆盖物
        local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }
      document
        .getElementById("searchAddress")
        .addEventListener("click", function() {
          //点击搜索
          map.clearOverlays(); //清除地图上所有覆盖物
          local = new BMap.LocalSearch(map, {
            //智能搜索
            onSearchComplete: myFun
          });
          address = document.getElementById("mapValue").value;
          local.search(address);
        });
      // map.addEventListener("click", showInfo);//搜索事件
      function showInfo(e) {
        map.removeOverlay(mkr);
        Vues.allLng = e.point.lng;
        Vues.allLat = e.point.lat;
        mkr = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
        map.addOverlay(mkr);
        getMapAddress(e.point, "设置");
      }
      function getMapAddress(point, type) {
        //获取经纬度地址
        geoc.getLocation(point, function(rs) {
          var addComp = rs.addressComponents;
          var site = "";
          if (
            addComp.province == "北京市" ||
            addComp.province == "上海市" ||
            addComp.province == "天津市" ||
            addComp.province == "重庆市"
          ) {
            site =
              addComp.city +
              addComp.district +
              addComp.street +
              addComp.streetNumber;
          } else {
            site =
              addComp.province +
              addComp.city +
              addComp.district +
              addComp.street +
              addComp.streetNumber;
          }
          Vues.$swal("您" + type + "的地址是：" + site, { buttons: "确定" });
          document.getElementById("mapValue").value = site;
          Vues.mapInfo = site;
        });
      }
    },
    saveAddress: function() {
      //->提交选中地址
      if (this.mapInfo) {
        this.detailAddress = document.getElementById("mapValue").value;
        this.lng = this.allLng;
        this.lat = this.allLat;
        this.isSelected = true;
        $(".mask.map").removeClass("active");
        this.detailedAddressCheck();
      } else {
        this.$swal("对不起，您还未进行地图定位", { buttons: "确定" });
      }
    },
    closeMap: function() {
      //->关闭地图定位
      $(".mask.map").removeClass("active");
    },
    regCommitBack: function(result) {
      //->注册返回
      if (result && result.message) {
        if (result.code == 0) {
          let params = {
            username: this.newUserInfo.albp0052,
            password: this.newUserInfo.albp0053
          };
          this.utilscommit.requestapi(
            "LEAPLoginFortisWeb",
            params,
            this.loginOtherBack
          );
        } else {
          this.$swal(result.message, { buttons: "确认" });
          this.getFailRegist();
        }
      } else {
        this.$swal("注册失败！", { buttons: "确认" });
        this.getFailRegist();
      }
    },
    loginOtherBack(res) {
      if (res.code == 0) {
        window.sessionStorage.setItem("nvsi_loginstatus", 2); //全国组织登录
        window.sessionStorage.setItem(
          "userInfo",
          JSON.stringify(res.data.team)
        ); //用户信息
        let headTxt = window.location.origin + "/volunteer/redirect";
        let eninfo = this.utilscommit.getSM4().encrypt(
          JSON.stringify({
            username: this.newUserInfo.albp0052,
            password: this.newUserInfo.albp0053
          })
        );
        let info = eninfo.replace(/\+/g, "%2B").replace(/\&/g, "%26");
        let url = headTxt + "?type=teamworkbench&userinfo=" + info;
        window.open(url, "_blank");
        this.common.addCookie("mgpath", url, 0.5);
        Vueh.getUserInfo(); //获取页眉用户信息
        this.$router.push({ name: "home" });
      } else {
        this.$swal("注册成功，请前往登录页面进行登录！", {
          buttons: "确定"
        }).then(function(value) {
          Vue.$router.push({ name: "login", params: { type: 2 } });
        });
      }
    },
    clearLoginType() {
      //清除数据
      this.albe0015 = null; //成立日期
      this.isLink = 0; //联络组织
      this.linkOrgName = null; //联络组织
      this.newUserInfo.albe0004 = null; //联络组织id
      this.albe0057 = null; //同意其成立的单位（社区）名称
      this.newUserInfo.albe0061 = null; //同意其成立的单位（社区）统一社会信用代码
      this.newUserInfo.albe0058 = null; //同意其成立的单位（社区）联系人
      this.newUserInfo.albe0059 = null; //同意其成立的单位（社区）联系电话
      this.isOk = false; //不同意协议
    },
    getFailRegist() {
      //注册失败处理
      this.changeImgCode();
      this.isClick = true;
      $("#register").css({ background: "#cc0000", opacity: "1" }); //修改注册按钮状态
    },
    changeType(el, name, type) {
      //密码框小眼睛点击事件切换
      if (name == "imgShow") {
        //密码
        this.imgShow = type;
      } else if (name == "imgShow1") {
        //确认密码
        this.imgShow1 = type;
      }
      if (type == 0) {
        //隐藏
        el.target.parentNode.children[1].type = "password";
      } else if (type == 1) {
        //显示
        el.target.parentNode.children[1].type = "text";
      }
    }
  },
  watch: {
    detailAddress: function(newval, oldval) {
      //监听详细地址
      if (!this.detailAddress) {
        this.lng = "";
        this.lat = "";
      }
      this.isSelected = false;
    },
    isLink: function(newval, oldval) {
      //是否联络组织
      this.linkOrgName = null; //联络组织
      this.newUserInfo.albe0004 = null; //联络组织id
      /*  this.registerOrgName=null;  //登记机关
        this.registerOrgId=null;//登记机关id */
      this.newUserInfo.albe0061 = null; //同意其成立的单位（社区）统一社会信用代码
      this.newUserInfo.albe0058 = null; //同意其成立的单位（社区）联系人
      this.newUserInfo.albe0059 = null; //同意其成立的单位（社区）联系电话
      this.isOk = false; //不同意协议
      if (newval == 0 && this.loginType == 1) {
        //不为联络组织
        this.albe0057 = this.newUserInfo.albe0011;
      } else {
        this.albe0057 = null; //同意其成立的单位（社区）名称
      }
    },
    loginType: function(newval, oldval) {
      //组织类型变化
      this.orgType = 0; //组织类型
      this.newUserInfo.albe0011 = null; //主管单位名称
      this.newUserInfo.albe0008 = null; //统一社会信用代码
      //清除错误提示
      this.formTip("groupName", "");
      this.formTip("volNum", "");
      this.formTip("orgUnit", "");
      this.formTip("tyCode", "");
      if (newval == 1) {
        this.orgTypeList = this.allorgTypeList.nomallist; //团体类型下拉框
        this.isLink = 1; //默认为联络组织
        //默认清除相关数据
        this.newUserInfo.albe0011 = null; //主管单位名称
        this.albe0015 = null; //成立日期
        this.orgType = 0;
        this.newUserInfo.albe0006 = "0";
      } else if (newval == 2) {
        //组织
        this.orgTypeList = this.allorgTypeList.zzlist; //团体类型下拉框
        this.clearLoginType();
      } else {
        //其他
        this.orgTypeList = this.allorgTypeList.qtzzlist;
        this.clearLoginType();
      }
    }
  }
};
</script>

<style scoped>
p {
  font-size: 14px;
}
.warn-tip {
  background: url("~@/assets/img/warn.png") 10px no-repeat;
  color: #666;
}
.wrong-tip {
  background: url("~@/assets/img/wrong.png") 10px no-repeat;
  color: #cc0000;
}
.right2-tip {
  background: url("~@/assets/img/right.png") 10px no-repeat;
  color: #666;
}
.form {
  padding: 5px 0 5px 20px;
}
.form .right-tip {
  display: inline-block;
  font-size: 14px;
  margin-top: 10px;
  width: 330px;
  position: absolute;
  left: 100%;
  padding-left: 30px;
}
.down-tip {
  font-size: 14px;
  height: 17px;
  padding-left: 20px;
}
.user-table th {
  text-align: left;
  padding: 10px;
}
.user-table .pointer {
  cursor: pointer;
}
.tabbar-down {
  margin-left: 20px;
}
.mask.regInfo .mask-info {
  width: 500px;
  margin-left: -250px;
}
.mask.regInfo .mask-info .mask-content {
  margin-top: 15px;
  text-indent: 2em;
  color: #333;
}
.mask.regInfo .mask-info .mask-footer.form {
  width: 100%;
  padding: 5px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.mask.regInfo .mask-info .mask-footer.form .cancel {
  background-color: #fff;
  color: #cc0000;
  border: 1px solid #cc0000;
}
.mask.regInfo .mask-info .mask-footer.form .button:hover {
  opacity: 1;
}
</style>
