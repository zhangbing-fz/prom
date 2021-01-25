<comment>
    # tab切换 ： 单题添加
</comment>
<template>
    <!--v-if="questionInfo.flag"-->
    <div class="tab-content">
        {{question_info}}-------
        <!-- 试题属性 -->
        <Row :style="{marginTop: '10px', lineHeight: '38px'}">
            <Col :style="{textAlign: 'right', paddingRight: '20px'}" span="3">试题属性:</Col>
            <Col :style="{textAlign: 'left'}" span="21">
                <Select :style="{width:'100px'}" v-model="submitInfo.questions.stage">
                    <Option :key="item" :value="item" v-for="item in valueInfo.stageList">{{ item }}</Option>
                </Select>
                <Select :style="{width:'100px', marginLeft: '10px'}" v-model="submitInfo.questions.subject">
                    <Option :key="item" :value="item" v-for="item in valueInfo.subjectList">{{ item }}</Option>
                </Select>
                <Select :style="{width:'100px', marginLeft: '10px'}" v-model="submitInfo.questions.class">
                    <Option :key="item" :value="item" v-for="item in valueInfo.classList">{{ item }}</Option>
                </Select>
                <Select :style="{width:'100px', marginLeft: '10px'}" v-model="submitInfo.questions.semester">
                    <Option :key="item" :value="item" v-for="item in valueInfo.semesterList">{{ item }}</Option>
                </Select>
                <Select :style="{width:'100px', marginLeft: '10px'}" v-model="submitInfo.questions.select">
                    <Option :key="item" :value="item" v-for="item in valueInfo.selectList">{{ item }}</Option>
                </Select>
                <Select :style="{width:'100px', marginLeft: '10px'}" v-model="submitInfo.questions.difficult">
                    <Option :key="item" :value="item" v-for="item in valueInfo.difficultList">{{ item }}</Option>
                </Select>
                <Select :style="{width:'auto', marginLeft: '10px'}" v-model="submitInfo.questions.score">
                    <Option :key="item" :value="item" v-for="item in valueInfo.scoreList">{{ item }}</Option>
                </Select></Col>
        </Row>
        <!-- 题文 -->
        <Row :style="{marginTop: '10px'}">
            <Col :style="{textAlign: 'right', paddingRight: '20px'}" span="3">题文:</Col>
            <Col :style="{textAlign: 'left'}" span="21">
                <!--@blur="autoSave"--> <!--自动保存-->
                <global-editor
                        :textInfo="question_info.content.value"
                        :style="{backgroundColor: 'white'}"
                        @change="question_info.content.value=arguments[0]"
                ></global-editor>
            </Col>
        </Row>
        <!-- 本题有小题 -->
        <Row :style="{marginTop: '10px', lineHeight: '38px'}">
            <Col :style="{textAlign: 'right', paddingRight: '20px'}" span="3">本题有小题:</Col>
            <Col :style="{textAlign: 'left'}" span="2">
                <Button @click="addAsks" size="small" type="info">添加小题</Button>
            </Col>
            <Col :style="{textAlign: 'left', color: 'red'}" span="19">
                <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                本属性仅应用于在线作业或考试，如果本题无小题，请不要设置该属性。判断题和主观题不需要设置选项数量.
            </Col>
        </Row>
        <Row
                :key="item+index"
                :style="{lineHeight: '38px',backgroundColor: '#f8f8f9', padding: '10px', paddingLeft: '0', borderBottom: '1px dashed #dcdee2'}"
                v-for="(item,index) in question_info.asks">
            <!-- 小题 begin -->
            <Row>
                <Col
                        :style="{textAlign: 'right', paddingRight: '20px'}"
                        span="3"
                >
                    <Icon
                            :style="{marginLeft: '10px', color: 'red', cursor: 'pointer'}"
                            @click="removeAsks(item,index)"
                            size="20"
                            type="md-remove-circle"
                    />
                    小题:{{index+1}}:
                </Col>
                <Col :style="{textAlign: 'left'}" span="21">
                    <global-editor
                            :style="{backgroundColor: 'white'}"
                            :textInfo="question_info.asks[index].content.value"
                            @change="question_info.asks[index].content.value=arguments[0]"
                            @disabled="$refs.demo[index].$el.removeAttribute('disabled')"
                            ref="editorList"
                    ></global-editor>
                </Col>
            </Row>
            <!-- 添加小题选项 -->
            <Row>
                <Col :style="{textAlign: 'right', paddingRight: '20px', marginTop: '10px'}" span="3">
                    <Tooltip placement="right-end">选项:
                        <a :style="{width: '200px'}" href="javascript:;">
                            <Icon type="md-help"/>
                        </a>
                        <div slot="content">
                            <p>平台默认添加4个选项，如果您不需要<br>4个选项，请直接删除。如果您需要更<br>多的选项，请点击‘添加选项’进行添<br>加。</p>
                        </div>
                    </Tooltip>
                </Col>
                <Col :style="{textAlign: 'left', marginTop: '10px'}" span="21">
                    <Button @click="setEditorSmall(index)" size="small" type="info">
                        <Icon type="md-add"/>
                        添加选项
                    </Button>
                    <Checkbox :style="{marginLeft: '10px'}" v-model="submitInfo.single">不记录本次选项内容</Checkbox>
                </Col>
            </Row>
            <!-- 小题选项 begin -->
            <Row v-if="question_info.asks[index].choices.length !== 0">

                <Col :style="{textAlign: 'right', paddingRight: '20px', marginTop: '10px'}" span="3">小题选项：</Col>
                <Col span="21">
                    <div :style="{display: 'flex', justifyContent: 'left', width: '100%', flexWrap: 'wrap'}">
                        <div :key="i"
                             :style="{width: 'calc(25% - 10px)', margin: '10px 10px 0 0', position: 'relative'}"
                             v-for="(ele,i) in question_info.asks[index].choices">
                            <!--                            <global-editor-->
                            <!--                                    :style="{backgroundColor: 'white', marginTop: '10px'}"-->
                            <!--                                    :textInfo="ele.content.value"-->
                            <!--                                    @change="ele.content.value=arguments[0]"-->
                            <!--                                    ref="editorList"-->
                            <!--                            ></global-editor>-->
                            <Icon :style="{position: 'absolute', top: '-10px', right: '-10px',zIndex: '99', cursor: 'pointer'}"
                                  @click="removeEditorSmall(index,i)"
                                  size="20"
                                  type="ios-close-circle"/>
                            <Input
                                    :style="{width: '100%', borderRadius: 'none'}"
                                    maxlength="100"
                                    placeholder="请输入内容..."
                                    show-word-limit
                                    type="textarea"
                                    v-model="ele.content.value"/>
                        </div>
                    </div>
                </Col>
            </Row>

            <!-- 答案 -->
            <Row :style="{marginTop: '10px', lineHeight: '38px'}">
                <Col :style="{textAlign: 'right', paddingRight: '20px'}" span="3">答案:</Col>
                <Col :style="{textAlign: 'left'}" span="21"><Select filterable v-model="submitInfo.answer">
                    <Option :key="item" :value="item" v-for="(item,index) in valueInfo.editorList">{{
                        valueInfo.editorListIndex[index] }}
                    </Option>
                </Select></Col>
            </Row>

            <!-- 教材属性 -->
            <Row :style="{marginTop: '10px', lineHeight: '38px'}">
                <Col :style="{textAlign: 'right', paddingRight: '20px'}" span="3">教材属性:</Col>
                <Col :style="{textAlign: 'left'}" span="21">
                    <add-material :chapters="item.chapters"
                                  :select_material="select_material"
                                  :tree_material="material"
                                  @ok="item.chapters=arguments[0]"
                    ></add-material>
                </Col>
            </Row>

            <!-- 知识点属性 -->
            <Row :style="{marginTop: '10px', lineHeight: '38px'}">
                <Col :style="{textAlign: 'right', paddingRight: '20px'}" span="3">知识点属性:</Col>
                <Col :style="{textAlign: 'left'}" span="21">
                    <add-knowledge :knowledges="item.knowledges"
                                   :select_knowledge="select_knowledge"
                                   :tree_knowledge="knowledge"
                                   @ok="item.knowledges=arguments[0]"

                    ></add-knowledge>
                </Col>
            </Row>

            <!-- 解析 begin -->
            <div>
                <Col :style="{textAlign: 'right', paddingRight: '20px', marginTop: '10px'}" span="3">解析：</Col>
                <Col :style="{textAlign: 'left'}" span="21">
                    <global-editor
                            :style="{backgroundColor: 'white', marginTop: '10px'}"
                            :textInfo="question_info.asks[index].explanation.value"
                            @change="question_info.asks[index].explanation.value=arguments[0]"
                            @disabled="$refs.demo[index].$el.removeAttribute('disabled')"
                            ref="editorList"
                    ></global-editor>
                </Col>
            </div>
            <Col :style="{textIndent: '999em'}" span="3">测：</Col>
            <Col span="21">
                <Button :style="{marginTop: '10px', width: '100%'}" @click="setAsks($event, index)" ref="demo"
                        type="success">
                    <Icon type="ios-create"/>
                    保存小题
                </Button>
            </Col>

        </Row>

<!--        &lt;!&ndash; 年份 &ndash;&gt;
        <Row :style="{marginTop: '10px', lineHeight: '38px'}">
            <Col :style="{textAlign: 'right', paddingRight: '20px'}" span="3">年份:</Col>
            <Col :style="{textAlign: 'left'}" span="21">
                <Row>
                    <Col span="12">
                        <DatePicker
                                :style="{width:'initial'}"
                                :value="submitInfo.valueYear"
                                format="yyyy年"
                                placeholder="选择年份"
                                style="width: auto" type="date"></DatePicker>
                    </Col>
                </Row>
            </Col>
        </Row>-->

<!--        &lt;!&ndash; 选项 &ndash;&gt;
        <Row :style="{marginTop: '10px', lineHeight: '38px'}">
            <Col :style="{textAlign: 'right', paddingRight: '20px'}" span="3">
                <Tooltip placement="right-end">选项:
                    <a :style="{width: '200px'}" href="javascript:;">
                        <Icon type="md-help"/>
                    </a>
                    <div slot="content">
                        <p>平台默认添加4个选项，如果您不需要<br>4个选项，请直接删除。如果您需要更<br>多的选项，请点击‘添加选项’进行添<br>加。</p>
                    </div>
                </Tooltip>
            </Col>
            <Col :style="{textAlign: 'left'}" span="21">
                <Button @click="setEditor" size="small" type="info">
                    <Icon type="md-add"/>
                    添加选项
                </Button>
                <Checkbox :style="{marginLeft: '10px'}" v-model="submitInfo.single">不记录本次选项内容</Checkbox>
            </Col>
        </Row>-->

<!--        &lt;!&ndash; 富文本 1、2、3、4 &ndash;&gt;
        <Row
                :key="item"
                :style="{marginTop: '10px'}"
                v-for="(item, index) in valueInfo.editorList">
            <Col
                    :style="{textAlign: 'right', paddingRight: '20px'}"
                    span="3">
                <Icon
                        :style="{marginLeft: '10px', color: 'red', cursor: 'pointer'}"
                        @click="removeEditor(index)"
                        size="20"
                        type="md-remove-circle"
                />
                {{valueInfo.editorListIndex[index]}}:
            </Col>
            <Col :style="{textAlign: 'left'}" span="21">
                <global-editor ref="editorList"></global-editor>
            </Col>
        </Row>-->

<!--        &lt;!&ndash; 解析 &ndash;&gt;
        <Row :style="{ marginTop: '10px'}">
            <Col :style="{textAlign: 'right', paddingRight: '20px'}" span="3">解析:</Col>
            <Col :style="{textAlign: 'left'}" span="21">
                <global-editor></global-editor>
            </Col>
        </Row>-->

        <Row :style="{marginTop: '10px'}">
            <Col span="3" :style="{textIndent: '99em'}">测：</Col>
            <Col span="10">
                <Button :style="{width: '100%'}" @click="autoSave">
                    <Icon type="ios-create"/>
                    暂存试题
                </Button>
            </Col>
            <Col span="1" :style="{textIndent: '99em'}">｜</Col>
            <Col span="10">
                <Button :style="{width: '100%'}" @click="saveQuestion" type="success">
                    <Icon type="ios-create"/>
                    保存试题
                </Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import addKnowledge from './component/add-knowledge'
// eslint-disable-next-line no-unused-vars
import { mapActions, mapState, mapGetters } from 'vuex'
import addMaterial from './component/add-material'

export default {
  name: 'tab-content.vue',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'add-material': addMaterial,
    // eslint-disable-next-line vue/no-unused-components
    'add-knowledge': addKnowledge
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
          select: '单选题',
          difficult: '普通',
          score: '2分'
        },
        single: '', // 选项 checkbox
        valueYear: '2020年', // 年份
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
        difficultList: ['容易', '较易', '普通', '较难', '困难'],
        scoreList: ['0.5分'],

        editorList: [0, 1, 2, 3], // 富文本条目
        editorListIndex: [],
        removeEditorListIndex: ''
      },
      questionInfo: {
        flag: true
      },
      knowledge: [],
      material: [],
      select_knowledge: [],
      select_material: []
    }
  },
  props: {},
  watch: {
    // 监听题文传值是否存在
    'question_info.content.value': {
      handler () {
        this.$Loading.start()
        if (this.question_info.content.value !== '') {
          this.question_info.flag = true
          this.$Loading.finish()
        }
      },
      deep: true
    },
    question_info: {
      handler (newVal, oldVal) {
        console.log(newVal, oldVal, '21321312321')
        // console.log(JSON.stringify(this.$store.state.question_info))
        // this.questionInfo = this.question_info
      },
      deep: true,
      immediate: true // 立即执行
    }
  },
  methods: {
    ...mapActions(['SAVE_QUESTION_INFO']), // 存储 question_info
    /* change(val) {
                                  console.log(arguments[0])
                              }, */
    /**
             * @作者: 张兵
             * @功能: // 获取本小题 form
             * @date: 2020/6/28 16:16
             * @description: getSmallQuestion
             * @return:
             */
    getSmallQuestion (val) { // 获取本小题 form

    },
    /**
             * @作者: 张兵
             * @功能: 添加小题选项
             * @date: 2020/6/28 16:16
             * @description: setEditorSmall
             * @return:
             */
    setEditorSmall (index) {
      console.log(this.question_info.asks[index])
      this.question_info.asks[index].choices.push({
        content: {
          type: 'html',
          value: '选项'
        },
        is_correct: false
      })
    },
    /**
             * @作者: 张兵
             * @功能: 添加选项
             * @date: 2020/6/28 16:16
             * @description: setEditor
             * @return:
             */
    setEditor () {
      console.log('添加答案')
      this.valueInfo.editorList.push(this.valueInfo.editorList.length)
    },
    /**
             * @作者: 张兵
             * @功能: 保存小题
             * @date: 2020/6/28 16:16
             * @description: setAsks
             * @return:
             */
    setAsks (e, index) {
      /* console.log(this.question_info.asks[index]) // 当前小题data */
      debugger
      const data = Object.assign(this.question_info.asks[index], {
        entry: 'question_bank_api',
        service_name: 'save_ask'
      })
      data.content.type = 'html'
      data.explanation.type = 'html'
      debugger
      data.is_finish = true
      this.$axios.post(this.URL, data).then(({ data }) => {
        if (data.result_code === '00') {
          this.$Message.success('小题已保存！')
        }
      })
    },
    /**
             * @作者: 张兵
             * @功能: 添加小题
             * @date: 2020/6/28 16:16
             * @description: addAsks
             * @return:
             */
    addAsks () {
      const data = {
        entry: 'question_bank_api',
        service_name: 'add_ask_init',
        question_id: this.question_info.id
      }
      this.$axios.post(this.URL, data).then(res => {
        const { data } = res
        if (data.result_code !== '00') {
          return this.$Message.error(data.result_info)
        }
        this.$Message.success('创建小题成功！')
        this.getData()
      })
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
             * @功能: 清空指定富文本内容
             * @date: 2020/6/28 16:16
             * @description: clearEditor
             * @return:
             */
    clearEditor (i) {
      this.$refs.editorList[i].content = ''
      console.log(this.valueInfo.editorList.slice(i))
    },
    /**
             * @作者: 张兵
             * @功能: 删除小题选项
             * @date: 2020/6/28 16:16
             * @description: removeEditorSmall
             * @return:
             */
    removeEditorSmall (index, i) {
      console.log(this.question_info.asks[index].choices)
      this.question_info.asks[index].choices.splice(i, 1)
    },
    /**
             * @作者: 张兵
             * @功能: 删除当前提
             * @date: 2020/6/28 16:16
             * @description: removeEditor
             * @return:
             */
    removeEditor (index) {
      console.log('删除当前题目')
      this.valueInfo.removeEditorListIndex = this.valueInfo.editorList.splice(index, 1)
      // console.log(this.valueInfo.editorList.slice(index))
    },
    /**
             * @作者: 张兵
             * @功能: 删除当前小题
             * @date: 2020/6/28 16:16
             * @description: removeAsks
             * @return:
             */
    removeAsks (ele, index) {
      console.log('删除当前小题', ele, index)
      this.$Message.warning('删除小题')
      if (this.question_info.asks.length === 1) {
        this.$Message.warning('最少保留 1 小题')
      }
      const data = {
        entry: 'question_bank_api',
        service_name: 'delete_ask',
        question_id: this.question_info.id,
        id: ele.id
      }
      this.$axios.post(this.URL, data).then(res => {
        const { data } = res
        // console.log(data)
        if (data.result_code === '00') {
          this.question_info.asks.splice(index, 1)
        }
      })
    },
    /**
             * @作者: 张兵
             * @功能: 数据初始化
             * @date: 2020/6/28 16:16
             * @description: getData
             * @return:
             */
    getData () {
      this.SAVE_QUESTION_INFO()
    },
    /**
             * @作者: 张兵
             * @功能: 保存大题
             * @description: saveQuestion
             * @param {tab-content-add.vue}
             * @return:
             */
    saveQuestion () {
      console.log(this.question_info)
      const data = Object.assign(this.question_info, {
        entry: 'question_bank_api',
        service_name: 'save_question'
      })
      data.content.type = 'html'
      data.asks = Array.of() // 保存大题的时候设置 asks 设置为 []，否则会报格式错误
      this.$set(data, 'is_finish', true)
      Reflect.deleteProperty(data, 'flag') // 删除自定义属性
      this.$axios.post(this.URL, data).then(({ data }) => {
        console.log(data)
        if (data.result_code === '00') {
          this.$Message.success('保存成功')
          this.getData() // 重新加载视图
        }
      })
    },
    /**
       * @作者: 张兵
       * @功能: 自动保存大题
       * @date: 2020/6/30 09:06
       * @description: autoSave
       * @param {tab-content-add.vue}
       * @return:
      */
    autoSave () {
      const data = Object.assign(this.questionInfo, {
        entry: 'question_bank_api',
        service_name: 'save_question'
      })
      data.content.type = 'html'
      data.asks = Array.of() // 保存大题的时候设置 asks 设置为 []，否则会报格式错误
      this.$set(data, 'is_finish', false)
      Reflect.deleteProperty(data, 'flag') // 删除自定义属性
      this.$axios.post(this.URL, data).then(({ data }) => {
        // console.log(data)
        if (data.result_code === '00') {
          // this.$Message.success('保存成功')
          this.getData() // 重新加载视图
        }
      })
    }
  },
  computed: {
    ...mapState({
      question_info: state => state.question_info // 获取 id
    })
  },
  created () {
    // 添加分数
    for (let i = 1; i <= 100; i++) {
      this.valueInfo.scoreList.push(`${i}分`)
    }
    this.valueInfo.editorListIndex = this.generateBig() // 初始选项
    this.getData()
  },
  mounted () {
    // setInterval(() => {
    //   this.autoSave()
    // }, 20000)
  },
  destroyed () {
  }
}
</script>

<style>
    textarea {
        border-radius: 0 !important;
    }
</style>
