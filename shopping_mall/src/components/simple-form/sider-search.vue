<template>
  <transition name="slide">
    <Card title="搜索条件" class="H100 card-fullbody sider-search" v-show="value">
      <p slot="title">
        <span style="font-size:18px;">搜索条件</span>
      </p>
      <div slot="extra">
        <Icon
          v-show="showicon"
          type="ios-close-circle-outline"
          size="24"
          style="cursor:pointer"
          @click="close"
        />
      </div>
      <dom-size-listen v-model="tableConSize" class="H100" style="overflow:auto;">
        <div
          :style="{maxHeight:(tableConSize.height - 50)+'px'}"
          class="scroll-bar-y"
          style="overflow:auto"
        >
          <slot name="form"></slot>
        </div>
        <div style="padding-top:10px;box-sizing:border-box;">
          <slot name="footer"></slot>
        </div>
      </dom-size-listen>
    </Card>
  </transition>
</template>

<script>
export default {
  name: "sider-search",
  props: {
    // 是否收起
    value: {
      type: Boolean,
      default: true
    },
    showicon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableConSize: {
        width: 0,
        height: 0
      }
    };
  },
  methods: {
    close() {
      this.$emit("input", false);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.sider-search {
  width: 250px;
  margin-left: 16px;
  transform: translateX(0);
  .ivu-form-item {
    margin-bottom: 8px;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: width 0.3s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  width: 0;
  transform: translateX(100%);
}
</style>
