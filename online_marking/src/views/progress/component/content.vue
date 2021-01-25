<comment>
# 阅卷质量 / 报表
</comment>
<template>
    <div class="paper-quality-content">
        <global-header-admin @changeID="asyncOK($event)"/>
        <Row>
            <Col span="24">
                <Row>
                    <Col span="24">
                        <div class="box">
                            <global-table
                                    :columnsTable="columnsTable"
                                    :dataTable="dataTable"
                                    :isHeight="columnsTableHeight"
                                    :ischecked="checkedTable"
                                    :loading="loading"
                                    :page_info="page_info"
                                    ischeckedname='quality_content'
                                    @setEchartData="setEchartData(echart_info.echart_Data=$event,'count', '总量', echart_info.all_Data.record_statistics.count)"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="box" style="padding-top: 20px">
                            <div :style="{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center'
                            }">
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
                            <global-echart
                                    :isHeight="columnsTableHeight"
                                    :option="option"
                                    style="margin-top: 20px"
                            />
                        </div>
                    </Col>
                </Row>

            </Col>
        </Row>
        <!--        &lt;!&ndash; 选择题号弹窗 / 请选择题目 &ndash;&gt;
                <modal-quality
                        :list="newQuestionsList"
                        :loading="loading"
                        :modal="modal6"
                        @asyncCancel="modal6=false"
                        @asyncOK="asyncOK"
                ></modal-quality>-->
    </div>
</template>

<script>
import quality from '../../../components/popup/paper-quality-content/base-popup-quality.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'paper-quality-content',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'modal-quality': quality
  },
  data () {
    const _this = this
    return {
      btn_size: 'small',
      echart_info: {
        all_Data: {}, // 总数据
        echart_Data: {}, // 图表数据源
        category: { // 类别
          button: 0,
          list: ['柱状', '折线']
        },
        category_details: {
          button: 0,
          list: ['总量', '最低分', '均分', '方差', '标准', '最高分', '有效量']
        }
      },
      page_info: { // 分页信息
        total: 0,
        current: 0
      },
      changeValue: '', // 当前题号
      id: null, // 当前图表渲染的题号id
      loading: true,
      // 选择题目的列表
      newQuestionsList: [],

      checkedTable: true, // 默认表格是否选中
      columnsTableHeight: 0, // 表格高度
      headerArr: {
        record_statistics: []
      }, // 顶部比例数据
      // 默认表格数据
      columnsTable: [
        {
          type: 'selection',
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
          title: '总量',
          key: 'count',
          align: 'center',
          sortable: true
        },

        {
          title: '最低分',
          key: 'min',
          sortable: true,
          align: 'center'
        },
        {
          title: '均分',
          key: 'avg',
          sortable: true,
          align: 'center',
          render (h, { row }) {
            if (row.avg) {
              return h('span', row.avg.toFixed(2))
            }
          }
        },
        // {
        //   title: '题块完成量',
        //   key: 'finish_count'
        // },
        {
          title: '方差',
          key: 'variance',
          sortable: true,
          align: 'center',
          render (h, { row }) {
            if (row.variance) {
              return h('span', row.variance.toFixed(2))
            }
          }
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
        },
        {
          title: '最高分',
          key: 'max',
          sortable: true,
          align: 'center'
        },
        {
          title: '有效量',
          key: 'final_count',
          sortable: true,
          align: 'center'
        }

      ],
      dataTable: [],
      // 对比列表
      listInfo: {
        contrast_name: [],
        contrast_details: []
      },
      // 图表
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
          type: 'category',
          name: '教师姓名',
          nameTextStyle: {
            color: 'green',
            fontSize: 16,
            padding: 10
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '',
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
          type: 'bar',
          markLine: {
            // symbol: ['none', 'none'], // 去掉箭头
            itemStyle: {
              normal: {
                lineStyle: {
                  type: 'dotted', // dashed
                  color: { // 设置渐变
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: 'red '// 0% 处的颜色
                    }, {
                      offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  show: true,
                  position: 'middle'
                }
              }
            },
            data: [{
              yAxis: -1// 这里设置false是隐藏不了的，可以设置为-1
            }]
          },
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
        }]
      }
    }
  },
  props: {},
  watch: {
    id () {
      this.setEchart()
    }
  },
  methods: {
    ...mapMutations(['SET_TIMER']),
    /**
         * @功能: asyncOK
         * @date: 2020/9/7 09:42
         * @description: 选择试题确认框
         * @param {paper-quality-content.vue}
         * @return:
         */
    asyncOK (val) {
      console.log(val)
      // 选择新的题号 Name
      this.changeValue = val.name
      // 选择新的题号 ID
      this.id = val.id
    },
    /**
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
      // eslint-disable-next-line no-unused-vars
      let reference
      switch (e.target.innerText) {
        case '总量':
          key = 'count'
          // eslint-disable-next-line camelcase
          xAxis_name = '总量'
          console.log(this.echart_info.all_Data.record_statistics.count)
          reference = this.echart_info.all_Data.record_statistics.count
          break
        case '最低分':
          key = 'min'
          // eslint-disable-next-line camelcase
          xAxis_name = '最低分'
          reference = this.echart_info.all_Data.record_statistics.min

          break
        case '均分':
          key = 'avg'
          // eslint-disable-next-line camelcase
          xAxis_name = '均分'
          reference = this.echart_info.all_Data.record_statistics.avg

          break
        case '方差':
          key = 'variance'
          // eslint-disable-next-line camelcase
          xAxis_name = '方差'
          reference = this.echart_info.all_Data.record_statistics.variance

          break
        case '标准':
          key = 'stddev'
          // eslint-disable-next-line camelcase
          xAxis_name = '标准'
          reference = this.echart_info.all_Data.record_statistics.stddev

          break
        case '最高分':
          key = 'max'
          // eslint-disable-next-line camelcase
          xAxis_name = '最高分'
          console.log(this.echart_info.all_Data)
          reference = this.echart_info.all_Data.record_statistics.max

          break
        case '有效量':
          key = 'final_count'
          // eslint-disable-next-line camelcase
          xAxis_name = '有效量'
          reference = this.echart_info.all_Data.record_statistics.final_count

          break
        default:
          break
      }

      this.setEchartData(this.echart_info.echart_Data, key, xAxis_name, reference)
      this.echart_info.category_details.button = i || 0
    },
    // 设置表格样式
    setTableStyle () {
      this.columnsTableHeight = window.innerHeight / 2 - 34
    },
    /**
         * @功能:setEchart
         * @date: 2020/9/2 09:56
         * @description: 渲染图表和表格数据
         * @param {paper-quality-content.vue}
         * @return:
         */
    setEchart () {
      this.dataTable = []
      this.option.xAxis.data = []
      this.option.series[0].data = []
      this.listInfo.contrast_details = []
      this.loading = true
      const data = {
        entry: 'score_api',
        id: this.id || JSON.parse(localStorage.getItem('score_info')).id,
        service_name: 'view_queue_statistics'
      }
      this.getData('/scan_project/score_api', data).then(res => {
        console.log(res)
        this.validation(res)
        this.echart_info.all_Data = res.result_info
        const ele = res.result_info.table_data
        for (let i = 0, len = ele.length; i < len; i++) {
          this.dataTable.push(ele[i])
          this.listInfo.contrast_details.push(ele[i]) // 对比列表
        }
        this.loading = false // 数据渲染完关闭loading
        this.headerArr = Object.assign({}, res.result_info) // 顶部表格比例数据
        const Node = document.getElementsByTagName('table')[1].children[1]
        setTimeout(() => {
          // eslint-disable-next-line no-unused-vars
          const Table = document.createElement('table')
          const Tbody = document.createElement('tbody')
          // 包含零的全部统计
          const allOunt = Object.values(res.result_info.record_statistics)
          // 不包含零的全部统计
          const zeroOunt = Object.values(res.result_info.record_statistics_nozero)
          // 创建行
          const Tr = document.createElement('tr')
          const Tr2 = document.createElement('tr')
          // 创建DOM仓库
          const allCommon = document.createDocumentFragment()
          const zeroCommon = document.createDocumentFragment()
          // 遍历包含0
          const cloneColgroup = Node.previousSibling.cloneNode(true) // 克隆有效表格的 colgroup
          Table.className = 'estate'
          Tbody.style.width = `${Node.parentNode.parentNode.getBoundingClientRect()}`
          allOunt.unshift(res.result_info.record_statistics.count)
          allOunt.unshift('含0总数')
          allOunt.unshift('/')
          allOunt.forEach(item => {
            const Td = document.createElement('td')
            Td.style.textAlign = 'center'
            Td.style.fontWeight = 'bold'
            if (typeof item === 'number' && item.toString().includes('.')) {
              item = item.toFixed(2)
            }
            Td.textContent = item
            allCommon.appendChild(Td)
          })

          // 设置禁选
          allCommon.children[0].innerHTML = `
          <span class="ivu-checkbox ivu-checkbox-disabled">
                <span class="ivu-checkbox-inner"></span>
                <input type="checkbox" disabled="disabled" class="ivu-checkbox-input">
          </span>`
          Tr.appendChild(allCommon) // 插入 td
          Tbody.appendChild(Tr) // 插入 tr
          Table.appendChild(cloneColgroup) // 插入 tbody
          Table.appendChild(Tbody) // 插入 tbody

          // 遍历不含0
          zeroOunt.unshift(res.result_info.record_statistics_nozero.count)
          zeroOunt.unshift('不含0总数')
          zeroOunt.unshift('/')
          zeroOunt.forEach(item => {
            const Td = document.createElement('td')
            Td.style.textAlign = 'center'
            Td.style.fontWeight = 'bold'
            if (typeof item === 'number' && item.toString().includes('.')) {
              item = item.toFixed(2)
            }
            Td.textContent = item
            zeroCommon.appendChild(Td)
          })

          // 设置禁选
          zeroCommon.children[0].innerHTML = `
          <span class="ivu-checkbox ivu-checkbox-disabled">
                <span class="ivu-checkbox-inner"></span>
                <input type="checkbox" disabled="disabled" class="ivu-checkbox-input">
          </span>`
          Tr2.appendChild(zeroCommon) // 插入 td
          Tbody.appendChild(Tr2) // 插入 tr
          Table.appendChild(cloneColgroup) // 插入 tbody
          Table.appendChild(Tbody) // 插入 tbody

          Table.setAttribute('cellpadding', 0)
          Table.setAttribute('cellspacing', 0)
          Table.setAttribute('border', 0)
          Table.style.tableLayout = 'fixed'
          Table.style.position = 'absolute'
          Table.style.zIndex = '99'
          Table.style.top = '39px'
          Table.style.left = '1px'
          Node.parentNode.parentNode.insertBefore(Table, Node.parentNode.parentNode.children[0])
          Node.children[0].style.marginTop = '39px'
          Node.parentNode.style.marginTop = '96px'
        }, 500)
      })
    }
  },
  computed: {
    ...mapState(['timer'])
  },
  created () {
    this.setEchart()
    // 获取选择题目
    this.getData('/scan_project/score_api', {
      entry: 'score_api',
      service_name: 'query_queue'
    }).then(res => {
      for (let i = 0, len = res.result_info.length; i < len; i++) {
        this.newQuestionsList.push(res.result_info[i])
      }
    })
  },
  mounted () {
    window.addEventListener('resize', this.setTableStyle)
    this.setTableStyle()
  },
  destroyed () {
  }
}
</script>

<style scoped>
ul, li {
    list-style: none;
}

.box {
    /*box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15) !important;*/
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.header-report {
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.header-report li {
    background-color: #42b983;
    padding: 20px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.header-report li span:first-child {
    font-size: 12px;
    white-space: nowrap;
}

.header-report li span:last-child {
    font-weight: bold;
    font-size: 20px;
}

.header-report li:hover {
    color: white;
    background-color: #f1ad49;
    transform: scale(1.1);
}

</style>
<style>
.ivu-table {
    overflow-y: scroll;
}
</style>
