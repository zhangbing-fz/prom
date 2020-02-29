const test = [
  {
    title: '前端程序员管理',
    icon: 'ios-book',
    name: 'test',
    children: [
      {
        path: 'test-list',
        meta: {
          title: '测试1',
          api: {
            // 这里可以用作权限 判断 这里还是要看公司后端怎么搞
            url: '/table-list',
            meta: 'GET'
          }
        },
        name: 'test-list',
        component: () => import('@/views/children/test/test.vue') //统计
      },
      {
        path: 'test-list2',
        meta: {
          title: '测试2',
          api: {
            // 这里可以用作权限 判断 这里还是要看公司后端怎么搞
            url: '/table-list',
            meta: 'GET'
          }
        },
        name: 'test-list2',
        component: () => import('@/views/children/test/test2.vue') //统计
      },
      {
        title: '测试三级菜单',
        // icon: 'ios-book',
        name: 'testChildMenu',
        meta: {},
        children: [
          {
            path: 'testChlid',
            name: 'testChlid',
            meta: {
              title: '测试三级菜单1',
              keepAlive: true
            },
            component: () =>
              import(/* webpackChunkName: "home"*/ '@/views/children/test/testChild/testChlid.vue')
          },
          {
            path: 'testChlid2',
            name: 'testChlid2',
            meta: {
              title: '测试三级菜单2',
              keepAlive: true
            },
            component: () =>
              import(/* webpackChunkName: "home"*/ '@/views/children/test/testChild/testChlid2.vue')
          }
        ]
      }
    ]
  }
]
export default test
