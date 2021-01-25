<comment>
# 仲裁打分
</comment>
<template>
    <div class="global-score">
        <!-- 头部标题 begin -->
        <global-header-admin>
            <template v-slot>
                <span style="color: red">【 仲裁评分 】</span>
            </template>
        </global-header-admin>
        <Row style="position: absolute; left: 100px; top: 8px">
            <Col span="24">
                <Form>
                    <FormItem
                            label="评分记录"
                            style="width: 280px"
                    >
                        <Select
                                v-model="model1"
                                style="width:200px"
                        >
                            <Option v-for="(item,index) in records"
                                    :key="index"
                                    :value="index">{{ item.name }}--{{ item.time }}--{{ item.score }}分
                            </Option>
                        </Select>
                    </FormItem>
                </Form>
            </Col>
        </Row>
        <Row>
            <Col span="20" style="overflow: hidden;">
                <!-- 画布和工具栏集合 -->
                <global-score-dialog
                        :dataInfo="dataInfo"
                        :modal="modal7"
                        :select="select"
                        :zoom="zoom"
                        @beginTime="sec=$event"
                        @change="makes=$event"
                        @changeZoom="zoom=$event"
                />
            </Col>
            <Col span="4">
                <div class="global-right">
                    <!-- 右侧随屏浮动框 -->
                    <global-status-bar
                            @setScore="setScore"
                    />

                    <!-- 打分框组件 -->
                    <global-score-box
                            @changeSingle="single=$event"
                            @getSelect="getSelect"
                            @selectScoreType="selectScoreType"
                            @setProjection="setProjection"
                            @submitScore="submitScore"
                    />
                </div>
            </Col>
        </Row>
        <!-- 试题异常弹窗 -->
        <modal-error
                :loading="loading"
                :modal="modal6"
                :title=title
                :titleContent=titleContent
                @asyncCancel="modal6=false"
                @asyncOK="asyncOK"
        />
    </div>
</template>

<script>
import { bus } from '@/main.js' //
import error from '../../components/popup/base-popup-error'
import { mapState } from 'vuex'
import scoreBox from '../../components/base/global-score-box'

export default {
  name: 'score-box-arbitration',
  components: {
    'modal-error': error,
    // eslint-disable-next-line vue/no-unused-components
    'global-score-box': scoreBox

  },
  data () {
    return {
      URL: '/score_api',
      // 样卷类型 优秀/标准/较差
      sample_info: [
        {
          sample: false,
          title: '优秀',
          flag: 'excellent'
        },
        {
          sample: false,
          title: '标准',
          flag: 'typical'
        },
        {
          sample: false,
          title: '较差',
          flag: 'bad'
        }
      ],
      single: false, // 一次性提交
      title: '', // 警告弹框标题
      titleContent: '', // 警告弹框内容
      modal6: false, // 退出登录弹框
      loading: true, // 退出登录loading
      modal7: true, // 隐藏/显示工具栏
      fullscreen: false, // 全屏开关
      zoom: -1, // 缩放比例
      select: 1, // 批阅模式 / 模式

      mark: false,
      oldX: 0,
      oldY: 0,
      newX: 0,
      newY: 0,

      ele: null,
      left: 0, // 被除数
      right: 0, // 除数
      sum: 0, // 和
      numb: 0, // 此变量用来限制点的输入
      dataInfo: {}, // 回评试卷的数据
      records: [], // 评分记录
      model1: 0, // 默认显示的打分记录
      sec: 0 // 打分计时
    }
  },
  props: {},
  watch: {},
  methods: {
    // 关闭 / 显示警告弹框
    asyncOK () {
      this.modal6 = false
    },

    // 监听是否全屏
    checkFull () {
      // 判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      // 火狐浏览器
      // 谷歌浏览器及Webkit内核浏览器
      let isFull = document.mozFullScreen || document.fullScreen || document.webkitIsFullScreen || document.webkitRequestFullScreen || document.mozRequestFullScreen || document.msFullscreenEnabled
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    },

    // 全屏事件
    handleFullScreen () {
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },

    /**
         * 1、接收分数
         * 2、执行打分动画
         * 3、清空unput框
         * @date: 2020/11/30 11:24
         * @description: 获取批阅任务
         * @returns
         */
    setScore () {
      this.questionsLoading = true
      this.getData('/scan_project/score_api', {
        entry: 'score_api',
        service_name: 'view_leader_queue',
        id: this.$route.query.ID / 1,
        queue_id: this.$route.query.queue_id / 1
      }).then(res => {
        console.log(res)
        setTimeout(() => {
          if (res.result_code !== '00') {
            this.modal6 = true
            this.title = '注意'
            this.titleContent = res.result_info
          }
          // eslint-disable-next-line no-unused-vars
          const boxDivWrap = document.getElementById('wrap')
          boxDivWrap.innerHTML = '' // 清除所有节点
          this.dataInfo = res
          this.ID = res.result_info.id
          this.questionsLoading = false
        }, 500)
      })
    },
    /**
         *
         *
         * @date: 2020/11/30 10:57
         * @description:
         * @param {*} val 最终分数
         * @returns
         */
    scoreAnimation (val, id) {
      // 打分动画
      const div = document.createElement('div')// 添加打分动画节点
      div.style.cssText = `
                  position: absolute;
                  bottom: 50%;
                  right: 50%;
                  font-size: 100px;
                  color: red;
                  transition: 0.3s ease-in-out;
                  opacity: 1;
                  transform: scale(1.5)`
      div.innerText = val
      document.body.removeChild(document.body.lastElementChild) // 清除打分动画节点
      document.body.appendChild(div)
      setTimeout(() => {
        div.style.cssText = `
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    font-size: 100px;
                    color: red;
                    transition: 0.3s ease-in-out;
                    opacity: 0;
                    transform: scale(1)`
        setTimeout(() => {
          // true 为string 未勾选一键提交，
          // false 为number 勾选一键提交
          console.log('是否勾选一键提交', Boolean(typeof id === 'string'))
          if (typeof id === 'string') {
            // 没有勾选一键提交，打分完成之后清空input
            document.getElementById(id).value = 0 // 重置打分框
          }
        }, 50)
      }, 450)
      const data = {
        entry: 'score_api',
        id: this.ID,
        score: val.toString(),
        service_name: 'apply_leader_score',
        has_child: false,
        childs: [],
        marks: JSON.parse(localStorage.getItem('question_score_tag')), // 当前试题批注标记
        excellent_flag: this.sample_info[1].sample, // 标准样卷
        bad_flag: this.sample_info[2].sample, // 较差样卷
        to_leader: this.menu_mark,
        to_leader_cause: '', // 疑问卷
        typical_flag: this.sample_info[0].sample, // 优秀样卷
        sec: parseInt((new Date() - this.sec) / 1000)
      }
      console.log('本题打分用时/秒', parseInt((new Date() - this.sec) / 1000))
      this.getData('/scan_project/score_api', data)
        .then(res => {
          this.validation(res)
          this.setScore()
        })
    },
    /**
         *
         *
         * @date: 2020/11/30 17:16
         * @description: 设置打分模式
         * @param {*} val 记分模式type
         * @returns
         * @memberof No such property: code for class: Script1
         */
    selectScoreType (val) {
      this.$store.commit('SET_SCORE_TYPE', val)
    },
    /**
         *
         *
         * @date: 2020/11/30 11:17
         * @description: 提交分数
         * @param {*} id
         * @param {*} event
         * @returns
         */
    submitScore (id) {
      console.log(id, 'id')
      const ele = document.querySelectorAll('.continuous-score')
      const arr = []
      let endScore = null // 存储持续标分的计算结果值
      let val = 0 // 最终提交的分数
      // 设置变量存储是否为持续标分/还是标注
      const markScore = Array.from(ele).every(item => item.value !== '')
      if (markScore) { // 标记并且标分
        for (const { value } of ele) {
          arr.push(value / 1)
        }
        // 迭代最终持续标分总计
        endScore = arr.reduce((total, item, index, arr) => total + item, 0) // 获取标注的合计分数
      } else { // 仅作标记
        // alert('仅仅作为标记')
      }
      if (!markScore) {
        // alert('持续标分发现无效标记')
      }
      console.log('持续标分', arr, Boolean(markScore), endScore, markScore)
      if (endScore) { // 合计分数不等于0（持续标分）
        alert('持续标分得分结果' + endScore)
        this.$Modal.confirm({
          title: '提醒',
          content: `${endScore} 提交持续标分最终计算分数`,
          onOk: () => {
            console.log(endScore)
            val = endScore
          },
          onCancel: () => {
            return console.log('取消打分')
          }
        })
      } else { // 正分模式或负分模式打分(点击记分按钮)
        if (typeof id === 'string') { // 判断是否传入的为ID String，否则为具体分数 Number
          val = document.getElementById(id).value / 1
        } else if (typeof id === 'number') {
          val = id
        }
        if (this.score_type === 'score-points') { // 如果是负分模式
          val = this.score + val
        }
        this.$Modal.confirm({
          title: '提醒----',
          content: `${val} 提交持续标分最终计算分数`
        })
      }
      // 执行打分动画callback
      this.scoreAnimation(val, id)
    },
    /**
         * @作者: 张兵
         =     * @date: 2020/8/31 11:47
         * @description: 判断当前是正分还是负分模式
         * @return:
         */
    setProjection (val) {
      console.log('按键分数', val, this.single)
      if (this.score_type === 'score') {
        if (this.single) {
          // 勾选----->一次性提交
          this.submitScore(val)
        } else {
          // 未勾选----->赋值按钮值给input框
          document.getElementById('box-score').value = val
        }
      } else if (this.score_type === 'score-points') {
        if (this.single) {
          // 勾选----->一次性提交
          this.submitScore(val)
        } else {
          // 未勾选----->赋值按钮值给input框
          document.getElementById('box-score-points').value = val
        }
      }
    },
    /**
         *
         *
         * @date: 2020/12/1 09:47
         * @description: 修改并记录样卷类型状态
         * @param {*} val 子组件样卷状态
         * @param {*} i 样卷类型的索引
         * @returns
         * @memberof No such property: code for class: Script1
         */
    getSelect (val, i) {
      this.sample_info.forEach((item, index) => {
        if (index === i) {
          item.sample = val
        }
      })
    },
    /**
         *
         *
         * @date: 2020/12/1 16:49
         * @description: 初始化仲裁试卷
         * @param {*} type
         * @param {*} event
         * @returns
         */
    initQuestionArbitr () {
      const data = {
        entry: 'score_api',
        service_name: 'view_leader_queue',
        id: this.$route.query.ID / 1,
        queue_id: this.$route.query.queue_id / 1
      }
      this.getData('/scan_project/score_api', data).then(res => {
        // console.log(res)
        this.dataInfo = res
        this.records = res.result_info.records // 评分记录 select选择框
        this.$store.commit('SET_QUESTION_ID', res.result_info.id) // 设置题目ID
      })
    }
  },
  computed: {
    ...mapState({ // 大题分数
      score: state => state.scoreinfo.score,
      score_type: state => state.score_type, // 打分模式
      avg_score: state => state.avg_score, // 平均分值
      score_count: state => state.score_count, // 累计批阅数量
      menu_mark: state => state.menu_mark.mark_personnel, // 是否是管理员登录
      base64imgs_info: state => state.base64imgs_info // 小题坐标信息
    })
  },
  created () {
    // console.log(bus)
    bus.$on('change', (curpage) => {
      document.getElementById('box-score').value = curpage
    }) // 自定义标注事件 callback
    window.addEventListener('resize', () => {
      if (!this.checkFull()) {
        // 退出全屏后要执行的动作
        console.log('退出全屏')
        this.fullscreen = false
      }
    })
  },
  mounted () {
    this.initQuestionArbitr() // 初始化仲裁试卷
  },
  setup (props, context) {
    console.log(props, context)
  }
}
</script>

<style lang="less">
ul, li {
    list-style: none;
}

button {
    outline: none;
}

/********************* 工具栏 *********************/
.global-right {
    width: initial;
    padding: 10px 5px;
}

/* 主体 */
.counter {
    width: 100%;
    height: auto;
    background-color: #f8f8f9;
    border: 1px solid #e8eaec;
    border-radius: 5px;
    margin: 0;
    text-align: left;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, .15);
}

/* 显示框 */
#box, #box-score, #box-score-points {
    height: 70px;
    width: calc(100% - 20px);
    background-color: #464646;
    border: none;
    margin: 10px;
    font: 700 40px/70px "微软雅黑";
    color: #ffffff;
    padding-right: 10px;
}

/* 功能区 */
.funct {
    display: flex;
    justify-content: space-between;

}

/* 按钮样式 */
.funct input {
    height: 36px;
    width: 36px;
    margin: 5px;
    font: 400 12px/3.6vh "微软雅黑";
    cursor: pointer;
    border: 1px solid #808695;
    border-radius: 3px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
}

.funct input:active {
    background-color: #42b983;
}

/* 等于号位置 */
#sum {
    //height: 90px;
    //right: 20px;
    //bottom: 0px;
}

/* 数字区 */
.numb-l {
    width: 70%;
    padding-left: 10px;
}

.numb-r {
    width: 30%;
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    flex-wrap: nowrap;
}

.numb-r input {
    margin: 5px 0;
}

/* 得分面板 */
.numb-list {
    width: 100%;
    padding: 10px 5px;
    display: flex;
    justify-content: left;
    flex-direction: initial;
    flex-wrap: wrap;
}

.ivu-tabs-bar {
    border-bottom: none;
    margin-bottom: 0;
}

.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
    from {
        transform: rotate(0deg)
    }
    50% {
        transform: rotate(180deg)
    }
    to {
        transform: rotate(360deg)
    }
}
</style>
