<comment>
# 人员 / 评卷员 / 题组长
</comment>
<template>
    <div class="paper-personnel-content">
        <global-header-admin/>
        <div style="text-align: left; padding-top: 20px">
            <Form
                    :label-width="80"
                    :model="formItem" inline
            >
                <FormItem label="姓名：">
                    <Input
                            v-model="formItem.name"
                            placeholder="请输入姓名"/>
                </FormItem>
                <FormItem label="手机：">
                    <Input
                            v-model="formItem.phone"
                            placeholder="请输入手机"/>
                </FormItem>
                <FormItem label="工号：">
                    <Input
                            v-model="formItem.id_num"
                            placeholder="请输入ID"/>
                </FormItem>
                <FormItem>
                    <Button
                            type="primary"
                            @click="setFormItem"
                    >搜索
                    </Button>
                </FormItem>
            </Form>
        </div>
        <div style="position: absolute; right: 10px; top:70px; z-index: 99">
            <Button
                    icon="ios-book"
                    type="primary"
                    @click="getTableList"
            >
                {{ changeValue ? changeValue : '试题分配' | changeValueFilter }}
            </Button>
        </div>
        <!-- 默认显示的表格 -->
        <div v-show="currentTable">
            <Tabs
                    class="tabs"
                    type="card"
                    value="scorer"
                    @on-click="getTableData"
            >
                <TabPane
                        icon="ios-person"
                        label="科目组长"
                        name="admin"
                >
                    <global-table
                            :columnsTable="columnsTable_admin"
                            :dataTable="dataTable_admin"
                            :loading="loading"
                            :page_info="page_info"
                            @input="getPageInfo('admin',$event)"
                    />
                </TabPane>
                <TabPane
                        icon="md-people"
                        label="评卷员"
                        name="scorer"
                        style="position:relative;"
                >
                    <div :style="{
              position: 'absolute',
              zIndex: 99,
              display: 'flex',
              right: 0,
              top: '-31px'
            }">
                        <Button
                                icon="ios-download-outline"
                                size="small"
                                style="margin-right: 10px"
                                type="info"
                                @click="getExportTemplate"
                        >导出模板
                        </Button>
                        <Button
                                icon="ios-download-outline"
                                size="small"
                                style="margin-right: 10px"
                                type="info"
                                @click="getExportPerson"
                        >导出人员
                        </Button>
                        <Button
                                icon="ios-cloud-upload-outline"
                                size="small"
                                style="margin-right: 10px"
                                type="success"
                                @click="setImportPerson"
                        >导入人员
                        </Button>
                    </div>

                    <global-table
                            :columnsTable="columnsTable_evaluation"
                            :dataTable="dataTable_evaluation"
                            :loading="loading"
                            :page_info="page_info"
                            @input="getPageInfo('scorer',$event)"
                    />
                </TabPane>
            </Tabs>
        </div>

        <!-- 选择分配试题显示的表格 -->
        <!--        <div><Button type="info"><Icon type="ios-add-circle-outline" />新增</Button></div>-->
        <global-table
                v-show="!currentTable"
                :columnsTable="columnsTable_current"
                :dataTable="dataTable_current"
                :loading="loading"
                :page_info="page_info"
                @input="getPageInfo('all',$event)"
        />

        <!-- 选择题号弹窗 / 请选择题目 -->
        <modal-quality
                :list="newQuestionsList"
                :loading="loading"
                :modal="modal6"
                @asyncCancel="asyncCancel"
                @asyncOK="asyncOK"
        />

        <!-- 发送通知弹窗 -->
        <modal-error
                :loading="loading"
                :modal="modal7"
                :title=title
                :titleContent=titleContent
                @asyncCancel="modal7=false"
                @asyncOK="asynNoticecOK"
        />
        <!-- 导入 -->
        <modal-import
                :prop-modal="modal1"
                :prop-title="fileName"
                :prop-upload-data="uploadData"
                @onCancel="modal1=$event"
                @onOk="modal1=$event"
        />

        <!-- 导出 -->
        <modal-export
                :prop-modal="modal2"
                :prop-title="fileName"
                :prop-upload-data="uploadData"
                @onCancel="modal2=$event"
                @onOk="modal2=$event"/>
    </div>
</template>

<script>
import quality from '../../components/popup/paper-quality-content/base-popup-quality.vue'
import error from '../../components/popup/base-popup-error'
import { mapMutations } from 'vuex'
import popupExport from '@/views/personnel/component/popup-export'
import popupImport from '@/views/personnel/component/popup-import'

export default {
  name: 'paper-personnel-content',
  components: {
    'modal-quality': quality,
    'modal-error': error,
    'modal-export': popupExport,
    'modal-import': popupImport
  },
  filters: {
    changeValueFilter (val) {
      if (val !== '试题分配') {
        return '题号' + val
      } else {
        return val
      }
    }
  },
  data () {
    const _this = this
    return {
      modal1: false,
      modal2: false,
      fileName: '', // 导入导出框名称
      uploadData: {}, // 入参
      formItem: {
        name: '', // 姓名
        phone: '', // 手机
        id_num: '' // ID
      }, // 表单查询条件
      modal7: false, // 选择试题报错弹框
      title: '', // 选择试题报错弹框标题
      titleContent: '', // 选择试题报错弹框内容
      columnsTable_admin: [], // 科组长表头
      dataTable_admin: [], // 科组长
      admin_size: 15,
      admin_num: 1,
      page_info: { // 分页信息
        total: 0,
        page_num: 1,
        page_size: 15
      },
      columnsTable_evaluation: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left',
          sortable: true
        },
        {
          title: '工号',
          key: 'id_num',
          width: 100,
          align: 'center',
          fixed: 'left',
          sortable: true
        },
        {
          title: '用户名',
          key: 'name',
          width: 100,
          align: 'center',
          fixed: 'left',
          sortable: true
        },
        {
          title: '手机号码',
          key: 'phone',
          width: 200,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '评卷员',
          key: 'scorer_role',
          width: 100,
          align: 'center',
          render (h, { row }) {
            console.log(row.scorer_role)
            return h('Checkbox', { props: { value: Object.values(row.scorer_role)[0] } })
          },
          fixed: 'left',
          sortable: true
        }
      ], // 评卷员表头
      // evaluation_size: 20,
      // evaluation_num: 1,
      dataTable_evaluation: [],
      // leader_size: 20,
      // leader_num: 1,
      columnsTable_current: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          sortable: true
        },
        {
          title: '工号',
          key: 'id_num',
          width: 150,
          align: 'center',
          sortable: true
        },
        {
          title: '用户名',
          key: 'name',
          align: 'center',
          sortable: true
        },
        {
          title: '手机号码',
          key: 'phone',
          align: 'center',
          sortable: true
        },
        {
          title: '联合体',
          key: 'CheckMode',
          align: 'center',
          sortable: true
        },
        {
          title: '小科目',
          key: 'MarkCat',
          align: 'center',
          sortable: true
        },
        {
          title: '学校组别',
          key: 'SchoolName',
          align: 'center',
          render: (h, params) => {
            if (params.row.$isEdits) {
              return h('Input', {
                style: {
                  display: 'block'
                },
                props: {
                  autofocus: 'autofocus',
                  type: 'text',
                  value: 12
                  // value: params.row.SchoolName
                },

                on: {
                  'on-focus': (e) => {
                    e.srcElement.select()
                  },
                  'on-blur': event => {
                    params.row.SchoolName = parseInt(event.target.value)
                    this.$set(params.row, '$isEdits', false)
                  }

                }
              })
            } else {
              return h('div', {
                style: {
                  width: '100%',
                  display: 'block'
                },
                on: {
                  click: () => {
                    this.$set(params.row, '$isEdits', true)
                  }
                }
              }, params.row.SchoolName)
            }
          },
          sortable: true
        },
        {
          title: '任务量',
          key: 'TaskNumber',
          align: 'center',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('Input', {
                props: {
                  autofocus: 'autofocus',
                  type: 'text',
                  value: params.row.TaskNumber
                },
                on: {
                  'on-focus': (e) => {
                    // 每次点击input的时候可以选中文本
                    console.log(e, '事件状态 on-focus')
                    // this.editIndexText = params.row.name
                    e.srcElement.select()
                  },
                  'on-blur': (e) => {
                    console.log(e, '事件状态 on-blur')
                    const patrn = /^(-)?\d+(\.\d+)?$/
                    if (patrn.test(event.target.value) || event.target.value === '') {
                      params.row.TaskNumber = parseInt(event.target.value) || 0
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
                        params.row.TaskNumber = parseInt(event.target.value)
                        this.$set(params.row, '$isEdit', false)
                      } else {
                        this.modal7 = true
                        this.title = '提醒'
                        this.titleContent = `"${event.target.value}" 不是有效数字!!`
                        // alert(event.target.value + '不是有效数字')
                        params.row.$isEdit = false
                      }
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
              }, params.row.TaskNumber)
            }
          },
          sortable: true
        },
        {
          title: '用户权限',
          key: 'UserRight',
          align: 'center'
        },
        {
          title: '统计',
          key: 'statistics_role',
          align: 'center',
          render (h, { row }) {
            const name = _this.$store.state.manage_info.question_title
            // console.log(row)
            return h('Checkbox', {
              props: {
                value: row.is_admin // 是否可以查看统计 row.scorer_role[name].statistics_role
              },
              on: {
                'on-change': (e) => {
                  const data = {
                    entry: 'score_admin_api',
                    service_name: 'edit_teacher',
                    id: JSON.parse(localStorage.getItem('login_info')).id / 1, // 考试列表id
                    role: {
                      id: row.id,
                      name: 'scorer_role',
                      is_admin: e,
                      scorer_role: {
                        [name]: {
                          enable: e,
                          count_min: null,
                          count_max: null,
                          statistics_role: e
                        }
                      }
                    }
                  }
                  _this.getData('/scan_project/score_admin_api', data)
                    .then(res => {
                      console.log(res)
                    })
                }
              }
            })
          },
          sortable: true
        },
        {
          title: '修改权限',
          key: 'ModifyRight',
          align: 'center',
          render (h, { row }) {
            return h('Checkbox', {
              props: {
                value: !!row.ModifyRight
              }
            })
          }
        }
      ], // 选择试题后的表头
      dataTable_current: [],
      changeValue: '', // 当前题号
      currentTable: true, // 默认显示的表格
      loading: true,
      modal6: false, // 请选择题目弹窗
      newQuestionsList: [] // 选择题目的列表
    }
  },
  props: {},
  watch: {},
  methods: {
    ...mapMutations(['SET_QUESTION_TITLE']),
    /**
         * @功能: setFormItem
         * @date: 2020/9/8 11:30
         * @description: 筛选条件
         * @param {paper-personnel-content.vue}
         * @return:
         */
    setFormItem () {
      console.log(this.formItem)
      if (this.currentTable) {
        this.getTableData(JSON.parse(localStorage.getItem('setFormItem')))
      } else {
        this.loading = true
        // console.log(val.name)
        const id = JSON.parse(localStorage.getItem('login_info')).id / 1
        const data = {
          entry: 'score_admin_api',
          service_name: 'query_teacher',
          id,
          role: 'all',
          page_num: this.admin_num,
          page_size: this.admin_size,
          name: this.formItem.name || '',
          phone: this.formItem.phone || '',
          id_num: this.formItem.id_num || ''
        }
        this.getData('/scan_project/score_admin_api', data).then(res => {
          console.log(res)
          for (const value of res.result_info.teachers) {
            this.$set(value, 'TaskNumber', 0)
            this.$set(value, 'UserRight', '评卷员')
          }
          this.loading = false
          this.dataTable_current = res.result_info.teachers
        })
        this.currentTable = false
      }
    },
    asynNoticecOK () {
      // console.log(arguments)
      this.modal7 = false
    },
    // 分页
    getPageInfo (type, val) {
      const pageNum = val.num
      const pageSize = val.size
      // console.log(type, pageNum, pageSize)
      if (type) {
        this.getTableData(type, pageNum, pageSize)
      } // 翻页
    },
    /**
         *
         *
         * @date: 2020/12/4 09:05
         * @description: 获取表格数据
         * @param {*} type
         * @param {*} num
         * @param {*} size
         * @returns
         * @memberof No such property: code for class: Script1
         */
    getTableData (type, num, size) {
      // console.log(type, num, size)
      const that = this
      localStorage.setItem('setFormItem', JSON.stringify(type))
      const id = JSON.parse(localStorage.getItem('login_info')).id / 1
      this.loading = true
      // eslint-disable-next-line no-unused-vars
      const data = {
        entry: 'score_admin_api',
        service_name: 'query_teacher',
        id,
        role: type,
        page_num: num || 1,
        page_size: size || 15,
        name: this.formItem.name || '',
        phone: this.formItem.phone || '',
        id_num: this.formItem.id_num || ''
      }
      // console.log(num, size, '分页信息')
      this.page_info.page_num = num
      this.page_info.page_size = size
      this.getData('/scan_project/score_admin_api', data)
        .then(data => {
          this.validation(data)
          this.page_info.total = data.result_info.totle
          switch (type) {
            case 'admin': // 科组长
              // eslint-disable-next-line no-case-declarations
              const table1 = [
                {
                  type: 'selection',
                  width: 60,
                  align: 'center',
                  fixed: 'left'
                },
                {
                  title: '工号',
                  key: 'id_num',
                  width: 150,
                  align: 'center',
                  fixed: 'left'
                },
                {
                  title: '用户名',
                  key: 'name',
                  width: 100,
                  align: 'center',
                  fixed: 'left'
                },
                {
                  title: '手机号码',
                  key: 'phone',
                  width: 200,
                  align: 'center',
                  fixed: 'left'
                },
                {
                  title: '科目组长',
                  key: 'is_admin',
                  width: 100,
                  align: 'center',
                  render (h, params) {
                    const { row } = params
                    const id = JSON.parse(localStorage.getItem('login_info')).id / 1
                    return h(
                      'Checkbox',
                      {
                        props: { value: row.is_admin },
                        on: {
                          'on-change': (e) => {
                            console.log(params)
                            row.is_admin = e
                            console.log(id, '请求修改权限接口')
                            // eslint-disable-next-line no-unused-vars
                            const data = {
                              entry: 'score_admin_api',
                              service_name: 'edit_teacher',
                              id, // 考试列表id
                              // role: 'all'
                              role: {
                                id: row.id,
                                name: 'is_admin',
                                is_admin: e
                              }
                            }
                            that.getData('/scan_project/score_admin_api', data).then(res => {
                              console.log(data)
                              console.log(res)
                            })
                          }
                        }
                      }
                    )
                  },
                  fixed: 'left'
                }
              ]
              this.setTraverse(data, 'columnsTable_admin', 'dataTable_admin', table1, 'is_admin')
              break
            case 'scorer':// 阅卷员
              // eslint-disable-next-line no-case-declarations
              const table3 = [
                {
                  type: 'selection',
                  width: 60,
                  align: 'center',
                  fixed: 'left'
                },
                {
                  title: '工号',
                  key: 'id_num',
                  width: 100,
                  align: 'center',
                  fixed: 'left'
                },
                {
                  title: '用户名',
                  key: 'name',
                  width: 100,
                  align: 'center',
                  fixed: 'left'
                },
                {
                  title: '手机号码',
                  key: 'phone',
                  width: 200,
                  align: 'center',
                  fixed: 'left'
                }
              ]
              this.setTraverse(data, 'columnsTable_evaluation', 'dataTable_evaluation', table3, 'scorer_role')
              break
            default:
              // eslint-disable-next-line no-case-declarations
              const _this = this
              // eslint-disable-next-line no-case-declarations
              const table4 = [
                {
                  type: 'selection',
                  width: 60,
                  align: 'center'
                },
                {
                  title: '工号',
                  key: 'id_num',
                  width: 150,
                  align: 'center'
                },
                {
                  title: '用户名',
                  key: 'name',
                  align: 'center'
                },
                {
                  title: '手机',
                  key: 'phone',
                  align: 'center'
                },
                {
                  title: '联合体',
                  key: 'CheckMode',
                  align: 'center'
                },
                {
                  title: '小科目',
                  key: 'MarkCat',
                  align: 'center'
                },
                {
                  title: '学校组别',
                  key: 'SchoolName',
                  align: 'center',
                  render: (h, params) => {
                    if (params.row.$isEdits) {
                      return h('Input', {
                        props: {
                          type: 'text',
                          value: params.row.SchoolName
                        },

                        on: {
                          'on-blur': event => {
                            params.row.SchoolName = parseInt(event.target.value)
                            this.$set(params.row, '$isEdits', false)
                          }

                        }
                      })
                    } else {
                      return h('div', {
                        style: {
                          width: '100px'
                        },
                        on: {
                          click: () => {
                            alert(1234)
                            this.$set(params.row, '$isEdits', true)
                          }
                        }
                      }, params.row.SchoolName)
                    }
                  }
                },
                {
                  title: '任务量',
                  key: 'TaskNumber',
                  align: 'center',
                  render: (h, params) => {
                    if (params.row.$isEdit) {
                      return h('Input', {
                        props: {
                          autofocus: 'autofocus',
                          type: 'text',
                          value: params.row.TaskNumber
                        },
                        on: {
                          'on-focus': (e) => { // 每次点击input的时候可以选中文本
                            console.log(e, 'on-focus')
                            // this.editIndexText = params.row.name
                            e.srcElement.select()
                          },
                          'on-blur': (e) => {
                            console.log(e, 'on-blur')

                            const patrn = /^(-)?\d+(\.\d+)?$/
                            if (patrn.test(event.target.value)) {
                              params.row.TaskNumber = parseInt(event.target.value)
                              this.$set(params.row, '$isEdit', false)
                            } else {
                              this.modal7 = true
                              this.title = '提醒'
                              this.titleContent = `"${event.target.value}" 不是有效数字!!`
                              // alert(event.target.value + '不是有效数字')
                            }
                          },
                          'on-keyup': (e) => {
                            if (e.code === 'Enter') {
                              const patrn = /^(-)?\d+(\.\d+)?$/
                              if (patrn.test(event.target.value)) {
                                params.row.TaskNumber = parseInt(event.target.value)
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
                      }, params.row.TaskNumber)
                    }
                  }
                },
                {
                  title: '用户权限',
                  key: 'UserRight',
                  align: 'center'
                },
                {
                  title: '统计',
                  key: 'statistics_role',
                  align: 'center',
                  render (h, { row }) {
                    console.log(row)
                    const name = _this.$store.state.manage_info.question_title
                    // console.log(row.scorer_role[name].statistics_role, '最终字段待确定')
                    return h('Checkbox', {
                      props: {
                        value: row.scorer_role[name].statistics_role
                      },
                      on: {
                        'on-change': (e) => {
                          const data = {
                            entry: 'score_admin_api',
                            service_name: 'edit_teacher',
                            id: JSON.parse(localStorage.getItem('login_info')).id / 1, // 考试列表id
                            role: {
                              id: row.id,
                              name: 'scorer_role',
                              is_admin: e,
                              scorer_role: {
                                [name]: {
                                  enable: e,
                                  statistics_role: e
                                }
                              }
                            }
                          }
                          // console.log(data)
                          _this.getData('/scan_project/score_admin_api', data)
                            .then(res => {
                              console.log(res)
                            })
                        }
                      }
                    })
                  },
                  sortable: true
                },
                {
                  title: '修改权限',
                  key: 'ModifyRight',
                  align: 'center',
                  render (h, { row }) {
                    return h('Checkbox', {
                      props: {
                        value: !!row.ModifyRight
                      }
                    })
                  }
                }
              ]
              this.setTraverse(data, 'columnsTable_current', 'dataTable_current', table4, '')
              break
          }
        })
    },

    /**
         *
         *
         * @date: 2020/12/4 09:07
         * @description: 管理员动态获取选择题目
         * @returns
         * @memberof No such property: code for class: Script1
         */
    getTableList () {
      console.time(1)
      const id = JSON.parse(localStorage.getItem('login_info')).id / 1
      const data = {
        entry: 'score_admin_api',
        service_name: 'query_teacher',
        id: id,
        role: 'all'
      }
      this.getData('/scan_project/score_admin_api', data)
        .then(data => {
          this.newQuestionsList = []
          this.modal6 = true
          for (const value of data.result_info.questions) {
            console.log(value)
            this.newQuestionsList.push({
              name: value
            })
          }
          this.newQuestionsList.unshift({
            name: {
              id: '',
              name: '试题分配'
            }
          })
        })
        .catch(error => error)
    },
    // 遍历表格数据
    setTraverse (data, columnsName, dataName, table, search) {
      // console.log(data)
      // console.log(columnsName) // 表头
      // console.log(dataName) // 表内容
      // console.log(table)
      console.log(search)
      const that = this
      // 清空表格表头
      this[columnsName] = []
      const id = JSON.parse(localStorage.getItem('login_info')).id / 1
      if (dataName !== 'dataTable_current') {
        for (let i = 0, len = data.result_info.questions.length; i < len; i++) {
          // console.log(data.result_info.questions[i])
          if (len >= 15) { // 如果题目超过 15 题，则设置表格宽度为 100
            this[columnsName].push({
              title: data.result_info.questions[i],
              align: 'center',
              width: 100,
              key: 'id',
              render (h, { row }) {
                let str
                // eslint-disable-next-line no-unused-vars
                Object.entries(row.scorer_role).forEach((item, index) => {
                  if (Number(item[0]) === data.result_info.questions[i].id) {
                    str = item
                  }
                })
                switch (search) {
                  case 'is_admin':
                    /* return h('Checkbox', {
                                          props: {
                                            value: row[search]
                                          },
                                          on: {
                                            'on-change': (e) => {
                                              row.is_admin = e
                                              console.log([arguments[1].column.title.id], '请求修改权限接口')
                                              const data = {
                                                entry: 'score_admin_api',
                                                service_name: 'edit_teacher',
                                                id, // 考试列表id
                                                role: {
                                                  id: arguments[1].row.id,
                                                  name: search,
                                                  is_admin: e,
                                                  scorer_role: {
                                                    [arguments[1].column.title.id]: {
                                                      enable: e,
                                                    }
                                                  }
                                                }
                                              }
                                              console.log(data)
                                              that.getData('/scan_project/score_admin_api', data).then(res => {
                                                console.log(res)
                                              })
                                            }
                                          }
                                        }) */
                    // eslint-disable-next-line no-unreachable
                    break
                  case 'scorer_role':
                    debugger
                    return h('div', {
                      style: {
                        padding: '10px 0'
                      }
                    }, [
                      h('Checkbox', {
                        style: {
                          // marginBottom: '5px'
                        },
                        props: {
                          value: str[1].enable
                        },
                        on: {
                          'on-change': (e) => {
                            // console.log(e, arguments, '请求修改权限接口')
                            const data = {
                              entry: 'score_admin_api',
                              service_name: 'edit_teacher',
                              id, // 考试列表id
                              role: {
                                id: arguments[1].row.id,
                                name: search,
                                scorer_role: {
                                  [arguments[1].column.title.id]: {
                                    statistics_role: e,
                                    enable: e,
                                    is_leader: e ? str[1].is_leader : false // 题组长

                                  }
                                }
                              }
                            }
                            console.log(data)
                            that.getData('/scan_project/score_admin_api', data).then(res => {
                              console.log(res)
                            })
                          }
                        }
                      }, '阅卷员'),
                      h('Checkbox', {
                        props: {
                          value: str[1].is_leader
                        },
                        on: {
                          'on-change': (e) => {
                            console.log(e, arguments, '请求修改权限接口')
                            const data = {
                              entry: 'score_admin_api',
                              service_name: 'edit_teacher',
                              id, // 考试列表id
                              role: {
                                id: arguments[1].row.id,
                                name: search,
                                scorer_role: {
                                  [arguments[1].column.title.id]: {
                                    statistics_role: e,
                                    // enable: e, //阅卷员
                                    is_leader: e // 题组长
                                  }
                                }
                              }
                            }
                            that.getData('/scan_project/score_admin_api', data).then(res => {
                              console.log(res)
                            })
                          }
                        }
                      }, '题组长')
                    ])
                    // eslint-disable-next-line no-unreachable
                    break
                }
              },
              renderHeader (h, params) {
                return h('div', {}, params.column.title.name)
              }
            })
          } else {
            this[columnsName].push({
              title: data.result_info.questions[i],
              align: 'center',
              key: search,
              render (h, { row }) {
                let str
                Object.entries(row.scorer_role)
                  .forEach((item, index) => {
                    if (Number(item[0]) === data.result_info.questions[i].id) {
                      str = item
                    }
                  })
                // console.log(str) //打印比对后的表格数据列项
                switch (search) {
                  case 'is_admin':
                    /* return h('Checkbox', {
                                          props: {
                                            value: row[search]
                                          },
                                          on: {
                                            'on-change': (e) => {
                                              row.is_admin = e
                                              console.log([arguments[1].column.title.id], '请求修改权限接口')
                                              const data = {
                                                entry: 'score_admin_api',
                                                service_name: 'edit_teacher',
                                                id, // 考试列表id
                                                role: {
                                                  id: arguments[1].row.id,
                                                  name: search,
                                                  is_admin: e,
                                                  scorer_role: {
                                                    [arguments[1].column.title.id]: {
                                                      enable: e,
                                                      count_min: null,
                                                      count_max: null
                                                    }
                                                  }
                                                }
                                              }
                                              console.log(data)
                                              that.getData('/scan_project/score_admin_api', data).then(res => {
                                                console.log(res)
                                              })
                                            }
                                          }
                                        }) */
                    // eslint-disable-next-line no-unreachable
                    break
                  case 'scorer_role':
                    return h('div', {
                      style: {
                        padding: '10px 0'
                      }
                    }, [
                      h('Checkbox', {
                        style: {
                          marginBottom: '5px'
                        },
                        props: {
                          value: str[1].enable
                        },
                        on: {
                          'on-change': (e) => {
                            console.log('阅卷员状态', e, arguments, '请求修改权限接口')
                            const data = {
                              entry: 'score_admin_api',
                              service_name: 'edit_teacher',
                              id, // 考试列表id
                              role: {
                                id: arguments[1].row.id,
                                name: search,
                                scorer_role: {
                                  [arguments[1].column.title.id]: {
                                    statistics_role: e,
                                    enable: e, // 阅卷员
                                    is_leader: e ? str[1].is_leader : false // 题组长
                                  }
                                }
                              }
                            }
                            that.getData('/scan_project/score_admin_api', data).then(res => {
                              console.log(res)
                            })
                          }
                        }
                      }, '阅卷员'),
                      h('Checkbox', {
                        props: {
                          value: str[1].is_leader
                        },
                        on: {
                          'on-change': (e) => {
                            console.log('题组长状态', e, row, str, '请求修改权限接口')
                            const data = {
                              entry: 'score_admin_api',
                              service_name: 'edit_teacher',
                              id, // 考试列表id
                              role: {
                                id: arguments[1].row.id,
                                name: search,
                                scorer_role: {
                                  [arguments[1].column.title.id]: {
                                    statistics_role: e,
                                    // enable: e, //阅卷员
                                    is_leader: e // 题组长
                                  }
                                }
                              }
                            }
                            that.getData('/scan_project/score_admin_api', data).then(res => {
                              console.log(res)
                            })
                          }
                        }
                      }, '题组长')
                    ])
                    // eslint-disable-next-line no-unreachable
                    break
                }
              },
              renderHeader (h, params) {
                switch (search) {
                  case 'is_admin':
                    return h('div', {}, '')
                    // eslint-disable-next-line no-unreachable
                    break
                }
                return h('div', {}, params.column.title.name)
              }
            })
          }
        }
      }
      // 拼接入固定表格列项
      table.forEach(item => {
        return this[columnsName].push(item)
      })

      // 清空表格内容
      this[dataName] = []
      // 渲染表内容

      for (let i = 0, len = data.result_info.teachers.length; i < len; i++) {
        // 表格列表内容
        // console.log(data.result_info.teachers[i])
        const newData = data.result_info.teachers[i]
        // console.log(newData.leader_role, newData.leader_role_)
        this[dataName].push({
          name: newData.name,
          id_num: newData.id_num,
          id: newData.id,
          is_admin: newData.is_admin,
          leader_role: newData.leader_role,
          scorer_role: newData.scorer_role,
          phone: newData.phone
        })
      }

      this.loading = false
    },
    // 触发修改表格
    modifytable (val) {
      console.log(val)
    },

    // 取消试题
    asyncCancel () {
      this.modal6 = false
      this.newQuestionsList = []
    },

    // 确认试题选择弹框
    async asyncOK (val) {
      const id = JSON.parse(localStorage.getItem('login_info')).id / 1
      this.SET_QUESTION_TITLE(val)
      this.loading = true
      // console.log(val.name)
      if (val.name !== '试题分配' && val.name) {
        const data = {
          entry: 'score_admin_api',
          service_name: 'query_teacher',
          id,
          role: 'all',
          page_num: this.admin_num,
          page_size: this.admin_size
        }
        this.getData('/scan_project/score_admin_api', data).then(res => {
          console.log(res.result_info.teachers)
          for (const value of res.result_info.teachers) {
            this.$set(value, 'TaskNumber', 0)
            this.$set(value, 'UserRight', '评卷员')
          }
          this.dataTable_current = res.result_info.teachers
        })
        this.currentTable = false
      } else {
        this.currentTable = true
      }
      this.loading = false
      this.modal6 = false
      console.log(val.name)
      this.changeValue = val.name
      this.newQuestionsList = []
    },

    // 导出模板
    getExportTemplate () {
      this.fileName = '导出模板'
      this.modal2 = true
      this.uploadData = {
        service_name: 'get_teacher_tpl'
      }
    },

    // 导出老师信息
    getExportPerson () {
      this.fileName = '导出老师信息'
      this.modal2 = true
      this.uploadData = {
        service_name: 'export_teacher'
      }
    },

    // 导入老师信息
    setImportPerson () {
      this.fileName = '导入老师信息'
      this.modal1 = true
      this.uploadData = {
        service_name: 'import_teacher',
        reset: 'Y'
      }
    }
  },
  computed: {},
  created () {
    this.getTableData('scorer', 1, 15) // 初始化数据
  },
  mounted () {
  },
  destroyed () {
  }

}
</script>

<style lang="less">
.tabs {
    .ivu-tabs-bar {
        margin-bottom: -1px;
    }
}
</style>
