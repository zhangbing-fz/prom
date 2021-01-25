<comment>
# 合分弹窗
</comment>
<template>
    <div class="index">
        <global-header-admin/>
        <Row>
            <Col
                    :style="{
                            borderBottom: '1px solid #ddd',
                            backgroundColor: 'white'
                    }"
                    align="right"
                    span="24"
            >
                <Button
                        :style="{
                          margin: '10px'
                        }"
                        type="primary"
                        @click="cumulativeScore"
                >合分
                </Button>
            </Col>
        </Row>
        <Row style="padding: 10px;">

            <Col span="7">
                <div :style="{ marginRight:'10px',}">
                    <div
                            :style="{
                               display: 'flex',
                               justifyContent: 'space-between',
                               marginBottom: '8px'
                            }"
                    >
                        <h3>主观题</h3>
                        <Button
                                :size='btn_size'
                                style="margin-left: 10px"
                                type="success"
                                @click="exportData($event)"
                        >
                            <Icon type="ios-download-outline"/>
                            导出主观题数据
                        </Button>
                    </div>
                    <!-- 主观题 begin               :ischecked="subjective_data.checkedTable"-->
                    <global-table
                            v-if="subjective_data.rowKey"
                            ref="table"
                            :columnsTable="subjective_data.columnsDetails"
                            :dataTable="subjective_data.dataDetails"
                            :isHeight="subjective_data.columnsDetailsHeight"
                            :loading="subjective_data.loading"
                            :page_info="subjective_data.page_info"
                            :prop-row-key="subjective_data.rowKey"
                            @setEchartData="subjective_ids=$event"
                    />
                </div>

            </Col>
            <Col span="17">
                <div
                        :style="{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }"
                >
                    <h3>客观题</h3>
                    <div :style="{display: 'flex'}">
                        <excel1
                                :style="{
                                    width: '80px',
                                    overflow: 'hidden',
                                    position: 'absolute',
                                    zIndex: '99',
                                    top:0,
                                    left: 0,
                                    transformOrigin: 'left',
                                    transform: 'scaleX(1.2)',
                                    opacity: 0,
                                    cursor: 'pointer'
                                }"
                                @getResult="updateExcel"
                        />
                        <Upload
                                :on-error="uploadDemo"
                                :on-preview="uploadDemo"
                                :on-progress="uploadDemo"
                                :on-remove="uploadDemo"
                                :on-success="uploadDemo"
                                action="//jsonplaceholder.typicode.com/posts/"
                        >
                            <Button
                                    :size='btn_size'
                                    icon="ios-cloud-upload-outline">
                                上传文件
                            </Button>
                        </Upload>
                        <Button
                                :size='btn_size'
                                style="margin-left: 10px"
                                type="success"
                                @click="exportData($event)"
                        >
                            <Icon type="ios-download-outline"/>
                            导出客观题数据
                        </Button>
                    </div>
                </div>
                <!-- 客观题 begin             :ischecked="objective_data.checkedTable"-->
                <global-table
                        ref="table2"
                        :columnsTable="objective_data.columnsDetails"
                        :dataTable="objective_data.dataDetails"
                        :isHeight="objective_data.columnsDetailsHeight"
                        :loading="objective_data.loading"
                        :page_info="objective_data.page_info"
                        @setEchartData="objective_ids=$event"
                />
            </Col>
        </Row>
        <!-- 表格操作 -->
        <Modal
                :modalInfo="modalInfo"
                @changeMark="modalInfo.modal6=$event"
        />
        <!-- 合分 -->
        <Modal-cumu
                :modalInfo="modalCombinedInfo"
                @changeMark="changeMark"
        />
    </div>
</template>

<script>
import excel1 from './component/upload-excel'
import Modal from './component/popup'
import cumulativeModal from './component/cumulative-popup'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    excel1,
    Modal: Modal,
    'Modal-cumu': cumulativeModal
  },
  data () {
    return {
      modalInfo: {
        modal6: false, // 添加附加项弹窗开关,
        title: ''
      },
      modalCombinedInfo: {
        modal6: false, // 添加附加项弹窗开关,
        title: ''
      },
      subjective_ids: [], // 主观题ID
      objective_ids: [], // 客观题ID
      btn_size: 'small',
      // 主观题数据源信息
      subjective_data: {
        rowKey: '', // children row-key
        columnsDetails: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '题号类型',
            align: 'center',
            key: 'question_id',
            tree: true,
            render (h, params) {
              return h('span', {
                style: {
                  fontWeight: 'bold'
                }
              }, (params.row.sub_type || 0) + (params.row.question_id || params.row.sub_question_id))
            }
          },
          /*          {
                                title: '扩展策略',
                                key: 'extend_polices',
                                align: 'center',
                                sortable: true
                              }, */
          {
            title: '最高分',
            key: 'max_score',
            align: 'center'
            // sortable: true
          },
          {
            title: '最低分',
            key: 'min_score',
            align: 'center'
          },
          {
            title: '步长',
            key: 'step',
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.children ? '/' : params.row.step)
            }
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.subEditor(params.index, params.row)
                  }
                }
              }, '编辑')
            }
          }
          /*          {
                                title: '多个限制',
                                key: 'multi_limit',
                                align: 'center'
                              },
                              {
                                title: '多个分数',
                                key: 'multi_score',
                                align: 'center'
                              },
                              {
                                title: '多个管理员',
                                key: 'multi_to_leader',
                                align: 'center'
                              },
                              {
                                title: '多个内容',
                                key: 'multi_val',
                                align: 'center'
                              },
                              {
                                title: '队列限制',
                                key: 'queue_limit',
                                align: 'center'
                              },
                              {
                                title: '队列策略',
                                key: 'queue_policy',
                                align: 'center'
                              },
                              {
                                title: '自评',
                                key: 'self_rate',
                                align: 'center'
                              },
                              {
                                title: '自我阅读',
                                key: 'self_rate',
                                align: 'center'
                              },
                              {
                                title: '自我分数',
                                key: 'self_score',
                                align: 'center'
                              },
                              {
                                title: '自我是否管题组长',
                                key: 'self_to_leader',
                                align: 'center'
                              },
                              {
                                title: '自我内容',
                                key: 'self_val',
                                align: 'center'
                              },
                              {
                                title: '自我分数',
                                key: 'step',
                                align: 'center'
                              },
                              {
                                title: '总量',
                                key: 'totle_count',
                                align: 'center',
                                sortable: true
                              },
                              {
                                title: '阅卷人数',
                                key: 'scorer_count',
                                align: 'center',
                                sortable: true
                              },
                              {
                                title: '完成总量',
                                key: 'final_count',
                                align: 'center',
                                sortable: true
                              },
                              {
                                title: '单/双评',
                                key: 'multi_score',
                                align: 'center',
                                render (h, { row }) {
                                  // eslint-disable-next-line no-unused-vars
                                  let str
                                  // eslint-disable-next-line no-unused-vars
                                  let color
                                  if (row.multi_score) {
                                    str = '是'
                                    color = '#ed4014'
                                  } else {
                                    str = '否'
                                    color = 'gray'
                                  }
                                  return h('span', {
                                    style: {
                                      color
                                    }
                                  }, str)
                                },
                                sortable: true
                              },
                              {
                                title: '单/双评域值',
                                key: 'multi_val',
                                align: 'center',
                                sortable: true
                              },
                              {
                                title: '评次',
                                key: 'multi_limit',
                                align: 'center',
                                sortable: true
                              },
                              {
                                title: '转交题组长',
                                key: 'multi_to_leader',
                                align: 'center',
                                render (h, { row }) {
                                  // eslint-disable-next-line no-unused-vars
                                  let str
                                  // eslint-disable-next-line no-unused-vars
                                  let color
                                  if (row.multi_to_leader) {
                                    str = '是'
                                    color = '#ed4014'
                                  } else {
                                    str = '否'
                                    color = 'gray'
                                  }
                                  return h('span', {
                                    style: {
                                      color
                                    }
                                  }, str)
                                },
                                sortable: true
                              },
                              {
                                title: '自评',
                                key: 'self_score',
                                width: 100,
                                align: 'center',
                                render (h, { row }) {
                                  // eslint-disable-next-line no-unused-vars
                                  let str
                                  // eslint-disable-next-line no-unused-vars
                                  let color
                                  if (row.self_score) {
                                    str = '是'
                                    color = '#ed4014'
                                  } else {
                                    str = '否'
                                    color = 'gray'
                                  }
                                  return h('span', {
                                    style: {
                                      color
                                    }
                                  }, str)
                                },
                                sortable: true
                              },
                              {
                                title: '自评价域值',
                                key: 'self_val',
                                align: 'center',
                                sortable: true
                              },
                              {
                                title: '转交题组长',
                                key: 'self_to_leader',
                                align: 'center',
                                render (h, { row }) {
                                  // eslint-disable-next-line no-unused-vars
                                  let str
                                  // eslint-disable-next-line no-unused-vars
                                  let color
                                  if (row.self_to_leader) {
                                    str = '是'
                                    color = '#ed4014'
                                  } else {
                                    str = '否'
                                    color = 'gray'
                                  }
                                  return h('span', {
                                    style: {
                                      color
                                    }
                                  }, str)
                                },
                                sortable: true
                              },
                              {
                                title: '自评千分比',
                                key: 'self_rate',
                                align: 'center'
                              } */
        ],
        dataDetails: [],
        checkedTable: true,
        columnsDetailsHeight: window.innerHeight,
        loading: true,
        page_info: {}
      },
      // 客观观题数据源信息
      objective_data: {
        columnsDetails: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          /* {
                                title: '客观题阅卷人数',
                                key: 'c2',
                                align: 'center',
                                sortable: true,
                                render: (h, params) => {
                                  if (params.row.$isEdit) {
                                    return h('Input', {
                                      props: {
                                        autofocus: 'autofocus',
                                        type: 'text',
                                        value: params.row.c2
                                      },
                                      on: {
                                        'on-focus': (e) => {
                                          // 每次点击input的时候可以选中文本
                                          // this.editIndexText = params.row.name
                                          e.srcElement.select()
                                        },
                                        'on-blur': (e) => {
                                          const patrn = /^(-)?\d+(\.\d+)?$/
                                          if (patrn.test(event.target.value) || event.target.value === '') {
                                            params.row.c2 = parseInt(event.target.value) || 0
                                            this.$set(params.row, '$isEdit', false)
                                            this.getData('/scan_project/score_admin_api')
                                          } else {
                                            this.modal7 = true
                                            this.title = '提醒'
                                            this.titleContent = `"${event.target.value}" 不是有效数字!!!`
                                            // alert(event.target.value + '不是有效数字')
                                            params.row.$isEdit = false
                                          }
                                        },
                                        'on-keyup': (e) => {
                                          if (e.code === 'Enter') {
                                            const patrn = /^(-)?\d+(\.\d+)?$/
                                            if (patrn.test(event.target.value)) {
                                              params.row.c2 = parseInt(event.target.value)
                                              this.$set(params.row, '$isEdit', false)
                                            } else {
                                              this.modal7 = true
                                              this.title = '提醒'
                                              this.titleContent = `"${event.target.value}" 不是有效数字!!`
                                              // alert(event.target.value + '不是有效数字')
                                              params.row.$isEdit = false
                                            }
                                            // this.editIndex = -1
                                          }
                                        }

                                      }
                                    })
                                  } else {
                                    return h('div', {
                                      on: {
                                        click: () => {
                                          this.$set(params.row, '$isEdit', true)
                                        }
                                      }
                                    }, params.row.c2)
                                  }
                                }
                              }, */
          {
            title: '题号类型',
            key: 'question_id',
            align: 'center',
            render: (h, params) => {
              return h('span', {
                style: {
                  fontWeight: 'bold'
                }
              }, params.row.sub_type + params.row.question_id)
            }
          },
          {
            title: '选项',
            key: 'choices',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.choices.flat())
            }
          },
          {
            title: '正确项',
            key: 'correct_choices',
            align: 'center'
          },
          {
            title: '附加规则项',
            key: 'extend_polices',
            align: 'center',
            minWidth: 100,
            render: (h, params) => {
              const arr = params.row.extend_polices
              const newArr = []
              for (const value of arr) {
                newArr.push(h('div', [
                  h('span', `名称：${value.name} ｜`),
                  h('span', `标答：${value.correct_choices} ｜`),
                  h('span', `得分：${value.max_score}`)
                ]))
              }
              return h('div', newArr)
            }
          },
          {
            title: '附加规则开关',
            key: 'extend_police',
            align: 'center',
            render: (h, params) => {
              let str
              if (params.row.extend_police) {
                str = '开启'
              } else {
                str = '关闭'
              }
              return h('span', str)
            }
          },
          {
            title: '最高分',
            key: 'max_score',
            align: 'center'
          },
          {
            title: '最低分',
            key: 'min_score',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            width: 210,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editor(params.index, params.row)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index, params.row)
                    }
                  }
                }, '添加项'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index, params.row)
                    }
                  }
                }, '删除项')
              ])
            }
          }

        ],
        dataDetails: [],
        checkedTable: true,
        columnsDetailsHeight: window.innerHeight,
        loading: true,
        page_info: {}
      }
    }
  },
  props: {},
  watch: {
    examine_id: {
      handler () {
        this.getSubjectiveData() // 渲染主观题
        this.getObjectiveData() // 渲染客观题
      },
      deep: true
    }
  },
  methods: {
    readAsBinaryString (f, fun) {
      let binary = ''
      let wb
      let outdata
      console.log(fun)
      fun.onload = function (e) {
        const bytes = new Uint8Array(fun.result)
        for (let i = 0, len = bytes.length; i < len; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        // 接下来就是xlsx
        const XLSX = require('xlsx')
        wb = XLSX.read(binary, {
          type: 'binary'
        })
        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        console.log(outdata)
        // 自定义方法向父组件传递数据
        // console.log('outdata = ' + JSON.stringify(outdata))
      }
      fun.readAsArrayBuffer(f)
    },
    uploadDemo (res, file) {
      console.log(res, file)
      // const reader = new FileReader()
      // this.readAsBinaryString(file, reader)
    },
    // 导入表格--start
    updateExcel (val) {
      this.objective_data.dataDetails = []
      console.log(val) // 打印出的为导入Excel表格的json数据
      val.forEach(item => {
        console.log(item)
        this.objective_data.dataDetails.push(
          {
            c1: Object.values(item)[0],
            c2: Object.values(item)[1],
            c3: Object.values(item)[2],
            c4: Object.values(item)[3]
          }
        )
        // for (const valElment of Object.values(item)) {
        //   console.log(valElment)
        // }
      })
    },
    // 导入表格--end

    exportData (e) {
      if (e.target.innerText.trim() === '导出主观题数据') {
        this.$refs.table.exportData(this.subjective_data.columnsDetails, this.subjective_data.dataDetails)
      } else if (e.target.innerText.trim() === '导出客观题数据') {
        this.$refs.table2.exportData(this.objective_data.columnsDetails, this.objective_data.dataDetails)
      }
    },
    // 导入失败
    handleFormatError (file) {
      console.log(file)
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
      })
    },
    // 导入成功
    handleSuccess (res, file) {
      console.log(res, file)
      if (res.errcode === 0) {
        this.dialoLead = false
        this.$Message.success('数据导入成功！')
        this._getBookList()
        this.$refs.upload.clearFiles()
      }
    },
    handleError (error, file) {
      console.log(error, file)
      this.$Message.error('数据导入失败！')
    },
    // 获取主观题接口
    getSubjectiveData () {
      this.subjective_data.loading = true
      const data = {
        entry: 'score_api',
        service_name: 'query_score_questions',
        id: this.examine_id
      }
      this.getData('/scan_project/score_admin_api', data).then(res => {
        console.log(res)
        this.subjective_data.dataDetails = res.result_info
        this.subjective_data.loading = false
        for (let i = 0; i < res.result_info.length; i++) {
          if (res.result_info[i].childs.length > 0) {
            // console.log(this.subjective_data.dataDetails[i], i)
            this.subjective_data.dataDetails[i].children = Array.of()
            this.$nextTick(() => {
              this.subjective_data.dataDetails[i].children = res.result_info[i].childs
              this.subjective_data.rowKey = 'id'
            })
          }

          // console.log(res.result_info[i].childs)
        }
        console.log(this.subjective_data.dataDetails)
      })
    },
    // 获取客观题接口
    getObjectiveData () {
      this.objective_data.loading = true
      const data = {
        entry: 'score_api',
        service_name: 'query_choice_questions',
        id: this.examine_id
      }
      this.getData('/scan_project/score_admin_api', data).then(res => {
        console.log(res)
        this.objective_data.dataDetails = res.result_info
        this.objective_data.loading = false
      })
    },
    // 主观题基础配置
    subEditor (index, data) {
      console.log(data)
      this.modalInfo = {
        modal6: true,
        title: '主观题基础配置',
        content: data
      }
    },
    // 客观题基础配置
    editor (index, data) {
      this.modalInfo = {
        modal6: true,
        title: '客观题基础配置',
        content: data
      }
    },
    // 视图
    show (index, data) {
      this.modalInfo = {
        modal6: true,
        title: '添加附加规则',
        content: data
      }
    },
    // 删除
    remove (index, data) {
      if (!data.extend_polices.length) {
        this.$Message.warning('当前内容为空！')
        return
      }
      this.modalInfo = {
        modal6: true,
        title: '删除附加规则',
        content: data
      }
    },
    changeMark (e) {
      console.log(e)
      // this.modalCombinedInfo.modal6 = e
    },

    // 合分
    cumulativeScore () {
      const arr = []
      // 主观题
      // console.log(this.subjective_ids)
      for (const value of Object.values(this.subjective_ids)) {
        arr.push(value.id)
      }
      // 客观题
      for (const value of Object.values(this.objective_ids)) {
        arr.push(value.id)
      }
      if (arr.length <= 0) {
        this.$Modal.warning({
          title: '提醒',
          content: '请选择合分试题'
        })
        return
      }
      const data = {
        entry: 'score_api',
        id: this.examine_id,
        question_ids: arr,
        pre_check: true,
        service_name: 'merge_score'
      }
      this.getData('/scan_project/score_admin_api', data).then(res => {
        console.log(res)
        this.modalCombinedInfo = {
          modal6: true,
          title: '合分预处理',
          content: res.result_info,
          data
        }
      })
    }
  },
  computed: {
    ...mapState({
      examine_id: state => state.login_info.examineID // 考试ID
    })
  },
  created () {
  },
  mounted () {
    this.getSubjectiveData() // 渲染主观题
    this.getObjectiveData() // 渲染客观题
  },
  destroyed () {
  }
}
</script>

<style scoped>
h3 {
    padding-left: 10px;
    /*border: 1px solid #ddd;*/
    /*border-radius: 5px 5px 0 0;*/
    /*border-bottom-width: 0;*/
    /*padding: 10px;*/
}

h3::before {
    content: '';
    display: block;
    width: 3px;
    height: 25px;
    position: absolute;
    left: 0;
    background-color: #2ac26b;
}
</style>
