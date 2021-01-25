<comment>
# 图表 / 柱状图
</comment>
<template>
    <div
            ref="chart"
            :style="{
                width:'100%',
                height: isHeight+'px',
                border: '1px solid #ddd'
            }"
            class="global-echart"
    >

    </div>
</template>

<script>
export default {
  name: 'global-echart',
  components: {},
  data () {
    return {
      newOptions: null
    }
  },
  props: {
    option: {
      type: Object,
      required: true
    },
    isHeight: {
      type: Number
    }
  },
  watch: {
    option: {
      handler (val) {
        this.newOptions = val
        this.getEchartData()
      },
      deep: true
    }
  },
  methods: {
    getEchartData () {
      const chart = this.$refs.chart
      if (chart) {
        const myChart = this.$echarts.init(chart)
        // const option = {
        //   tooltip: {
        //     trigger: 'axis',
        //     formatter: '{b0} {c0} %',
        //     axisPointer: {
        //       type: 'shadow'
        //     }
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '7%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   xAxis: {
        //     type: 'category',
        //     data: ['九', '十', '十一', '十二', '十三', '十四', '十五']
        //   },
        //   yAxis: {
        //     type: 'value',
        //     axisLabel: {
        //       show: true,
        //       interval: 'auto',
        //       formatter: '{value} %'
        //     }
        //   },
        //   series: [{
        //     data: [70, 100, 50, 80, 70, 10, 30],
        //     type: 'bar',
        //     showBackground: false,
        //     backgroundStyle: {
        //       color: 'rgba(220, 220, 220, 0.9)'
        //     },
        //     itemStyle: {
        //       normal: {
        //         color (params) {
        //           // 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
        //           const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622']
        //           return colorList[params.dataIndex]
        //         }
        //       }
        //     }
        //   }]
        // } //静态数据
        myChart.setOption(this.option)
        window.addEventListener('resize', function () {
          myChart.resize()
        })
        console.log(myChart.resize)
      }
      this.$on('hook:destroyed', () => {
        const myChart = this.$echarts.init(chart)
        window.removeEventListener('resize', function () {
          myChart.resize()
        })
      })
    }
  },
  computed: {},
  created () {
  },
  mounted () {
    window.addEventListener('resize', this.getEchartData)
  },

  destroyed () {
    window.removeEventListener('resize', this.getEchartData)
  }
}
</script>

<style scoped>
</style>
