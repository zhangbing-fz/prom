import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeList from '../views/HomeList.vue'
import HomeData from '../views/HomeData.vue'

import sonRoutes from '../router/router.js'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    // children: [].concat()
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "*",
    redirect: "/about"
  },
  {
    path: '/home_data',
    name: 'home_data',
    component: HomeData
  },
  {
    path: '/home_list',
    name: 'home_list',
    component: HomeList
  }  
];
routes.push(...sonRoutes.routes);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "avtive",
  linkExactActiveClass: "exact"
})

router.beforeEach((to, from, next)=>{
  // console.log(to, from, next)
  next();
})

export default router
