const user = [
  {
    title: '用户管理',
    icon: 'ios-contact',
    name: 'user',
    children: [
      {
        path: 'user-list',
        meta: {
          title: '用户列表',
          api: {
            // 这里可以用作权限 判断 这里还是要看公司后端怎么搞
            url: '/user-list',
            meta: 'GET'
          },
          keepAlive: true
        },

        name: 'user-list',
        component: () => import('@/views/children/user/user.vue') //统计
      }
    ]
  }
]
export default user
