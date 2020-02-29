import axios from '@/http/index'
import router from '../router'
import menu from '../routes/menu'

// 用户信息
const login = {
  state: {
    username: '',
    token: '',
    apiList: [],
    menuList: []
  },
  getters: {
    // 这个 就可以看做是一个cumputer 相当于可以把数据处理过后再返回
    menuList(state) {
      state.menuList = menu
      return state.menuList
    }
  },
  mutations: {
    // 保存token
    saveToken(state, token) {
      state.token = token
    },
    saveLogin(state, user) {
      state.token = user.token
      state.username = user.username
    },
    /**
     * 保存权限数据
     **/
    saveApiList(state, apiList) {
      state.apiList = apiList || []
    },
    /**
     * 退出登录=》删除token和权限数据
     **/
    loginout(state) {
      state.token = ''
      router.replace({
        name: 'login'
      })
    }
  },
  actions: {
    //   这里可以发送请求来获取 例如获取用户所拥有的权限
    getApiList({ commit }) {
      // return axios.get('/login').then(res => {
      //   let apiList = res || []
      //   commit('saveApiList', apiList)
      // })
    }
  }
}
export default login
