<template>
  <!-- 收缩时候的样子 -->
  <div class="sidebarMenuShrink">
    <template v-for="(item, index) in menuList">
      <div style="text-align: center;" :key="index">
        <Dropdown transfer placement="right-start" :key="index" @on-click="changeMenu">
          <Button
            style="width: 70px;margin-left: -5px;padding:10px 0;"
            type="text"
            class="dropMenuTitle"
          >
            <Icon :size="24" :color="iconColor" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <template v-for="(child, i) in item.children">
              <DropdownItem :name="child.name" :key="i">
                <Icon :type="child.meta.icon" :size="20"></Icon>
                <span style="padding-left:10px;">{{ child.meta.title }}</span>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "sidebarMenuShrink",
  props: {
    menuList: {
      type: Array
    },
    iconColor: {
      type: String,
      default: "white"
    },
    menuTheme: {
      type: String,
      default: "darck"
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
.sidebarMenuShrink {
  .dropMenuTitle:hover {
    background-color: transparent !important;
  }
}
</style>
