<comment>
    # 大题编辑/修改
</comment>
<template>
    <div :style="{backgroundColor: 'white', padding: '20px', borderRadius: '4px',boxShadow: '0 1px 1px 0 rgba(0,0,0,.1)'}" class="tab-content"
    >
        <global-loading :style="{zIndex: '100'}" v-if="showLoading"></global-loading>

        <div v-else>
            <!-- 题文 -->
            <div :style="{border: '1px solid #eee', borderRadius: '6px',  backgroundColor: '#f8f8f9', padding: '20px'}">
                <Row>
                    <Col span="24" :style="{textAlign: 'left'}"><h3>题文/题干</h3></Col>
                </Row>
                <Row>
                    <Col :style="{textAlign: 'left'}" span="24">
                        <!--<div v-html="question_info.content.value"
                             :style="{cursor: 'pointer'}"></div>-->
                        <!--@blur="autoSave"--> <!--自动保存-->
                        <global-editor
                                ref="editorTopic"
                                :style="{backgroundColor: 'white'}"
                                :textInfo="question_info.content.value"
                                :id="'content'+question_info.id"
                                @change="question_info.content.value=arguments[0]"
                        ></global-editor>
                    </Col>
                </Row>
                <!--<Row :style="{marginTop: '20px'}">
                    <Col :style="{textAlign: 'right', paddingRight: '20px', fontWeight: 'bold'}" span="3">操作:</Col>
                    <Col :style="{textAlign: 'left'}" span="21">
                        <Button :style="{ width: '12%'}"
                                @click="setAsks($event, index)"
                                type="info">
                            <Icon type="ios-create"/>
                            编辑题文
                        </Button>
                    </Col>
                </Row>-->
            </div>

            <!-- 本题有小题 -->
            <Row class="editor-list">
<!--                <Col class="editor-list-th" span="4">本题有小题:</Col>-->
                <Col :style="{textAlign: 'left', margin: '15px 0'}" span="24">
                    <Alert type="success" :style="{margin: 0}">
                        <div :style="{ display: 'flex', justifyContent: 'start', alignItems: 'center'}">
                            <Button @click="addAsks(question_info.id)" size="small" type="info">添加小题</Button>
                            <Icon :style="{color: '#2d8cf0', margin: '0 5px'}" type="md-information-circle"/>
                            本属性仅应用于在线作业或考试，如果本题无小题，请不要设置该属性。判断题和主观题不需要设置选项数量.
                        </div>
                    </Alert>
                </Col>
            </Row>
            <!-- 小题组件 -->

            <div :key="item+index" v-for="(item,index) in question_info.asks">
                <!-- 编辑展示 -->
                <editor-write
                        :index="index"
                        :item="item"
                        @removeAsks="removeAsks"
                        @changemark="saveSmallQuestion"
                        v-if="item.mark"
                        :style="{backgroundColor: index%2===1?'#f8f8f9':'white'}"
                        class="editor-list-wrap"
                        ref="editorWrite"
                ></editor-write>

                <!-- 静态展示 -->
                <editor-read
                        v-else-if="!item.mark"
                        :index="index"
                        :item="item"
                        class="editor-list-box"
                        @changemark="editorSmallQuestion"
                        ref="editorRead"
                ></editor-read>
            </div>

            <Row :style="{marginTop: '10px'}">
                <Col span="24">
                    <Button :style="{width: '100%'}" @click="saveQuestion" type="success">
                        <Icon type="ios-create"/>
                        保存试题
                    </Button>
                </Col>
            </Row>
        </div>
    </div>

</template>

<script>
import myMixin from '@/mixin'
// eslint-disable-next-line no-unused-vars
import editorWrite from './component/editor-content-write'
import editorRead from './component/editor-content-read'
// eslint-disable-next-line no-unused-vars
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'editor-content',
  mixins: [myMixin],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'editor-write': editorWrite,
    // eslint-disable-next-line vue/no-unused-components
    'editor-read': editorRead
  },
  data () {
    return {
      showLoading: true,
      URL: '/question_bank_api'
    }
  },
  props: {},
  watch: {
    // 监听题文传值是否存在
    question_info: {
      handler (newVal, oldVal) {
        // console.log(this.question_info)
        this.questionInfo = this.question_info || JSON.parse(localStorage.getItem('question_info_editor')) // 深度监听，当刷新当前页面时加载缓存信息
        this.showLoading = false // 数据加载完成，清除loading
        this.getTree() // 获取缓存树
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions(['SAVE_QUESTION_INFO_EDITOR']),
    /**
             * @作者: 张兵
             * @功能: 保存小题 /禁止编辑/ 展示模式
             * @date: 2020/7/6 16:40
             * @description: saveSmallQuestion
             * @return:
             */
    saveSmallQuestion (ele) {
      ele.mark = false
    },
    /**
             * @作者: 张兵
             * @功能: 编辑小题/激活编辑
             * @date: 2020/7/6 16:41
             * @description: editorSmallQuestion
             * @return:
             */
    editorSmallQuestion (ele) {
      this.$set(ele, 'mark', true)
    },
    /**
             * @作者: 张兵
             * @功能: 添加小题
             * @date: 2020/6/28 16:16
             * @description: addAsks
             * @return:
             */
    addAsks (id) {
      const data = {
        entry: 'question_bank_api',
        service_name: 'add_ask_init',
        question_id: this.question_info.id
      }
      this.$axios.post(this.URL, data).then(res => {
        const { data } = res
        if (data.result_code !== '00') {
          // 添加小题成功 callback
          return this.$Message.error(data.result_info)
        }
        this.SAVE_QUESTION_INFO_EDITOR(id)
        this.$Message.success('创建小题成功！')
        this.getData()
      })
    },
    /**
             * @作者: 张兵
             * @功能: // 获取本小题 form
             * @date: 2020/6/28 16:16
             * @description: getSmallQuestion
             * @return:
             */
    getSmallQuestion (val) { // 获取本小题 form

    },
    getTree () {
      this.knowledge = JSON.parse(localStorage.getItem('tree_knowledge'))
      this.material = JSON.parse(localStorage.getItem('tree_material'))
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
      this.SAVE_QUESTION_INFO_EDITOR()
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
      data.asks.forEach(item => {
        item.type = item.type && item.type.toString().padStart(2, '0') // 转译 type 题型
        item.answer_content.type = 'html'
      })
      console.log(data)
      // data.asks = Array.of() // 保存大题的时候设置 asks 设置为 []，否则会报格式错误
      this.$set(data, 'is_finish', true)
      this.$axios.post(this.URL, data).then(({ data }) => {
        console.log(data)
        if (data.result_code === '00') {
          this.$Message.success('保存成功')
          this.$router.push('/my_question')
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
    autoSave () { // 自动保存大题
      const data = Object.assign(this.questionInfo, {
        entry: 'question_bank_api',
        service_name: 'save_question'
      })
      data.content.type = 'html'
      // data.asks = Array.of() // 保存大题的时候设置 asks 设置为 []，否则会报格式错误
      this.$set(data, 'is_finish', false)
      this.$axios.post(this.URL, data)
    }
    /* isok (value) {
      console.log(value)
    } */
  },
  computed: {
    ...mapState({
      question_info: state => state.question_info_editor, // 获取编辑数据
      material: state => state.tree_nav.tree_material, // 获取教材属性
      knowledge: state => state.tree_nav.tree_knowledge // 获取知识点属性
    })
  },
  created () {
    this.getData()
    // this.SAVE_TREE_KNOWLEDGE() // 章节树
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style>
    textarea {
        border-radius: 0 !important;
    }

    .editor-list-wrap {
        line-height: 38px;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 6px;
        margin-bottom: 20px;
    }
    .editor-list-wrap:hover{
        box-shadow: 0 2px 7px rgba(0,0,0,.15);
        border-color: transparent;
        position: relative
    }

    .editor-list-box {
        line-height: 38px;
        background-color: white;
        padding-left: 0;
        border: 1px solid #eee;
        margin: 20px 0;
        /*cursor: pointer;*/
        border-radius: 6px;
    }
    .editor-list-box:first-child{
        margin-top: 0;
    }
    .editor-list-box:hover{
        box-shadow: 0 2px 7px rgba(0,0,0,.15);
        border-color: transparent;
        position: relative
    }
    .editor-list {
        line-height: 38px;
        /*margin-top: 10px;*/
    }

</style>
