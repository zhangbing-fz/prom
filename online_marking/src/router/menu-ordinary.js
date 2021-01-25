const menuOrdinary = [
  { // 打分
    path: '/score',
    name: 'Score',
    component: () =>
      import('../views/score-box.vue'),
    meta: {
      keepAlive: true,
      requireAuth: true
    }
  },
  { // 回评打分
    path: '/review',
    name: 'review',
    component: () =>
      import('../views/examination/index.vue'),
    meta: {
      keepAlive: true
    }
  },
  { // 仲裁打分
    path: '/arbitration',
    name: 'Arbitration',
    component: () =>
      import('../views/arbitration/index.vue'),
    meta: {
      title: '仲裁打分',
      meta: {
        keepAlive: true
      }
    }
  },
  { // 进度
    path: '/paper-progress-content',
    name: 'PaperProgressContent',
    component: () =>
      import('../views/progress/index'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/examination-paper-history', // 回评列表
    name: 'Examination-paper-history',
    component: () =>
      import('../views/examination/paper-history-list.vue'),
    meta: {
      title: '回评列表',
      keepAlive: true
    }
  },
  {
    path: '/arbitration-paper-history', // 仲裁列表
    name: 'Arbitration-paper-history',
    component: () =>
      import('../views/arbitration/paper-history-list.vue'),
    meta: {
      title: '仲裁列表',
      keepAlive: true
    }
  },
  { // 阅卷质量
    path: '/quality-content',
    name: 'QualityContent',
    component: () =>
      import('../views/progress/component/content.vue'),
    meta: {
      keepAlive: true
    }
  },
  { // 阅卷质量弹窗
    path: '/quality-content-play',
    name: 'QualityContentPlay',
    component: () =>
      import('../views/progress/component/content-play.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
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
  }
]

export default menuOrdinary
