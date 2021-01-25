import axios from 'axios'
import { baseURL } from './config'
import router from '@/router'

axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded'
// 设置请求拦截器拦截器
axios.interceptors.request.use(
  function (config) {
    // var token = store.state.user.token
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    // config：对象，是axios的子级成员
    //         可以对其进行配置，这个配置信息直接会作用给axios
    // console.dir(config)
    // 获取token  这里也可以走vuex中去获取
    // var token = window.localStorage.getItem('token')
    // 给axios的请求头中设置token信息，名称为Authorization
    // config.headers.Authorization = token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // 在这里进行服务器刷新token
    // var refreshToken =
    //   response.headers.authorization || response.headers.Authorization
    // if (refreshToken) {
    //   store.commit('saveToken', refreshToken)
    // }
    // 可以保存token
    return response
  },
  function (error) {
    var code = error.response.status

    if (code === 401) {
      router.replace({ name: 'login' })
    }
    // Do something with response error
    // 这里就看服务器返回值 如果返回值 没有token 就返回首页 或者提示报错之类的信息
    // 这里我后台也不会弄token  就暂时不搞了 有后台的时候在去调试   k
    return Promise.reject(error)
  }
)
export default axios
