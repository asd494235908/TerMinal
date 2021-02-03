import Vue from 'vue'
import Vuex from 'vuex'
import { setStore } from "@/utils/storage.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navLink:[],
    userInfo:{}
  },
  mutations: {
    //删除子导航
    removeNavLink(state,item){
      let data = state.navLink
      data = JSON.stringify(data)
      data = JSON.parse(data)
      data.forEach((elen,index)=>{
        if(elen.name === item.name) {
          data.splice(index,1)
        }
      })
      state.navLink = data
    },
    //添加子导航
    addNavLink(state,item){
      setStore('nav',item)
      let active =false
      if (state.navLink.length !== 0) {
        state.navLink.forEach((elem,index)=>{
          if (elem.link == item.link) {
            active = true
          }
        })
      }
      if (active === false) {
        state.navLink.push(item)
      }
    },
    //保存用户信息
    seveLogin(state,data){
      state.userInfo = data
      setStore('add',data.add)
      setStore('dell',data.dell)
    }
  },
  actions: {
  },
  modules: {
  }
})
