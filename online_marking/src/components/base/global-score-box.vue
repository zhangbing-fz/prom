<comment>
# 打分框
</comment>
<template>
    <div class="global-score-box">
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
                            readOnly="true"
                            style="text-align:right;box-shadow: 0 0 7px rgb(0,0,0) inset;"
                            type="text"
                            value="0"
                    >
                    <div class="numb" style="width: 100%">

                        <div class="funct numb-list">
                            <input
                                    v-for="(item,index) in newScore"
                                    :key="index"
                                    :value="item"
                                    type="button"
                                    @click="$emit('setProjection',item)"
                            >
                            <input
                                    type="button"
                                    value="满分"
                                    @click="$emit('setProjection',score)"
                            >
                        </div>
                    </div>
                    <div style="padding: 10px;border-top: 1px dashed #e8eaec">
                        <Checkbox
                                v-model="single"
                                @on-change="$emit('changeSingle', $event)"
                        >一键提交
                        </Checkbox>
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
                                :disabled="single"
                                icon="ios-send" style="width:100%"
                                type="success"
                                @click="$emit('submitScore','box-score')"
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
                            :style="{
                              textAlign:'right',
                              boxShadow: '0 0 7px rgb(0,0,0) inset'
                            }"
                            readOnly="true"
                            type="text"
                            value="0">
                    <div
                            class="numb"
                            style="width: 100%"
                    >
                        <div class="funct numb-list">
                            <input
                                    v-for="(item,index) in newScore"
                                    :key="index"
                                    :value="-item"
                                    type="button"
                                    @click="$emit('setProjection',-item)"
                            >
                        </div>
                    </div>
                    <div style="padding: 10px;border-top: 1px dashed #e8eaec; text-align: left;">
                        <Checkbox
                                v-model="single"
                                @on-change="$emit('changeSingle', $event)"
                        >一键提交
                        </Checkbox>
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
                                :disabled="single"
                                icon="ios-send"
                                style="width:100%"
                                type="success"
                                @click="$emit('submitScore','box-score-points')"
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
                        data-inity="0">
                    <input
                            d="box" readOnly="true"
                            style="text-align:right;box-shadow: 0 0 7px rgb(0,0,0) inset;"
                            type="text" value="0"
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
import $ from 'jquery'
import { bus } from '@/main.js'
import { mapState } from 'vuex'

export default {
  name: 'global-score-box',
  components: {},
  data () {
    return {
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
      ], // 样卷类型 优秀/标准/较差
      single: false, // 一次性提交

      left: 0, // 被除数
      right: 0, // 除数
      sum: 0, // 和
      numb: 0// 此变量用来限制点的输入
    }
  },
  props: {},
  watch: {},
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
      score: state => state.scoreinfo.score,
      score_type: state => state.score_type, // 打分模式
      step: state => state.scoreinfo.step, // 打分步长
      // 记分面板
      newScore () {
        const ele = this.score / this.step
        const arr = []
        let num = 0
        for (let i = 0; i <= ele; i++) {
          arr.push(num)
          num += this.step
        }
        return arr
      }
    })
  },
  created () {
    bus.$on('change', (curpage) => {
      // document.getElementById('box-score').value = curpage
      // $('#box-score').val(curpage)
    }) // 自定义标注事件 callback
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
    /*height: 90 px;*/
    /*right: 20 px;*/
    /*bottom: 0 px;*/
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

</style>
<style>
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
