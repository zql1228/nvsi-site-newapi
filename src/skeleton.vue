
<template>
    <div class="skeleton-page" id="skeleton">
        <!-- 顶部 -->
        <div class="skeleton-top bg1" >
            <div class="skeleton-midlay-left bg2" style="height:72px;"></div>
            <div class="skeleton-midlay-right bg2" style="height:72px;"></div>
        </div>
        <!-- 导航 -->
        <div class="skeleton-nav bg3"></div>
        <!-- 轮播图 -->
        <div class="skeleton-swiper bg2">
            <div class="skeleton-midlay" style="padding-top: 30px; overflow: visible;">
                <div class="skeleton-tag bg3"></div>
                <div style="display: flex;justify-content: space-between;">
                    <div class="skeleton-login bg3"></div>
                    <div class="skeleton-login bg3"></div>
                </div> 
            </div>
        </div>
        <div class="bg2" style="width:400px;height:50px;margin:40px auto 0;"></div>
        <div class="skeleton-link-middle bg1">
            <div class="bg2"></div>
            <div class="bg2"></div>
            <div class="bg2"></div>
            <div class="bg2"></div>
            <div class="bg2"></div>
        </div>
        <div class="skeleton-link bg2"></div>
        <!-- 主体内容 -->
        <div class="skeleton-main bg1">
            <div class="skeleton-midlay">
                <div class="skeleton-main-left bg2"></div>
                <div class="skeleton-main-right bg2"></div>
            </div>
        </div>

        <div style="margin-top:200px">
            <div class="skeleton-middle bg2">
                <div class="bg3" style="width:35%;height:275px;"></div>
                <div style="width:50%;height:270px;">
                    <div class="bg3" style="height:130px;"></div>
                    <div class="bg3" style="height:130px;margin-top:15px"></div>
                </div> 
            </div>
        </div>
        <div class="skeleton-midlay">
            <div class="skeleton-bottom bg2"></div>
        </div>
       
        <div class="skeleton-main bg1">
            <div class="skeleton-midlay">
                <div class="skeleton-footer-left bg2"></div>
                <div class="skeleton-footer-right bg2"></div>
            </div>
        </div>
        <div class="bg1 footer-title">
            <div class="bg2" style="width:120px"></div>
            <div class="bg1" style="width:550px">
                <div class="bg2"></div>
                <div class="bg2"></div>
                <div class="bg2"></div>
                <div class="bg2"></div>
            </div>
        </div>
        <div class="skeleton-link-footer bg1">
            <div class="bg2"></div>
            <div class="bg2"></div>
            <div class="bg2"></div>
            <div class="bg2"></div>
        </div>
        <div style="margin-top:10px;height:320px;" class="bg2"></div>
    </div>
</template>

<script>
    export default {
        name: 'skeleton'
    };
</script>

<style >
/* 骨架屏首页样式 */
.bg1 {
	background: #FFFFFF !important;
  }
  
  .bg2 {
	background: #F3F3F3 !important;
  }
  
  .bg3 {
	background: #ECECEC !important;
  }
  
  .bg4 {
	background: #FAFAFA !important;
  }
.skeleton-top {
    width: 1200px;
	height: 122px;
    margin: 0 auto;
	overflow: auto;
    display: flex;
    justify-content: space-between;
    padding-top: 38px;
  }
  
  .skeleton-midlay {
	width: 1200px;
	margin: 0 auto;
	overflow: auto;
	font-size: 0;
  }
  .skeleton-midlay-left{
    width: 405px;
	overflow: auto;
	font-size: 0;
  }
  .skeleton-midlay-right{
    width: 600px;
	overflow: auto;
	font-size: 0;
  }
  .skeleton-nav {
	height: 52px;
  }
  .skeleton-middle{
    width: 1200px;
    height: 330px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 30px;
    display: flex;
    justify-content: space-around;
  }
  .skeleton-swiper {
	height: 417px;
  }
  .skeleton-tag{
      width: 1200px;
      height: 50px;
      margin-bottom:20px;
  }
  .skeleton-login {
	width: 580px;
	height: 285px;
	border-radius: 8px;
  }
  .skeleton-link{
      height: 100px;
      width: 1200px;
      margin: 50px auto;
  }
  .skeleton-main {
	height: 380px;
  }
  
  .skeleton-main-left {
	display: inline-block;
	width: 570px;
	height: 531px;
	margin-right: 60px;
  }
  
  .skeleton-main-right {
	display: inline-block;
	width: 570px;
	height: 531px;
  }
  .skeleton-link-middle{
      width: 1200px;
      height:160px;
      box-sizing: border-box;
      margin: 40px auto 50px;
      display: flex;
      justify-content: space-between;
  }
  .skeleton-link-middle div{
      width: 19%;
      height: 100%;
  }
  .skeleton-friend-link {
	height: 270px;
  }
  
  .skeleton-friend-link-top {
	height: 50px;
	margin-bottom: 28px;
  }
  
  .skeleton-friend-link-bottom {
	height: 150px;
    width: 150px;
    border-radius: 50%;
  }
  .skeleton-bottom{
      height: 60px;
      width: 200px;
      margin-top: 15px;
      margin-bottom: 15px;
  }
  .skeleton-footer {
	  width: 1200px;
      height:350px;
      box-sizing: border-box;
      margin: 0 auto ;
      display: flex;
      justify-content: space-between;
  }
   .skeleton-footer div{
      width: 24%;
      height: 100%;
  }
  .skeleton-footer-left {
	display: inline-block;
	width: 900px;
	height: 591px;
	margin-right: 20px;
  }
  .skeleton-footer-right {
	display: inline-block;
	width: 280px;
	height: 591px;
  }
  .skeleton-link-footer{
      width: 1200px;
      height:327px;
      box-sizing: border-box;
      margin: 24px auto 50px;
      display: flex;
      justify-content: space-between;
  }
  .skeleton-link-footer div{
      width: 23%;
      height: 100%;
  }
  .footer-title{
      width:1200px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      margin:  230px auto 0;
  }
  .footer-title div div{
      float: right;
      width:84px;
      height:100%;
      margin-left: 50px;
  }
</style>