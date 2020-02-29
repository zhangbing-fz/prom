import Vue from 'vue'
import VueRouter from 'vue-router'
import rank from '../components/rank/rank'
import search from '../components/seach/seach'
import singer from '../components/singer/singer'
import recommend from '../components/recommend/recommend'
import SingerDetail from '../components/singer-detail/singer-detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/rank',
    component: rank
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/singer',
    component: singer,
      children: [
          {
              path: ":id",//利用动态的属性路由
              component: SingerDetail
          }
      ]
  },
  {
    path: '/recommend',
    component: recommend
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
