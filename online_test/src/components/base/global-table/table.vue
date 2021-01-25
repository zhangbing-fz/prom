<template>
    <div class="table">
        <Table
                :columns="columns7"
                :data="data6"
                :loading="false"
                :width="width"
                :height="height"
                @on-selection-change="change"
                :border="border"
                no-data-text
                size="default"
                stripe
        />
        <Page
                v-show="isshow"
                v-bind="pagePropsMixin"
        />
        <!--@on-change="pageChange"
        @on-page-size-change="pageSwitch"-->
    </div>
</template>
<script>
export default {
  data () {
    return {
      pagePropsMixin: {
        'show-total': true, // 显示总数
        'show-sizer': true, // 显示分页
        'show-elevator': true, // 显示电梯
        placement: 'top', // 切换条数窗口展开方向
        total: 100, // 总条数
        'page-size-opts': [10, 20, 30, 40], // 切换条数配置
        'page-size': 10, // 每页条数
        current: 1 // 当前页码，支持 .sync
      },
      columns7: this.columns,
      data6: this.data
    }
  },
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    border: {
      type: Boolean,
      default: true
    },
    isshow: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  components: {},
  methods: {
    change () {

    },
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    }
  }
}
</script>
