<template>
  <!-- 测导航封装 -->
  <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <sidebar-menu
      v-if="!shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :open-names="openNames"
      @on-change="handleChange"
    ></sidebar-menu>
    <sidebar-menu-shrink
      v-else
      :menu-theme="theme"
      :menu-list="menuList"
      :icon-color="shrinkIconColor"
      @on-change="handleChange"
    ></sidebar-menu-shrink>
  </div>
</template>
<script>
import sidebarMenu from "./components/sidebarMenu.vue";
import sidebarMenuShrink from "./components/sidebarMenuShrink.vue";

export default {
  components: {
    sidebarMenu,
    sidebarMenuShrink
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      required: true,
      default: []
    },
    theme: {
      type: String,
      default: "dark"
    },
    openNames: {
      type: Array
    }
  },
  computed: {
    bgColor() {
      return this.theme === "dark" ? "#495060" : "#fff";
    },
    shrinkIconColor() {
      return this.theme === "dark" ? "#fff" : "#495060";
    }
  },

  methods: {
    handleChange(name) {
      this.$router.push({
        name: name
      });
    }
  },
  created() {}
};
</script>
<style lang="less">
.ivu-shrinkable-menu {
  height: 100%;
  width: 100%;
}
</style>
