<comment>
# 任务监督弹窗
</comment>
<template>
    <div class="popup-supervise">
        <Modal
                v-model="modal11"
                :title="title"
                fullscreen
                @on-cancel="$emit('change', modal11)"
                @on-ok="$emit('change', modal11)"
        >
            <div>
                <div
                        v-if="title=== '任务监督'"
                        style="line-height: 42px">
                    <Checkbox v-model="single">仅显示剩余量大于0的教师</Checkbox>
                </div>
                <global-table
                        :columnsTable="columnsTable"
                        :dataTable="newData_Table"
                        :loading="loading"
                        :page_info="page_info"
                />
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'popup-supervise',
  components: {},
  data () {
    return {
      loading: true,
      single: false, // 仅显示剩余量大于0的教师
      modal11: this.modal, // 任务监督
      columns_Table: this.columnsTable,
      data_Table: this.dataTable,
      page_info: {}
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    modal: {
      type: Boolean
    },
    dataTable: {
      type: Array,
      required: true
    },
    columnsTable: {
      type: Array,
      default: () => {
        return [
          {
            title: '学科',
            key: 'discipline',
            sortable: true
          },
          {
            title: '试题',
            key: 'questions',
            sortable: true
          },
          {
            title: '用户ID',
            key: 'UserID',
            sortable: true
          },
          {
            title: '姓名',
            key: 'UserName',
            sortable: true
          },
          {
            title: '学校',
            key: 'school',
            sortable: true
          },
          {
            title: '电话',
            key: 'phone',
            sortable: true
          },
          {
            title: '完成量',
            key: 'MarkCount',
            sortable: true
          },
          {
            title: '时长（分）',
            key: 'TaskNumber',
            sortable: true
          },
          {
            title: '线上',
            key: 'OnLine',
            sortable: true
          }
        ]
      }
    }
  },
  watch: {
    modal: {
      handler (val) {
        this.modal11 = val
      },
      deep: true
    }
  },
  methods: {},
  computed: {
    newData_Table () {
      const data = this.dataTable
      // console.log(data)
      return data
    }
  },
  created () {
  },
  mounted () {
    this.loading = false
  },
  destroyed () {
  }
}
</script>

<style scoped>
</style>
