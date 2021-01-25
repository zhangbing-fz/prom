<comment>
# 组卷中心/试题篮详情
</comment>
<template>
    <div class="question-basket">
        <div
                :style="{
                display: 'flex',
                justifyContent: 'space-between'
            }"
        >
            <div style="width: 340px">
                <!-- 试卷基本操作 -->
                <div class="question-tool-top">
                    <ul>
                        <li @click="popupInfo.modal=true">
                            <Icon type="ios-copy-outline"/>
                            试卷分析
                        </li>
                        <li>
                            <Icon type="ios-bookmark-outline"/>
                            保存试卷
                        </li>
                        <li
                                @click="$router.push({
                                path: '/question_sheet'
                            })"
                        >
                            <Icon type="ios-cloud-download-outline"/>
                            下载答题卡
                        </li>
                    </ul>
                    <Button
                            long
                            size="large"
                            type="info"
                            @click.native="downloads"
                    >
                        <Icon type="ios-cloud-download-outline"/>
                        下载试卷
                    </Button>
                </div>
                <!-- 试卷配置 -->
                <div class="question-tool-center">
                    <h3>试卷配置</h3>
                    <div>
                        <h4>试卷模式:</h4>
                        <RadioGroup
                                v-model="questionToolInfo.questionAllot.type"
                                @on-change="getRadio($event)"
                        >
                            <Radio
                                    v-for="item in questionToolInfo.questionAllot.typeList"
                                    :key="item.value"
                                    :label="item.label"
                            >{{ item.label }}
                            </Radio>
                        </RadioGroup>
                    </div>
                    <div ref="">
                        <div
                                :style="{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }"
                        >高级设置
                            <i-switch
                                    size="large"
                                    :value="selectMark"
                                    @on-change="selectMark=!selectMark"
                            >
                                <span slot="open">展开</span>
                                <span slot="close">收起</span>
                            </i-switch>
                        </div>
                        <ul
                                :style="{
                                    height: selectMark?'auto':0,
                                    overflow: selectMark?'auto':'hidden',
                                }"
                        >
                            <li
                                    v-for="(item,index) in questionToolInfo.questionAllot.seniorList"
                                    :key="index"
                            >
                                <!-- @on-change="getCheckbox(index)" -->
                                <CheckboxGroup
                                        v-model="questionToolInfo.questionAllot.seniorModel"
                                >
                                    <Checkbox
                                            :label="item.value"
                                    >{{ item.label }}
                                    </Checkbox>
                                </CheckboxGroup>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- 试卷结构设置 -->
                <div class="question-tool-bottom">
                    <h3>试卷结构设置</h3>
                    <div class="content">
                        <div class="top">
                            <p>
                                总题数：<span>{{ shoppingList.length }}</span>
                            </p> |
                            <p>
                                总分：<span>{{ shoppingInfo.totalScore }}</span>
                            </p> |
                            <p>
                                难度：<span>中等</span>
                            </p>
                        </div>

                        <ul
                                ref="refPosition"
                                :style="{
                                    minHeight: `${150*shoppingInfo.type.length}px`
                                }"
                        >
                            <li
                                    v-for="(item,index) in shoppingInfo.type"
                                    :key="index"
                                    data-inity="0"
                                    @mousedown="mouseMove($event, index)"
                            >
                                <h4 class="title">
                                    {{ index | toChinesNum }}、{{ item.qtpye }}
                                    <span>
                                    <Button
                                            size="small"
                                            @click.capture="popupInfo.modal2=true"
                                    >排序</Button>
                                    <Button
                                            size="small"
                                            type="error"
                                            @click.capture="removeQuestionList($event)"
                                    >删除</Button>
                                </span>
                                </h4>
                                <div class="context">
                                <span
                                        v-for="(ele,i) in shoppingInfo.list[index]"
                                        :key="i"
                                        :style="{
                                            cursor: 'pointer',
                                        }"
                                        @click="selectQuestionNum($event,i, shoppingInfo.list[index])"
                                >{{ ++i }}</span>
                                </div>
                            </li>
                        </ul>
                        <div class="button">
                            <Button
                                    :to="{path:'/my_question'}"
                                    type="info"
                            >
                                <Icon type="md-add"/>
                                继续加题
                            </Button>
                            <Button
                                    style="margin-left: 10px"
                                    type="default"
                                    @click.native="removeQuestionList($event)"
                            >
                                <Icon type="ios-trash"/>
                                清空试卷
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                    :style="{
                    width: '100%',
                }"
            >
                <div
                        ref="questionContext"
                        class="question-context"
                >
                    <div
                            v-if="questionToolInfo.questionAllot.seniorModel.some(item=> item === 'gutter')"
                            class="question-context-left"
                    >
                        学校：____________ 班级：____________ 姓名：____________ 考号：____________
                    </div>
                    <div
                            :style="{
                        marginLeft : questionToolInfo.questionAllot.seniorModel.some(item=> item === 'gutter') ? '50px': '10px',
                        borderLeft: questionToolInfo.questionAllot.seniorModel.some(item=> item === 'gutter') ? '1px dashed #999': 'none'}"
                            class="question-context-right"
                    >
                        <div
                                v-if="questionToolInfo.questionAllot.seniorModel.some(item=> item === 'secret_tag')"
                                class="-title-top"
                                @mouseenter="setMouseenter('secret_tag')"
                                @mouseleave="setMouseleave('secret_tag')"
                        >
                            <h4
                                    v-show="!markInfo.secret_tag"
                                    :style="{
                                        paddingLeft: '8px',
                                    }"
                            >绝密★启用前</h4>
                            <input
                                    v-show="markInfo.secret_tag"
                                    :style="{
                                        paddingLeft: 0,
                                    }"
                                    type="text"
                                    value="绝密★启用前"/>
                        </div>
                        <div
                                v-if="questionToolInfo.questionAllot.seniorModel.some(item=> item === 'name')"
                                class="main-title"
                                @mouseenter="setMouseenter('name')"
                                @mouseleave="setMouseleave('name')"
                        >
                            <h2 v-show="!markInfo.name">{{ questionTitle }}</h2>
                            <input
                                    v-show="markInfo.name"
                                    v-model="questionTitle"
                                    :style="{
                                        textAlign: 'center',
                                    }"
                                    type="text"/>
                        </div>
                        <div
                                v-if="questionToolInfo.questionAllot.seniorModel.some(item=> item === 'subtitle')"
                                class="vice-title"
                                @mouseenter="setMouseenter('subtitle')"
                                @mouseleave="setMouseleave('subtitle')"
                        >
                            <h4 v-show="!markInfo.subtitle">{{ questionSubTitle }}</h4>
                            <input
                                    v-show="markInfo.subtitle"
                                    v-model="questionSubTitle"
                                    :style="{
                                        textAlign: 'center',
                                    }"
                                    type="text"/>
                        </div>
                        <div
                                v-if="questionToolInfo.questionAllot.seniorModel.some(item=> item === 'paper_info')"
                                class="-time"
                                @mouseenter="setMouseenter('paper_info')"
                                @mouseleave="setMouseleave('paper_info')"
                        >
                            考试总分：12 分 考试时间：
                            <span v-show="!markInfo.paper_info">120</span>
                            <input
                                    v-show="markInfo.paper_info"
                                    :style="{
                                        width: '50px',
                                        textAlign: 'left',
                                        padding: 0,
                                        height: '20px',
                                    }"
                                    min="0"
                                    type="number"
                                    value="120"
                            > 分钟
                        </div>
                        <div
                                v-if="questionToolInfo.questionAllot.seniorModel.some(item=> item === 'cand_info')"
                                style="padding: 10px 0;"
                                @mouseenter="setMouseenter('cand_info')"
                                @mouseleave="setMouseleave('cand_info')"
                        >
                            <span v-show="!markInfo.cand_info">
                                学校：__________ 班级：__________ 姓名：__________ 考号：__________
                            </span>
                            <input
                                    v-show="markInfo.cand_info"
                                    style="text-align: center"
                                    type="text"
                                    value="学校：__________ 班级：__________ 姓名：__________ 考号：__________"/>
                        </div>
                        <div
                                v-if="questionToolInfo.questionAllot.seniorModel.some(item=> item === 'attentions')"
                                @mouseenter="setMouseenter('attentions')"
                                @mouseleave="setMouseleave('attentions')">
                            <p
                                    v-show="!markInfo.attentions"
                                    class="-warning"
                            >
                                注意事项：<br>
                                1．答题前填写好自己的姓名、班级、考号等信息;<br>
                                2．请将答案正确填写在答题卡上;
                            </p>
                            <textarea
                                    v-show="markInfo.attentions"
                                    cols="30"
                                    rows="10"
                                    style="height: 100px; padding: 10px"
                                    v-html="'注意事项：\n'+'1．答题前填写好自己的姓名、班级、考号等信息;\n'+'2．请将答案正确填写在答题卡上;'"/>
                        </div>

                        <!-- 试卷正题 -->
                        <div
                                ref="refContent"
                                class="context"
                        >
                            <template>
                                <div
                                        v-for="(ele,i) in shoppingInfo.type"
                                        :key="i"
                                        class="-context">
                                    <div
                                            v-if="questionToolInfo.questionAllot.seniorModel.some(item=> item === 'volumes')"
                                            class="context-question-title"
                                            @mouseenter="shoppingInfo.marksTitle[i]=true"
                                            @mouseleave="shoppingInfo.marksTitle[i]=false"
                                    >
                                        <h3
                                                v-show="!shoppingInfo.marksTitle[i]"
                                        >
                                            卷{{ i|toI }}（{{ shoppingInfo.title[i] }}）</h3>
                                        <input
                                                v-show="shoppingInfo.marksTitle[i]"
                                                v-model="shoppingInfo.title[i]"
                                                :style="{
                                                    textAlign: 'center'
                                                }"
                                                type="text"/>
                                    </div>
                                    <div class="context-question-list">
                                        <div
                                                v-if="questionToolInfo.questionAllot.seniorModel.some(item=> item === 'blocks')"
                                                class="-title"
                                                @mouseenter="shoppingInfo.marks[i] = true"
                                                @mouseleave="shoppingInfo.marks[i] = false"
                                        >
                                            <h4>{{ i | toChinesNum }}、{{ ele.qtpye }}
                                                （本题共计{{ shoppingInfo.list[i] ? shoppingInfo.list[i].length : '' }}小题，每题
                                                <span v-show="!shoppingInfo.marks[i]">{{
                                                        shoppingInfo.scores[i]
                                                    }}</span>
                                                <input
                                                        v-show="shoppingInfo.marks[i]"
                                                        v-model="shoppingInfo.scores[i]"
                                                        :style="{
                                                            width: '50px',
                                                            textAlign: 'left',
                                                            padding: 0,
                                                            height: '20px',
                                                        }"
                                                        min="1"
                                                        type="number"
                                                > 分，
                                                共计{{
                                                    shoppingInfo.list[i] ? shoppingInfo.scores[i] *
                                                            shoppingInfo.list[i].length : ''
                                                }}分
                                                <span
                                                        v-show="!shoppingInfo.marks[i]"
                                                >
                                                {{ shoppingInfo.text[i] ? `，${shoppingInfo.text[i]}` : '' }}
                                                </span>
                                                <span v-show="shoppingInfo.marks[i]">，
                                                    <input
                                                            v-model="shoppingInfo.text[i]"
                                                            :style="{
                                                                width: '200px',
                                                                height: '20px',
                                                                padding: 0,
                                                            }"
                                                            placeholder="设置题目特殊说明，可为空"
                                                            type="text"/></span>
                                                ）</h4>
                                        </div>
                                        <div
                                                v-for="(item,index) in shoppingInfo.list[i]"
                                                :key="index"
                                                :style="{
                                                    paddingLeft: '20px',
                                                }"
                                                class="-context"
                                        >
                                            <div class="question-mathjax">
                                                <strong> {{ ++index }}、</strong>
                                                <!--                                                <p v-html="'<strong>'+ ++index + '、</strong>'+item.title"/>-->
                                                <p v-html="item.title"/>
                                            </div>
                                            <div
                                                    v-if="item.option_a"
                                                    class="answer-mathjax">
                                                <span v-html="'A.'+item.option_a"/>
                                                <span v-html="'B.'+item.option_b"/>
                                                <span v-html="'C.'+item.option_c"/>
                                                <span v-html="'D.'+item.option_d"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 试卷分析 -->
        <template-popup
                :modal="popupInfo.modal"
                @cancel="popupInfo.modal=$event"
        />
        <!-- 试题排序 -->
        <template-popup-sort
                :modal="popupInfo.modal2"
                @cancel="popupInfo.modal2=$event"
                @ok="popupInfo.modal2=$event"/>
        <!-- 删除试题 / 清空所有试题 -->
        <template-popup-remove
                :context="context"
                :modal="popupInfo.modal3"
                @cancel="removeQuestionCancel"
                @ok="removeQuestionOK"/>
    </div>
</template>

<script>
import { VueMathjax } from 'vue-mathjax' // 自定义解析数学公式模块
import popupWindow from './component/popup-question-analysis'
import popupSort from './component/popup-sort'
import popupRemove from './component/popup-remove'
import { mapState } from 'vuex'
import myMixin from '@/mixin'
import exportFile from '@/utils/exportFile'

export default {
  name: 'question-basket',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'vue-mathjax': VueMathjax, // 自定义解析数学公式组件
    'template-popup': popupWindow,
    'template-popup-sort': popupSort,
    'template-popup-remove': popupRemove
  },
  filters: {
    toChinesNum (val) {
      switch (++val) {
        case 1:
          val = '一'
          break
        case 2:
          val = '二'
          break
        case 3:
          val = '三'
          break
        case 4:
          val = '四'
          break
        case 5:
          val = '五'
          break
        case 6:
          val = '六'
          break
        case 7:
          val = '七'
          break
        case 8:
          val = '八'
          break
        case 9:
          val = '九'
          break
        case 10:
          val = '十'
          break
      }
      return val
    },
    toI (val) {
      switch (++val) {
        case 1:
          val = 'I'
          break
        case 2:
          val = 'II'
          break
        case 3:
          val = 'III'
          break
        case 4:
          val = 'IV'
          break
        case 5:
          val = 'V'
          break
        case 6:
          val = 'VI'
          break
        case 7:
          val = 'VII'
          break
        case 8:
          val = 'VIII'
          break
        case 9:
          val = 'IX'
          break
        case 10:
          val = 'X'
          break
      }
      return val
    }
  },
  mixins: [myMixin],
  data () {
    return {
      context: '', // 警告弹框内容
      selectMark: true,
      questionTitle: '2020年9月27日高中数学',
      questionSubTitle: '副标题名称',
      popupInfo: {
        modal: false,
        modal2: false,
        modal3: false
      },
      questionToolInfo: { // 工具配置
        questionAllot: { // 试题分配
          type: '', // 试卷模式 model
          typeList: [
            {
              label: '标准',
              value: '标准'
            },
            {
              label: '测试',
              value: '测试'
            },
            {
              label: '作业',
              value: '作业'
            }
          ],
          seniorModel: [], // 高级设置 model
          seniorList: [
            {
              label: '标题',
              value: 'name'
            },
            {
              label: '副标题',
              value: 'subtitle'
            },
            {
              label: '考试信息栏',
              value: 'paper_info'
            },
            {
              label: '密封标识',
              value: 'secret_tag'
            },

            {
              label: '装订线',
              value: 'gutter'
            },
            {
              label: '学生输入框',
              value: 'cand_info'
            },
            {
              label: '注意事项',
              value: 'attentions'
            },
            {
              label: '分卷注释',
              value: 'volumes'
            },
            {
              label: '大题注释',
              value: 'blocks'
            }
          ]
        }
      },
      // 可编辑开关
      markInfo: {
        name: false, // 标题
        subtitle: false, // 副标题
        paper_info: false, // 考试信息栏
        secret_tag: false, // 密封标识
        gutter: false, // 装订线
        cand_info: false, // 学生输入框
        attentions: false, // 注意事项
        volumes: false, // 分卷注释
        blocks: false // 大题注释
      },
      shoppingInfo: {
        totalScore: 0, // 总分
        title: {},
        marksTitle: {},
        type: [],
        list: {},
        marks: {},
        scores: {},
        text: {}
      },
      positionY: 0,
      selectQuestionInfo: { // 纸卷结构设置的小题、题块名称
        num: -1,
        name: '',
        title: ''
      }
    }
  },
  props: {},
  watch: {
    'shoppingInfo.scores': {
      handler (val) {
        console.log(val)
        this.newtotalScore()
      },
      deep: true
    },
    value (value) {
      console.log(value)
      // titleDiv
      // this.questionToOptions = value
      // this.rawHtml = '<h3>题目：' + this.questionToOptions.Question.body + '</h3>'// 将公式转化为html字符串存入。
      // this.answer = ''
      // this.$nextTick(function () {
      //   if (this.commonsVariable.isMathjaxConfig) {
      //     this.commonsVariable.initMathjaxConfig()
      //   }
      //   this.commonsVariable.MathQueue('question-id')
      // })
    },
    answer (newVal) {
      this.$emit('trouble', newVal)
    }
  },
  methods: {
    // 设置初始化试卷结构设置定位
    setPosition () {
      const box = this.$refs.refPosition
      const Li = box.children
      const liArr = []
      for (let i = 0, len = Li.length; i < len; i++) {
        liArr.push(Li[i].offsetTop)
        setTimeout(() => {
          Li[i].style.position = 'absolute'
          Li[i].style.top = `${liArr[i]}px`
        }, 0)
      }
    },
    // 拖拽试题块交换位置
    mouseMove (e, i) {
      // 屏蔽鼠标右键默认事件
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
      })
      // 设置拖拽目标
      let odiv = e.target
      if (odiv.parentNode.tagName === 'BUTTON' || odiv.parentNode.className === 'context') {
        return
      }
      while (odiv.tagName !== 'LI') {
        odiv = odiv.parentNode
      }
      // 定义鼠标移动差值
      let top
      let newHtml = null
      // 获取容器最大可移动高度
      // eslint-disable-next-line no-unused-vars
      const parentH = odiv.parentNode.offsetHeight - 80
      odiv.classList.add('active')
      // 算出鼠标相对元素位置
      // 鼠标点击的初始坐标Y
      const oldY = odiv.offsetTop
      const disY = e.clientY
      // odiv.offsetHeight // 90
      // odiv.offsetTop // 0 90 180
      odiv.style.transition = ''
      // 获取滚轮距离屏幕的距离
      const scrollY = document.documentElement.scrollTop || document.body.scrollTop
      document.onmousemove = (e) => { // 鼠标按下并移动的事件
        e.preventDefault()
        // 用鼠标的位置减去相对元素的位置，得到元素的位置
        top = e.clientY - disY
        // top = Math.min(top, parentH)
        // top = Math.max(0, top)
        // eslint-disable-next-line no-unused-vars
        const yr = (e.clientY + scrollY) - this.$refs.refPosition.offsetTop // 获取拖拽元素父节点距离窗口顶端的距离
        // console.log('实际移动', yr, e.clientY + scrollY, this.$refs.refPosition.offsetTop)
        const Li = this.$refs.refPosition.children
        for (let j = 0, len = Li.length; j < len; j++) {
          Li[j].style.transform = ''
          if (odiv !== Li[j] &&
                            yr > Li[j].offsetTop &&
                            yr < Li[j].offsetTop + Li[j].offsetHeight) {
            Li[j].style.transform = 'scale(0.8)'
            newHtml = Li[j]
          }
        }
        // 绑定元素位置 positionY上面
        this.positionY = top
        // 移动当前元素
        odiv.style.top = `${top + oldY}px`
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
        if (newHtml) {
          odiv.style.top = newHtml.offsetTop + 'px'
          odiv.classList.remove('active')
          newHtml.style.top = oldY + 'px'
          newHtml.style.transform = ''
          newHtml.style.transition = 'all 0.3s'
        } else {
          odiv.style.top = `${oldY}px`
          odiv.classList.remove('active')
        }
      }
    },
    // 初始化题块
    setShoppingInfo () {
      this.shoppingInfo.type = this.shoppingList.reduce((all, next) => {
        return all.some(item => item.qtpye === next.qtpye) ? all : [...all, next]
      }, [])
      this.$nextTick(() => {
        for (let i = 0, len = this.shoppingInfo.type.length; i < len; i++) {
          // 添加题块标题
          this.$set(this.shoppingInfo.title, i, this.shoppingInfo.type[i].qtpye)
          // 添加题库标题开关
          this.$set(this.shoppingInfo.marksTitle, i, false)
          // 添加不同题型所对应的数组
          this.$set(this.shoppingInfo.list, i, [])
          // 添加不同题型所对应的控制开关
          this.$set(this.shoppingInfo.marks, i, false)
          // 添加默认分数
          this.$set(this.shoppingInfo.scores, i, 3)
          // 添加注释
          this.$set(this.shoppingInfo.text, i, '')
          for (let j = 0, len = this.shoppingList.length; j < len; j++) {
            if (this.shoppingInfo.type[i].qtpye === this.shoppingList[j].qtpye) {
              this.shoppingInfo.list[i].push(this.shoppingList[j])
            }
          }
        }
      })
    },
    // 下载试卷
    downloads () {
      const ele = this.$refs.questionContext.innerHTML
      console.log(exportFile)
      exportFile.getWorld(ele, this.questionTitle) // 下载保存，并设置文件名
    },
    // 预设模式切换
    getRadio (val) {
      this.questionToolInfo.questionAllot.seniorModel = []
      this.questionToolInfo.questionAllot.type = val
      switch (val) {
        case '标准':
          this.questionToolInfo.questionAllot.seniorModel = [
            'name',
            'subtitle',
            'secret_tag',
            'paper_info',
            'gutter',
            'attentions',
            'blocks',
            'volumes'
          ]// 高级设置 model
          break
        case '测试':
          this.questionToolInfo.questionAllot.seniorModel = [
            'name',
            'paper_info',
            'cand_info',
            'blocks'
          ]// 高级设置 model
          break
        case '作业':
          this.questionToolInfo.questionAllot.seniorModel = [
            'name',
            'cand_info'
          ]// 高级设置 model
          break
        default:
          break
      }
    },
    // 设置试卷配置
    getCheckbox (i) {
      // this.questionToolInfo.questionAllot.seniorModel.some(item => item === 'subtitle')
    },
    // 清空试题 / 删除
    removeQuestionList (e) {
      const ele = e.target.innerText.trim()
      // 未选择小题时删除当前题块所有小题
      if (ele === '删除' && !this.selectQuestionInfo.name) {
        let element = e.target
        while (element.tagName !== 'H4') {
          element = element.parentNode
        }
        this.selectQuestionInfo.title = element.firstChild.nodeValue.slice(2)
        this.context = `
            确定要删除 【${element.firstChild.nodeValue.slice(2)}】 下的所有题目吗?
        `
      } else if (ele === '删除' && this.selectQuestionInfo.name) {
        // 选择小题时删除当前题块指定小题
        this.context = `
            确定要删除 【${this.selectQuestionInfo.name}】 下的第 ${this.selectQuestionInfo.num} 小题吗?
        `
      } else if (ele === '清空试卷') {
        // 清空试题篮
        this.context = '该操作将清空试题和试卷信息，您确定要清空吗?'
      }
      this.popupInfo.modal3 = true
    },
    // 鼠标移入事件

    // 取消删除题块
    removeQuestionCancel (e) {
      this.selectQuestionInfo = {
        title: '',
        name: '',
        num: -1
      }
      this.popupInfo.modal3 = e
    },
    // 确定删除试题
    removeQuestionOK (e) {
      if (this.selectQuestionInfo.title) { // 删除指定题块全部试题
        console.log('删除指定题块全部试题')
        this.removeQuestions(this.selectQuestionInfo.title.trim())// 调用局部api
        this.setShoppingInfo() // 初始化题块
        this.selectQuestionInfo.title = ''
      } else if (this.selectQuestionInfo.num >= 0) { // 删除指定小题
        // 过滤出指定题块的数组
        const newArr = this.shoppingList.filter((item, index, arr) => {
          return item.qtpye === this.selectQuestionInfo.name
        })
        console.log('删除指定小题', newArr[this.selectQuestionInfo.num - 1])
        this.$store.commit('SET_SHOPPING_CART_LIST_REMOVE', newArr[this.selectQuestionInfo.num - 1])
        this.setShoppingInfo() // 初始化题块
        this.selectQuestionInfo.name = ''
        this.selectQuestionInfo.num = -1
        this.selectQuestionInfo.title = ''
      } else { // 清空试题篮
        console.log('清空试题篮')
        this.removeQuestions()// 调用局部api
        this.setShoppingInfo() // 初始化题块
      }
      this.newtotalScore()
      this.popupInfo.modal3 = e
    },
    setMouseenter (name) {
      this.markInfo[name] = true
    },
    // 鼠标移出事件
    setMouseleave (name) {
      this.markInfo[name] = false
    },
    // 指定删除某小题
    selectQuestionNum (e, num, data) {
      const parent = e.target.parentNode
      const elment = e.target
      num--
      if (elment.dataset.mark && JSON.parse(elment.dataset.mark)) {
        elment.style.border = '1px solid #ddd'
        elment.style.color = 'initial'
        elment.dataset.mark = false
        // 清空试卷结构设置的题块名称、题目编号
        this.selectQuestionInfo.num = -1
        this.selectQuestionInfo.name = ''
        return
      }
      for (let i = 0, len = parent.children.length; i < len; i++) {
        parent.children[i].dataset.mark = false
        parent.children[i].style.border = '1px solid #ddd'
        parent.children[i].style.color = 'initial'
        if (i === num) {
          elment.dataset.mark = true
          elment.style.border = '1px solid red'
          elment.style.color = 'red'

          // 获取题块名称
          const val = parent.parentNode.firstElementChild.firstChild.nodeValue
          this.selectQuestionInfo.num = Number(elment.innerText)
          this.selectQuestionInfo.name = val.slice(2).trim()
        }
      }
    },
    // 计算总分
    newtotalScore () {
      const arr = Object.values(this.shoppingInfo.scores)
      const arr2 = Object.values(this.shoppingInfo.list).map(item => {
        return item.length
      })
      let count = 0
      for (let i = 0, len = arr.length; i < len; i++) {
        count += arr[i] * arr2[i]
      }
      this.$set(this.shoppingInfo, 'totalScore', count)
    }
  },
  computed: {
    ...mapState({
      shoppingList: state => state.shopping_cart.list // 试题篮
    })

  },
  created () {
  },
  mounted () {
    setTimeout(() => {
      // 试题设置添加定位
      this.setPosition()
    }, 1000)
    this.setShoppingInfo()
    this.getRadio('标准')
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>
.question-tool-top, .question-tool-center, .question-tool-bottom {
    transition: all 0.3s ease-in-out;
    background-color: white;
    padding: 20px;
    border-radius: 6px;
    margin-top: 20px;
}

.question-tool-top {
    margin-top: 0;
}

.question-tool-top ul {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;

    li {
        line-height: 45px;
        text-align: left;
        width: 50%;
        cursor: pointer;
    }

    li:hover {
        color: #3399ff;
    }
}

.question-tool-center {
    display: flex;
    flex-direction: column;
    justify-content: left;

    h3 {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #ddd;
    }

    > div:nth-of-type(1) {
        text-align: left;
        line-height: 32px;
        border-bottom: 1px dashed #ddd;
    }

    > div:nth-of-type(2) {
        margin-top: 10px;
        text-align: left;

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                line-height: 32px;
                width: 50%;
            }
        }
    }
}

.question-tool-bottom {
    display: flex;
    flex-direction: column;
    justify-content: left;

    h3 {
        padding-bottom: 10px;
        border-bottom: 1px dashed #ddd;
    }

    div.content {
        div.top {
            color: #999;
            display: flex;
            justify-content: space-between;
            background-color: #f7f8f9;
            padding: 10px;

            p {
                color: black;

                span {
                    color: orange;
                    font-weight: bold;
                }
            }

        }

        ul {
            background-color: white;
            position: relative;
            width: 100%;
            height: 100%;

            li:nth-of-type(1) {
                text-align: left;
            }

            li {
                width: inherit;
                padding: 10px 0;
                min-height: 147px;
                cursor: pointer;
                display: inline-block;
                background-size: contain;
                border-bottom: 1px dashed #ddd;
                border-top: 1px dashed transparent;

                h4.title {
                    display: flex;
                    justify-content: space-between;

                    span {
                        font-weight: normal;

                        button {
                            padding: 0 5px;
                            font-size: 12px;
                            margin-left: 5px;
                        }

                        a {
                            color: #666;
                        }
                    }
                }

                div.context {
                    margin-top: 20px;
                    display: flex;
                    flex-wrap: wrap;

                    span {
                        border: 1px solid #ddd;
                        padding: 5px 10px;
                        font-size: 12px;
                        text-align: center;
                        margin: 0 0 10px 10px;
                        font-weight: bold;
                    }
                }
            }

            li:last-child {
                border-bottom-width: 0;
            }
        }

        div.button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
        }
    }

    > div:nth-of-type(1) {
        text-align: left;
    }
}

/* 右侧模块样式 */
.question-context {
    color: black;
    padding: 20px 0;
    margin-left: 20px;
    background-color: white;
    min-height: 1000px;
    position: relative;

    input, textarea {
        width: 100%;
        padding: 10px 20px;
        border: 1px solid #3399ff;
        border-radius: 0;
        background-color: rgba(51, 153, 255, 0.2);
    }

    .question-context-left {
        position: absolute;
        font-size: 14px;
        transform: rotate(-90deg);
        font-weight: bold;
        left: -230px;
        top: 300px;
    }

    .question-context-right {
        width: initial;
        margin: 0 auto;

        > div {
            padding-left: 10px;
        }

        div.vice-title {
            line-height: 45px;
        }

        div.-title-top, div p.-warning {
            text-align: left;
        }

        div p.-warning {
            color: #999;
            font-size: 12px;
        }

        div.context {
            .context-question-title {
                h3 {
                    background-color: #eee;
                    padding: 10px 0;
                }
            }
        }
    }

    .context-question-list {
        text-align: left;

        .-title {
            /*font-weight: bold;*/
        }

        .-context {
            margin: 10px 0;

            .question-mathjax {
                display: flex;
                justify-content: left;
                align-items: baseline;
                P{
                    //display: flex;
                }
            }

            .answer-mathjax {
                display: flex;
                justify-content: space-between;
                align-items: start;

                > span {
                    width: 25%;
                    text-align: left;
                    display: flex;
                    padding: 10px 20px 30px;
                    justify-content: left;
                    align-items: start;
                }
            }
        }

        .-context:first-child {
            margin-top: 0;
        }

    }

}

.gutter {
    border-left: 1px dashed #999;
}

.active {
    opacity: 0.8;
    z-index: 99;
    border: 1px dashed black !important;
    background-color: white;
}
</style>
