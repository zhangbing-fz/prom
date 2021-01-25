<comment>
# 包含 child 小题/打分组件
</comment>
<template>
    <div class="global-score-small">
        <Tabs
                :value="score_type"
                class="global-right"
                size="small"
                type="card"
                @on-click="$emit('selectScoreType',$event)"
        >
            <TabPane
                    :style="{
                        minHeight: '450px',
                    }"
                    label="正分"
                    name="score"
            >
                <div class="counter">
                    <input
                            id="box-score"
                            v-model="inputScore"
                            :style="{
                              textAlign:'right',
                              boxShadow: '0 0 7px rgb(0,0,0) inset'
                            }"
                            readOnly="true"
                            type="text"
                    >
                    <div class="numb" style="width: 100%">

                        <div class="numb-list">
                            <Row
                                    align="middle"
                                    justify="center"
                                    style="width: 100%; text-align: center"
                                    type="flex"
                            >
                                <Col span="5">小题</Col>
                                <Col span="9">分值</Col>
                                <Col span="10">操作</Col>
                            </Row>
                            <div
                                    v-for="(item,index) in sub_question"
                                    :key="index"
                                    :style="{
                                        padding: equipment ? '0' : '0',
                                        width: '100%'

                                    }"
                                    class="score-small-list"
                                    @click.capture="selectScoreList(item,index, $event)"
                            >
                                <Row justify="center">
                                    <Col span="5">
                                        <Icon v-if="equipment" type="ios-create-outline"/>
                                        <i>{{ item.sub_question_id | filterIndex }}</i>
                                        <span style="display: none">{{ MARK.toString().toLocaleUpperCase() }}</span>
                                    </Col>
                                    <Col span="9">
                                        <InputNumber
                                                :max="item.max_score"
                                                :min="item.min_score"
                                                :step="item.step"
                                                :value="item.value"
                                                size="small"
                                                style="width: 100%"
                                        />
                                        <!--{{item.mark1}}&#45;&#45;{{item.mark2}}-->
                                    </Col>
                                    <Col span="10" style="display: flex; justify-content: center">
                                        <Button
                                                :ghost="!item.mark1"
                                                class="btn-small-tag"
                                                size="small"
                                                style="margin-left: 2px;"
                                                type="success"
                                                @click="biggest(item,index)"
                                        >
                                            <Icon type="md-checkmark"/>
                                        </Button>
                                        <Button
                                                :ghost="!item.mark2"
                                                class="btn-small-tag"
                                                size="small"
                                                style="margin-left: 2px;"
                                                type="error"
                                                @click="minimum(item,index)"
                                        >
                                            <Icon type="md-close"/>
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            <Row justify="center" style="width: 100%" type="flex">
                                <Col span="11">
                                    <Button
                                            :ghost="!ghostRight"
                                            class="btn-small-tag"
                                            long
                                            style="margin-top: 10px"
                                            type="success"
                                            @click="setGhostRight"
                                    >全 对
                                    </Button>
                                </Col>
                                <Col span="2"></Col>
                                <Col span="11">
                                    <Button
                                            :ghost="!ghostWrong"
                                            class="btn-small-tag"
                                            long
                                            style="margin-top: 10px"
                                            type="error"
                                            @click="setGhostWrong"
                                    >全 错
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Divider
                            dashed
                            orientation="left"
                            size="small"
                    >样卷类型
                    </Divider>
                    <div style="padding: 0 10px 10px;">
                        <Checkbox
                                v-for="(item,index) in sample_info"
                                :key="index"
                                v-model="item.sample"
                                :value="item.flag"
                                @on-change="$emit('getSelect', item.sample,index)"
                        >{{ item.title }}
                        </Checkbox>
                    </div>
                    <!-- {{ sample_info.sample }}-->
                    <div style="padding: 10px;border-top: 1px dashed #e8eaec">
                        <Button
                                icon="ios-send" style="width:100%"
                                type="success"
                                @click="submitScoreAll"
                        >提交
                        </Button>
                    </div>

                </div>
            </TabPane>

            <!-- 负分模式 -->
            <TabPane
                    label="负分"
                    name="score-points"
                    style="min-height: 450px"
            >
                <div class="counter">
                    <input
                            id="box-score-points"
                            v-model="inputScore"
                            :style="{
                              textAlign:'right',
                              boxShadow: '0 0 7px rgb(0,0,0) inset'
                            }"
                            readOnly="true"
                            type="text"
                    >
                    <div
                            class="numb"
                            style="width: 100%"
                    >
                        <div class="numb-list">
                            <Row
                                    align="middle"
                                    justify="center"
                                    style="width: 100%; text-align: center"
                                    type="flex"
                            >
                                <Col span="5">小题</Col>
                                <Col span="9">分值</Col>
                                <Col span="10">操作</Col>
                            </Row>
                            <div
                                    v-for="(item,index) in sub_question"
                                    :key="index"
                                    :style="{
                                        padding: equipment ? '0' : '0',
                                        width: '100%'
                                    }"
                                    class="score-small-list"
                                    @click.capture="selectScoreList(item,index, $event)"
                            >
                                <Row justify="center">
                                    <Col span="6">
                                        <Icon v-if="equipment" type="ios-create-outline"/>
                                        <i>{{ item.sub_question_id | filterIndex }}</i>
                                        <span style="display: none">{{ MARK.toString().toLocaleUpperCase() }}</span>
                                    </Col>
                                    <Col span="8">
                                        <InputNumber
                                                :max="item.min_score"
                                                :min="-item.max_score"
                                                :step="item.step"
                                                :value="item.value"
                                                size="small"
                                                style="width: 100%"
                                        />
                                        <!--{{item.mark1}}&#45;&#45;{{item.mark2}}-->
                                    </Col>
                                    <Col span="10" style="display: flex; justify-content: center">
                                        <Button
                                                :ghost="!item.mark1"
                                                class="btn-small-tag"
                                                size="small"
                                                style="margin-left: 2px;"
                                                type="success"
                                                @click="biggest(item,index)"
                                        >
                                            <Icon type="md-checkmark"/>
                                        </Button>
                                        <Button
                                                :ghost="!item.mark2"
                                                class="btn-small-tag"
                                                size="small"
                                                style="margin-left: 2px;"
                                                type="error"
                                                @click="minimum(item,index)"
                                        >
                                            <Icon type="md-close"/>
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            <Row justify="center" style="width: 100%" type="flex">
                                <Col span="11">
                                    <Button
                                            :ghost="!ghostRight"
                                            class="btn-small-tag"
                                            long
                                            style="margin-top: 10px"
                                            type="success"
                                            @click="setGhostRight"
                                    >全 对
                                    </Button>
                                </Col>
                                <Col span="2"></Col>
                                <Col span="11">
                                    <Button
                                            :ghost="!ghostWrong"
                                            class="btn-small-tag"
                                            long
                                            style="margin-top: 10px"
                                            type="error"
                                            @click="setGhostWrong"
                                    >全 错
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Divider
                            dashed
                            orientation="left"
                            size="small"
                    >样卷类型
                    </Divider>
                    <div style="padding: 10px;border-top: 1px dashed #e8eaec; text-align: left;">
                        <Checkbox
                                v-for="(item,index) in sample_info"
                                :key="index"
                                v-model="item.sample"
                                :value="item.flag"
                                @on-change="$emit('getSelect',item.sample,index)"
                        >{{ item.title }}
                        </Checkbox>
                    </div>
                    <div style="padding: 10px;border-top: 1px dashed #e8eaec">
                        <Button
                                icon="ios-send"
                                style="width:100%"
                                type="success"
                                @click="submitScoreAll"
                        >提交
                        </Button>
                    </div>

                </div>
            </TabPane>

            <TabPane
                    disabled
                    label="计算"
                    name="score-count"
                    style="min-height: 450px"
            >
                <div
                        ref="score"
                        class="counter"
                        data-index="0"
                        data-inity="0"
                >
                    <input
                            id="box"
                            readOnly="true"
                            style="text-align:right;box-shadow: 0 0 7px rgb(0,0,0) inset;"
                            type="text"
                            value="0"
                    >
                    <div class="funct">
                        <!--<input id="division" type="button" value="/">
                        <input id="ride" type="button" value="*">-->
                        <div class="numb-l">
                            <input id="one" type="button" value="1" @click="figure('one')">
                            <input id="two" type="button" value="2" @click="figure('two')">
                            <input id="three" type="button" value="3" @click="figure('three')">
                            <input id="four" type="button" value="4" @click="figure('four')">
                            <input id="five" type="button" value="5" @click="figure('five')">
                            <input id="six" type="button" value="6" @click="figure('six')">
                            <input id="seven" type="button" value="7" @click="figure('seven')">
                            <input id="eight" type="button" value="8" @click="figure('eight')">
                            <input id="nine" type="button" value="9" @click="figure('nine')">
                            <input id="zero" type="button" value="0" @click="figure('zero')">
                            <input id="round" type="button" value="." @click="figure('round')">
                            <input id="res" type="reset" value="清空" @click="reset">
                        </div>
                        <div class="numb-r">
                            <input id="add" type="button" value="删除"></input>
                            <input id="reduce" type="button" value="满分">
                            <input id="sum" type="button" value="确定">
                        </div>
                    </div>
                    <div style="padding: 10px;border-top: 1px dashed #e8eaec">
                        <Button
                                icon="ios-send"
                                style="width:100%"
                                type="success"
                                @click="$emit('submitScore','box')"
                        >提交
                        </Button>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'global-score-small',
  components: {},
  data () {
    return {
      sub_question: [], // 渲染小题状态列表信息
      sub_question_active: [], // 选中的小题状态信息
      active_list: '', // 存储上一次小题选中的样式
      ghostRight: false,
      ghostWrong: false,
      inputScore: 0, // input框显示的分数
      oldSubQuestionBorder: '', // 存储上一次的小题选择框
      SubQuestionList: [],
      MARK: false,

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
      ] // 样卷类型 优秀/标准/较差

    }
  },
  filters: {
    // 拼接小题序号
    filterIndex (val) {
      return val < 10 ? '0' + val : val
    }
  },
  props: {
    dataInfo: {
      type: Object,
      required: true,
      validator () { // 验证器
        return typeof Object
      }
    }
  },
  watch: {
    dataInfo: {
      handler (val) {
        this.sub_question = val.result_info.childs
        this.sub_question_active = val.result_info.base64_imgs[0]
        this.sub_question.forEach(item => {
          item.value = 0
          item.mark1 = false
          item.mark2 = false
        })
      },
      deep: true,
      immediate: true
    },
    score_type () {
      this.inputScore = 0
      this.sub_question.forEach(item => {
        item.value = 0
        item.mark1 = false
        item.mark2 = false
      })
      this.ghostRight = false
      this.ghostWrong = false
    }
  },
  methods: {
    // 计算分数模式--->重置得分框
    reset () {
      const ele = document.getElementById('box')
      if (ele.value !== 0) {
        this.left = 0
        this.right = 0
        this.sum = 0
        this.numb = 0
        ele.value = '0'
      }
    },

    /**
         *
         *
         * @date: 2020/12/16 13:40
         * @description: item, index
         * @param {*} val
         * @param {*} i
         * @returns
         * @memberof 小题打勾
         */
    biggest (val, i) {
      console.log(this.SubQuestionList)
      if (this.score_type === 'score') {
        this.$set(val, 'value', val.max_score)
      } else if (this.score_type === 'score-points') {
        this.$set(val, 'value', val.min_score)
      }
      this.MARK = !this.MARK
      this.$set(val, 'mark1', true)
      this.$set(val, 'mark2', false)
      this.SubQuestionList[i] = []
      this.$nextTick(() => {
        this.SubQuestionList[i].push({
          score: val.value
        })
        // 小题分数列项回调
        this.totalScore(this.SubQuestionList)
        this.inputScore = [...this.SubQuestionList].reduce((pre, next) => {
          if (next) {
            if (next[0]) {
              pre = pre + next[0].score
            } else {
              pre = next[0].score
            }
          }
          return pre
        }, 0)
        this.$emit('setProjection', this.inputScore)
      })
    },

    // 提交
    submitScoreAll () {
      console.log(this.sub_question.some(item => item.mark1 === false && item.mark2 === false))
      if (this.sub_question.some(item => item.mark1 === false && item.mark2 === false)) {
        return this.$Modal.error({
          title: '警告',
          content: '批阅尚未结束，禁止提交！请确认是否选中【全对】【全错】或 逐项勾选 【 √ 】【 X 】'
        })
        /* console.log(this.$Modal.warning)
                return this.$Notice.error({
                  title: '警告',
                  desc: '批阅尚未完成，禁止提交！请确认是否选中【全对】【全错】或 逐项勾选 【 √ 】【 X 】'
                }) */
      }
      this.$emit('submitScore', 'box-score', this.sub_question)
      this.ghostWrong = false
      this.ghostRight = false
      this.inputScore = 0
    },
    /**
         *
         *
         * @date: 2020/12/16 13:40
         * @description: item, index
         * @param {*} val
         * @param {*} i
         * @returns
         * @memberof 小题打叉
         */
    minimum (val, i) {
      console.log(this.score_type)
      if (this.score_type === 'score') {
        this.$set(val, 'value', val.min_score)
      } else if (this.score_type === 'score-points') {
        this.$set(val, 'value', -val.max_score)
      }
      this.MARK = !this.MARK
      this.$set(val, 'mark1', false)
      this.$set(val, 'mark2', true)
      this.SubQuestionList[i] = []
      this.SubQuestionList[i].push({
        score: val.value
      })
      this.$nextTick(() => {
        console.log(this.SubQuestionList)
        this.totalScore(this.SubQuestionList)
        this.inputScore = [...this.SubQuestionList].reduce((pre, next) => {
          if (next) {
            if (next[0]) {
              pre = pre + next[0].score
            } else {
              pre = next[0].score
            }
          }
          return pre
        }, 0)
        console.log(this.inputScore)
        this.$emit('setProjection', this.inputScore)
      })

      // 小题分数列项回调
      // this.$nextTick(() => {
      //   this.totalScore(this.SubQuestionList)
      //   this.submitScore = [...this.SubQuestionList].reduce((pre, next) => pre + next[0].score, 0)
      //   this.$emit('setProjection', this.submitScore)
      // })
    },
    // 全对
    setGhostRight () {
      this.inputScore = 0
      if (this.score_type === 'score') {
        this.$emit('setProjection', this.score)
        this.sub_question.forEach((item, i) => {
          this.inputScore += item.max_score
          item.value = item.max_score
        })
      } else if (this.score_type === 'score-points') {
        this.$emit('setProjection', 0)
        this.sub_question.forEach((item, i) => {
          this.inputScore += item.min_score
          item.value = item.min_score
        })
      }
      this.ghostRight = true
      this.ghostWrong = false
      this.sub_question.forEach((item, i) => {
        item.mark1 = true
        item.mark2 = false
        this.SubQuestionList[i] = []
        this.SubQuestionList[i].push({
          score: item.value
        })
      })
    },
    // 全错
    setGhostWrong () {
      this.inputScore = 0
      if (this.score_type === 'score') {
        this.$emit('setProjection', 0)
        this.sub_question.forEach(item => {
          this.inputScore += item.min_score
          item.value = 0
        })
      } else if (this.score_type === 'score-points') {
        this.$emit('setProjection', -this.score)
        this.sub_question.forEach(item => {
          this.inputScore += -item.max_score
          item.value = -item.max_score
        })
      }
      this.ghostWrong = true
      this.ghostRight = false
      this.sub_question.forEach((item, i) => {
        item.mark1 = false
        item.mark2 = true
        this.SubQuestionList[i] = []
        this.SubQuestionList[i].push({
          score: item.value
        })
      })
    },
    /**
         *
         *
         * @date: 2020/12/16 13:39
         * @description: 最终所有小题列项的长度和打分项的数组长度相等，分数相加
         * @param {*} val
         * @returns
         * @memberof 最终提交的分数
         */
    totalScore (val) {
      console.log(val)
      if ([...val].every(item => item !== undefined) && this.SubQuestionList.length === this.sub_question_active.length) {
        this.submitScore = [...val].reduce((pre, next) => pre + next[0].score, 0)
      }
      this.ghostRight = this.sub_question.every(item => item.mark1 === true)
      this.ghostWrong = this.sub_question.every(item => item.mark2 === true)
    },
    /**
         *
         *
         * @date: 2020/12/9 11:26
         * @description: 描述
         * @param {*} val 当前小题数据
         * @param {*} i 当前小题索引
         * @param {*} e 事件源
         * @returns
         * @memberof No such property: code for class: Script1
         */
    selectScoreList (val, i, e) {
      // if (this.sub_question_active.sub_question_areas[i]) {
      let ele = e.target
      // 获取标注工具外框
      const boxDivWrap = document.getElementById('wrap')
      const div = document.createElement('div')
      console.log(this.oldSubQuestionBorder, this.sub_question_active.sub_question_areas[i], boxDivWrap)
      if (this.oldSubQuestionBorder && this.sub_question_active.sub_question_areas[i]) {
        boxDivWrap.removeChild(this.oldSubQuestionBorder)
      }
      if (this.sub_question_active.sub_question_areas[i]) {
        div.style.cssText = `
          border: 2px solid red;
          width: ${this.sub_question_active.sub_question_areas[i].w * (this.equipment ? 0.93 : 0.7)}px;
          height:${this.sub_question_active.sub_question_areas[i].h * (this.equipment ? 0.93 : 0.7)}px;
          position: absolute;
          z-index: 99;
          animation: bordersilde;
          top: ${(this.sub_question_active.sub_question_areas[i].y - this.sub_question_active.y) * (this.equipment ? 0.93 : 0.7)}px;
          left: ${(this.sub_question_active.sub_question_areas[i].x - this.sub_question_active.x) * (this.equipment ? 0.93 : 0.7)}px

      `
        this.oldSubQuestionBorder = div
        boxDivWrap.appendChild(div)
      }

      while (!ele.classList.contains('score-small-list')) {
        ele = ele.parentNode
      }
      if (this.active_list) {
        this.active_list.classList.remove('active')
      }
      ele.classList.add('active')
      this.active_list = ele
    },
    /**
         *
         *
         * @date: 2020/12/14 14:01
         * @description: 存在小题列项时，累计叠加小题inputNumber总和
         * @returns
         * @memberof 小题总分计算
         */
    getSubQuestionCount () {
      console.log(this.sub_question)
    },
    // 计算分数模式--->按键事件
    figure (id) {
      const box = document.getElementById('box')
      // 判断被除数是否有值
      if (this.left === 0) {
        // 改变value默认值
        if (box.value === '0') {
          box.value = document.getElementById(id).value
        } else {
          box.value += document.getElementById(id).value
        }
      } else {
        box.value += document.getElementById(id).value
        console.log(box.value)
        const str = box.value
        var num = ''
        // 获取第二次输入的数字
        for (let i = 0; i < str.length; i++) {
          // 判断加减乘除
          if (str[i] === '+') {
            for (let j = i + 1; j < str.length; j++) {
              num += str[j]
            }

            this.right = parseFloat(num)
          } else if (str[i] === '-') {
            for (let j = i + 1; j < str.length; j++) {
              num += str[j]
            }

            this.right = parseFloat(num)
          } else if (str[i] === '*') {
            for (let j = i + 1; j < str.length; j++) {
              num += str[j]
            }

            this.right = parseFloat(num)
          } else if (str[i] === '/') {
            for (let j = i + 1; j < str.length; j++) {
              num += str[j]
            }

            this.right = parseFloat(num)
          }
        }
      }

      // 清空所有数据
      if (this.sum !== 0) {
        this.left = 0
        this.right = 0
        this.sum = 0
        this.numb = 0
        $('box').value = $(id).value
      }
    }
  },
  computed: {
    ...mapState({
      score_type: state => state.score_type, // 打分模式
      equipment: state => state.equipment, // 用户端
      score: state => state.scoreinfo.score // 分数
    })

  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>
.global-score-small {
    height: 90vh;
    overflow-y: scroll;
    z-index: 99;

    .score-small-list {
        line-height: 3;
        border-bottom: 1px dashed #ddd;
        position: relative;
        padding: 0 10px 0 10px;

        & .ivu-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        span {
            z-index: 1;
            display: flex;
            justify-content: start;
            align-items: center;
        }

        &:hover {
            cursor: pointer;
            transition: all 0.3s ease-in-out;

            > span:first-child {
                > i {
                    transition: all 0.3s ease-in-out;
                    transform: translateX(-5px);
                    font-weight: bold;
                }
            }

            &::before {
                content: '';
                height: 42px;
                width: 100%;
                transition: all 0.3s ease-in-out;
                position: absolute;
                left: 0;
                z-index: 0;
                opacity: 1;
                background-color: #e9e9e9;
            }
        }

        &::before {
            content: '';
            height: 42px;
            width: 0;
            position: absolute;
            left: 0;
            z-index: 0;
            opacity: 0.5;
            transition: all 0.3s ease-in-out;
            background-color: #e9e9e9;
        }

        //&:focus{
        //    background-color: #e9e9e9;
        //}
        //&:active{
        //    background-color: #e9e9e9;
        //}
        &.active {
            background-color: #dcdee2;
            border-bottom: none;
            font-weight: bold;

            > span:first-child {
                > i {
                    color: white;
                    transform: translateX(-5px);
                }
            }
        }

        .btn-small-tag {
            box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)
        }
    }

    .btn-small-tag {
        box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)
    }
}

</style>
<style>
@keyframes bordersilde {
    from {
        width: 0;
    }
    to {
        width: 200px;
    }
}

.ivu-input-number-handler-wrap {
    opacity: 1;
}
</style>
