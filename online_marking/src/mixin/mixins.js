
const myMixin = {
  data () {
    return {}
  },
  methods: { // 局部混入
    // 单选学科进度渲染柱状图
    /* setEchartData (val) {
      this.option.xAxis.data = []
      this.option.series[0].data = []
      console.log(val)
      for (let i = 0, len = val.length; i < len; i++) {
        this.option.xAxis.data.push(val[i].QName)
        this.option.series[0].data.push(val[i].MarkedRatio)
      }
    } */
  }
}
export default myMixin
