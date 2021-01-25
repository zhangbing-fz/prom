<comment>
# 组件注释
</comment>
<template>
    <div
            :style="{
                height:'100vh',
                background: 'url(static/img/login-bg.0899ffa6.jpg)',
                backgroundSize: '100% 100%'
            }"
            class="login"
    >
        <Form
                ref="formInline"
                :model="formInline"
                :rules="ruleInline"
                :style="{
                    display: 'flex',
                    width: '300px',
                    justifyContent: 'left',
                    flexDirection: 'column',
                    textAlign: 'left',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translateY(-100px)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '5px'
                }"
        >
            <h2 style="margin-bottom: 10px">灌顶云在线阅卷</h2>
            <FormItem prop="user">
                <Input
                        v-model="formInline.user"
                        placeholder="账号"
                        type="text"
                >
                    <Icon slot="prepend" type="ios-person-outline"/>
                </Input>
            </FormItem>

            <FormItem prop="password">
                <Input
                        v-model="formInline.password"
                        placeholder="密码"
                        type="password"
                >
                    <Icon slot="prepend" type="ios-lock-outline"/>
                </Input>
            </FormItem>

            <FormItem prop="domain">
                <Input
                        v-model="formInline.domain"
                        placeholder="登录域"
                        type="text"
                >
                    <Icon slot="prepend" type="ios-at-outline"/>
                </Input>
            </FormItem>

            <FormItem style="margin-bottom: 0">
                <div
                        :style="{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }"
                >
                    <Checkbox v-model="personnelMark">管理员</Checkbox>
                    <Button
                            icon="md-desktop"
                            type="primary"
                            @click="handleSubmit('formInline')"
                    >
                        登录
                    </Button>
                </div>
            </FormItem>

        </Form>
        <!-- 管理员登录选择框 -->
        <modal-error
                :loading="loading"
                :modal='modal6'
                :title="title"
                :titleContent="titleContent"
                width="700"
                @asyncCancel="modal6=false"
                @asyncOK="asyncOK($event)"
        >
            <template v-slot:default>
                <global-table
                        :columnsTable="columnsTable"
                        :dataTable="dataTable"
                        :loading="loading"
                        :page_info="page_info"/>
            </template>
        </modal-error>
    </div>
</template>

<script>
import error from '@/components/popup/base-popup-error'
import '@/assets/images/login-bg.jpg' // 背景图片
import { mapMutations } from 'vuex'
// import menuOrdinary from '@/router/menu-ordinary'
// import menuAdmin from '@/router/menu-admin'
export default {
  name: 'login',
  components: {
    'modal-error': error
  },
  data () {
    return {
      personnelMark: false, // 登录人
      columnsTable: [
        // { type: 'selection', width: 60, align: 'center' },
        {
          // title: '考试ID',
          key: 'id',
          width: '80',
          align: 'center',
          render: (h, params) => {
            const { row } = params
            const id = row.id // 渲染的id
            return h('div', [
              h('Radio', {
                props: {
                  value: this.currentChoose === id
                },
                on: {
                  'on-change': () => {
                    // 设置考试信息
                    this.$store.commit('SET_TEST_NAME', row)
                    this.currentChoose = id // 设置所选的考试列表ID
                  }
                }
              })
            ])
          }
        },
        {
          title: '考试名称',
          key: 'name'
        },
        {
          title: '阶段',
          key: 'stage',
          align: 'center'
        },
        {
          title: '科目',
          key: 'subject',
          align: 'center'
        },
        {
          title: '年级',
          key: 'grade',
          align: 'center'
        }
      ],
      dataTable: [],
      title: '请选择考试名称', // 弹框 title
      titleContent: '', // 弹框数据内通
      loading: true,
      modal6: false, // 管理员登录选择框开关
      currentChoose: null, // 考试ID
      formInline: {
        // user: '',
        // password: '',
        // domain: ''
        //
        // user: '18961169819',
        // password: 'AAAaaa111',
        // domain: 'admin.com'

        user: '18812340001',
        password: 'AAACCCBBB',
        domain: 'shupl.edu.cn'
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: '请填写用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请填写用密码.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }
        ],
        domain: [
          {
            required: true,
            message: '请填写登录域.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '请输入有效字母',
            trigger: 'blur'
          }
        ]
      },
      page_info: { // 分页信息
        total: 0// 总条数
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    ...mapMutations(['SET_LOGIN_INFO']),
    // 选择考试列表
    asyncOK () {
      if (this.currentChoose) {
        if (this.personnelMark) { // 是否勾选管理员
          // 管理员登录==>人员权限配置页
          // this.$router.addRoutes(menuAdmin)
          this.$router.push({
            path: '/paper-progress-content',
            query: {
              mark: this.personnelMark
            }
          })
          this.$Message.success('管理员登录!')
        } else { // 非管理员
          // 分管理员登录==> 打分阅卷页面
          // this.$router.addRoutes(menuOrdinary)
          this.$router.push('/score')
          this.$Message.success('阅卷员登录!')
        }
        // 设置登录考试号
        this.SET_LOGIN_INFO({ mark: this.personnelMark, id: this.currentChoose })
      } else {
        this.$Modal.error({
          title: '警告',
          content: '请选择考试名称',
          onOk: () => {
            this.modal6 = true
          }
        })
      }
      this.modal6 = false
    },
    /**
         * @功能:
         * @date: 2020/9/7 11:15
         * @description: 登录显示弹框选择考试
         * @param {login.vue}
         * @return:
         */
    getQuestionId () {
      this.$store.commit('SET_MENU_MARK', {
        personnel: this.personnelMark,
        arbitration: this.personnelMark,
        personnelMark: this.personnelMark
      })
      if (this.personnelMark) { // 管理员登录
        const data = {
          entry: 'score_admin_api',
          service_name: 'query_exam'
        }
        this.getData('/scan_project/score_admin_api', data)
          .then(res => {
            this.page_info.table_totle = res.result_info.table_totle
            this.dataTable = res.result_info.table_data
            this.modal6 = true // 显示弹框
            this.loading = false
          })
          .catch(error => error)
      } else { // 非管理员登录
        const data = {
          entry: 'score_api',
          service_name: 'query_queue'
        }
        this.getData('/scan_project/score_api', data)
          .then(res => {
            // console.log(res.result_info)
            this.menuTree(res.result_info, 'exam_id')
            // 设置非管理员登录时的表头
            this.columnsTable = [
              {
                // title: '考试ID',
                key: 'id',
                width: '80',
                align: 'center',
                render: (h, { row }) => {
                  const id = row.id // 渲染的id
                  return h('div', [
                    h('Radio', {
                      props: {
                        value: this.currentChoose === id
                      },
                      on: {
                        'on-change': (e) => {
                          // console.log(row)
                          this.$store.commit('SET_QUESTION_SCORE_INFO', row)
                          this.currentChoose = id // 设置所选的考试列表ID
                        }
                      }
                    })
                  ])
                },
                renderHeader: (h, params) => {
                  return h('Radio', {
                    props: {
                      disabled: true
                    }
                  })
                }
              },
              {
                title: '题号',
                key: 'name',
                align: 'center',
                tree: true
              },
              {
                title: '所属考试',
                key: 'exam_name'
              }
            ]
            // 设置分页信息
            this.page_info.table_totle = res.result_info.length
            // 设置表格数据
            this.dataTable = res.result_info
            // 显示弹窗表格
            this.modal6 = true
            // 关闭loading
            this.loading = false
          })
          .catch(error => error)
      }
      // 存储登录后的用户信息
      this.$store.commit('$_setStorage',
        {
          user: this.formInline.user
        }
      )
      this.$store.commit('$_setLogin', '1') // 设置登录标记
    },
    // 递归树形数据表格
    menuTree (data, str) {
      console.log(data, str)
      const newData = [...data]
      newData.forEach(item => {
        item.count = 1
      })
      console.log(newData.reduce((total, num) => {
        console.log(total[str] === num[str])
        if (total[str] === num[str]) {
          total.count++
        } else {
          total.count = 1
        }
        return total
      }, {}))
      /* const arr = []
                                for (let i = 0; i < newData.length; i++) {
                                  for (let j = i + 1; j < newData.length; j++) {
                                    arr[i] = []
                                    console.log(i, j, newData[i][str] === newData[j][str])
                                    if (newData[i][str] === newData[j][str]) {
                                      arr[i].push(newData.splice(j, 1))
                                      console.log(arr, newData)
                                      debugger
                                    } else {
                                      // 如果不想相等，则创建新的数组保存当前项
                                      arr[j] = [newData.shift()]
                                      console.log(arr, newData, i)
                                      debugger
                                    }
                                  }
                                } */
    },
    // 登录
    handleSubmit (name) {
      const { Base64 } = require('js-base64')
      const data = {
        entry: 'auth_api',
        service_name: 'login_check',
        app: this.personnelMark ? 'score_admin' : 'score',
        username: Base64.encode(this.formInline.user),
        passwd: Base64.encode(this.formInline.password),
        domain: this.formInline.domain
      }
      this.$refs[name].validate((valid) => { // 登录
        if (valid) {
          this.getData('/system_admin/auth_api', data)
            .then(res => {
              if (res.result_code !== '00') {
                this.validation(res)
                return
              }
              localStorage.setItem('_login_info', JSON.stringify(data))
              localStorage.setItem('userinfo', JSON.stringify(res)) // 存储userinfo登录信息
              localStorage.removeItem('login_info') // 每次登录先清除登录模式
              localStorage.removeItem('num_score') // 每次登录先清除记分模式值
              // 调用登录方式函数
              this.getQuestionId()
            })
            .catch(error => error)
        } else {
          this.$Message.error('Fail!')
        }
      })
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

</style>
