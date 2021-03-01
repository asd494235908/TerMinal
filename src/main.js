import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'default-passive-events'
import './plugins/element.js'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import { Message, Notification, MessageBox } from 'element-ui'
import { getStore } from "@/utils/storage.js";

import VueClipboard from 'vue-clipboard2' //拷贝剪切版
Vue.use(VueClipboard)
// axios.defaults.baseURL = "http://192.168.2.202:3010"
axios.defaults.baseURL = "https://www.dcmaomi.com:3010"
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: require('../public/static/images/logding.gif'),
  loading: require('../public/static/images/logding.gif'),
  // dispatchEvent: true,
  attempt: 1
})
Vue.prototype.$LazyLoad = VueLazyLoad
Vue.prototype.$http = axios
Vue.prototype.$Message = Message
Vue.prototype.$Notification = Notification
Vue.prototype.$MessageBox = MessageBox
//每次发送请求时候都要获取token，有token就是登录的，没有就是为登录
axios.interceptors.request.use(config => {
  const token = getStore('token')
  if (token) {
    // 用户已登录,设置请求头
    config.headers.common.Authorization = token
    
  }
  //使用的这个方法后必须要 return 对象出去 不然会报错
  return config
}, err => {
  console.log(err)
})
//全局导航守卫
router.beforeEach((to, from, next) => {
  //每次进入一个页面之后都要发送请求查看是否为登陆状态
  axios.post('/api/validate', {}).then(res => {
    const data = res.data
    if (data.success !== true) {
      // 用户要登录
      if (to.matched.some(res => res.meta.islogin)) {
        // 用户未登录 需要跳转登录页面
        next({
          path: '/login',
          query: {
            redirect: to.fullPach
          }
        })
      } else {
        next()
      }
    } else {
      //是登录状态的话保存用户信息
      store.commit('seveLogin', data)
      if (to.path === '/login') {
        router.push({
          path: '/'
        })
      }
      next()
    }
  }).catch(err => {
    console.log(err)
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
