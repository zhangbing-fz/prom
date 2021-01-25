<comment>
    # 展示小题 / 不可编辑
</comment>
<template>
    <Row style="padding: 15px 20px">
        <!-- 小题 begin -->
        <Row class="editor-list">
            <Col span="24">
                <h3 style="">
                    <span style="position: absolute; top: 0">{{index+1}}、</span>
                    <span ref="questionImg" v-html="item.content.value"></span>
                </h3>
            </Col>
        </Row>
        <!-- 试题属性 -->
        <Row class="editor-list">
            <Col span="24">
                <span>年级：{{submitInfo.questions.class}}</span>
                <span
                        :style="{color: '#999'}"> |</span>
                <span
                        :style="{width:'100px', marginLeft: '10px'}">学期：{{submitInfo.questions.semester}}</span>
                <span
                        :style="{color: '#999'}"> |</span>
                <span
                        :style="{width:'100px', marginLeft: '10px'}">难度：{{item.type | typeFilter}}</span>
                <span
                        :style="{color: '#999'}"> |</span>
                <span :style="{width:'auto', marginLeft: '10px'}">分数：{{submitInfo.questions.score}}</span>
            </Col>
        </Row>

        <!-- 添加小题选项 具体项 -->
        <Row
                class="editor-list"
                v-if="item.choices.length !== 0 && item.type === '1' || item.type === '2'"
        >
            <Col span="24">
                选项：
                <span :key="i"
                      :style="{
                            width: 'calc(25% - 10px)',
                            position: 'relative',
                            textAlign: 'left'
                        }"
                      v-for="(ele,i) in item.choices"
                >
                        {{ele.content.value}}
                    </span>
            </Col>
        </Row>

        <!-- 答案 单选-->
        <Row
                class="editor-list"
                v-if="item.type === '1'"
        >
            <Col span="24">
                答案：
                <span
                        :key="i"
                        v-for="(ele,i) in item.choices"
                >{{ele.is_correct ? valueInfo.editorListIndex[i] : ''}}</span>
            </Col>
        </Row>

        <!-- 答案 多选-->
        <Row
                class="editor-list"
                v-if="item.type === '2'"
        >
            <Col span="24">
                答案：
                <span
                        :key="i"
                        v-for="(ele,i) in item.choices"
                >{{ele.is_correct ? valueInfo.editorListIndex[i] : ''}}</span>
            </Col>
        </Row>

        <!-- 答案 判断-->
        <Row
                class="editor-list"
                v-if="item.type === '3'"
        >
            <Col span="24">
                答案：
                <RadioGroup v-model="item.answer_content.value">
                    <Radio :label="'对'"></Radio>
                    <Radio :label="'错'"></Radio>
                </RadioGroup>
            </Col>
        </Row>

        <!-- 答案 填空题、简答题 -->
        <Row
                class="editor-list"
                v-if="item.type === '4' || item.type === '5'"
        >
            <Col span="24">
                答案：
                {{item.answer_content.value}}
            </Col>
        </Row>

        <!-- 答案 写作 -->
        <Row
                class="editor-list"
                v-if="item.type === '6'"
        >
            <Col span="24">
                答案：
                {{item.answer_content.value}}
            </Col>
        </Row>

        <!-- 教材属性 -->
        <Row class="editor-list" v-if="item.chapters.length > 0">
            <Col span="24">
                教材属性:
                <span
                        :key="i"
                        class="dot-tag"
                        v-for="(ele,i) in item.chapters"
                >{{ele | chaptersFilter}}</span>
            </Col>
        </Row>

        <!-- 知识点属性 -->
        <Row class="editor-list" v-if="item.knowledges.length > 0">
            <Col span="24">
                知识属性:
                <span :key="i" class="dot-tag" v-for="(ele,i) in item.knowledges">{{ele | knowledgesFilter}}</span>
            </Col>
        </Row>

        <!-- 解析 begin -->
        <Row class="editor-list">
            <Col span="24">解析: <span v-html="item.explanation.value"></span></Col>
        </Row>

        <!-- 操作 begin -->
        <div class="editor-list-write">
            <Button :style="{ width: '120px'}"
                    @click="setAsks(item,index)"
                    ref="saveSmall"
                    type="info">
                <Icon type="ios-create"/>
                编辑小题
            </Button>
        </div>
    </Row>
</template>

<script>
import myMixin from '@/mixin.js'

import addMaterial from './add-material'
import addKnowledge from './add-knowledge'

export default {
  mixins: [myMixin],
  name: 'editor-content-read',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'add-material': addMaterial,
    // eslint-disable-next-line vue/no-unused-components
    'add-knowledge': addKnowledge
  },
  filters: {
    /**
             * @作者: 张兵
             * @功能: 题目类型过滤
             * @date: 2020/7/7 13:47
             * @description: typeFilter
             * @param {editor-content-read.vue}
             * @return:
             */
    /*    typeFilter (val) {
                                      let str = ''
                                      switch (val) {
                                        case '1':
                                          str = '容易'
                                          break
                                        case '2':
                                          str = '较易'
                                          break
                                        case '3':
                                          str = '一般'
                                          break
                                        case '4':
                                          str = '较难'
                                          break
                                        default:
                                          str = '困难'
                                          break
                                      }
                                      return str
                                    }, */
    knowledgesFilter (val) {
      const old = JSON.parse(localStorage.getItem('select_knowledge'))
      let str = ''
      if (!val) return
      old.find(item => {
        if (val === item.id) {
          str = item.name
        }
      })
      return str
    },
    chaptersFilter (val) {
      const old = JSON.parse(localStorage.getItem('select_material'))
      let str = ''
      if (!val) return
      old.find(item => {
        if (val === item.id) {
          str = item.name
        }
      })
      return str
    }
  },
  data () {
    return {
      URL: '/question_bank_api',

      // 提交数据
      submitInfo: {
        questions: { // 试题属性
          stage: '高中',
          subject: '语文',
          class: '高一',
          semester: '不限',
          select: '填空',
          score: '2分'
        },
        single: '', // 选项 checkbox
        answer: 'A', // 答案
        content: { // 题文
          type: 'html',
          value: ''
        }
      },
      // 动态数据
      valueInfo: {
        stageList: ['小学', '初中', '高中'],
        subjectList: ['语文', '数学', '英语', '物理', '化学', '历史', '政治', '地理'],
        classList: ['高一', '高二', '高三'],
        semesterList: ['不限', '上学期', '下学期'],
        selectList: ['单选', '多选', '判断', '填空', '简答', '写作'],
        scoreList: ['0.5分'],

        editorList: [0, 1, 2, 3], // 富文本条目
        editorListIndex: [],
        removeEditorListIndex: ''
      },
      knowledge: [],
      material: [],
      select_knowledge: [],
      select_material: []
    }
  },
  props: ['item', 'index'],
  watch: {},
  methods: {
    setTree (ele, i) {
      // eslint-disable-next-line no-unused-vars,camelcase
      const select_material = JSON.parse(localStorage.getItem('select_material'))
      // eslint-disable-next-line no-unused-vars,camelcase
      const select_knowledge = JSON.parse(localStorage.getItem('select_knowledge'))
      // eslint-disable-next-line no-unused-vars
      const { chapters, knowledges } = ele
      // select_material.
    },
    /**
             * @作者: 张兵
             * @功能: 获取大写字母
             * @description: generateBig
             * @return:
             */
    generateBig () {
      const chBig = 'A'
      const strBig = []
      for (let i = 0; i < 26; i++) {
        strBig.push(String.fromCharCode(chBig.charCodeAt(0) + i))
      }
      return strBig
    },
    /**
             * @作者: 张兵
             * @功能: 删除小题选项
             * @date: 2020/6/28 16:16
             * @description: removeEditorSmall
             * @return:
             */
    removeEditorSmall (index) {
      console.log(this.item.choices)
      this.item.choices.splice(index, 1)
    },
    /**
             * @作者: 张兵
             * @功能: 编辑小题
             * @date: 2020/6/28 16:16
             * @description: setAsks
             * @return:
             */
    setAsks (ele, i) {
      this.$emit('changemark', ele)
      this.setTree(ele, i)
    }
  },
  computed: {},
  created () {
    this.valueInfo.editorListIndex = this.generateBig() // 初始选项

    // 添加分数
    for (let i = 1; i <= 100; i++) {
      this.valueInfo.scoreList.push(`${i}分`)
    }
  },
  mounted () {
    // 这是列表图片样式
    const ele = this.$refs.questionImg
    /*    if (ele.childNodes[0].nodeName !== '#text') {
                              const br = document.createElement('br')
                              ele.insertBefore(br, ele.children[1])
                              // ele.style.cssText = 'display: flex; justify-content: left'
                              ele.childNodes[0].style.cssText = 'float: left'
                            } */

    ele.children.forEach(item => {
      console.log(item)
      if (item.children.length) {
        item.style.cssText = 'float: left; margin-right: 20px; border: 2px solid #ddd'
        item.children.forEach(ele => {
          ele.style.cssText = 'width: 160px; height: 120px'
        })
      }
    })
  },
  destroyed () {
  }
}
</script>

<style scoped>
    .editor-list {
        display: flex;
        text-align: left;
        line-height: 32px;
    }

    .editor-list:last-child {
        border-bottom: none;
    }

    .dot-tag {
        display: inline-block;
        height: 22px;
        line-height: 22px;
        margin: 2px 4px 2px 0;
        padding: 0 8px;
        border: 1px solid #e8eaec;
        border-radius: 3px;
        background: #f7f7f7;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
    }

    .editor-list-write {
        position: absolute;
        right: 20px;
        top: 50%;
        transition: .3s all ease-in-out;
        transform: translateX(0px) translateY(-20px);
        opacity: 0;
    }

    .editor-list-box:hover .editor-list-write {
        transform: translateX(-20px) translateY(-20px);
        transition: .3s all ease-in-out;
        opacity: 1;
    }
</style>
