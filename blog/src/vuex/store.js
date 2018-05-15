import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    phoneNum: 0,
    ws:''
  },
  mutations: {
    getWebsocket (state,ws) {
      // 变更状态
      state.ws=ws;
    }
  }
})

export default store