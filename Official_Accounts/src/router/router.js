import SubmitIndex from '../views/submits/SubmitIndex.vue'
import SubmitScheme from '../views/submits/SubmitScheme.vue'
import SubmitQuestion from '../views/submits/SubmitQuestion.vue'
import SubmitApply from '../views/submits/SubmitApply.vue'
// import SubmitContact from '../views/submits/SubmitContact.vue'

import ZhongYingPeople from '../views/contents/ZhongYingPeople.vue'
import ZhongYingCar from '../views/contents/ZhongYingCar.vue'
import ZhongYingAged from '../views/contents/ZhongYingAged.vue'
import ZhongYingGoods from '../views/contents/ZhongYingGoods.vue'
import ZhongYingHome from '../views/contents/ZhongYingHome.vue'
import ZhongYingEnvironment from '../views/contents/ZhongYingEnvironment.vue'

export default {
  routes: [
    {
      title: ' ',
      path: '/submit_index',
      name: 'submit_index',
      component: SubmitIndex
    },
    {
      title: ' ',
      path: '/submit_contact',
      name: 'submit_contact',
      component: ()=> import('../views/submits/SubmitContact.vue'),
    },
    {
      title: ' ',
      path: '/submit_scheme',
      name: 'submit_scheme',
      component: SubmitScheme
    },
    {
      title: ' ',
      path: '/submit_question',
      name: 'submit_question',
      component: SubmitQuestion
    },
    {
      title: ' ',
      path: '/submit_apply',
      name: 'submit_apply',
      component: SubmitApply
    },
    {
      title: ' ',
      path: '/zhongying_people',
      name: 'zhongying_people',
      component: ZhongYingPeople
    },
    {
      title: ' ',
      path: '/zhongying_car',
      name: 'zhongying_car',
      component: ZhongYingCar
    },
    {
      title: ' ',
      path: '/zhongying_aged',
      name: 'zhongying_aged',
      component: ZhongYingAged
    },
    {
      title: ' ',
      path: '/zhongying_goods',
      name: 'zhongying_goods',
      component: ZhongYingGoods
    },
    {
      title: ' ',
      path: '/zhongying_home',
      name: 'zhongying_home',
      component: ZhongYingHome
    },
    {
      title: ' ',
      path: '/zhongying_environment',
      name: 'zhongying_environment',
      component: ZhongYingEnvironment
    },
    {
      name: 'details',
      path: '/details',
      meta: {
        title: '详情内容',
        keepAlive: true,
      },
      component: () => 
      import('@/views/content/Details.vue') //详情内容
    }
  ]
}