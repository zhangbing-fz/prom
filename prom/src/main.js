import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './common/stylus/index.styl' //引用stylus
import attachFastClick from 'fastclick' //引入该组件的目的就是为了解决移动端的 300ms延迟

attachFastClick.attach(document.body); //激活组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
