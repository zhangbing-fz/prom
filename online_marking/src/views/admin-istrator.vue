<comment>
# 人员
</comment>
<template>
    <div class="admin-istrator">
        <Row>
            <Col span="20" style="display: flex; justify-content: start; align-items: center; height: 50px;">
                <Form v-model="info" :label-width="80" inline>
                    <FormItem label="账号" style="width: 260px; margin: 0; margin-left: 20px">
                        <Select v-model="info.account.title" style="width: 150px">
                            <Option
                                    v-for="item in info.account.arr"
                                    :key="item.value"
                                    :value="item"
                            >{{ item }}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="学科" style="width: 200px; margin: 0; margin-left: 20px">
                        <Select v-model="info.discipline.title">
                            <Option
                                    v-for="item in info.discipline.arr"
                                    :key="item.value"
                                    :value="item"
                            >{{ item }}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="试题" style="width: 200px; margin: 0; margin-left: 20px">
                        <Select v-model="info.questions.title">
                            <Option
                                    v-for="item in info.questions.arr"
                                    :key="item.value"
                                    :value="item"
                            >{{ item }}
                            </Option>
                        </Select>
                    </FormItem>
                </Form>
                <span style="border: 1px dashed red; padding: 4px 10px; margin-left: 20px">
                    <span style="color: #999">
                        在线人数：
                        <i style="color: red">0</i>/100</span> - <span style="color: #999">队列：<i
                        style="color: red">0</i></span>
                </span>

            </Col>
            <Col span="4"
                 style="display: flex; justify-content: flex-end; align-items: center; height: 50px; padding: 0 10px">

                <Dropdown
                        style="margin-left: 20px"
                        @on-click="setOffline"
                >
                    <Button
                            icon="ios-arrow-down"
                            type="success"
                    >
                        操作
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="批量下线">批量下线</DropdownItem>
                        <DropdownItem name="发送通知">发送通知</DropdownItem>
                        <DropdownItem name="刷新当前">刷新当前</DropdownItem>
                        <DropdownItem name="刷新全部">刷新全部</DropdownItem>
                        <DropdownItem disabled divided name="系统配置">系统配置</DropdownItem>
                        <DropdownItem name="任务监督">任务监督</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button
                        icon="ios-remove-circle-outline"
                        style="margin-left: 10px" type="error"
                        @click="modal6=true, titleContent='您确定退出登录么?'; title='信息'">
                    注销
                </Button>
            </Col>
        </Row>

        <global-table
                :columnsTable="columnsTable"
                :dataTable="dataTable"
                :loading="loading"
                @setEchartData="setData"
        />

        <!-- 批量下线弹窗 -->
        <modal-error
                :loading="loading"
                :modal="modal6"
                :title=title
                :titleContent=titleContent
                @asyncCancel="modal6=false"
                @asyncOK="asyncOK"
        >
        </modal-error>

        <!-- 发送通知弹窗 -->
        <modal-error
                :loading="loading"
                :modal="modal7"
                :title=title
                :titleContent=titleContent
                @asyncCancel="modal7=false"
                @asyncOK="asynNoticecOK"
        >
            <template v-slot:default>
                <Form :label-width="80">
                    <FormItem label="通知类型">
                        <RadioGroup v-model="noticeType">
                            <Radio label="普通"></Radio>
                            <Radio label="中断"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="通知内容">
                        <Input placeholder="请输入通知内容" type="textarea"/>
                    </FormItem>
                </Form>
            </template>
        </modal-error>

    </div>
</template>

<script>
import error from '@/components/popup/base-popup-error'

export default {
  name: 'admin-istrator',
  components: {
    'modal-error': error
  },
  data () {
    return {
      title: '', // 警告弹框标题
      titleContent: '', // 警告弹框内容
      modal6: false, // 批量下线弹框
      modal7: false, // 发送通知弹框

      noticeType: '普通', // 通知类型
      // 头部筛选栏
      info: {
        account: {
          arr: ['全部'],
          title: '全部'
        }, // 账号
        discipline: {
          arr: ['全部'],
          title: '全部'
        }, // 学科
        questions: {
          arr: ['全部'],
          title: '全部'
        }, // 试题
        number_online: 0, // 在线人数
        queue: 0 // 队列
      },
      loading: false,

      // 批量下线
      offline: [],

      // 表格
      columnsTable: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'ID',
          sortable: true
        },
        {
          title: '用户IP',
          key: 'IP',
          sortable: true
        },
        {
          title: '设备',
          key: 'equipment',
          sortable: true
        },
        {
          title: '浏览器',
          key: 'browser',
          sortable: true
        },
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
          title: '权限',
          key: 'permissions',
          sortable: true
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      dataTable: [
        {
          ID: 9527,
          IP: '192.168.1.143',
          equipment: '联想扬天5300',
          browser: 'IE11',
          discipline: '语文',
          questions: '六',
          permissions: 1
        },
        {
          ID: 9527,
          IP: '192.168.1.143',
          equipment: '联想扬天5300',
          browser: 'IE11',
          discipline: '语文',
          questions: '六',
          permissions: 1
        },
        {
          ID: 9527,
          IP: '192.168.1.143',
          equipment: '联想扬天5300',
          browser: 'IE11',
          discipline: '语文',
          questions: '六',
          permissions: 1
        }
      ]
    }
  },
  props: {},
  watch: {},
  methods: {
    // 关闭 / 显示批量下线弹框
    asyncOK () {
      this.modal6 = false
    },
    // 关闭 / 显示发送通知弹框
    asynNoticecOK () {
      this.modal7 = false
    },
    // 批量下线
    setOffline (val) {
      switch (val) {
        case '批量下线':
          if (!this.offline.length) {
            this.modal6 = true
            this.title = '批量下线' // 警告弹框标题
            this.titleContent = '请至少选择一条数据!' // 警告弹框内容
          }
          break
        case '发送通知':
          this.modal7 = true
          this.title = '发送通知' // 警告弹框标题
          this.titleContent = ''
          break

        case '刷新当前':
          alert('刷新当前')
          break

        case '刷新全部':
          alert('刷新全部')
          break
      }
    },
    // 选中的数据
    setData (val) {
      this.offline = val // 赋值选中的数据arr
    },
    // 视图
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    // 删除
    remove (index) {
      this.data6.splice(index, 1)
    }
  },
  computed: {},
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style scoped>
ul, li {
    list-style: none;
}
</style>
