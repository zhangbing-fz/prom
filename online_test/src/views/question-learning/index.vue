<comment>
    # 学情追踪
</comment>
<template>
    <div class="index">
        <div style="text-align: left">
            <Button :to="{
                        path: '/question_learning/template-synthesize'
                    }"
                    :type="$route.path === '/question_learning/template-synthesize'?'primary': 'default'"
            >
                综合分析
            </Button>
            <Button
                    :to="{
                        path: '/question_learning/template-learning'
                    }"
                    :type="$route.path !== '/question_learning/template-synthesize'?'primary': 'default'"
                    style="margin-left: 5px"
            >学情分析
            </Button>
        </div>

        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {}
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>

</style>
