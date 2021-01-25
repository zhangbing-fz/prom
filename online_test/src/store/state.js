import exportStore from '@/utils/exportStore'
const state = {
  // 树
  tree_nav: {
    tree_material: exportStore.getStore2('tree_material', []), // 教材树
    tree_knowledge: exportStore.getStore2('tree_knowledge', [])// 知识点树
  },
  level_key: exportStore.getStore2('local_level_key', []), // 年级、班级
  question_info: exportStore.getStore2('local_question_info', null), // 初始化大题的信息
  question_info_editor: exportStore.getStore2('question_info_editor', null), // 修改大题的信息
  question_search: {
    grade: {}, // 年级
    material: {}, // 教材
    qtypeId: {}, // 题型
    diff: {}, // 难度
    type: {}, // 类型
    chapter: {}
  },
  shopping_cart: {
    mark: false,
    list: exportStore.getStore2('shopping_cart_list', [])
  },
  menu_info: {
    name: exportStore.getStore('menuInfo', 'name', '1')
  },
  select_type: exportStore.getStore2('local_select_type', '试卷'), // 搜索框下拉选择类型
  base_interface_data_period: exportStore.getStore2('base_interface_data_period', []), // 学段接口返回的数据
  base_interface_data_type: exportStore.getStore2('base_interface_data_type', []), // 难易度接口返回度数据
  base_interface_discipline: exportStore.getStore2('base_interface_discipline', []), // 所有学科
  question_list_info: exportStore.getStore2('question_list_info', null),
  select_subject: exportStore.getStore2('select_subject', null) // 这里需要关联用户账户信息所对应设置的学段
}
export default state
