<comment>
# 题库列表组件
</comment>
<template>
    <div
            :shoppingList="shoppingList"
            class="global-rich-text-examination"
    >

            <Row
                    v-for="(item,index) in content"
                    :key="index"
                    style="cursor:pointer"
                    class="global-rich-text-list"
                    @click.native="getContext(item)"
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
                                span="24">
                            <h4>
                            <span>
                                {{ index | filterIndex}}、
                            </span>
                                <span>{{ item.gradeName2 }}
                            </span> ｜
                                <span v-html="item.paperName"/>

                            </h4>
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

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'global-rich-text-examination',
  components: {},
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
    filterIndex (val) {
      let str = Number(val)
      if (str + 1 < 10) {
        str = '0' + (str + 1)
      } else {
        str += 1
      }
      return str
    },
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
        console.log(val)
        val.forEach(item => {
          // 添加试题状态开关
          if (item.editorMark === undefined) {
            item.editorMark = false
          }
        })
        this.content = val
        // 监听到数据列表变化时，初始化试题状态列表
        this.questionInit()
        // 加载loading
        this.showLoading = false
      },
      deep: true
    },
    // 监听试题篮缓存的变化,改变试题列表的试题状态
    shoppingList: {
      handler (val) {
        // 初始化试题状态列表
        this.questionInit()
        this.showLoading = false
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['SAVE_QUESTION_INFO', 'SAVE_QUESTION_INFO_EDITOR']),
    ...mapMutations(['SET_SHOPPING_CART_LIST_REMOVE']),
    // 获取试卷详情
    getContext (val) {
      console.log(val)
      const url = 'http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=getPaperQues&accessKey=37f600e9c80494c20d950d3081e497e5'
      this.$axios.get(`${url}&paperId=${val.tiid}`)
        .then(res => {
          console.log(res)
        })
    },

    // 提示框
    listTitle () {
      this.$Notice.warning({
        title: '提醒',
        desc: '<div><p>红色选项为<span style="color: red">正确</span>答案！</p><p>长、短直线分别代表 "简答题"、"填空题"</p></div>'
        // duration: 0
      })
    },
    // 初始化试题状态列表,渲染试题开关的状态
    questionInit () {
      const data = this.$store.state.shopping_cart.list
      for (let i = 0, len = this.content.length; i < len; i++) {
        // 所有开关的状态为为选中
        // console.log(data)
        this.content[i].editorMark = false
        for (let j = 0, len = data.length; j < len; j++) {
          // 获取并集
          if (data[j].qid === this.content[i].qid) {
            // 满足的改为 true
            this.content[i].editorMark = true
          }
        }
      }
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
