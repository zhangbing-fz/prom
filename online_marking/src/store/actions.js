import * as types from './cations-type'
const actions = {
  [types.SAVE_EQUIPMENT] (context) {
    // 判断是否为移动端
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      console.log('移动端')
      context.commit('SET_EQUIPMENT', false)
    } else {
      console.log('PC端')
      context.commit('SET_EQUIPMENT', true)
    }
  }
}
export default actions
