// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible'
import store from './store'

Vue.use(ElementUI)
Vue.config.devtools = true

Vue.config.productionTip = false
import {
  getToken,
  getMenus
} from "@/utils/authority.js";

const whiteList = ['/login']

// router.beforeEach((to, from, next) => {
//   var userInfo = getToken(); //获取浏览器缓存的用户信息
//   console.log(from)
//   if (userInfo) { //如果有就直接到首页咯
//     next({
//       path: from.path
//     });
//   } else {
//     console.log(111)
//     if (to.path == '/login') { //如果是登录页面路径，就直接next()
//       next();
//     } else { //不然就跳转到登录；
//       next('/login');
//     }
//   }
// })


router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: `${from.path}`
      })
    } else {
      next()

    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect`);
    }
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
