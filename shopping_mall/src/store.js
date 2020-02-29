import Vue from 'vue'
import Vuex from 'vuex'

//用户信息模块
import user from './store/user'
// tag导航标签管理
import openedTag from './store/openedTag'

//vuex持久化处理
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  // 模块化处理vuex的数据 这样对于大型项目结构更清晰
  modules: {
    user,
    openedTag
  },
  plugins: [
    // 这里是默认存储所有的vuex中的值 当然也可以部分存储。这个目前不说 用到再说
    // 这个也有插件的文档 可以自行去了解一下
    createPersistedState()
  ]
})
