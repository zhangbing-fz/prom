import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

// const debug = process.env.NOSW_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  debug: true,
  // plugins: debug ? [createLogger()] : [],
  modules: {}
})
