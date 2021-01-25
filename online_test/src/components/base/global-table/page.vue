<comment>
# 分页
</comment>
<template>
    <Page
            v-bind="pagePropsMixin"
            @on-change="$emit('change',$event)"
    />
</template>

<script>
export default {
  name: 'page',
  components: {},
  data () {
    return {
      pagePropsMixin: {
        'show-total': true, // 显示总数
        'show-sizer': true, // 显示分页
        'show-elevator': false, // 显示电梯
        placement: 'top', // 切换条数窗口展开方向
        total: 100, // 总条数
        'page-size-opts': [10, 20, 30, 40], // 切换条数配置
        'page-size': 10, // 每页条数
        current: 1 // 当前页码，支持 .sync
      }
    }
  },
  props: {
    pageInfo: {
      type: Object
    }
  },
  watch: {
    pageInfo: {
      handler (val) {
        this.pagePropsMixin = Object.assign(this.pagePropsMixin, val)
      },
      deep: true
    }
  },
  methods: {
  },
  computed: {},
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style scoped>
</style>
