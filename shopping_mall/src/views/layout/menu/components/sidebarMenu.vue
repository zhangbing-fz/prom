<template>
  <Menu
    ref="sideMenu"
    :active-name="$route.name"
    :theme="menuTheme"
    :open-names="openNames"
    width="auto"
    @on-select="changeMenu"
  >
    <template v-for="item in menuList">
      <Submenu :name="item.name" :key="item.name">
        <template slot="title">
          <Icon :type="item.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{ item.title }}</span>
        </template>
        <template v-for="child in item.children">
          <template v-if="!child.children">
            <Menu-Item :name="child.name" :key="'menuitem' + child.name">
              <Icon :type="child.meta.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
              <span class="layout-text" :key="'title' + child.name">{{ child.meta.title }}</span>
            </Menu-Item>
          </template>
          <template v-if="child.children">
            <Submenu :name="child.name" :key="'menuitemtree' + child.name">
              <template slot="title">
                <Icon :type="child.icon" :size="iconSize"></Icon>
                <span class="layout-text">{{ child.title }}</span>
              </template>
              <template v-for="childTree in child.children">
                <Menu-Item :name="childTree.name" :key="'menuitemTree' + childTree.name">
                  <Icon :type="child.meta.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                  <span
                    class="layout-text"
                    :key="'title' + childTree.name"
                  >{{ childTree.meta.title }}</span>
                </Menu-Item>
              </template>
            </Submenu>
          </template>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>
<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: []
    },
    iconSize: {
      type: Number,
      default: 18
    },
    menuTheme: {
      type: String,
      default: "light"
    },
    openNames: {
      type: Array
    }
  },
  methods: {
    changeMenu(active) {
      this.$emit("on-change", active);
    }
  }
};
</script>
<style lang="less" >
</style>
