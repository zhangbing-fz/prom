import * as types from './actions-type'
import axios from 'axios'

const API = '/question_bank_api'
const actions = {
  /* [types.SAVE_TREE_MATERIAL] (context) { // 存储学段接口
    const data = JSON.parse(localStorage.getItem('base_interface_data'))
    if (data !== null) {
    } else {
      // eslint-disable-next-line no-new
      new Promise((resolve, reject) => {
        // axios.get('http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=subjectEditionApi&accessKey=37f600e9c80494c20d950d3081e497e5')
        axios.get('http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=subjectEditionApi')
          .then(res => {
            console.log(res)
            localStorage.setItem('base_interface_data', JSON.stringify(res.data.data))
          })
          .catch(err => console.log(err))
        return resolve()
      })
    }
  }, */
  [types.SAVE_TREE_KNOWLEDGE] (context, value) { // 知识点树
    console.log('知识点树', value)
    // const data = JSON.parse(localStorage.getItem('base_interface_data_knowledge_tree'))
    // eslint-disable-next-line no-new
    new Promise((resolve, reject) => { // chapter
      context.commit('SET_TREE_KNOWLEDGE', value)
      return resolve()
    })
  },
  [types.SAVE_TREE_MATERIAL] (context, value) { // 章节树
    console.log('章节树')
    // const data = JSON.parse(localStorage.getItem('base_interface_data_chapter_tree'))
    // eslint-disable-next-line no-new
    new Promise((resolve, reject) => { // chapter
      context.commit('SET_TREE_MATERIAL', value)
      return resolve()
    })
  },
  [types.SAVE_QUESTION_INFO] (context) { // 问题列表
    /* const data = {
      entry: 'question_bank_api',
      service_name: 'add_question_init',
      stage: '高中',
      subject: '语文'
    }
    // eslint-disable-next-line no-new
    new Promise((resolve, reject) => {
      axios.post(API, data).then(({ data }) => {
        if (data.result_code !== '00') {
          return
        }
        context.commit('SET_QUESTION_INFO', data.result_info)
        // console.log(data.result_info)
        localStorage.setItem('addEditor', JSON.stringify(data.result_info))
      }).catch(err => {
        console.log(err)
      })
      return resolve()
    }) */
  },
  [types.SAVE_QUESTION_INFO_EDITOR] (context, id) { // 请求修改大题接口
    const data = {
      entry: 'question_bank_api',
      service_name: 'edit_question_init',
      id: id
    }
    // eslint-disable-next-line no-new
    new Promise((resolve, reject) => {
      axios.post(API, data).then(({ data }) => {
        console.log('点击编辑', data)
        if (data.result_code !== '00') {
          return
        }
        context.commit('SET_QUESTION_INFO_EDITOR', data.result_info)
        localStorage.setItem('question_info_editor', JSON.stringify(data.result_info))
      }).catch(err => {
        console.log(err)
      })
      return resolve()
    })
  }

}
export default actions
