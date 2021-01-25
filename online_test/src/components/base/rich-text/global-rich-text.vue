<comment>
    # 查询试题列表 old
</comment>
<template>
    <div class="global-rich-text">
        <div
                :key="index" v-for="(item,index) in content_Info"
        >
            <!--{{item.Option}}-->
            <Row :style="{padding: '10px', backgroundColor: '#f8f8f9', borderBottom: '1px solid #e8eaec'}"
                 justify="space-between"
                 type="flex">
                <Col :style="{lineHeight: '32px', textAlign: 'left'}" span="12">
                    <h4>
                        {{Number(index)+1}}.题型：{{item.TypeId}}
                        <span style="color: #999"> | </span>
                        难易度：<span style="color: #1daef8">{{item.DifficultId | DifficultIdFilter}}</span>
                        <span style="color: #999"> | </span>
                        共享状态：<span style="color: #1daef8">{{item.IsObjective | IsObjectiveFilter}}</span>
                    </h4>
                </Col>
                <Col :style="{textAlign: 'right'}" span="12">
                    <Button :style="{margin: '0 5px'}" @click="editorQuestion(index)" type="info">
                        <Icon type="ios-create"/>
                        编辑
                    </Button>
                    <!--<Button :style="{margin: '0 5px'}" @click="saveEditer(index, item.editorMark)" type="info">
                        <Icon type="ios-create"/>
                        保存
                    </Button>-->
                    <Button :style="{margin: '0 5px'}" type="warning">
                        <Icon type="md-git-branch"/>
                        共享
                    </Button>
                    <Button :style="{margin: '0 5px'}" @click="removeQuestion(index)" type="error">
                        <Icon type="md-trash"/>
                        删除
                    </Button>
                </Col>
            </Row>

            <!--<div>
                <p :style="{padding: '20px', lineHeight: '28px', textAlign: 'left'}"
                   v-html="item.Content"
                   v-show="!item.editorMark"></p>
                <global-editor :style="{lineHeight: '28px', textAlign: 'left'}"
                               :textInfo="item.Content"
                               v-show="item.editorMark"
                ></global-editor>
            </div>-->

            <!-- 折叠板 begin -->
            <template>
                <Collapse
                        @on-change="disableDom(index)"
                        accordion
                        simple
                        v-model="value">
                    <Panel
                            :name="index.toString()"
                    >
                        <span
                                :style="{ lineHeight: '28px', textAlign: 'left'}"
                        >查看完整试题</span>
                        <p
                                :style="{lineHeight: '28px', textAlign: 'left'}"
                                ref="editor"
                                slot="content"
                                v-html="item.content.value"
                                v-show="!item.editorMark"
                        ></p>
                        <global-editor
                                :style="{lineHeight: '28px', textAlign: 'left'}"
                                :textInfo="item.content.value"
                                ref="editor"
                                slot="content"
                                v-show="item.editorMark"
                        ></global-editor>
                    </Panel>
                </Collapse>
            </template>
        </div>
        <global-loading v-if="showLoading" :style="{zIndex: '100'}"></global-loading>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'global-rich-text.vue',
  components: {},
  data () {
    return {
      showLoading: true,
      URL: '/question_bank_api',
      editorMark: false, // 是否开启编辑
      content: '12312323',
      value: '0', // 折叠板默认展开的索引 name
      content_Info: null
    }
  },
  filters: {
    IsObjectiveFilter (val) {
      return val ? '是' : '否'
    },
    DifficultIdFilter (val) {
      if (val === 0) {
        return '全部'
      } else if (val === 1) {
        return '容易'
      } else if (val === 2) {
        return '一般'
      } else if (val === 3) {
        return '困难'
      }
    }
  },
  props: {
    contentInfo: {
      type: Array,
      required: true
    }
  },
  watch: {
    contentInfo: {
      handler () {
        if (this.contentInfo.length > 0) {
          this.contentInfo.forEach(item => {
            item.editorMark = false
          })
          this.content_Info = this.contentInfo
          this.showLoading = false
          // console.log(this.contentInfo, this.loading) // 输出父组件传过来的数据 list/**/
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions(['SAVE_QUESTION_INFO', 'SAVE_QUESTION_INFO_EDITOR']),
    /**
             * @作者: 张兵
             * @功能: 编辑大题
             * @date: 2020/6/28 17:25
             * @description: editor
             * @param {global-rich-text.vue}
             * @return:
             */
    editorQuestion (index, ele) { // 编辑
      // console.log(this.info[index]) // 当前题目data
      this.SAVE_QUESTION_INFO_EDITOR(this.contentInfo[index].id) // 传入id
      this.$router.push('/editor_content')
    },
    /**
             * @作者: 张兵
             * @功能: 保存
             * @date: 2020/6/29 13:26
             * @description: saveEditer
             * @param {global-rich-text.vue}
             * @return:
             */
    saveEditer (index) { // 保存
      this.$Message.info('保存')
      // this.$set(this.info[index], 'editorMark', false)
      this.$nextTick(() => {
        this.contentInfo = Object.assign({}, this.contentInfo)
      })
    },
    /**
             * @作者: 张兵
             * @功能: 删除数据 list
             * @date: 2020/6/29 13:31
             * @description: remove
             * @param {global-rich-text.vue}
             * @return:
             */
    removeQuestion (index) {
      const data = {
        entry: 'question_bank_api',
        service_name: 'delete_question',
        id: this.contentInfo[index].id
      }
      this.$Modal.confirm({
        title: '提示',
        content: '<p>您确认删除该试题么？将不可恢复</p>',
        onOk: () => {
          this.$Message.info('点击了确定')
          this.$axios.post(this.URL, data).then(({ data }) => {
            console.log(data)
            this.contentInfo.splice(index, 1) // 删除当前选中大题
          })
        },
        onCancel: () => {
          this.$Message.info('点击了取消')
        }
      })
    },
    /**
       * @作者: 张兵
       * @功能: 大题折叠板
       * @date: 2020/6/29 14:57
       * @description: disableDom
       * @param {global-rich-text.vue}
       * @return:
      */
    disableDom (index) {
      console.log(this.contentInfo[index].editorMark)
      console.log(index)
    },
    handleChange (html, text) {
      console.log(html, text)
    },
    changeContent () {
      this.$refs.editor.setHtml('<p>powered by wangeditor</p>')
    }
  },
  computed: {
    ...mapState({
      // question_info: state => state.question_info
    })
  },
  created () {
  },
  mounted () {
    this.SAVE_QUESTION_INFO()
  },
  destroyed () {
  }
}
</script>

<style scoped>
    .rich-text-enter-active {
        animation: bounce-in .5s;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0)
        }
        50% {
            transform: scale(1.5)
        }
        100% {
            transform: scale(1)
        }
    }
</style>
