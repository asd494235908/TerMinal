import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import('@/views/index')
const Home = () => import('@/views/home')
const Login = () => import('@/views/login')
const AddGood = () => import('@/views/addGood')
const AddGoodList = () => import('@/views/addGoodList')
const Plate = () => import('@/views/plate')
const swiperPage = () => import('@/views/swiperPage')
const navtarba = () => import('@/views/navtarba')
const modifygood = () => import('@/views/modifygood')
const Upload = () => import('@/views/Upload')
const setServerImg = () => import('@/views/setServerImg')
const setServerImg2 = () => import('@/views/setServerImg2')
const Order = () => import('@/views/order')
const allOrder = () => import('@/views/allorder')
const User = () => import('@/views/user')
const VisitList = () => import('@/views/visitList')


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/AddGood',
        name: 'AddGood',
        component: AddGood
      },
      {
        path: '/AddGoodList',
        name: 'AddGoodList',
        component: AddGoodList
      },
      {
        path: '/plate',
        name: 'Plate',
        component: Plate
      },
      {
        path: '/swiperPage',
        name: 'swiperPage',
        component: swiperPage
      },
      {
        path: '/navtarba',
        name: 'navtarba',
        component: navtarba
      },
      {
        path: '/modifygood',
        name: 'modifygood',
        component: modifygood
      },
      {
        path: '/Upload',
        name: 'Upload',
        component: Upload
      },
      {
        path: '/setServerImg',
        name: 'setServerImg',
        component: setServerImg,
      },
      {
        path: '/setServerImg2',
        name: 'setServerImg2',
        component: setServerImg2,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/Order',
        name: 'Order',
        component: Order
      },
      {
        path: '/allOrder',
        name: 'allOrder',
        component: allOrder
      },
      {
        path: '/User',
        name: 'User',
        component: User
      },
      {
        path: '/VisitList',
        name: 'VisitList',
        component: VisitList
      }
    ],
    meta: {
      islogin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
