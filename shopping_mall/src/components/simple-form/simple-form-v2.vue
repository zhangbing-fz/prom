<template>
  <i-form v-on="$listeners" :model="value" v-bind="$attrs" @submit.native.prevent :inline="isInline">
    <form-item v-for="(item,index) in formItems" :key="index" :label="item.label" :prop="item.key">
      <simple-form-item-v2
        :key="index"
        :type="item.type"
        :options="item.options"
        :other-config="item.otherConfig"
        v-model.trim="value[item.key]"
      ></simple-form-item-v2>
    </form-item>
    <slot name='self-test-search'></slot>
  </i-form>
</template>

<script>
export default {
  name: "simple-form-v2",
  props: {
    formItems: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
     isInline: {
      type: Boolean,
      default:false
    }

  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    // valueInput(val) {
    //   this.value.row[0] = "type";
    //   console.log(val);
    // }
  },
  watch: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
