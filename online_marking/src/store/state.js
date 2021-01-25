import { getState, getState2 } from '@/utils'
const state = {
  user: null, // 验证用户是否登录
  isLogin: '0', // 验证用户是否登录,存储状态
  toKen: '',
  login_info: {
    examineID: getState('login_info', 'id', 1),
    mark: getState('login_info', 'mark', null)
  }, // 登录信息
  scoreinfo: { // 大题分数用于判断 对勾和打叉的分数总和
    score: getState('score_info', 'max_score', 0),
    question_ID: getState('score_info', 'id', 0), // 个人中心题号ID
    leaderMark: getState('score_info', 'is_leader', false), // 个人中心题号ID
    question_Num: getState('score_info', 'name', 0), // 当前头部阅卷标题
    step: getState('score_info', 'step', null), // 考试ID
    test_info: getState2('test_info', null)
  },
  page_info: {}, // 分页
  avg_score: 0, // 平均分值
  score_count: 0, // 累计批阅数量
  question_id: 0, // 回评题ID
  timer: 0, // 倒计时
  equipment: false, // 是否为移动端
  score_type: getState2('score_type', 'score'), // 记录打分模式
  num_score: getState2('num_score', null), // 是否开启记分模式(设计累计分值)
  menu_mark: { // 导航配置
    mark_personnel: getState('menu_mark', 'mark_personnel', null), // 人员
    mark_audit: true, // 审核
    mark_arbitration: getState('menu_mark', 'mark_arbitration', null) // 仲裁
  },
  manage_info: { // 管理界面相关信息
    question_title: ''
  },

  question_score_state: getState2('question_score_state', null), // 当前试卷批阅状态
  question_score_tag: getState2('question_score_tag', null), // 当前试卷批阅标记
  question_score_info: null,
  base64imgs_info: [],
  _img_info_arr: [] // canvas像素监测信息
}
export default state
