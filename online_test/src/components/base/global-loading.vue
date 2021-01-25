<template>
    <div class="demo-spin-container">
        <Spin fix>
            <Icon :size="36" class="icon-load" type="ios-loading"></Icon>
            <div>加载中</div>
        </Spin>
    </div>
</template>

<script>
export default {
  name: 'global-loading',
  components: {},
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  watch: {},
  created () {

  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .demo-spin-container{
        display: inline-block;
        width: 500px;
        height: 500px;
        position: relative;
        /*border: 1px solid #eee;*/
    }
    // 旋转loading
    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
