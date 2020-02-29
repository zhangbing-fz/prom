import Vue from 'vue'
import axios from 'axios';
import Vant from 'vant';
import qs from 'qs.js';
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'
import Meta from 'vue-meta'
import attachFastClick from 'fastclick'

attachFastClick.attach(document.body);

Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;
Vue.use(Meta)
Vue.use(Vant);
Vue.config.productionTip = false
//提取服务器地址
axios.defaults.baseURL = 'http://mapi.zhyinfo.cn/api/'; //http://222.185.244.186:820/api/

Vue.mixin({

  watch: {
    $route(to, from) {
      // console.log(to, from)
      // const toDepth = to.path.split('/').length
      // const fromDepth = from.path.split('/').length
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
    deep: true
  },
  // created() {
  //   let sel = this.selects;
  //   this.$axios
  //     .post("http://222.185.244.186:820/api/WxPublic/WxPublic/GetItems", {
  //       itemFlag: 0
  //     })
  //     .then(function (response) {
  //       for (const val of Object.values(response.data)) {
  //         sel.push(val.name);
  //       }
  //       console.log(sel); //请求成功返回的数据
  //     })
  //     .catch(function (error) {
  //       console.log(error); //请求失败返回的数据
  //     });
  // },
  methods: {
    fn() {
      console.log(11)
    }
  }
})
new Vue({
  router,
  directives: {
    focus: function(ev){
      document.activeElement.blur();
    }
  },
  render: h => h(App)
}).$mount('#app')


