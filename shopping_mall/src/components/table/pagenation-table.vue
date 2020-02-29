<template>
  <!-- 
        iview table的高阶组件
        整合表格和分页，以及封装数据请求
  -->
  <div class="pagenation-table">
    <slot name="list">
      <i-table
        border
        v-bind="$attrs"
        v-on="$listeners"
        :data="value"
        :height="tableHight"
        ref="table"
        style="min-width:1000px"
      ></i-table>
    </slot>
    <div class="footer">
      <Page
        v-show="isshow"
        v-bind="pagePropsMixin"
        @on-change="(val)=>{showLoading = true;page = val;getList(true)}"
        @on-page-size-change="(val)=>{showLoading = true;pageSize = val;searchList()}"
      ></Page>
    </div>
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
import throttle from "lodash.throttle";
export default {
  name: "pagenation-table",
  mixins: [],
  props: {
    dataUrl: {
      type: String
    },
    // 双向绑定列表数据
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    // 搜索条件
    searchData: {
      type: Object,
      default() {
        return {};
      }
    },
    isshow: {
      type: Boolean,
      default() {
        return true;
      }
    },
    //分页码选项
    pageProps: {
      type: Object,
      default() {
        return {};
      }
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      total: 0, //列表所有条数
      page: 1, //当前页码
      pageSizeOpts: [], //分页选项
      pageSize: null, //每页条数
      loading: false, //是否加载中
      showLoading: true,
      listDom: null,
      scrollTop: 0,
      jsj: [
        { name: "张三", bumen: "计算机部门" },
        { name: "李四", bumen: "计算机部门" },
        { name: "王五", bumen: "计算机部门" }
      ]
    };
  },
  computed: {
    // page组件的props混合
    pagePropsMixin() {
      return {
        "show-total": true,
        "show-sizer": true,
        "show-elevator": true,
        placement: "top",
        ...this.pageProps,
        total: this.total,
        "page-size-opts": this.pageSizeOpts,
        "page-size": this.pageSize,
        current: this.page
      };
    },
    tableHight() {
      if (this.height && this.height > 200) {
        return this.height - 60;
      } else {
        return 200;
      }
    }
  },
  watch: {
    total() {
      this.$emit("get-total", this.total);
    }
  },
  methods: {
    // 设置当前list的dom对象
    setListDom(dom) {
      if (dom) {
        this.listDom = dom;
        this.listDom.addEventListener("scroll", this.tableScroll);
      }
    },
    // 初始化参数
    init() {
      // 设置pageSizeOpts,pageSize初始值
      this.pageSizeOpts = this.pageProps["page-size-opts"]
        ? this.pageProps["page-size-opts"]
        : [20, 30, 40, 50];
      this.pageSize = this.pageSizeOpts[0];
    },
    async getList(backTop = false) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      var searchData = {
        ...this.searchData,
        pageSize: this.pageSize,
        page: this.page
      };
      if (this.listDom && !backTop) {
        // table滚动条回到上次位置
        this.listDom.scrollTop = this.scrollTop;
      } else if (this.listDom) {
        this.listDom.scrollTop = 0;
      }
      // this.$http.get(this.dataUrl, searchData).then(
      //   ({ data = [], total = 0 }) => {
      //     this.loading = false;
      //     this.showLoading = false;
      //     this.$emit("input", data);
      //     this.total = total * 1;
      //     // table滚动条回到顶部
      //     if (backTop && this.listDom) {
      //       this.$nextTick(() => (this.listDom.scrollTop = 0));
      //     }
      //   },
      //   err => {
      //     this.loading = false;
      //     this.showLoading = false;
      //     this.$emit("input", []);
      //     this.total = 0;
      //   }
      // );
      this.loading = false;
      this.showLoading = false;
      this.$emit("input", this.jsj);
    },
    searchList() {
      this.page = 1;
      this.showLoading = true;
      this.getList(true);
    },
    // 使用lodash的节流函数，保存表格滚动距离
    tableScroll: throttle(function() {
      if (this.listDom) {
        this.scrollTop = this.listDom.scrollTop;
      }
    }, 150)
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      // 如果是内部list，否则交给外部调用组件方法
      if (this.$refs.table) {
        this.setListDom(this.$refs.table.$el.querySelector(".ivu-table-body"));
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pagenation-table {
  min-height: 100%;
  position: relative;
  .footer {
    height: 60px;
    text-align: right;
    // border-top: 1px solid #e9eaec;
    .ivu-page {
      padding-top: 13px;
      margin-right: 16px;
    }
  }
}
</style>
