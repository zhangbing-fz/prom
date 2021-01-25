<comment>
    # 搜索试卷列表
</comment>
<template>
    <div class="questions-search">

        <keep-alive>
            <global-rich-text-question
                    :content-info="contentInfo"
                        :style="{
                        background: 'white',
                        padding: '30px',
                        boxShadow: '0 1px 1px 0 rgba(0,0,0,.1)',
                        borderRadius: '4px'
                    }"
            />
        </keep-alive>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'questions-search',
  components: {},
  data () {
    return {
      contentInfo: [], // 题目列表
      search: ''
    }
  },
  props: {},
  watch: {
    '$route.query': {
      handler (val) {
        // 搜索参数存在且发生变化时
        this.search = val
        // 执行搜索参数回调
        this.getSearchData()
      },
      deep: true
    }
  },
  methods: {
    // editorErrorCorrection () {
    //   this.modal1 = true
    // },
    getSearchData () { // 搜索试题
      const search = this.$route.query.keyword
      const url = 'http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=search&accessKey=37f600e9c80494c20d950d3081e497e5' // 试题
      this.$axios.get(`${url}&keyword=${search}`)
        .then(res => {
          this.contentInfo = JSON.parse(res.data.data)
          console.log(JSON.parse(res.data.data))
          this.$nextTick(() => {
            this.$route.query.keyword = ''
          })
        })
        .catch(err => {
          throw err
        })
    }
  },
  computed: {
    ...mapState({
      select_type: state => state.select_type // 搜索框选择类型
    })
  },
  created () {
  },
  mounted () {
    this.getSearchData()
  },
  destroyed () {
  }
}
</script>

<style scoped>
</style>
