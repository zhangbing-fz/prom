import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger' // 调试包
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production' // 调试debugger

export default new Vuex.Store({
  state,
  mutations,
  actions,
  debug: true,
  // plugins: debug ? [createLogger()] : [], // 开始调试工具
  modules: {}
  // modules
})
