import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import router from './router'
import store from './store'
import AutitMark from './global-components'
import axios from '@/http/index'
import myFilter from './filter'
import qs from 'qs'
import VueMathjax from 'vue-mathjax'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueMathjax)
Vue.use(VueQuillEditor)

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ViewUI)
Vue.use(AutitMark)

Object.keys(myFilter).forEach(item => {
  Vue.filter(item, myFilter[item])
})

Vue.mixin({
  methods: {
    // 数组去重
    arrHeavy (arr, name) {
      const title = name || 'id' // 这里定义按照过滤的对象的属性名称
      return arr.reduce((all, next) => {
        return all.some(item => item[title] === next[title]) ? all : [...all, next]
      }, [])
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
