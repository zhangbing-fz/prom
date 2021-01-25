<comment>
# 学生管理列表
</comment>
<template>
  <div class="index">
    <global-header-admin/>
    <global-search
        v-if="seatch_data"
        :seatch_data="seatch_data"
        @change="getClassData"
    />
    <global-table
        :columnsTable="columnsStudent"
        :dataTable="dataStudent"
        :isHeight="columnsAcademicHeight"
        :ischecked="checkedTable"
        :loading="loading"
        :page_info="page_info"
        ischeckedname='academic_progress'
        @onSelect="onSelect"
        @input="page_info.current=$event.num"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: {},
  data () {
    return {
      search: null, // 搜索条件
      seatch_data: {
        input: [ // 搜索列表
          {
            title: '姓名',
            placeholder: '请输入姓名',
            key: 'name'
          },
          {
            title: '学号',
            placeholder: '请输入学号',
            key: 'id_num'
          }
        ],
        select: []
      },
      columnsStudent: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '是否交卷',
          key: 'ready',
          align: 'center',
          render: (h, params) => {
            const str = params.row.ready ? '已扫描' : '未扫描'
            const color = params.row.ready ? 'green' : 'blue'
            return h('span', {
              style: {
                color
              }
            }, str)
          }
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '班级',
          key: 'class_name',
          align: 'center'
        },
        {
          title: '编号',
          key: 'id_num',
          align: 'center'
        }
      ],
      dataStudent: [],
      checkedTable: true, // 默认表格是否选中
      loading: true,
      columnsAcademicHeight: 0,
      page_info: { // 分页信息
        total: 0,
        current: 1
      }
    }
  },
  props: {},
  watch: {
    'page_info.current': {
      handler (val) {
        console.log(val)
        this.getClassData()
      },
      deep: true
    }
  },
  methods: {
    onSelect (val) {

    },
    // 获取考试班级列表
    getStudentData () {
      const data = {
        entry: 'score_admin_api',
        service_name: 'query_exam_classes',
        id: this.examineID
      }
      this.getData('/scan_project/score_admin_api', data).then(res => {
        // console.log(res)
        res.result_info.forEach(item => {
          this.seatch_data.select.push({
            title: '学段',
            key: 'class_id',
            list: [
              {
                grade_name: item.grade_name,
                class_id: item.id,
                name: item.name
              }
            ]

          })
        })
        this.validation(res)
        this.loading = false
      })
    },
    // 获取花名册列表
    getClassData (search) {
      console.log(search)
      let data
      if (search) {
        data = {
          entry: 'score_admin_api',
          service_name: 'query_exam_students',
          id: this.examineID,
          name: search.name,
          id_num: search.id_num,
          class_id: search.class_id,
          page_num: this.page_info.current,
          page_size: 15
        }
      } else {
        data = {
          entry: 'score_admin_api',
          service_name: 'query_exam_students',
          id: this.examineID,
          // name: '周',
          // id_num: '',
          // class_id: 56,
          page_num: this.page_info.current,
          page_size: 15
        }
      }

      this.getData('/scan_project/score_admin_api', data).then(res => {
        console.log(res)
        this.validation(res)
        this.dataStudent = res.result_info.table_data // 添加表格数据
        this.page_info.total = res.result_info.totle
      })
    }
  },
  computed: {
    ...mapState({
      examineID: state => state.login_info.examineID // 考试id

    })
  },
  created () {
  },
  mounted () {
    this.getStudentData() // 初始化数据
    this.getClassData()
  },
  destroyed () {
  }
}
</script>

<style scoped>
</style>
