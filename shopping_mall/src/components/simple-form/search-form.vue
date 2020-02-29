<template>
  <i-form
    v-bind="$attrs"
    :label-position="labelPosition"
    v-on="$listeners"
    @submit.native.prevent
    @keyup.native.enter="searchList"
  >
    <!-- 默认搜索表单定义是二维数据，对应一行一行 -->
    <Row :gutter="24" v-for="(line,line_index) in searchParams" :key="line_index">
      <i-col
        v-for="(item,index) in line"
        :key="index"
        :xs="item.xs || 24"
        :sm="item.sm || 12"
        :md="item.md || 8"
      >
        <form-item
          :label="item.label"
          :label-width="item.label && labelPosition == 'left'?searchLabelWidth:NaN"
          :class="item.class"
          style="min-height:36px"
        >
          <simple-form-item-v2
            :key="index"
            :type="item.type"
            :options="item.options"
            :options-group="item.optionsGroup"
            :other-config="item.otherConfig"
            v-model="value[item.key]"
          ></simple-form-item-v2>
        </form-item>
      </i-col>
      <!-- 放在最后一行的表单区域 -->
      <i-col
        :xs="24"
        :sm="12"
        :md="searchBtnWidth"
        :offset="searchOffset"
        v-if="line_index+1 == searchParams.length"
      >
        <form-item :label-width="0" style="min-height:36px">
          <div class="search-btn-box">
            <!-- 搜索按钮 -->
            <i-button type="primary" @click="searchList" class="search-inline-btn">查询</i-button>
            <!--重置按钮 -->
            <i-button
              type="success"
              @click="resetSearch"
              class="search-inline-btn"
              style="margin-left:16px;"
            >重置</i-button>
          </div>
        </form-item>
      </i-col>
    </Row>
  </i-form>
</template>

<script>
export default {
  name: "search-form",
  props: {
    // 搜索条件描述,二维数组格式
    searchParams: {
      type: Array,
      default() {
        return [];
      }
    },
    // 搜索条件默认值
    value: {
      type: Object,
      default() {
        return {};
      }
    },
    // 搜索formlabel长度
    searchLabelWidth: {
      type: Number,
      default: 90
    },
    // 搜索formlabel位置
    labelPosition: {
      type: String,
      default: "left"
    },
    searchOffset: {
      type: Number,
      default: 0
    },
    searchBtnWidth: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      // 原始表单值，重置时用
      formOrigin: {}
    };
  },
  methods: {
    searchList() {
      this.$emit("search-confirm");
    },
    resetSearch() {
      this.$emit("input", this.copyObj(this.formOrigin));
      this.$nextTick(() => {
        this.searchList();
      });
    }
  },
  created() {
    this.formOrigin = this.copyObj(this.value);
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.$emit("input", this.value);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.reset-btn {
  background-color: #313131;
  color: #fff;
}
</style>
