<template>
  <div class="H100 Phone-list-main">
    <Card class="H100 card-fullbody extra-card flex-1" :padding="0">
      <p slot="title">
        <span class="title">用户列表</span>
        <span class="list-total-num">
          <span class="num">{{total}}</span>
          <span>条</span>
        </span>
      </p>
      <div slot="extra">
        <i-button
          type="primary"
          v-show="!showSearch"
          @click="showSearch=true"
          style="margin-left:10px;"
        >
          <Icon type="ios-search-outline" size="16"/>
        </i-button>
      </div>
      <div class="H100 flex-column">
        <div class="flex-1 list-con areaList">
          <dom-size-listen v-model="tableConSize" class="H100">
            <pagenation-table
              data-url
              :search-data="tableSearchData"
              ref="list"
              v-model="list"
              :columns="columns"
              :height="tableConSize.height-5"
              @get-total="num=>total=num"
            ></pagenation-table>
          </dom-size-listen>
        </div>
      </div>
    </Card>
    <div slot="sider-search" class="H100">
      <sider-search v-model="showSearch">
        <simple-form-v2
          :form-items="searchParams"
          slot="form"
          v-model="searchData"
          @keyup.native.enter="searchList"
        ></simple-form-v2>
        <div slot="footer">
          <i-button type="primary" style="width:100%;" @click="searchList">搜索</i-button>
        </div>
      </sider-search>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表格筛选表单数据
      searchData: {},
      // 表格数据
      list: [],
      // 表格定义
      columns: [
        {
          title: "姓名",
          key: "name",
          minWidth: 160
        },
        {
          title: "部门",
          key: "bumen",
          minWidth: 160
        }
      ],
      showSearch: true,
      total: 0,
      tableConSize: {
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    searchParams() {
      return [
        {
          type: "input",
          key: "name",
          label: "区域名称",
          otherConfig: {
            placeholder: "请输入",
            clearable: true
          }
        }
      ];
    },
    tableSearchData() {
      return {
        ...this.searchData
      };
    }
  },
  methods: {
    searchList() {
      this.$refs.list.searchList();
    },
    getList() {
      this.$refs.list.getList();
    }
  },

  activated() {
    this.getList();
  }
};
</script>
<style lang="less">
</style>
