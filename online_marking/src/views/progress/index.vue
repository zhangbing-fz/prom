<comment>
# 评卷进度 / 进度
</comment>
<template>
    <div class="paper-progress-content">
        <global-header-admin/>
        <Row>
            <Col span="24">
                <!-- 学科进度 -->
                <div class="box">
                    <div class="title">
                        <h3>学科进度</h3>
                        <div>
                            <Button
                                    :disabled="mark"
                                    size="small"
                                    type="info"
                                    @click="beginTest"
                            >
                                开始考试
                            </Button>
                            <Button
                                    :disabled="!mark"
                                    size="small"
                                    style="margin-left: 10px"
                                    type="info"
                                    @click="stopTest"
                            >
                                停止考试
                            </Button>
                            <Button
                                    size="small"
                                    style="margin-left: 10px"
                                    type="success"
                                    @click="showEditor('任务监督')"
                            >
                                <Icon type="ios-eye"/>
                                任务监督
                            </Button>
                            <Button
                                    :disabled="!!timer"
                                    size="small"
                                    style="margin-left: 10px"
                                    type="success"
                                    @click="SET_TIMER(30)"
                            >
                                <Icon type="ios-refresh"/>
                                {{ timer ? timer : '刷新' }}
                            </Button>
                        </div>
                    </div>
                    <div style="padding: 0 20px 20px;">
                        <global-table
                                :columnsTable="columnsAcademic"
                                :dataTable="dataAcademic"
                                :isHeight="columnsAcademicHeight"
                                :ischecked="checkedTable"
                                :loading="loading"
                                :page_info="page_info"
                                ischeckedname='academic_progress'
                                @onSelect="onSelect"
                                @setEchartData="setEchartData(echart_info.echart_Data=$event,'scorer_count', '阅卷人数')"
                        />
                    </div>
                </div>

                <div class="box">
                    <div style="margin-top: 20px">
                        <!-- 完成率 -->
                        <div class="title">
                            <Row style="width: 100%">
                                <Col
                                        align="left"
                                        span="4"
                                >
                                    <h3>完成率%</h3>
                                </Col>
                                <Col span="16">
                                    <div
                                            :style="{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center'
                                            }"
                                    >
                                        <div>
                                            <Button
                                                    v-for="(item,index) in echart_info.category.list"
                                                    :key="index"
                                                    :size="btn_size"
                                                    :type="echart_info.category.button === index ? 'info' : 'default'"
                                                    style="margin-left: 10px"
                                                    @click="selectShape($event,index)"

                                            >{{ item }}
                                            </Button>
                                        </div>
                                        <div style="width: 30px">|</div>
                                        <div>
                                            <Button
                                                    v-for="(item,index) in echart_info.category_details.list"
                                                    :key="index"
                                                    :size="btn_size"
                                                    :type="echart_info.category_details.button === index ? 'info' : 'default'"
                                                    style="margin-left: 10px"
                                                    @click="selectShapeData($event, index)"
                                            >{{ item }}
                                            </Button>
                                        </div>
                                    </div>

                                </Col>
                                <Col align="right" span="4">
                                    <Button
                                            :disabled="!!timer"
                                            :size="btn_size"
                                            style="margin-left: 10px"
                                            type="success"
                                            @click="SET_TIMER(30)"
                                    >
                                        <Icon type="ios-refresh"/>
                                        {{ timer ? timer : '刷新' }}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <div
                                :style="{
                                     padding: '20px'
                                }"
                        >
                            <global-echart
                                    :isHeight="columnsAcademicHeight"
                                    :option="option"
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>

        <!-- 学科进度编辑弹窗 -->
        <modal-editor
                :modal="modal12"
                :title="title"
                :titleContent="titleContent"
                @asyncCancel="asyncCancel"
                @asyncOK="asyncOK"
                @change="modal11=$event"
        >
            <!-- 多评弹框 begin -->
            <CellGroup v-if="paramsInfo.flag === '题块多评策略配置'">
                <Row style="line-height: 40px">
                    <Col span="12">
                        多评
                        <span style="color: red; font-size: 12px">（是/否）</span>
                    </Col>
                    <Col
                            align="right"
                            span="12"
                    >
                        <i-switch
                                v-model="paramsInfo.evaluate_more.multi_score"
                                size="large"
                        >
                            <span slot="open">打开</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </Col>
                </Row>
                <div v-if="paramsInfo.evaluate_more.multi_score">
                    <Row style="line-height: 40px">
                        <Col span="12">
                            移交题组长
                            <span style="color: red; font-size: 12px">（是/否）</span>
                        </Col>
                        <Col align="right" span="12">
                            <i-switch
                                    v-model="paramsInfo.evaluate_more.multi_to_leader"
                                    size="large">
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </Col>
                    </Row>
                    <Row style="line-height: 40px">
                        <Col span="12">
                            差值 <span style="color: red; font-size: 12px">（最小范围1，点击增量0.1）</span>
                        </Col>
                        <Col align="right" span="12">
                            <InputNumber
                                    v-model="paramsInfo.evaluate_more.multi_val"
                                    :min="1"
                                    :step="0.1"
                                    size="small"
                            />
                        </Col>
                    </Row>
                </div>
                <div v-if="paramsInfo.evaluate_more.multi_to_leader">
                    <Row style="line-height: 40px">
                        <Col span="12">
                            评卷限制次数<span style="color: red; font-size: 12px">（最小次数2，点击增量1）</span>
                        </Col>
                        <Col
                                align="right"
                                span="12"
                        >
                            <InputNumber
                                    v-model="paramsInfo.evaluate_more.multi_limit"
                                    :max="10"
                                    :min="2"
                                    size="small"
                            />
                        </Col>
                    </Row>
                </div>
            </CellGroup>

            <!-- 单评弹框 begin -->
            <CellGroup v-if="paramsInfo.flag === '题块自评策略配置'">
                <Row style="line-height: 40px">
                    <Col span="12">
                        单评<span style="color: red; font-size: 12px">（是/否）</span>
                    </Col>
                    <Col align="right" span="12">
                        <i-switch
                                v-model="paramsInfo.evaluate_self.self_score"
                                size="large"
                        >
                            <span slot="open">打开</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </Col>
                </Row>
                <div v-if="paramsInfo.evaluate_self.self_score">
                    <Row style="line-height: 40px">
                        <Col span="12">
                            移交题组长
                            <span style="color: red; font-size: 12px">（是/否）</span>
                        </Col>
                        <Col
                                align="right"
                                span="12"
                        >
                            <i-switch
                                    v-model="paramsInfo.evaluate_self.self_to_leader"
                                    size="large"
                            >
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </Col>
                    </Row>
                    <Row style="line-height: 40px">
                        <Col span="12">
                            差值 <span style="color: red; font-size: 12px">（最小范围1，点击增量0.1）</span>
                        </Col>
                        <Col
                                align="right"
                                span="12"
                        >
                            <InputNumber v-model="paramsInfo.evaluate_self.self_val"
                                         :min="1"
                                         :step="0.1"
                                         size="small"
                            />
                        </Col>
                    </Row>
                    <Row style="line-height: 40px">
                        <Col span="12">自评千分比 <span style="color: red; font-size: 12px">（点击增量1）</span></Col>
                        <Col
                                align="right"
                                span="12"
                        >
                            <InputNumber
                                    v-model="paramsInfo.evaluate_self.self_rate"
                                    :min="0"
                                    :step="1"
                                    size="small"
                            />
                        </Col>
                    </Row>
                </div>
            </CellGroup>

            <!-- 基础策略配置 -->
            <CellGroup v-if="paramsInfo.flag === '题块基础配置'">
                <Row>
                    <Col span="12">分发策略</Col>
                    <Col
                            align="right"
                            span="12"
                    >
                        <Select
                                v-model="paramsInfo.queue_policy.queue_policy"
                                :style="{
                                    width: '80px',
                                    textAlign: 'left'
                                }"
                        >
                            <Option
                                    v-for="(item,index) in cityList"
                                    :key="index.title"
                                    :value="item.code"
                            >
                                {{ item.title }}
                            </Option>
                        </Select>
                    </Col>
                </Row>
                <div v-if="paramsInfo.queue_policy.code === 'limit'">
                    <Row style="line-height: 40px">
                        <Col span="12">分发数量<span style="color: red; font-size: 12px">（点击增量1）</span></Col>
                        <Col
                                align="right"
                                span="12"
                        >
                            <InputNumber
                                    v-model="paramsInfo.queue_policy.limit"
                                    :min="0"
                                    size="small"
                            />
                        </Col>
                    </Row>
                </div>
                <!-- 注释步长、最高分、最低分 -->
                <!--<div>
                  <Row style="line-height: 40px">
                    <Col span="12">
                      步长<span
                        :style="{
                            color: 'red',
                            fontSize: '12px'
                        }"
                    >（点击增量0.5）</span>
                    </Col>
                    <Col
                        align="right"
                        span="12"
                    >
                      <InputNumber size="small"
                          v-model="paramsInfo.queue_policy.step"
                          :min="0"
                          :step="0.5"
                          :value="0"
                      />
                    </Col>
                  </Row>
                  <Row style="line-height: 40px">
                    <Col span="12">
                      最低分数<span style="color: red; font-size: 12px"></span>
                    </Col>
                    <Col
                        align="right"
                        span="12"
                    >
                      <InputNumber size="small"
                          v-model="paramsInfo.queue_policy.min_score"
                          :min="0"
                          :value="5"
                      />
                    </Col>
                  </Row>
                  <Row style="line-height: 40px">
                    <Col span="12">最高分数<span style="color: red; font-size: 12px"></span></Col>
                    <Col
                        align="right"
                        span="12"
                    >
                      <InputNumber size="small"
                          v-model="paramsInfo.queue_policy.max_score"
                          :min="0"
                      />
                    </Col>
                  </Row>
                </div>-->
            </CellGroup>
        </modal-editor>

        <!-- 任务监督弹窗 -->
        <modal-supervise
                :dataTable="dataDetails"
                :modal="modal11"
                :title="title"
                @change="modal11=$event"
        />

        <!-- 任务监督弹窗 -->
        <modal-supervise
                :columnsTable="columnsDetails"
                :dataTable="dataDetails"
                :modal="modal10"
                :title="title"
                @change="modal10=$event"
        />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import supervise from '../../components/popup/paper-progress-content/base-popup-supervise'
import editor from '../../components/popup/paper-progress-content/base-popup-editor'

export default {
  name: 'paper-progress-content',
  components: {
    'modal-supervise': supervise,
    'modal-editor': editor
  },
  data () {
    const _this = this
    return {
      mark: _this.start, // 是否开始考试开关
      // 柱状图信息
      echart_info: {
        echart_Data: {},
        category: { // 类别
          button: 0,
          list: ['柱状', '折线']
        },
        category_details: {
          button: 0,
          list: ['阅卷人数', '完成总量', '单/双评域值', '评次']
        }
      },
      btn_size: 'small',
      cityList: [
        {
          title: '自动',
          code: 'auto'
        },
        {
          title: '按总数均分',
          code: 'avg'
        },
        {
          title: '固定',
          code: 'limit'
        }
      ], // 分发策略列表
      page_info: { // 分页信息
        total: 0,
        current: 0
      },
      loading: true,
      loading2: true,
      modal10: false, // 点击某行学科进度弹窗
      modal11: false, // 任务监督弹窗
      modal12: false, // 学科进度编辑弹窗
      title: '', // 学科进度弹框标题
      titleContent: '', // 学科进度弹框内容
      paramsInfo: {
        flag: '',
        evaluate_more: {},
        evaluate_self: {},
        queue_policy: {
          code: '',
          limit: 0,
          step: 0.5,
          min_score: 0,
          max_score: 5
        } // 分发策略
      }, // 学科进度弹窗插槽内容
      checkedTable: true, // 默认表格是否选中
      // 学科进度
      columnsAcademicHeight: 0,
      columnsAcademic: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '题号',
          key: 'question_id',
          align: 'center',
          render (h, { row }) {
            return h('span', {
              style: {
                fontWeight: 'bold'
              }
            }, row.question_id)
          },
          sortable: true
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
        },
        {
          title: '题块策略配置',
          key: 'action',
          width: 200,
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
                  click: (e) => {
                    e.stopImmediatePropagation()
                    this.setEditor(params, e)
                  }
                }
              }, '多评'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: (e) => {
                    e.stopImmediatePropagation()
                    this.setEditor(params, e)
                  }
                }
              }, '自评'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: (e) => {
                    e.stopImmediatePropagation()
                    this.setEditor(params, e)
                  }
                }
              }, '基础')
            ])
          }
        }
      ],
      dataAcademic: [],
      // 评卷详情
      question_title: '', // 评卷详情 题号
      columnsDetailsHeight: 0,
      columnsDetails: [
        {
          type: 'selection',
          // key: 'id',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center',
          sortable: true
        },
        {
          title: '平均分',
          key: 'avg',
          align: 'center',
          render (h, { row }) {
            if (row.avg) {
              return h('span', row.avg.toFixed(2))
            }
          },
          sortable: true
        },
        {
          title: '总计',
          key: 'count',
          align: 'center',
          sortable: true
        },
        {
          title: '状态',
          key: 'state',
          align: 'center',
          render: (h, { row }) => {
            let color
            let str
            if (row.state) {
              color = '#ed4014'
              str = '在线'
            } else {
              color = 'gray'
              str = '离线'
              // this.$set(row, '_disabled', true)
            }
            return h('span', {
              style: {
                color: color
              }
            }, str)
          },
          sortable: true
        },
        {
          title: '方差',
          key: 'variance',
          align: 'center',
          render (h, { row }) {
            if (row.variance) {
              return h('span', row.variance.toFixed(2))
            }
          },
          sortable: true
        },
        {
          title: '标准',
          key: 'stddev',
          align: 'center',
          render (h, { row }) {
            if (row.stddev) {
              return h('span', row.stddev.toFixed(2))
            }
          },
          sortable: true
        }
      ], // 评卷详情表头 / 题块统计
      dataDetails: [], // 评卷详情表内容
      option: {
        tooltip: {
          trigger: 'axis',
          formatter: '{b0} {c0}',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          name: '题号',
          nameTextStyle: {
            color: 'green',
            fontSize: 16,
            padding: 10
          },
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value',
          name: '',
          // nameLocation: 'middle', // 文字位置
          nameTextStyle: {
            color: 'green',
            fontSize: 16,
            padding: 10
          },
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}'
          }
        },
        series: [{
          data: [],
          label: {
            normal: {
              show: true,
              position: 'top',
              // textBorderColor: '#333',  // 描边
              textBorderWidth: 1
            }
          },
          type: 'bar', // 图形类型
          stymbol: 'circle',
          smooth: false, // 当为true时，就是光滑的曲线（默认为true）；
          symbolSize: 3, // 拐点圆的大小
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.9)'
          },
          itemStyle: {
            normal: {
              color (params) {
                const colorList = []
                for (let i = 0, len = _this.option.xAxis.data.length; i < len; i++) {
                  let color = Math.floor(Math.random() * 16777216).toString(16)
                  if (color.length < 6) {
                    color = '0' + color
                  }
                  colorList.push(`#${color}`)
                }

                // 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                return colorList[params.dataIndex]
              }
            }
          }
        }
        ]
      }
    }
  },
  props: {},
  watch: {
    examineID: {
      handler (val) {
        console.log(val)
        // 考试id变化，重新加载视图
        this.setEchart()
      },
      deep: true
    },
    start: {
      handler (val) {
        this.mark = val
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['SET_TIMER']), // 倒计时方法
    /**
         * @作者: 张兵
         * @功能: selectShapeData
         * @date: 2020/9/16 15:09
         * @description: 切换展示数据
         * @param {paper-progress-content.vue}
         * @return:
         */
    selectShapeData (e, i) {
      // eslint-disable-next-line no-unused-vars
      let key
      // eslint-disable-next-line no-unused-vars,camelcase
      let xAxis_name
      switch (e.target.innerText) {
        case '阅卷人数':
          key = 'scorer_count'
          // eslint-disable-next-line camelcase
          xAxis_name = '阅卷人数'
          break
        case '完成总量':
          key = 'final_count'
          // eslint-disable-next-line camelcase
          xAxis_name = '完成总量'
          break
        case '单/双评域值':
          key = 'multi_val'
          // eslint-disable-next-line camelcase
          xAxis_name = '单/双评域值'
          break
        case '评次':
          key = 'multi_limit'
          // eslint-disable-next-line camelcase
          xAxis_name = '评次'
          break
        default:
          break
      }
      // 执行图表回调
      this.setEchartData(this.echart_info.echart_Data, key, xAxis_name)
      this.echart_info.category_details.button = i || 0
    },

    showEditor (val) {
      console.log(val)
      if (val === '任务监督') {
        this.modal11 = true
        this.title = val
      } else {
        // 弹窗模式
        /* this.modal10 = true
                                                                    console.log(val)
                                                                    this.title = `题号：${val.question_id} 评卷详情` */

        // 路由跳转模式
        this.$router.push({
          path: '/quality-content-play',
          query: {
            id: val.id,
            name: val.question_id
          }
        })
      }
    },
    // 开始考试
    beginTest () {
      // eslint-disable-next-line no-unused-vars
      const data = {
        entry: 'score_admin_api',
        service_name: 'start_score',
        reset: false,
        id: this.examineID
      }
      this.$Modal.confirm({
        okText: '保留',
        cancelText: '重置',
        title: '提醒',
        content: '开始考试, 是/否保留已有的阅卷记录？',
        onOk: () => {
          data.reset = false
          this.getData('/scan_project/score_admin_api', data).then(res => {
            console.log(res)
            this.validation(res)
            if (res.result_code === '00' || res.result_code === '99') {
              this.mark = !this.mark
            }
          })
        },
        onCancel: () => {
          data.reset = true
          this.getData('/scan_project/score_admin_api', data).then(res => {
            console.log(res)
            this.validation(res)
            if (res.result_code === '00' || res.result_code === '99') {
              this.mark = !this.mark
            }
          })
        }
      })
    },
    // 停止考试
    stopTest () {
      const data = {
        entry: 'score_admin_api',
        service_name: 'stop_score',
        id: this.examineID
      }
      this.$Modal.confirm({
        title: '提醒',
        content: '是否确定结束考试？',
        onOk: () => {
          this.getData('/scan_project/score_admin_api', data).then(res => {
            console.log(res)
            this.validation(res)
            this.mark = !this.mark
          })
        }
      })
    },
    /**
         * @作者: 张兵
         * @功能: asyncOK
         * @date: 2020/9/10 09:48
         * @description: 提交修改后的弹框数据
         * @param {paper-progress-content.vue}
         * @return:
         */
    asyncOK () {
      if (this.paramsInfo.flag === '题块多评策略配置') {
        this.modal12 = false
        // eslint-disable-next-line camelcase
        const { evaluate_more } = this.paramsInfo
        const data = {
          entry: 'score_api',
          service_name: 'multi_score_config',
          id: evaluate_more.id,
          enable: evaluate_more.multi_score,
          val: evaluate_more.multi_val,
          limit: evaluate_more.multi_limit,
          to_leader: evaluate_more.multi_to_leader
        }
        this.getData('/scan_project/score_admin_api', data).then(res => {
          console.log(res)
          this.validation(res)
        })
      } else if (this.paramsInfo.flag === '题块自评策略配置') {
        this.modal12 = false
        // eslint-disable-next-line camelcase
        const { evaluate_self } = this.paramsInfo
        const data = {
          entry: 'score_api',
          service_name: 'self_score_config',
          id: evaluate_self.id,
          enable: evaluate_self.self_score,
          val: evaluate_self.self_val,
          rate: evaluate_self.self_rate, // 率
          to_leader: evaluate_self.self_to_leader
        }
        this.getData('/scan_project/score_admin_api', data).then(res => {
          this.validation(res)
        })
      } else if (this.paramsInfo.flag === '题块基础配置') {
        this.modal12 = false
        console.log(this.paramsInfo)
        // eslint-disable-next-line camelcase
        const { queue_policy } = this.paramsInfo
        const data = {
          entry: 'score_api',
          id: queue_policy.id, // 取自评或者评任意id
          service_name: 'basic_score_config',
          enable: false,
          queue_policy: queue_policy.queue_policy,
          queue_limit: queue_policy.limit || 0,
          step: queue_policy.step,
          min_score: queue_policy.min_score,
          max_score: queue_policy.max_score
        }
        this.getData('/scan_project/score_admin_api', data).then(res => {
          this.validation(res)
          // 重新加载表格列项
          this.setEchart()
        })
      }
    },
    asyncCancel () {
      this.modal12 = false
    },
    /**
         * @作者: 张兵
         * @功能: setEditor
         * @date: 2020/9/2 15:17
         * @description: 多评
         * @param {paper-progress-content.vue}
         * @return:
         */
    setEditor (params, e) {
      this.modal12 = true

      switch (e.target.innerText) {
        case '多评':
          this.title = '题块多评策略配置'
          this.paramsInfo.flag = this.title
          this.paramsInfo.evaluate_more = params.row
          break

        case '自评':
          this.title = '题块自评策略配置'
          this.paramsInfo.flag = this.title
          this.paramsInfo.evaluate_self = params.row
          break

        case '基础' :
          this.title = '题块基础配置'
          this.paramsInfo.flag = this.title
          this.paramsInfo.queue_policy = Object.assign(this.paramsInfo.queue_policy, params.row)
          break
                    // default:
                    //   break
      }
    },
    // 设置表格样式
    setTableStyle () {
      this.columnsAcademicHeight = window.innerHeight / 2 - 90
      this.columnsDetailsHeight = window.innerHeight - 100
    },
    /**
         * @作者: 张兵
         * @功能: onSelect
         * @date: 2020/9/11 11:02
         * @description: 选择任意行显示弹窗
         * @param {paper-progress-content.vue}
         * @return:
         */
    onSelect (val) {
      this.setEvalDetails(val)
      this.showEditor(val)
    },
    /**
         * @作者: 张兵
         * @功能: setEvalDetails
         * @description: 初始化 '评卷详情' 点击表格列项时触发
         * @param {paper-progress-content.vue}
         * @return:
         */
    setEvalDetails (val) {
      const data = {
        entry: 'score_api',
        id: val.id,
        service_name: 'view_queue_statistics'
      }
      // 题块统计接口
      this.question_title = val.name || val.question_id
      this.loading2 = true
      this.getData('/scan_project/score_admin_api', data)
        .then(res => {
          this.validation(res)
          this.dataDetails = []
          const ele = res.result_info.table_data
          for (let i = 0, len = ele.length; i < len; i++) {
            const val = Math.floor(Math.random() * 2)
            this.dataDetails.push(Object.assign({ state: val }, ele[i]))
          }
          this.loading2 = false
        })
    },

    /**
         *
         *
         * @date: 2020/12/4 09:13
         * @description: 渲染图表和表格数据
         * @param {*} type
         * @param {*} event
         * @returns
         */
    setEchart () {
      // 科目统计接口
      // this.option.xAxis.data = []
      // this.option.series[0].data = []
      // this.dataAcademic = []
      this.loading = true
      const data = {
        entry: 'score_admin_api',
        service_name: 'view_exam_statistics',
        id: this.examineID // 获取考试id
      }
      this.getData('/scan_project/score_admin_api', data).then(res => {
        // console.log(res)
        this.validation(res)
        this.dataAcademic = res.result_info.table_data
        this.loading = false
      })
    }
  },
  computed: {
    ...mapState({
      timer: state => state.timer, // 刷新倒计时
      examineID: state => state.login_info.examineID, // 考试id
      start: state => state.scoreinfo.test_info.start // 当前考试是否开始
    })
  },
  created () {
  },
  mounted () {
    // 初始化表格/图表数据
    this.setEchart()
    this.setTableStyle()
    window.addEventListener('resize', this.setTableStyle)
  },
  destroyed () {
  }
}
</script>

<style scoped>
.box {
    /*box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15) !important;*/
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.title {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
    line-height: 40px;
}

.title h3 {
    color: #42b983;
}
</style>
