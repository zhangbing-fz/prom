import * as types from './mutations-type'
const key = 'user'
const isLogin = 'isLogin'
const mutations = {
  [types.SET_LOGIN_INFO] (state, val) {
    state.login_info.examineID = val.id
    state.login_info.mark = val.mark // 设置是否是管理员登录
    localStorage.setItem('login_info', JSON.stringify(val))
  },
  [types.SET_SCOREINFO] (state, val) {
    console.log(val, '普通阅卷员')
    state.scoreinfo.score = val.max_score
    state.scoreinfo.question_ID = val.id
    state.scoreinfo.leaderMark = val.is_leader
    state.scoreinfo.question_Num = val.name
    state.scoreinfo.step = val.step
    // console.log(state.scoreinfo.question_ID, '个人中心大题ID')
    localStorage.setItem('score_info', JSON.stringify(val))
  },
  [types.SET_TIMER] (state, val) {
    const timer = setInterval(() => {
      state.timer = val
      val--
      if (val < 0) {
        clearInterval(timer)
      }
    }, 1000)
  },
  [types.SET_SCORE_TYPE] (state, str) {
    localStorage.setItem('score_type', JSON.stringify(str))
    state.score_type = str
  },
  [types.SET_QUESTION_ID] (state, id) { // 设置题目ID
    state.question_id = id
    localStorage.setItem('question_id', JSON.stringify(id))
    // console.log(state.question_id, '当前回评小题的ID')
  },
  [types.SET_QUESTION_AVG_SCORE] (state, num) {
    state.avg_score = num
    localStorage.setItem('avg_score', JSON.stringify(num))
  },
  [types.SET_QUESTION_SCORE_COUNT] (state, num) {
    state.score_count = num
    localStorage.setItem('score_count', JSON.stringify(num))
  },
  [types.SET_NUM_SCORE] (state, num) {
    state.num_score = num
    localStorage.setItem('num_score', JSON.stringify(num))
  },
  [types.SET_PAGEINFO] (state, data) { // 保存分页
    console.log(data)
    localStorage.setItem('pageinfo', JSON.stringify(data))
    state.page_info = data
  },
  [types.SET_MENU_MARK] (state, mark) {
    console.log(mark)
    localStorage.setItem('menu_mark', JSON.stringify({
      mark_personnel: mark.personnelMark,
      mark_arbitration: mark.arbitration,
      mark_question_ID: mark.question_ID
    }))
    state.menu_mark.mark_personnel = mark.personnelMark // 人员
    state.menu_mark.mark_arbitration = mark.arbitration // 仲裁
    // 正评
    // 审核
  },
  [types.SET_QUESTION_TITLE] (state, data) {
    state.manage_info.question_title = data.name
  },
  [types.SET_TEST_NAME] (state, data) { // 管理员登录--->设置考试信息
    state.scoreinfo.test_info = data
    localStorage.setItem('test_info', JSON.stringify(data))
  },
  [types.SET_QUESTION_SCORE_STATE] (state, data) { // 存储当前批阅窗口状态
    // console.log(data, '存储当前批阅窗口状态')
    state.question_score_state = data
    localStorage.setItem('question_score_state', JSON.stringify(data))
  },
  [types.SET_QUESTION_SCORE_TAG] (state, data) { // 存储当前批阅窗口标记
    state.question_score_tag = data
    localStorage.setItem('question_score_tag', JSON.stringify(data))
  },
  [types.SET_QUESTION_SCORE_INFO] (state, data) { // 设置选择的批阅题号
    state.question_score_info = data
    localStorage.setItem('question_score_info', JSON.stringify(data))
  },
  [types.SET_BASE64IMG_INFO] (state, data) {
    state.base64imgs_info = data
    localStorage.setItem('base64imgs_info', JSON.stringify(data))
  },
  [types.SET_EQUIPMENT] (state, data) { // 设置存储客户端
    state.equipment = data
  },
  [types.SET_IMG_INFO] (state, arr) {
    state._img_info_arr = arr
  },

  /**
     * @作者: 张兵
     * @功能: 验证登录 $_setLogin、$_setLogin、$_removeStorage
     * @date: 2020/5/20 09:20
     * @description: 触摸移动
     * @param {mutations.js}
     * @return:
     */
  $_setLogin (state, value) { // 验证是否登录
    state.isLogin = value
    localStorage.setItem(isLogin, value)
  },
  $_setStorage (state, value) {
    // console.log(state, value)
    state.user = value
    localStorage.setItem(key, JSON.stringify(value))
  },
  $_removeStorage (state) {
    state.user = null
    localStorage.removeItem(key)
  }
}
export default mutations
