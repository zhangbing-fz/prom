import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/default.vue'
import QuestionsTeaching from '../views/question-bank/questions-Teaching.vue' // 教材选题
import QuestionsKnowledge from '../views/question-bank/questions-Knowledge.vue' // 知识点选题
import QuestionSearch from '../components/base/search-questions' // 搜索试题列表
import ExaminationSearch from '../components/base/search-examination' // 搜索试卷列表
import MyExaminationPaper from '../views/My-examination-paper.vue'
import AddTestQuestions from '../views/Add-test-questions.vue'
import SchoolBasedTestQuestions from '../views/School-based-questions.vue'
import editorContent from '../components/questions-management/Add-test-questions-component/editor-content'

import message from '../components/message/message-received' // 消息管理
import QuestionBasket from '../views/question-bank/question-basket' // 试题篮详情
import QuestionSheet from '../views/question-bank/question-sheet' // 答题卡

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    redirect: '/home',
    meta: {
      auth: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      { // 教材选题
        path: 'question_teaching',
        name: 'QuestionsTeaching',
        component: QuestionsTeaching,
        meta: {
          auth: true
        }
      },
      { // 知识点选题
        path: 'question_knowledge',
        name: 'QuestionsKnowledge',
        component: QuestionsKnowledge,
        meta: {
          auth: true
        }
      },
      { // 试题篮详情
        path: '/question_basket',
        name: 'volumeCenter',
        component: QuestionBasket
      },
      { // 编辑大题
        path: '/editor_content',
        name: 'editorContent',
        component: editorContent,
        meta: {
          auth: true
        }
      },
      {
        path: '/My_examination_paper',
        name: 'MyExaminationPaper',
        component: MyExaminationPaper,
        meta: {
          auth: true
        }
      },
      { // 试题添加/编辑
        path: '/questions',
        name: 'Questions',
        component: AddTestQuestions,
        meta: {
          auth: true
        }
      },
      { // 校本试题
        path: '/school_based_questions',
        name: 'SchoolBasedTestQuestions.vue',
        component: SchoolBasedTestQuestions,
        meta: {
          auth: true
        }
      },
      { // 搜索试题列表
        path: '/question_search',
        name: 'QuestionSearch',
        component: QuestionSearch,
        meta: {
          auth: true
        }
      },
      { // 搜索试卷列表
        path: '/examination_search',
        name: 'ExaminationSearch',
        component: ExaminationSearch,
        meta: {
          auth: true
        }
      },
      { // 试卷选题
        path: 'select_questions',
        name: 'SelectQuestions',
        component: () => import('../views/question-selection/select-questions'),
        meta: {
          auth: true
        }
      },
      { // 试卷选题详情
        path: 'select_questions_detail',
        name: 'SelectQuestionDetail',
        component: () => import('../views/question-selection/select-questions-detail')
      },
      { // 试题分析
        path: 'question_analysis',
        name: 'questionAnalysis',
        component: () => import('../views/question-selection/component/question-analysis')
      },
      { // 学情
        path: '/question_learning',
        name: 'questionLearning',
        component: () => import('../views/question-learning/index'),
        redirect: '/question_learning/template-synthesize',
        meta: {
          auth: true
        },
        children: [
          { // 综合分析
            path: 'template-synthesize',
            name: 'synthesize',
            component: () => import('../views/question-learning/component/tab-synthesize')
            // component: () => import('../views/question-selection/component/question-analysis')
          },
          { // 学情分析
            path: 'template-learning',
            name: 'learning',
            component: () => import('../views/question-learning/component/tab-learning')
          }
        ]
      },
      {
        path: 'errorbook',
        name: 'errorBook',
        component: () => import('../views/question-errorbook/index')
      },
      {
        path: '/message',
        name: 'message',
        component: message,
        meta: {
          auth: true
        }
      }
    ]
  },
  { // 下载答题卡
    path: '/question_sheet',
    name: 'QuestionSheet',
    component: QuestionSheet,
    meta: {
      auth: true,
      show: true
    }
  },
  { // 设置默认跳转
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
