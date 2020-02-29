<template>
  <div>
    son----{{chuanzhi}}
    <i-button type="primary" @click="geifather">查询</i-button>
  </div>
</template>
<script>
export default {
  name: "son",

  props: {
    chuanzhi: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    geifather() {
      this.$emit("transfer", "子给父传的值");
    }
  }
};
</script>
<style lang="less">
</style>
