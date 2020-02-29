import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//http
import http from '@/http/index'
import iView from 'iview' //引入ivew库
import 'iview/dist/styles/iview.css' // 使用 CSS
import '@/util/util'
import '@/components/global-compontents'

Vue.config.productionTip = false
Vue.use(iView)

Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
