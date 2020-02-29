<template>
  <component
    v-if="currentComponent"
    v-bind:is="currentComponent"
    v-bind="propsConifg"
    :value="value"
    style="width: 100%"
    @input="valueInput"
    @on-change="valueChange"
    ref="formItem"
  >
    <!-- 当是下拉框时 -->
    <template v-if="currentComponent == 'i-select'">
      <i-option
        v-for="(option,index) in options"
        :value="option.value"
        :key="index"
      >{{option.label}}</i-option>
    </template>
    <!-- 当是单选框时 -->
    <template v-if="currentComponent == 'radio-group'">
      <Radio v-for="(option,index) in options" :label="option.value" :key="index">{{option.label}}</Radio>
    </template>
    <!-- 当是多选box时 -->
    <template v-if="currentComponent == 'CheckboxGroup'">
      <Checkbox
        v-for="(option,index) in options"
        :label="option.value"
        :key="index"
      >{{option.label}}</Checkbox>
    </template>
  </component>
</template>

<script>
export default {
  name: "simple-form-item-v2",
  props: {
    // 定义想要的表单元素
    type: {
      type: String,
      required: true,
      default: "input"
    },
    // 组件value，与外部双向绑定
    value: null,
    // 嵌套组件时的选项数据
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    // 注意！！！！！！！！！！！！！！
    // 因为不同的表单元素props互不相同，所以这里允许传入定义，我会绑定到组件里面去
    otherConfig: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    // 匹配表单组件
    currentComponent() {
      var currentComponent = "";
      switch (this.type) {
        // 输入框
        case "input":
          currentComponent = "i-input";
          break;
        // 颜色选择器
        case "color":
          currentComponent = "color-picker";
          break;
        // 下拉框
        case "select":
          currentComponent = "i-select";
          break;
        // 多选box
        case "checkbox":
          currentComponent = "CheckboxGroup";
          break;
        // 单选框
        case "radio":
          currentComponent = "radio-group";
          break;
        // 日期
        case "date":
          currentComponent = "date-picker";
          break;

        default:
          currentComponent = this.type;
          break;
      }
      return currentComponent;
    },
    // 传入props到动态组件里面去
    propsConifg() {
      return {
        ...this.$attrs,
        ...this.otherConfig
      };
    }
  },
  methods: {
    // 时间组件特殊处理
    valueChange(val) {
      if (this.currentComponent == "date-picker") {
        this.$emit("input", val);
      }
    },
    valueInput(val) {
      if (this.currentComponent != "date-picker") {
        if (typeof val == "undefined") {
          val = "";
        }
        this.$emit("input", val);
      }
    }
  },
  watch: {
    value(val) {
      // 处理select框filterable模式下，resetFields不会清除搜索项
      if (this.currentComponent == "i-select" && !val) {
        this.$refs.formItem.query = "";
      }
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
