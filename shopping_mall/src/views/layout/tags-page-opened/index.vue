<template>
  <div ref="scrollCon" class="tags-outer-scroll-con scroll-bar-x">
    <div class="close-all-tag-con">
      <Dropdown transfer-class-name="tagsbq" transfer @on-click="handleTagsOption">
        <Button size="small" type="primary">
          标签选项
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">关闭所有</DropdownItem>
          <DropdownItem name="clearOthers">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div ref="scrollBody" class="tags-inner-scroll-body">
      <Tag
        type="dot"
        v-for="item in pageTagsList"
        ref="tagsPageOpened"
        :key="item.path"
        :name="item.path"
        @on-close="closePage"
        @click.native="linkTo(item)"
        :closable="item.path==='/'?false:true"
        :color="item.path == currentPath?'primary':'default'"
      >{{item.title}}</Tag>
    </div>
  </div>
</template>
<script>
import { checkOpened } from "@/util/index";
export default {
  name: "tagsPageOpened",
  data() {
    return {};
  },
  props: {
    pageTagsList: Array
  },
  computed: {
    currentPath() {
      return this.$route.fullPath;
    }
  },
  methods: {
    closePage(event, path) {
      let pageOpenedList = this.pageTagsList;
      let lastPageObj = pageOpenedList[0];
      if (this.currentPath === path) {
        // 关闭的是当前页面，则优先跳到下一个页面，否则上一个
        let len = pageOpenedList.length;
        for (let i = 1; i < len; i++) {
          if (pageOpenedList[i].path === path) {
            if (i < len - 1) {
              lastPageObj = pageOpenedList[i + 1];
            } else {
              lastPageObj = pageOpenedList[i - 1];
            }
            this.linkTo(lastPageObj);
            this.$store.commit("removeTag", path);
            break;
          }
        }
      } else {
        // 关闭的不是当前页面，直接关闭
        this.$store.commit("removeTag", path);
      }
    },
    linkTo(item) {
      //   实现理由跳转
      this.$router.push({ path: item.path });
    },
    handleTagsOption(type) {
      if (type === "clearAll") {
        // 清除所有，并跳转到首页
        this.$store.commit("clearAllTags");
        this.$router.push({
          path: "/"
        });
      } else {
        // 清除首页和当前页面外的所有页面
        let currentTag = {
          title: this.$route.meta.title,
          path: this.$route.fullPath
        };
        this.$store.commit("clearOtherTags", currentTag);
      }
    },
    // 让tag出现在可视范围
    moveToView(tag) {
      //滚动容器滚动距离
      let scrollLeft = this.$refs.scrollCon.scrollLeft;
      //滚动容器可视宽度
      let seenWidth = this.$refs.scrollCon.offsetWidth;
      for (let i = 0; i < this.pageTagsList.length; i++) {
        if (this.pageTagsList[i].path == tag.path) {
          //当前tag距离左边距离
          let tagLeft = this.$refs.tagsPageOpened[i].$el.offsetLeft;
          let tagWidth = this.$refs.tagsPageOpened[i].$el.offsetWidth;
          if (tagLeft + tagWidth > scrollLeft + seenWidth) {
            // 需要调整位置---这种情景是被隐藏在右边了
            this.$refs.scrollCon.scrollLeft = tagLeft + tagWidth - seenWidth;
          } else if (tagLeft < scrollLeft) {
            // 需要调整位置---这种情景是被隐藏在左边了
            this.$refs.scrollCon.scrollLeft = tagLeft;
          }
          return;
        }
      }
    },
    onEnd() {
      this.$store.commit("setTag", this.pageTagsList);
    }
  },
  watch: {
    /**
     * 每次打开路由页面
     * 已打开就移动到打开处，否则添加新tag
     **/
    /**
     * 1.第一个handler：其值是一个回调函数。即监听到变化时应该执行的函数。
        2.第二个是deep：其值是true或false；确认是否深入监听。（一般监听时是不能监听到对象属性值的变化的，数组的值变化可以听到。）
        3.第三个是immediate：其值是true或false；确认是否以当前的初始值执行handler的函数。

     */
    $route: {
      immediate: true,
      handler(route) {
        let checked = checkOpened(this.pageTagsList, route.fullPath);
        if (checked) {
          this.$nextTick(() => {
            this.moveToView(checked);
          });
        } else {
          let tag = {
            title: route.meta.title,
            path: route.fullPath
          };
          this.$store.commit("pushTag", tag);
          this.$nextTick(() => {
            this.moveToView(tag);
          });
        }
      }
    }
  }
};
</script>
<style lang="less" >
.tags-con {
  height: 40px;
  z-index: 8;
  overflow: hidden;
  background: #f0f0f0;
  position: relative;
  .tags-outer-scroll-con {
    position: relative;
    box-sizing: border-box;
    margin-left: 0;
    margin-right: 120px;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      height: 0;
    }
    &:hover {
      &::-webkit-scrollbar {
        height: 6px;
      }
    }
    .tags-inner-scroll-body {
      position: absolute;
      padding: 2px 10px;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
    }
    .close-all-tag-con {
      position: fixed;
      right: 0;
      top: 60px;
      height: 40px;
      width: 110px;
      box-sizing: border-box;
      padding-top: 8px;
      text-align: center;
      background: white;
      box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
      z-index: 7;
    }
  }
}
.tagsbq {
  right: 0px !important;
  left: auto !important;
  width: 110px;
}
</style>
