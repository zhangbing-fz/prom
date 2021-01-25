<comment>
# 题库列表组件
</comment>
<template>
    <div
            :shoppingList="shoppingList"
            class="global-rich-text-question"
    >
        <Row
                v-for="(item,index) in content"
                :key="index"
                class="global-rich-text-list"
        >
            <Col span="24">
                <Row
                        :style="{
                            padding: '10px',
                            backgroundColor: '#f8f8f9',
                            borderBottom: '1px solid #e8eaec'
                        }"
                        align="middle"
                        type="flex"
                >
                    <Col
                            :style="{ textAlign: 'left'}"
                            span="12">
                        <h4>
                            <span :style="{fontSize: '22px'}">
                                {{ Number(index) + 1 }}、
                            </span>
                            共享状态：
                            <span style="color: #1daef8">
                                {{ item.editorMark | IsObjectiveFilter }}
                            </span> ｜
                            <span>
                                题型： {{ item.qtpye }}
                            </span> ｜
                            <span>
                                题类：<i>{{ item.isNormal }}</i>
                            </span> ｜
                            <span>
                                难度：{{ item.diff | DifficultIdFilter }}
                            </span>
                        </h4>
                    </Col>
                    <!-- 操作 -->
                    <Col
                            :style="{ textAlign: 'right' }"
                            span="12">
                        <!--<Button
                                :style="{margin: '0 5px'}"
                                @click="editorQuestion(index)"
                                size="small"
                                type="info">
                            <Icon type="ios-create"/>
                            编辑
                        </Button>-->
                        <Button
                                v-if="!item.editorMark"
                                ref="shoppingCart"
                                :style="{margin: '0 5px'}"
                                size="small"
                                type="success"
                                @click="addShoppingCart($event,item,index)"
                        >
                            <Icon type="md-cart"/>
                            加入试卷
                        </Button>
                        <Button
                                v-else
                                ref="shoppingCart"
                                :style="{margin: '0 5px'}"
                                size="small"
                                type="error"
                                @click="removeShoppingCart($event,item,index,'qid')"
                        >
                            <Icon type="ios-trash"/>
                            移除试卷
                        </Button>
                    </Col>

                </Row>
                <Row>
                    <Col
                            :style="{
                            textAlign: 'left',
                            padding: '10px'
                        }"
                            span="24"
                    >
                        <div v-html="item.title"></div>
                    </Col>
                </Row>
                <Row
                        :style="{
                            padding: '10px'
                        }"
                >
                    <Col justify="start" span="24">
                        <div>
                            <!-- 单选、多选、判断 -->
                            <Row v-if="item.qtpye === '单选题' || item.qtpye === '选择题'">
                                <Col span="24" style="text-align: left">
                                    <p :style="{marginRight: '20px', color: item.is_correct ? 'red': ''}"
                                    >
                                        A、<span v-html="item.option_a"></span>
                                    </p>
                                    <p :style="{marginRight: '20px', color: item.is_correct ? 'red': ''}"
                                    >
                                        B、<span v-html="item.option_b"></span>
                                    </p>
                                    <p :style="{marginRight: '20px', color: item.is_correct ? 'red': ''}"
                                    >
                                        C、<span v-html="item.option_c"></span>
                                    </p>
                                    <p :style="{marginRight: '20px', color: item.is_correct ? 'red': ''}"
                                    >
                                        D、<span v-html="item.option_d"></span>
                                    </p>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                </Row>
                <Row
                        align="middle"
                        class="global-rich-text-list-content"
                        justify="space-between"
                >
                    <!-- 评分 -->
                    <Col
                            :style="{
                                textAlign: 'left',
                                paddingRight: '20px'
                            }"
                            class="global-rich-text-list-content-left"
                            span="24"
                    >
                        <Rate
                                v-model="valueCustomText"
                                allow-half
                                show-text
                        >
                            <span
                                    :style="{
                                        color: '#f5a623',
                                        fontSize: '20px'
                                    }"
                            >{{ valueCustomText }}</span>
                        </Rate>
                    </Col>
                </Row>
                <Row
                        align="middle"
                        class="global-rich-text-list-content"
                        justify="space-between"
                >
                    <Col
                            class="global-rich-text-list-content-left"
                            span="12"
                    >
                        <span>平均得分率：
                            <i>52.81%</i>
                        </span>

                    </Col>
                    <Col
                            :style="{textAlign: 'right'}"
                            span="12"
                    >
                    <span
                            v-show="!item.mark"
                            :style="{
                                margin: '0 5px',cursor: 'pointer'
                            }"
                            size="small"
                            type="info"
                            @click="editorCollection(item,index)"
                    >
                        <Icon type="ios-heart-outline"/>
                        收藏
                    </span>
                        <span v-show="item.mark"
                              :style="{
                                    margin: '0 5px',
                                    cursor: 'pointer',
                                    color: '#ed4014'
                              }"
                              size="small"
                              type="info"
                              @click="editorCollectionCancel(item,index)"
                        >
                        <Icon type="ios-heart"/>
                        已收藏
                    </span>
                        <span
                                :style="{
                                    margin: '0 5px',
                                    cursor: 'pointer',
                                    color: '#ff9900'
                                }"
                                size="small"
                                type="warning"
                                @click="editorErrorCorrection(index)"
                        >
                        <Icon type="ios-close-circle-outline"/>
                        纠错
                    </span>
                        <span
                                :style="{
                                    margin: '0 5px',
                                    cursor: 'pointer',
                                    color: '#1daef8'
                                }"
                                size="small"
                                type="error"
                                @click="editorParsing(item,index)"
                        >
                        <Icon type="ios-list-box-outline"/>
                        解析
                    </span>
                    </Col>
                </Row>
            </Col>
        </Row>

        <global-loading
                v-if="showLoading"
                :style="{
                    zIndex: '100'
                }"/>
    </div>
</template>

<script>

import { mapActions, mapMutations, mapState } from 'vuex'
import myMixin from '@/mixin'

export default {
  name: 'global-rich-text-question',
  components: {},
  mixins: [myMixin],
  data () {
    return {
      content: this.contentInfo, // 试题篮列表
      valueCustomText: 3.8, // 评分
      showLoading: true,
      URL: '/question_bank_api',
      editorMark: false, // 是否开启编辑
      value: '0' // 折叠板默认展开的索引 name
    }
  },
  filters: {
    IsObjectiveFilter (val) {
      return val ? '是' : '否'
    },
    DifficultIdFilter (val) {
      if (val === '0.00') {
        return '全部'
      } else if (val === '1.00') {
        return '容易'
      } else if (val === '2.00') {
        return '一般'
      } else if (val === '3.00') {
        return '中等'
      } else if (val === '4.00') {
        return '困难'
      } else if (val === '5.00') {
        return '特难'
      }
    }
  },
  props: {
    // 接口获取的试题列表
    contentInfo: {
      type: Array,
      required: true
    }
  },
  watch: {
    contentInfo: {
      handler (val) {
        // console.log(val)
        val.forEach(item => {
          // 添加试题状态开关
          if (item.editorMark === undefined) {
            item.editorMark = false
          }
        })
        this.content = val
        // 监听到数据列表变化时，初始化试题状态列表
        this.questionInit('qid')
        // 加载loading
        this.showLoading = false
      },
      deep: true
    },
    // 监听试题篮缓存的变化,改变试题列表的试题状态
    shoppingList: {
      handler (val) {
        // 初始化试题状态列表
        this.questionInit('qid')
        this.showLoading = false
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['SAVE_QUESTION_INFO', 'SAVE_QUESTION_INFO_EDITOR']),
    ...mapMutations(['SET_SHOPPING_CART_LIST_REMOVE']),
    /**
         * @作者: 张兵
         * @功能: 解析
         * @date: 2020/7/7 15:56
         * @description: editorParsing
         * @param {global-rich-text-.vue}
         * @return:
         */
    editorParsing (ele, i) {
      this.$emit('changeTow', ele, i)
    },
    /**
         * @作者: 张兵
         * @功能: 纠错
         * @date: 2020/7/7 15:55
         * @description: editorErrorCorrection
         * @param {global-rich-text-.vue}
         * @return:
         */
    editorErrorCorrection (i) {
      this.$emit('change', i)
    },
    /**
         * @作者: 张兵
         * @功能: 收藏
         * @date: 2020/7/7 15:53
         * @description: editorCollection
         * @param {global-rich-text-.vue}
         * @return:
         */
    editorCollection (ele, i) {
      this.$set(ele, 'mark', true)
      this.$Notice.success({
        top: 50,
        duration: 3,
        title: '添加收藏',
        desc: 'The desc will hide when you set render.',
        render: h => {
          return h('span', [
            '已添加到收藏夹 ',
            h('a', '点击查看！'),
            ' function'
          ])
        }
      })
      return ele
    },
    /**
         * @作者: 张兵
         * @功能: 取消收藏
         * @date: 2020/7/8 09:08
         * @description: editorCollectionCancel
         * @param {global-rich-text-.vue}
         * @return:
         */
    editorCollectionCancel (ele, i) {
      ele.mark = false
      this.$Notice.warning({
        top: 50,
        duration: 3,
        title: '取消收藏',
        desc: 'The desc will hide when you set render.',
        render: h => {
          return h('span', [
            '已从收藏夹移除 ',
            h('a', '点击查看！'),
            ' function'
          ])
        }
      })
      return ele
    },
    /**
         * @作者: 张兵
         * @功能: 编辑大题
         * @date: 2020/6/28 17:25
         * @description: editor
         * @return:
         */
    editorQuestion (index) { // 编辑
      // console.log(this.info[index]) // 当前题目data
      this.SAVE_QUESTION_INFO_EDITOR(this.contentInfo[index].id) // 传入id
      this.$router.push('/editor_content')
    },
    /**
         * @作者: 张兵
         * @功能: 保存
         * @date: 2020/6/29 13:26
         * @description: saveEditer
         * @return:
         */
    saveEditer (index) { // 保存
      this.$Message.info('保存')
      // this.$set(this.info[index], 'editorMark', false)
      this.$nextTick(() => {
        this.contentInfo = Object.assign({}, this.contentInfo)
      })
    },

    // 提示框
    listTitle () {
      this.$Notice.warning({
        title: '提醒',
        desc: '<div><p>红色选项为<span style="color: red">正确</span>答案！</p><p>长、短直线分别代表 "简答题"、"填空题"</p></div>'
        // duration: 0
      })
    }
  },
  computed: {
    ...mapState({
      shoppingList: state => state.shopping_cart.list, // 试题篮
      select_type: state => state.select_type // 搜索框选择类型
    })
  },
  created () {
  },
  mounted () {
    this.SAVE_QUESTION_INFO()
    // 弹框提醒
    // this.listTitle()
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

.global-rich-text-list {
    margin-top: 20px;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 6px;
    transition: .2s ease-in-out;
}

.global-rich-text-list:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    border-color: transparent;
    position: relative;
}

.global-rich-text-list:first-child {
    margin-top: 0;
}

.global-rich-text-list-content {
    padding: 0 10px;
    background-color: #f8f8f9;
    border-top: 1px solid #e8eaec;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.global-rich-text-list-content .global-rich-text-list-content-left {
    color: #999;
}

.global-rich-text-list-content .global-rich-text-list-content-left span {
    font-size: 12px;
    padding: 0 5px
}

.global-rich-text-list-content .global-rich-text-list-content-left span:nth-child(1) i {
    color: #2d8cf0;
}

.global-rich-text-list-content .global-rich-text-list-content-left span:nth-child(2) i {
    color: #2d8cf0;
}

.global-rich-text-list-content .global-rich-text-list-content-left span:nth-child(3) i {
    font-size: 16px;
    color: #2d8cf0;
}

.global-rich-text-list-content .global-rich-text-list-content-left {
    text-align: left;
}

</style>
