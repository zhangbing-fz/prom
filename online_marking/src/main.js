import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import store from './store'
import AutitMark from './global-components' // 导入全局组件
import axios from '@/http/index'
import XLSX from 'xlsx' // 引入sheet.js
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import myMixin from './mixin/mixins'
import VueCompositionApi from '@vue/composition-api'
import fetch from '@/http/fetch'
// eslint-disable-next-line no-unused-vars
// import menuAdmin from '@/router/menu-admin'
// eslint-disable-next-line no-unused-vars
// import menuOrdinary from '@/router/menu-ordinary'

Vue.use(XLSX) // 全局注册 sheet
Vue.use(VueCompositionApi)
export const bus = new Vue() // 注册全局 event.bus

Vue.use(ViewUI)
Vue.use(AutitMark) // 全局组件

Vue.prototype.$fetch = fetch
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.mixin({
  data () {
    return {
      btn_size: 'default' // 导航栏按钮size
    }
  },
  methods: {
    // 单选学科进度渲染柱状图
    /**
     *
     *
     * @date: 2020/12/11 14:30
     * @description: 触摸移动
     * @param {*} val数据源
     * @param {*} key属性名
     * @param {*} name  y轴名称
     * @param {*} reference参考值
     * @returns
     * @memberof No such property: code for class: Script1
     */
    setEchartData (val, key, name, reference) {
      // console.log(this.option.xAxis.data)
      if (reference) {
        this.option.series[0].markLine.data[0].yAxis = reference
      }
      this.option.xAxis.data = []
      this.option.series[0].data = []
      for (let i = 0, len = val.length; i < len; i++) {
        this.option.xAxis.data.push(val[i].name || `第${val[i].question_id}题`)
        this.option.series[0].data.push(val[i][key])
        this.option.series[0].barWidth = 100
      }
      this.option.yAxis.name = name
    },
    getData (api, data) {
      return this.$axios.post(api, data)
        .then(res => {
          if (res.status === 200) {
            return res.data
          }
        })
        .catch(error => error)
    },
    /**
     *
     *
     * @date: 2020/12/11 14:31
     * @description: 选择图表显示形式
     * @param {*} e 事件源
     * @param {*} i 索引值
     * @returns
     * @memberof No such property: code for class: Script1
     */
    selectShape (e, i) {
      if (e.target.innerText === '柱状') {
        this.option.series[0].type = 'bar'
      } else if (e.target.innerText === '折线') {
        this.option.series[0].type = 'line'
      }
      this.echart_info.category.button = i
    },
    // 状态验证
    validation (res) {
      if (res && res.result_code !== '00') {
        console.log('validation', res)
        if (res.result_code === '90') {
          this.$Modal.warning({
            title: res.result_code,
            content: res.result_info,
            onOk: () => {
              this.$router.push({ path: '/login' })
            }
          })
        } else if (res.result_info === '用户不存在') {
          const that = this
          this.$Modal.error({
            title: res.result_code,
            content: res.result_info,
            onOk () {
              that.$router.push({ path: '/login' })
            }
          })
        } else {
          console.log(res)
          this.$Modal.warning({
            title: res.result_code,
            content: res.result_info
          })
        }
      }
    },
    // 全局Token验证
    setToken () {
      const url = location.href.split('?')
      // eslint-disable-next-line camelcase
      let access_token
      // eslint-disable-next-line no-unused-vars
      let app
      url.forEach(item => {
        if (item.includes('access_token') && item.includes('app')) {
          // eslint-disable-next-line camelcase
          const arr = item.split('&')
          arr.forEach(ele => {
            console.log(ele)
            if (ele.includes('access_token')) {
              // eslint-disable-next-line camelcase
              access_token = ele.split('=')[1]
            }
            if (ele.includes('app')) {
              // eslint-disable-next-line camelcase
              app = ele.split('=')[1]
            }
          })
        }
      })
      console.log('access_token', access_token, 'app', app)
      // eslint-disable-next-line camelcase
      if (access_token && app) {
        const data = {
          entry: 'auth_api',
          service_name: 'access_token_login',
          access_token,
          app
        }
        this.getData('/system_admin/auth_api', data)
          .then(res => {
            console.log(res)
            this.validation(res)
            this.$router.push('/login')
            return app
            // if (this.getQuestionId) {
            //   this.personnelMark = app === 'score_admin'
            //   this.getQuestionId()
            // }
          })
      }
    }
  }

})

new Vue({
  mixins: [myMixin],
  data: {
    currentTime: '',
    lastTime: '',
    timeOut: ''
  },
  router,
  store,
  render: h => h(App),
  methods: {
    testTime () {
      // 更新当前时间
      this.currentTime = new Date().getTime()
      // console.log(parseInt((this.currentTime - this.lastTime) / 1000))
      if (this.currentTime - this.lastTime > this.timeOut) {
        // 判断是否超时
        window.clearInterval(this.testTime)
        // alert('登录超时')
        this.$router.push({
          path: '/login'
        })
      }
    }
  },
  created () {
    const ele = JSON.parse(localStorage.getItem('_login_info'))
    // this.$router.addRoutes(menuOrdinary)
    if (ele) {
      if (ele.app === 'score') {
        // router.addRoutes(menuOrdinary)
        // menuOrdinary.forEach(item => router.options.routes.push(item))
        console.log(router)
      } else if (ele.app === 'score_admin') {
        // router.addRoutes(menuAdmin)
      }
    } else {
      router.addRoutes([
        {
          path: '*',
          redirect: '/login'
        }
      ])
      router.push('/login')
    }
  },
  mounted () {
    // 禁用鼠标默认右键
    window.oncontextmenu = (e) => e.preventDefault()
    // this.setToken()
    // 设置超时退出
    /* this.lastTime = new Date().getTime()
    this.currentTime = new Date().getTime()
    this.timeOut = 30 * 60 * 1000 // 设置超时 10分钟
    document.onmousemove = () => {
      // 更新操作事件
      this.lastTime = new Date().getTime()
    }
    // 定时器 间隔 1秒检测是否长时间未操作页面
    window.setInterval(this.testTime, 1000) */
  }
}).$mount('#app')
