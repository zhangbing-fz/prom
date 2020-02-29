import menu from './menu' //左侧菜单
let menuRoutes = []

menu.forEach(item => {
  if (item.children) {
    item.children.forEach(child => {
      if (!child.meta.outRoute) {
        //判断是否不需要合并进router
        if (child.children) {
          child.children.forEach(childtree => {
            menuRoutes.push({
              ...childtree,
              meta: {
                ...childtree.meta,
                menuGroup: item.menuGroup
              }
            })
          })
        } else {
          menuRoutes.push({
            ...child,
            meta: {
              ...child.meta,
              menuGroup: item.menuGroup
            }
          })
        }
      }
    })
  }
})

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      public: true
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout-default',
    component: () => import('@/views/layout/default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          keepAlive: true
        },
        component: () =>
          import(/* webpackChunkName: "home"*/ '@/views/home/index.vue')
      },
      ...menuRoutes
    ]
  }
]

export default routes
