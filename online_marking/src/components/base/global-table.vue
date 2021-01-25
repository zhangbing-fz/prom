<comment>
# 表格 / 表格详情 / 内容
</comment>
<template>
  <div class="global-table">
    <Table
        :row-key="propRowKey"
        :ref="ischeckedname"
        :columns="columns5"
        :data="data5"
        :height="isHeight"
        :loading="loading"
        :span-method="spanMethod"
        border
        highlight-row
        stripe
        @on-selection-change="$emit('setEchartData',$event, selectionData=$event)"
        @on-cell-click="$emit('modifytable', $event)"
        @on-row-click.capture="$emit('onSelect', $event)"
    />

    <!-- 分页组件 -->
    <div v-show="page_info.total"
         class="global-footer">
      <!--pagePropsMixin['page-size']"-->
      <!-- 超过每页最大条数时，显示分页 -->
      <Page
          v-show="isshow"
          v-bind="pagePropsMixin"
          @on-change="pageChange"
          @on-page-size-change="pageSwitch"
      />
    </div>
  </div>
</template>

<script>
import { export2Excel } from '../../common/js/util'

export default {
  name: 'global-table',
  components: {},
  data () {
    return {
      selectionData: [], // 选中的数据
      columns5: this.columnsTable,
      data5: this.dataTable,
      current: 0
    }
  },
  props: {
    propRowKey: {
      type: String,
      required: false
    },
    loading: {
      type: Boolean,
      required: true
    },
    isHeight: {
      type: Number
    },
    columnsTable: {
      type: Array,
      required: true
    },
    dataTable: {
      type: Array,
      required: true
    },
    ischecked: {
      type: Boolean,
      default: false
    },
    ischeckedname: {
      type: String,
      default: () => {
        return 'table'
      }
    },
    isshow: { // 是否显示分页
      type: Boolean,
      default: true
    },
    page_info: { // 分页信息
      type: Object
    },
    spanMethod: {}
  },
  watch: {
    dataTable: {
      handler (val) {
        this.data5 = val
        this.setElelctChecked()
      },
      deep: true
    },
    columnsTable: {
      handler (val) {
        this.columns5 = val
      },
      deep: true
    }
  },
  methods: {
    // 设置表格是否选中/状态
    setElelctChecked () {
      // console.log(Boolean(this.ischeckedname), '全选')
      if (this.ischeckedname && this.$refs[`${this.ischeckedname}`]) { // 监听默认是否全部选中
        setTimeout(() => {
          this.$emit('setEchartData', this.dataTable)
          console.log(this.$refs[`${this.ischeckedname}`], this.ischecked)
          this.$refs[`${this.ischeckedname}`].selectAll(this.ischecked) // 默认全选
        }, 2000)
      }
    },
    // 切换页码
    pageChange (val) {
      // console.log(val, '切换页码')
      this.$emit('input', { num: val })
      this.getList()
    },
    // 每页显示数量切换
    pageSwitch (val) {
      // console.log(val, '每页显示数量切换')
      this.$emit('input', { size: val })
    },
    getList () {
      this.start()
      setTimeout(() => {
        this.finish()
      }, 1000)
    },
    start () {
      this.$Loading.start()
    },
    finish () {
      this.$Loading.finish()
    },
    // 比较对象是否相等的方法
    compareObject (obj1, obj2) {
      // Object.getOwnPropertyNames():方法返回一个指定对象所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
      // 对象内置属性方法:Object.keys()；该方法返回一个数组，数组内包括对象内可枚举属性以及方法名称。数组中属性名的排列顺序和使用 for...in 遍历该对象时返回的顺序一致。
      const attrs1 = Object.keys(obj1)
      const attrs2 = Object.keys(obj2)
      if (attrs1.length !== attrs2.length) {
        return false
      }
      for (let j = 0; j < attrs1.length; j++) {
        const attrNames = attrs1[j]
        if (obj1[attrNames] !== obj2[attrNames]) {
          return false
        }
      }
      return true
    },
    // 导出表格数据
    exportData (columns, data) {
      console.log(export2Excel)
      // export2Excel(columns, data)
      this.$refs[this.ischeckedname].exportCsv(
        {
          filename: '自定义文件名',
          columns: columns,
          data: data.filter((data, index) => {
            // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元//素。
            for (let i = 0; i < this.selectionData.length; i++) {
              // 比较对象是否相等
              if (this.compareObject(data, (this.selectionData)[i])) {
                console.log('Burning Test' + i)
                return true
              }
            }
          })
        }
      )
    }
  },
  computed: {
    pagePropsMixin () {
      return {
        'show-total': true, // 显示总数
        'show-sizer': true, // 显示分页
        'show-elevator': true, // 显示电梯
        placement: 'top', // 切换条数窗口展开方向
        total: this.page_info.total, // 总条数
        'page-size': this.page_info.page_size || 15, // 每页条数
        'page-size-opts': [15, 30, 45, 60], // 切换条数配置
        current: this.page_info.page_num // 当前页码
      }
    }
  },
  created () {
  },
  mounted () {
    this.setElelctChecked()
  },
  destroyed () {
  }
}
</script>

<style scoped>
.global-footer {
    padding: 20px 0;
}
</style>
