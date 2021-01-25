<comment>
# 组件注释
</comment>
<template>
    <div class="footer">
        <span>版权所有©2014-2020 常州美拓科技有限公司 版权所有。</span>
        <span>版本 2.4.13</span>
    </div>
</template>

<script>
export default {
  name: 'global-footer',
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

<style scoped>
.footer {
    position: absolute;
    bottom: -38px;
    /*position: fixed;*/
    /*bottom: 0;*/
    width: 100%;
    line-height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    border: 1px solid #ddd;
    z-index: 99;
    padding: 0 20px;
    background-color: white;
}
</style>
