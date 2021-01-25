import * as types from './mutations-type'
const mutations = {
  [types.SET_TREE_MATERIAL] (state, tree) {
    // console.log(tree, '教材树')
    state.tree_nav.tree_material = tree
  },
  [types.SET_TREE_KNOWLEDGE] (state, tree) {
    // console.log(tree, '知识点树')
    state.tree_nav.tree_knowledge = tree
  },
  [types.SET_LEVEL_KEY] (state, level) {
    state.level_key = level
    localStorage.setItem('local_level_key', JSON.stringify(level))
  },
  [types.SET_QUESTION_INFO] (state, obj) {
    state.question_info = obj
    localStorage.setItem('local_question_info', JSON.stringify(obj))
  },
  [types.SET_QUESTION_INFO_EDITOR] (state, obj) {
    state.question_info_editor = obj
  },
  [types.SET_SHOPPING_CART_MARK] (state, boolean) { // 设置试题篮开关
    state.shopping_cart.mark = boolean
  },
  [types.SET_SHOPPING_CART_LIST] (state, data) { // 添加试题到试题篮
    state.shopping_cart.list.push(data)
    localStorage.setItem('shopping_cart_list', JSON.stringify(state.shopping_cart.list))
  },
  [types.SET_SELECT_TYPE] (state, type) { // 搜索框选择类型
    console.log(type)
    state.select_type = type
    localStorage.setItem('local_select_type', JSON.stringify(type))
  },
  [types.SET_SHOPPING_CART_LIST_REMOVE] (state, data) { // 移出试题到试题篮
    if (!data) {
      state.shopping_cart.list = []
      localStorage.setItem('shopping_cart_list', JSON.stringify([]))
      return
    }
    if (Object.prototype.toString.call(data.ele) === '[object Array]') { // 按照类型删除
      state.shopping_cart.list = data.ele
      localStorage.setItem('shopping_cart_list', JSON.stringify(data.ele))
    } else if (Object.prototype.toString.call(data.ele) === '[object Object]') { // 移出试题篮
      state.shopping_cart.list.forEach((item, index) => {
        if (item[data.id] === data.ele[data.id]) {
          state.shopping_cart.list.splice(index, 1)
        }
      })
      localStorage.setItem('shopping_cart_list', JSON.stringify(state.shopping_cart.list))
    } else { //
      state.shopping_cart.list = []
      localStorage.setItem('shopping_cart_list', JSON.stringify([]))
    }
  },
  [types.SET_MENU_INFO] (state, data) {
    state.menu_info.name = data.name
  },
  [types.SET_SAVE_QUESTIONSINFO] (state, data) { // 设置点击试卷详情信息
    state.question_list_info = data
    localStorage.setItem('question_list_info', JSON.stringify(data))
  },
  [types.SET_SAVE_SELECT_SUBJECT] (state, value) { // 设置当前选择的学科
    console.log(value)
    state.select_subject = value
    localStorage.setItem('select_subject', JSON.stringify(value))
  },
  [types.SET_SAVE_DISCIPLINE] (state, data) { // 设置保存所有学科
    state.base_interface_discipline = data
    localStorage.setItem('base_interface_discipline', JSON.stringify(data))
  },
  [types.SET_INTERFACE_DATA_PERIOD] (state, data) { // 设置学段接口数据
    state.base_interface_data_period = data
    localStorage.setItem('base_interface_data_period', JSON.stringify(data)) // 存储学段 、科目、接口
  },
  [types.SET_EASY_TYPE] (state, data) { // 设置难易度接口查询数据
    state.base_interface_data_type = data
    localStorage.setItem('base_interface_data_type', JSON.stringify(data)) // 缓存难易度 、 类型 、 题型接口
  }

}
export default mutations
