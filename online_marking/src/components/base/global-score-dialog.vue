<comment>
# 画布和工具栏集合
</comment>
<template>
    <div class="global-score-dialog">
        <!--        测试：{{num_score ? `记分模式开启，分值${num_score}` : '未开启记分模式'}}-->
        <!--    {{ formCustom.numScore }}-&#45;&#45;&#45;&#45;&#45;&#45;{{ typeof formCustom.numScore }}-->

        <!-- 左侧工具栏 -->
        <global-tool-bar
                v-on="$listeners"
                :modal="modal"
                :numScoreStyle="num_score!==0?true:false"
                @accountScore="accountScore"
                @autoScreen="autoScreen"
                @clickBig="clickBig"
                @clickSmall="clickSmall"
                @removeCanvs="modal1=true"
                @selectTool="button=$event"
        />

        <div
                :style="{
                    marginLeft: '50px',
                    display: 'flex',
                    justifyContent: 'left',
                    flexWrap: 'wrap',
                    overflow: 'scroll'
                  }"
        >
            <!-- canvas 画布组件 -->
            <div
                    v-for="(item,index) in select"
                    :key="index"
            >
                <global-canvas
                        v-on="$listeners"
                        :buttonInfo="button"
                        :dataInfo="dataInfo"
                        :index="index"
                        :isWidthHeight="{w, h}"
                        :numScore="formCustom.numScore"
                        :oldPosition="oldPosition"
                        :zoom="zoom"
                />
            </div>
        </div>

        <!-- 清空画布弹框 -->
        <Modal
                v-model="modal1"
                title="清空标注"
                @on-cancel="cancel"
                @on-ok="ok">
            <p>是否要清除所有标注？</p>
        </Modal>

        <!-- 记分模式弹框 -->
        <modal-error
                :loading="loading"
                :modal="modal7"
                :title=title
                :titleContent="titleContent"
                @asyncCancel="modal7=false"
                @asyncOK="asyncOK"
        >
            <template v-slot:default>
                <Form
                        :label-width="150"
                        :model="formCustom"
                        :rules="ruleCustom"
                        label-position="left">
                    <FormItem label="请设置标记分值:" prop="numScore">
                        <InputNumber v-model="formCustom.numScore"
                                     :max="maxScore"
                                     :min="minScore"
                                     :step="0.5"
                                     placeholder="请输入记分分数"
                                     size="small"
                                     style="width: 200px"/>
                    </FormItem>
                </Form>
            </template>
        </modal-error>

    </div>
</template>

<script>
import tool from './global-tool-bar'
import canvasDetails from './global-canvas'
import { mapState, mapMutations } from 'vuex'
import error from '../popup/base-popup-error'
import { bus } from '@/main.js'
import $ from 'jquery'

export default {
  name: 'global-score-dialog',
  components: {
    'global-tool-bar': tool,
    'global-canvas': canvasDetails,
    'modal-error': error
  },
  data () {
    const validateNumScore = (rule, value, callback) => {
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number(value) && Number(value) !== 0) {
          callback(new Error('请输入一个数字值'))
        } else {
          if (value > 5) {
            callback(new Error('必须小于当前大题总分'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    return {
      value6: '',
      modal7: false, // 记分模式弹框开关
      modal1: false, // 清空画布弹框开关
      imgData: [], // 批阅坐标信息
      imgInfo: null,
      oldPosition: {}, // 初始canvas位置
      w: innerWidth - innerWidth / 24 * 4 - 120, // canvas 画布宽高
      h: innerHeight - 120,
      button: {
        title: '图像移动'
      },
      title: '', // 记分模式标题
      titleContent: '', // 记分模式内容
      loading: true, // 记分模式
      formCustom: {
        numScore: JSON.parse(localStorage.getItem('num_score')) // 设置自定义属性，对勾分数递增或递减
      },
      ruleCustom: {
        numScore: [{
          validator: validateNumScore,
          trigger: 'change'
        }]
      },
      zoom: 0
    }
  },
  props: {
    modal: {
      type: Boolean,
      required: true
    },
    select: { // 模式 / 批阅模式
      type: Number,
      default: 1
    },
    dataInfo: {
      type: Object,
      required: true
    }
  },
  watch: {
    // 根据选择模式设置 canvas宽高属性
    select (val) {
      this.setJudge(val)
    }
  },
  methods: {
    ...mapMutations(['SET_NUM_SCORE']),
    asyncOK () {
      this.modal7 = false // 关闭记分弹窗
      if (!this.formCustom.numScore) { // 判断记分模式
        this.formCustom.numScore = 0
      }
      console.log(this.formCustom.numScore)
      this.SET_NUM_SCORE(this.formCustom.numScore) // 设置记分累计分值
    },
    // 图像自适应
    autoScreen (val) {
      this.$emit('changeZoom')
      this.setCanvasStyle(0)
      this.oldPosition = Object.assign({}, {
        oldLeft: 50,
        oldTop: 0
      })
    },

    // 缩放比例
    setCanvasStyle (val) {
      console.log('设置并绑定缩放值' + val)
      this.zoom = val
      // 往头部发送zoom比例
      this.$emit('changeZoom', this.zoom)
    },
    // 开启记分模式
    accountScore () {
      this.title = '持续记分模式'
      this.loading = false
      this.modal7 = true
    },
    // 确认删除所有标注
    ok () {
      const boxDivWrap = document.getElementById('wrap')
      boxDivWrap.innerHTML = '' // 清除所有节点
    },
    // 取消删除所有标注
    cancel () {
      // 测试渲染存储的imgData
      console.log(this.imgData)
      const x = 10
      const y = 10
      this.imgData.forEach(item => {
        this.myCanvasMark.putImageData(item, x + 20, y + 20)
      })
      this.$Message.info('Clicked cancel')
    },

    // 窗口改变，根据当前批阅模式改变画布
    setJudge (val) {
      for (let i = 0; i < val; i++) {
        this.$nextTick(() => {
          if (val > 1 && this.select !== 2) {
            this.w = (innerWidth - innerWidth / 24 * 4 - 120) / 2
            this.h = (innerHeight - 120) / 2
          } else if (val % 2 === 0) {
            this.w = (innerWidth - innerWidth / 24 * 4 - 120) / 2
            this.h = innerHeight - 120
          } else {
            this.w = innerWidth - innerWidth / 24 * 4 - 120
            this.h = innerHeight - 120
          }
        })
      }
    },
    // 放大画布
    clickBig () {
      if (this.zoom === 100) return
      this.zoom += 10
      // 往头部发送zoom比例
      this.$emit('changeZoom', this.zoom)
    },

    // 缩小画布
    clickSmall () {
      if (this.zoom === 0) return
      this.zoom -= 10
      // 往头部发送zoom比例
      this.$emit('changeZoom', this.zoom)
    }
  },
  computed: {
    ...mapState({ // 大题分数
      score: state => state.score,
      num_score: state => state.num_score,
      minScore () {
        if (this.dataInfo.result_info) {
          return -this.dataInfo.result_info.max_score
        }
      },
      maxScore () {
        if (this.dataInfo.result_info) {
          return this.dataInfo.result_info.max_score
        }
      }
    })
  },
  created () {
    bus.$on('change', (curpage, img) => {
      console.log(arguments, $('#box-score').val())
      // this.$emit('change', img)
      /* const val = document.getElementById('box-score').value / 1
      if (val <= 0) {
        document.getElementById('box-score').value = 0
      } else {
        document.getElementById('box-score').value = curpage
      }
      $('#box-score').val(curpage) */
    }) // 自定义标注事件 callback
  },
  mounted () {
    // 监听窗口是否改变
    window.addEventListener('resize', () => this.setJudge(this.select))
  },
  destroyed () {
  },
  setup (props, context) {
    console.log(arguments, 'setup-->props, context')
  }
}
</script>

<style scoped>
#myCanvas {
    /*width: 90%;*/
    /*height: 80%;*/
    background-color: #808695;
}

.global-score-dialog {
    height: calc(100vh - 100px);
}
</style>
