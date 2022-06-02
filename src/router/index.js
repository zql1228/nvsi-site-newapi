import Vue from "vue";
import Router from "vue-router"; //路由
import home from "@/view/index"; //首页

Vue.use(Router);

const routes = [
  {
    path: "/home",
    name: "home",
    component: home,
    meta: { title: "首页" }
  },
  {
    path: "/infosearch",
    name: "infosearch",
    component: () => import("@/view/login/infosearch"),
    meta: { title: "志愿者信息以及证明" }
  },
  {
    path: "/project",
    name: "project",
    component: () => import("@/view/project/project"),
    meta: { title: "志愿项目" }
  },
  {
    path: "/projectInfo/:id/:areaid",
    name: "projectInfo",
    component: () => import("@/view/project/projectInfo"),
    meta: { title: "志愿项目" }
  },
  {
    path: "/group",
    name: "group",
    component: () => import("@/view/group/group"),
    meta: { title: "志愿队伍" }
  },
  {
    path: "/groupInfo/:orgid/:areaid",
    name: "groupInfo",
    component: () => import("@/view/group/groupInfo"),
    meta: { title: "志愿队伍" }
  },
  {
    path: "/projectOrgMap",
    name: "projectOrgMap",
    component: () => import("@/view/project/projectOrgMap"),
    meta: { title: "志愿地图" }
  },
  {
    path: "/login/:type",
    name: "login",
    component: () => import("@/view/login/login"),
    meta: { title: "登录" }
  },
  {
    path: "/orgreg",
    name: "orgreg",
    component: () => import("@/view/login/orgreg"),
    meta: { title: "志愿团体注册" }
  },
  {
    path: "/volinfo/:volid/:areaid",
    name: "volinfo",
    component: () => import("@/view/login/volinfo"),
    meta: { title: "志愿者详情" }
  },
  {
    path: "/news/:type/:id",
    name: "news",
    component: () => import("@/view/news/news"),
    meta: { title: "新闻列表" }
  },
  {
    path: "/newsinfo/:type/:id",
    name: "newsinfo",
    component: () => import("@/view/news/newsinfo"),
    meta: { title: "新闻详情" }
  },
  {
    path: "/video/:type/:id",
    name: "video",
    component: () => import("@/view/news/video"),
    meta: { title: "视频列表" }
  },
  {
    path: "/videoinfo/:id",
    name: "videoinfo",
    component: () => import("@/view/news/videoinfo"),
    meta: { title: "视频详情" }
  },
  {
    path: "/themeinfo/:id",
    name: "themeinfo",
    component: () => import("@/view/news/themeinfo"),
    meta: { title: "专题详情" }
  },
  /* 新版新闻路由 ---  开始 */
  {
    path: "/sitenews/:name",
    name: "sitenews",
    component: () => import("@/view/siteNews/news"),
    meta: { title: "新闻" }
  },
  {
    path: "/sitenewsInfo/:id",
    name: "sitenewsInfo",
    component: () => import("@/view/siteNews/newsInfo"),
    meta: { title: "文字新闻详情" }
  },
  {
    path: "/sitevideoInfo/:id",
    name: "sitevideoInfo",
    component: () => import("@/view/siteNews/videoInfo"),
    meta: { title: "视频新闻详情" }
  },
  /* 新版新闻路由 ---  结束 */
  {
    path: "/forgetpwd1/:type",
    name: "forgetpwd1",
    component: () => import("@/view/forgetpwd/forgetpwd1"), //找回密码第一步（验证用户名）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd_check/:id/:type",
    name: "forgetpwd_check",
    component: () => import("@/view/forgetpwd/forgetpwd_check"), //找回密码第一步(选择用户信息验证)
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd_checkout/:id/:type",
    name: "forgetpwd_checkout",
    component: () => import("@/view/forgetpwd/forgetpwd_checkout"), //找回密码第一步（验证用户账户信息）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd2/:tabtype",
    name: "forgetpwd2",
    component: () => import("@/view/forgetpwd/forgetpwd2"), //找回密码第二步（验证身份）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd3",
    name: "forgetpwd3",
    component: () => import("@/view/forgetpwd/forgetpwd3"), //找回密码第三步（修改密码）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/forgetpwd4",
    name: "forgetpwd4",
    component: () => import("@/view/forgetpwd/forgetpwd4"), //找回密码第四步（结束）
    meta: { title: "找回密码", type: 1 }
  },
  {
    path: "/findpwd",
    name: "findpwd",
    component: () => import("@/view/forgetpwd/findpwd"), //申诉
    meta: { title: "账号申诉", type: 1 }
  },
  {
    path: "/appeal",
    name: "appeal",
    component: () => import("@/view/forgetpwd/appeal"), //申诉进度
    meta: { title: "账号申诉进度", type: 1 }
  },
  {
    path: "/proShare/:data1/:data2",
    name: "proShare",
    component: () => import("@/view/project/projectShare"),
    meta: { titlename: "志愿项目分享" }
  },
  {
    path: "/groupShare/:data1/:data2",
    name: "groupShare",
    component: () => import("@/view/group/groupShare"),
    meta: { titlename: "志愿队伍分享" }
  },
  {
    path: "*",
    name: "error",
    component: () => import("@/view/error"),
    meta: { title: "404" }
  }
];

//解决路由设置报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

//设置初始地址重定向
routes.push({
  path: "",
  redirect: to => {
    var path = {
      name: "home" //别名
    };
    return path;
  }
});
const router = new Router({
  mode: "history", //如果删掉这一行，那就是hash模式，hash模式会给地址栏加一个#
  //设置基路径
  base: "/site/",
  //base: getBasePath(),
  routes: routes
});

router.beforeEach((to, from, next) => {
  //前置守卫
  document.title = "中国志愿服务网";
  next();
});

export default router;
