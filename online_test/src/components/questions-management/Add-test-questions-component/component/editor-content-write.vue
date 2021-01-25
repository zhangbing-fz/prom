<comment>
    # 编辑小题 / 可编辑
</comment>
<template>
    <Row>
        <!-- 小题 begin -->
        <Row class="editor-list">
            <Col  class="editor-list-th"
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
            <Col  class="editor-list-td" span="21">
                <global-editor
                        :style="{backgroundColor: 'white'}"
                        :textInfo="item.content.value"
                        @change="item.content.value=arguments[0]"
                        @disabled="$refs.saveSmall[index].$el.removeAttribute('disabled')"
                        :id="'saveSmall'+index"
                        ref="editorList"
                ></global-editor>
            </Col>
        </Row>
        <!-- 试题属性 -->
        <Row class="editor-list">
            <Col  class="editor-list-th" span="3">试题属性:</Col>
            <Col  class="editor-list-td" span="21">
                <label>
                    <Select :style="{width:'100px'}" v-model="submitInfo.questions.class">
                        <Option :key="item" :value="item" v-for="item in valueInfo.classList">{{ item }}</Option>
                    </Select>
                </label>
                <label>
                    <Select :style="{width:'100px', marginLeft: '10px'}" v-model="submitInfo.questions.semester">
                        <Option :key="item" :value="item" v-for="item in valueInfo.semesterList">{{ item }}</Option>
                    </Select>
                </label>
                <!-- 题型选择 -->
                <label>
                    <Select :style="{width:'100px', marginLeft: '10px'}" v-model="item.type">
                        <Option :key="index" :value="(index+1).toString()" v-for="(item,index) in valueInfo.selectList">
                            {{ item }}
                        </Option>
                    </Select>
                </label>
                <!-- 难度 -->
                <label>
                    <Select :style="{width:'100px', marginLeft: '10px'}" v-model="item.difficult">
                        <Option :key="item" :value="(index+1)" v-for="(item,index) in valueInfo.difficultList">
                            {{ item }}</Option>
                    </Select>
                </label>
                <!--                {{submitInfo.questions.difficult}}-->
<!--                {{valueInfo.difficultList}}-->

                <label>
                    <Select :style="{width:'auto', marginLeft: '10px'}" v-model="submitInfo.questions.score">
                        <Option :key="item" :value="item" v-for="item in valueInfo.scoreList">{{ item }}</Option>
                    </Select>
                </label>
            </Col>
        </Row>

        <!-- 添加小题选项 -->
        <Row class="editor-list" v-if="item.type === '1' || item.type === '2'">
            <Col  class="editor-list-th" span="3">
                <Tooltip placement="right-end">选项:
                    <a :style="{width: '200px'}" href="javascript:;">
                        <Icon type="md-help"/>
                    </a>
                    <div slot="content">
                        <p>平台默认添加4个选项，如果您不需要<br>4个选项，请直接删除。如果您需要更<br>多的选项，请点击‘添加选项’进行添<br>加。</p>
                    </div>
                </Tooltip>
            </Col>
            <Col  class="editor-list-td" span="21">
                <Button @click="setEditorSmall(item)" size="small" type="info">
                    <Icon type="md-add"/>
                    添加选项
                </Button>
                <!--<Checkbox :style="{marginLeft: '10px'}" v-model="submitInfo.single">不记录本次选项内容</Checkbox>-->
            </Col>
        </Row>

        <!-- 添加小题选项 具体项 -->
        <Row class="editor-list" v-if="item.choices.length !== 0 && item.type === '1' || item.type === '2'">
            <Col class="editor-list-th" span="3">小题选项:</Col>
            <Col class="editor-list-td" span="21">
                <div :style="{display: 'flex', justifyContent: 'left', width: '100%', flexWrap: 'wrap'}">
                    <div :key="i"
                         :style="{width: 'calc(25% - 10px)', margin: '10px 10px 0 0', position: 'relative'}"
                         v-for="(ele,i) in item.choices">
                        <!--<global-editor
                                :style="{backgroundColor: 'white', marginTop: '10px'}"
                                :textInfo="ele.content.value"
                                @change="ele.content.value=arguments[0]"
                                ref="editorList"
                        ></global-editor>-->
                        <Icon :style="{position: 'absolute', top: '-10px', right: '-10px',zIndex: '99', cursor: 'pointer'}"
                              @click="removeEditorSmall(i)"
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

        <!-- 答案 单选-->
        <Row class="editor-list" v-if="item.type === '1'">
            <Col  class="editor-list-th" span="3">答案:</Col>
            <Col  class="editor-list-td" span="21">
                <Checkbox :key="i" :style="{marginRight: '20px'}"
                          @on-change="changSingle(item.choices, i)"
                          v-for="(ele,i) in item.choices"
                          v-model="ele.is_correct"
                >{{valueInfo.editorListIndex[i]}}
                </Checkbox>
            </Col>
        </Row>

        <!-- 答案 多选-->
        <Row class="editor-list" v-if="item.type === '2'">
            <Col  class="editor-list-th" span="3">多选答案:</Col>
            <Col  class="editor-list-td" span="21">
                <Checkbox :key="i" :style="{marginRight: '20px'}"
                          v-for="(ele,i) in item.choices"
                          v-model="ele.is_correct"
                >{{valueInfo.editorListIndex[i]}}
                </Checkbox>
            </Col>
        </Row>

        <!-- 答案 判断-->
        <Row class="editor-list" v-if="item.type === '3'">
            <Col  class="editor-list-th" span="3">单选答案:</Col>
            <Col  class="editor-list-td" span="21">
                <RadioGroup v-model="item.answer_content.value">
                    <Radio :label="'正确'"></Radio>
                    <Radio :label="'错误'"></Radio>
                </RadioGroup>
            </Col>
        </Row>

        <!-- 答案 填空题、简答题 -->
        <Row class="editor-list" v-if="item.type === '4' || item.type === '5'">
            <Col  class="editor-list-th" span="3">答案:</Col>
            <Col  class="editor-list-td" span="21">
                <Input
                        :style="{width: '100%', borderRadius: 'none'}"
                        maxlength="100"
                        placeholder="请输入内容..."
                        show-word-limit
                        type="text"
                        v-model="item.answer_content.value"/>

            </Col>
        </Row>

        <!-- 答案 写作 -->
        <Row class="editor-list" v-if="item.type === '6'">
            <Col  class="editor-list-th" span="3">答案:</Col>
            <Col  class="editor-list-td" span="21">
                <Input
                        :style="{width: '100%', borderRadius: 'none'}"
                        maxlength="1000"
                        placeholder="请输入内容..."
                        show-word-limit
                        type="textarea"
                        v-model="item.answer_content.value"/>

            </Col>
        </Row>

        <!-- 教材属性 -->
        <Row class="editor-list">
            <Col  class="editor-list-th" span="3">教材属性:</Col>
            <Col  class="editor-list-td" span="21">
                <add-material :chapters="item.chapters"
                              :select_material="select_material"
                              :tree_material="material"
                              @ok="item.chapters=arguments[0]"
                ></add-material>
            </Col>
        </Row>

        <!-- 知识点属性 -->
        <Row class="editor-list">
            <Col  class="editor-list-th" span="3">知识属性:</Col>
            <Col  class="editor-list-td" span="21">

                <add-knowledge :knowledges="item.knowledges"
                               :select_knowledge="select_knowledge"
                               :tree_knowledge="knowledge"
                               @ok="item.knowledges=arguments[0]"
                ></add-knowledge>
            </Col>
        </Row>

        <!-- 解析 begin -->
        <Row class="editor-list">
            <Col  class="editor-list-th" span="3">解析:</Col>
            <Col  class="editor-list-td" span="21">
                <global-editor
                        :style="{backgroundColor: 'white'}"
                        :textInfo="item.explanation.value"
                        @change="item.explanation.value=arguments[0]"
                        :id="'explanation'+index"
                        ref="editorList"
                ></global-editor>
            </Col>
        </Row>
        <Row class="editor-list">
            <Col  class="editor-list-th" span="3">操作:</Col>
            <Col  class="editor-list-td" span="21">
                <!--<Button v-if="!question_info.asks[index].mark" :style="{marginTop: '10px', width: '100%'}" @click="writeAsks($event, index)" ref="saveSmall"
                        type="success">
                    <Icon type="ios-create"/>
                    编辑小题
                </Button>-->
                <Button :style="{ width: '12%'}"
                        @click="setAsks(item)"
                        ref="saveSmall"
                        type="success">
                    <Icon type="ios-create"/>
                    保存小题
                </Button>
            </Col>
        </Row>

    </Row>
</template>

<script>
import myMixin from '@/mixin.js'

import addMaterial from './add-material'
import addKnowledge from './add-knowledge'

export default {
  mixins: [myMixin],
  name: 'editor-content-write',
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
          select: '填空',
          difficult: '普通',
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
        difficultList: ['容易', '较易', '一般', '较难', '困难'],
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
  watch: {
    knowledge: {
      handler (val) {
        // console.log(val)
        if (!this.knowledge.length) {
          this.knowledge = JSON.parse(localStorage.getItem('tree_knowledge'))
        }
      },
      deep: true,
      immediate: true
    },
    material: {
      handler () {
        if (!this.material.length) {
          this.material = JSON.parse(localStorage.getItem('tree_material'))
        }
      },
      deep: true,
      immediate: true
    },
    select_knowledge: {
      handler () {
        if (!this.select_knowledge.length) {
          this.select_knowledge = JSON.parse(localStorage.getItem('select_knowledge'))
        }
      },
      deep: true,
      immediate: true
    },
    select_material: {
      handler () {
        if (!this.select_material.length) {
          this.select_material = JSON.parse(localStorage.getItem('select_material'))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
       * @作者: 张兵
       * @功能: 添加小题选项
       * @date: 2020/6/28 16:16
       * @description: setEditorSmall
       * @return:
       */
    setEditorSmall (ele) {
      ele.choices.push({
        content: {
          type: 'html',
          value: '选项'
        },
        is_correct: false
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
             * @功能: 保存小题
             * @date: 2020/6/28 16:16
             * @description: setAsks
             * @return:
             */
    setAsks (ele) {
      /* console.log(this.question_info.asks[index]) // 当前小题data */
      const data = Object.assign(this.item, {
        entry: 'question_bank_api',
        service_name: 'save_ask'
      })
      data.content.type = 'html'
      data.explanation.type = 'html'
      data.answer_content.type = 'html'
      data.is_finish = true
      this.$axios.post(this.URL, data).then(({ data }) => {
        if (data.result_code === '00') {
          this.$Message.success('小题已保存！')
          this.$emit('changemark', ele)
        } else {
          this.$Message.error(data.result_info)
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
        question_id: this.$store.state.question_info_editor.id
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
             * @功能: 删除当前小题
             * @date: 2020/6/28 16:16
             * @description: removeAsks
             * @return:
             */
    removeAsks (ele, index) {
      this.$emit('removeAsks', ele, index)
      console.log(ele, index)
    },
    /**
             * @作者: 张兵
             * @功能: 单选答案/单选题型
             * @date: 2020/7/6 15:18
             * @description: changSingle
             * @param {editor-content-write.vue}
             * @return:
             */
    changSingle (val, num) {
      console.log(val, num)
      val.forEach((item, index) => {
        if (num === index) {
          item.is_correct = true
        } else {
          item.is_correct = false
        }
      })
    }
  },
  computed: {
  },
  created () {
    this.valueInfo.editorListIndex = this.generateBig() // 初始选项

    // 添加分数
    for (let i = 1; i <= 100; i++) {
      this.valueInfo.scoreList.push(`${i}分`)
    }
    window.addEventListener('click', function (e) {
      e.stopImmediatePropagation()
    })
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style scoped>
    .editor-list {
        line-height: 38px;
        /*margin-top: 10px;*/
        /*border-bottom: 1px dashed #dcdee2;*/
    }
    .editor-list:last-child{
        border-bottom: none;
    }

    .editor-list-th {
        text-align: right;
        padding-right: 25px;
        font-weight: bold;
    }

    .editor-list-td {
        padding-left: 10px;
        text-align: left;
    }
</style>
