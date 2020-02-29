<template>
  <div class="default-layout" :class="{'main-hide-text': shrink}">
    <div class="sidebar-menu">
      <sidebar-menum
        :shrink="shrink"
        @on-change="handleSubmenuChange"
        :theme="menuTheme"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
      >
        <div slot="top" class="logo-con">中盈高科</div>
      </sidebar-menum>
    </div>
    <!-- 主体内容 keepalive的好处呢就是可以防止dom的重复渲染-->
    <div class="main-container">
      <div class="main-header">
        <!-- 折叠菜单操作按钮 -->
        <div class="navicon-con">
          <Button
            :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
            type="text"
            @click="shrink = !shrink"
          >
            <Icon type="md-menu" size="32" color="#fff"></Icon>
          </Button>
        </div>
        <div class="header-avator-con">
          <Dropdown
            transfer-class-name="loginout"
            trigger="click"
            style="margin-left: 20px;color:#fff;"
            transfer
          >
            <a href="javascript:void(0)">
              {{userName}}
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="loginout" @click.native="loginout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <!-- 打开过的页面 -->
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
      <div class="main-content scroll-bar-y">
        <keep-alive>
          <router-view
            v-if="$route.meta.keepAlive"
            :key="$route.fullPath"
            class="default-layout-view"
          ></router-view>
        </keep-alive>
        <router-view
          v-if="!$route.meta.keepAlive"
          :key="$route.fullPath"
          class="default-layout-view"
        ></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
// 可折叠缩略导航
import sidebarMenum from "./menu/index.vue";
// tag导航栏封装
import tagsPageOpened from "./tags-page-opened/index.vue";
export default {
  components: {
    sidebarMenum,
    tagsPageOpened
  },
  data() {
    return {
      menuTheme: "light",
      shrink: false
    };
  },
  computed: {
    ...mapState({
      userName: state => state.user.username,
      pageTagsList: state => state.openedTag.pageOpenedList //展开的页面数
    }),
    ...mapGetters(["menuList"]),
    openedSubmenuArr() {
      // var openedSubmenuArr = ["user"];
      var openedSubmenuArr = [];
      this.menuList.forEach(item => {
        item.children.forEach(child => {
          if (child.name == this.$route.name) {
            openedSubmenuArr.push(item.name);
          }
          if (child.children) {
            child.children.forEach(childtree => {
              if (childtree.name == this.$route.name) {
                openedSubmenuArr.push(child.name);
                openedSubmenuArr.push(item.name);
              }
            });
          }
        });
      });
      return openedSubmenuArr;
    }
  },
  methods: {
    ...mapMutations(["loginout"]),
    handleSubmenuChange(val) {
      // 移动端点击了链接后。关闭侧边栏
      if (document.body.clientWidth <= 768) {
        this.shrink = true;
      }
    }
  },
  created() {
    // 移动端默认收起
    if (document.body.clientWidth <= 768) {
      this.shrink = true;
    }
  }
};
</script>
<style lang="less" >
.default-layout {
  width: 100%;
  height: 100%;
  display: flex;
  .logo-con {
    background-color: #1a7be1;
    color: #fff;
    line-height: 60px;
    text-align: center;
    font-size: 26px;
  }
  .sidebar-menu {
    height: 100%;
    width: 200px;

    & > div {
      display: flex;
      flex-direction: column;
      & > ul {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
  }
  .main-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
    .main {
      height: 100%;
    }
  }
  .main-header {
    height: 60px;
    width: 100%;
    line-height: 60px;
    background-color: #1a7be1;
    display: flex;
    justify-content: space-between;
    .header-avator-con {
      padding-right: 24px;
    }
    .navicon-con {
      button:hover {
        background-color: #1a86e1;
      }
    }
  }
  .default-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
.main-hide-text {
  .sidebar-menu {
    width: 60px;
    .logo-con {
      font-size: 12px;
    }
  }
}
.loginout {
  right: 0 !important;
  left: auto !important;
  top: 56px !important;
}
</style>
