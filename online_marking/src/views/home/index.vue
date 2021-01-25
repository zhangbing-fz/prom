<comment>
# 首页
</comment>
<template>
  <div class="index">
    <router-view/>
    <global-footer/>
  </div>
</template>

<script>
import footer from '../../components/footer/index'
import { mapActions } from 'vuex'
export default {
  name: 'index',
  components: {
    'global-footer': footer
  },
  methods: {
    ...mapActions(['SAVE_EQUIPMENT']),
    fixedFooter () {
      console.log(document.getElementById('app').getBoundingClientRect().height)
      // if (document.getElementsByClassName('index')[0].offsetHeight) {
      //
      // }
    }
  },
  mounted () {
    window.onload = function () {
      console.log(document.getElementById('app').getBoundingClientRect().height)
      if (document.getElementById('app').getBoundingClientRect().height < 929) {
        console.log(document.getElementsByClassName('footer')[0])
        document.getElementsByClassName('footer')[0].style.cssText = 'position: fixed; bottom: 0'
      } else {
        document.getElementsByClassName('footer')[0].style.cssText = 'position: absolute; bottom: -38px'
      }
    }
    // 判断用户端
    this.SAVE_EQUIPMENT()
    // 验证toKen
    this.setToken()
    this.getData('/scan_project/score_api', {
      entry: 'score_api',
      service_name: 'query_queue'
    })
      .then(res => { // 初始选择题一死题号分数，动态加载传入分数/题号
        // console.log(res, 'home')
        localStorage.setItem('userinfo', JSON.stringify(res))
      })
      .catch(error => error)
  }
}
</script>
<style scoped>
.index{
    height: 100%;
    position: relative;
}
</style>
