<comment>
    # 试卷分析弹窗
</comment>
<template>
    <div class="popup-window">
        <Modal
                @on-cancel="$emit('cancel',modal2)"
                v-model="modal2"
                width="1200"
        >
            <p slot="header">
                <span>试卷分析</span>
            </p>
            <div
                    class="context"
                    :style="{
                        textAlign:'left',
                    }"
            >
                <div class="title">
                    <h4>
                        题目总数：<span>1 </span>
                        道，考试总分：<span>3 </span>
                        分，考试时间：<span>120 </span>
                        分钟</h4>
                </div>
                <Row
                        :style="{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                        }"
                >
                    <Col
                            class="context-left"
                            span="12"
                    >
                        <!-- 主观题分布分析 -->
                        <div class="top">
                            <h4 class="title">主客观题分布分析</h4>
                            <div>
                                <global-table
                                        :columns="objectiveQuestion.columns"
                                        :data="objectiveQuestion.data"
                                        :isshow="false"
                                        :loading="false"
                                />
                            </div>
                        </div>

                        <!-- 题型分布分析 -->
                        <div class="center">
                            <h4 class="title">题型分布分析</h4>
                            <div>
                                <global-table
                                        :columns="typeQuestion.columns"
                                        :data="typeQuestion.data"
                                        :isshow="false"
                                        :loading="false"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col
                            class="context-right"
                            span="12"
                    >
                        <h4 class="title">难度结构分析</h4>
                        <div style="width: 200px;">
                            <v-chart :options="polar"/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col
                            class="context-bottom"
                            span="24"
                    >
                        <h4 class="title">各小题分析</h4>
                        <div>
                            <global-table
                                    :columns="smallQuestion.columns"
                                    :data="smallQuestion.data"
                                    :isshow="false"
                                    :loading="false"
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import ECharts from 'vue-echarts'
import '@/components/echart/echart-config.js'

export default {
  name: 'popup-window',
  components: {
    'v-chart': ECharts
  },
  data () {
    const data = this.genData(50)
    return {
      modal2: this.modal,
      objectiveQuestion: { // 主观题分布分析
        columns: [
          { title: '题型', key: 'question_type' },
          { title: '题数及占比', key: 'percentage_question' },
          { title: '分值及占比', key: 'percentage_score' }
        ],
        data: [
          { question_type: '客观题', percentage_question: '100.00%', percentage_score: '100.100%' }
        ]
      },
      typeQuestion: {
        columns: [
          { title: '题型', key: 'question_type' },
          { title: '题数及占比', key: 'percentage_question' },
          { title: '分值及占比', key: 'percentage_score' }
        ],
        data: [
          { question_type: '选择题', percentage_question: '100.00%', percentage_score: '100.100%' }
        ]
      },
      smallQuestion: {
        columns: [
          { title: '题号', key: 'question_id', width: 100 },
          { title: '包含知识点', key: 'percentage_evaluate' },
          {
            title: '难度',
            key: 'difficulty',
            width: 300,
            render: (h, params) => {
              return h('Rate',
                {
                  props: {
                    'v-model': 3,
                    icon: 'md-star'
                  },
                  disable: true

                })
            }
          },
          { title: '分值', key: 'score', width: 100 }
        ],
        data: [
          {
            question_id: '1',
            percentage_evaluate: '列举法计算基本事件数及事件发生的概率对数的运算性质集合的含义与表示',
            difficulty: 3,
            score: 3
          }
        ]
      },
      polar: {
        title: {
          text: '同名数量统计',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 0,
          top: 20,
          bottom: 20,
          data: data.legendData,
          selected: data.selected
        },
        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: data.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

    }
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    modal (val) {
      this.modal2 = val
    }
  },
  methods: {
    genData (count) {
      const nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
      ]
      const legendData = []
      const seriesData = []
      const selected = {}
      let name
      for (let i = 0; i < count; i++) {
        name = Math.random() > 0.65
          ? this.makeWord(4, 1, nameList) + '·' + this.makeWord(3, 0, nameList)
          : this.makeWord(2, 1, nameList)
        legendData.push(name)
        seriesData.push({
          name: name,
          value: Math.round(Math.random() * 100000)
        })
        selected[name] = i < 6
      }

      return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
      }
    },
    makeWord (max, min, nameList) {
      const nameLen = Math.ceil(Math.random() * max + min)
      const name = []
      for (let i = 0; i < nameLen; i++) {
        name.push(nameList[Math.round(Math.random() * nameList.length - 1)])
      }
      return name.join('')
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

<style lang="less" scoped>
    .context {
        padding-left: 20px;

        .title {
            margin-top: 20px;
        }

        > div.title > h4 > span {
            color: #ee6b52;
            font-size: 20px;
        }

        .context-left, .context-right, .context-bottom {
            h4 {
                line-height: 35px;
                border-bottom: 1px solid #ddd;
                margin-bottom: 10px;
            }

            h4::after {
                content: '';
                display: block;
                width: 130px;
                transform: translateY(2px);
                border-bottom: 3px solid #ee6b52;
            }
        }

        .context-right {
            padding-left: 20px;
        }
    }

    .echarts {
        width: 550px;
        height: 600px;
    }
</style>
