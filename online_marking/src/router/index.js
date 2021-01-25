import Vue from 'vue'
import VueRouter from 'vue-router'
// import menuAdmin from '@/router/menu-admin'
// import menuOrdinary from '@/router/menu-ordinary'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '登录',
      keepAlive: true,
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/home/index.vue'),
    redirect: {
      name: 'login'
    },
    children: [
      { // 打分
        path: 'score',
        name: 'Score',
        component: () =>
          import('../views/score-box.vue'),
        meta: {
          keepAlive: true,
          requireAuth: true
        }
      },
      { // 进度
        path: 'paper-progress-content',
        name: 'PaperProgressContent',
        component: () =>
          import('../views/progress/index'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'examination-paper-history', // 回评列表
        name: 'Examination-paper-history',
        component: () =>
          import('../views/examination/paper-history-list.vue'),
        meta: {
          title: '回评列表',
          keepAlive: true
        }
      },
      { // 回评打分
        path: 'review',
        name: 'review',
        component: () =>
          import('../views/examination/index.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'arbitration-paper-history', // 仲裁列表
        name: 'Arbitration-paper-history',
        component: () =>
          import('../views/arbitration/paper-history-list.vue'),
        meta: {
          title: '仲裁列表',
          keepAlive: true
        }
      },
      { // 仲裁打分
        path: 'arbitration',
        name: 'Arbitration',
        component: () =>
          import('../views/arbitration/index.vue'),
        meta: {
          title: '仲裁打分',
          keepAlive: true
        }
      },
      { // 阅卷质量
        path: 'quality-content',
        name: 'QualityContent',
        component: () =>
          import('../views/progress/component/content.vue'),
        meta: {
          keepAlive: true
        }
      },
      { // 阅卷质量弹窗
        path: 'quality-content-play',
        name: 'QualityContentPlay',
        component: () =>
          import('../views/progress/component/content-play.vue'),
        meta: {
          keepAlive: true
        }
      },
      { // 人员-->管理员
        path: 'paper-personnel-content',
        name: 'PaperPersonnelContent',
        component: () =>
          import('../views/personnel/index.vue'),
        meta: {
          keepAlive: true
        }
      },
      { // 成绩-->管理员
        path: 'results',
        name: 'Results',
        component: () =>
          import('../views/results/index'),
        meta: {
          keepAlive: true
        }
      },
      { // 报表-->管理员
        path: 'report',
        name: 'Report',
        component: () =>
          import('../views/report/index'),
        meta: {
          keepAlive: true
        }
      },
      { // 样卷
        path: 'paper-sample-list',
        name: 'PaperSampleList',
        component: () =>
          import('../views/paper-sample-list.vue'),
        meta: {
          keepAlive: true
        }
      },
      { // 学生信息
        path: 'student-list',
        name: 'SutdentList',
        component: () =>
          import('../views/student/index'),
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  { // 人员 web账号登录页
    path: '/admin-istrator',
    name: 'Administrator',
    component: () =>
      import('../views/admin-istrator'),
    meta: {
      keepAlive: true
    }
  }
  /* {
    path: '/404',
    name: 'error',
    component: () =>
      import('../views/404'),
    meta: {
      keepAlive: true,
      requiresAuth: false
    }
  },
  {
    path: '*',
    redirect: {
      name: 'error'
    },
    meta: {
      keepAlive: true
    }
  } */
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 添加路由拦截器
router.beforeEach((to, from, next) => {
  console.log('路由拦截器', to.matched, to)
  if (to.matched.some(m => m.meta.keepAlive)) {
    if (window.localStorage.isLogin === '1') {
      try {
        next()
      } catch (err) {
        console.log(err)
      }
    } else if (to.path !== '/login') {
      next({ name: 'login' })
      alert('检测到您还未登录，请登录后再操作')
      // Vue.prototype.$message.warning('检测到您还未登录，请登录后再操作')
    } else {
      next()
    }
  }
})

router.onError(err => {
  console.log(err, '路由加载错误')
})
export default router
