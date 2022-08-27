import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage'
Vue.use(Vuex)
//todo vuex容器
const TOKEN_KEY = 'TOKEN-USER'
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token等数据）
    user:getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser(state,data) {
      state.user = data
      // 将数据放入本地存储中，解决vuex不能持久化问题
      setItem(TOKEN_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
