import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes/index'
import store from './store'
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // 理由前守卫 可以判断用户的登录状态 以及有无权限之类的东西
  // 免登录页面直接进入
  // if (to.meta && to.meta.public) {
  //   next()
  // } // 需要登录但是没有token，去登录页
  // else if (!store.state.user.token) {
  //   next({ name: 'login' })
  // } else {
  //   next()
  // }
  // 这里不写登录 直接进入方便测试
  next()
  //
})
router.afterEach(to => {
  //这里可以发送球球获取权限列表 如果权限要这么写的话
  store.dispatch('getApiList').then(res => {})
})
router.onError(err => {
  console.log('路由加载错误')
})
export default router
