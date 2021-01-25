<comment>
# 试卷详情
</comment>
<template>
    <div
            v-if="dataInfo.length"
            class="select-questions-detail"
            ref="math_tool_out"
    >
        <div>
            <h2>{{ question_list_info.paperName }}</h2>
            <small>
                年份：<span>{{ question_list_info.year }}</span> ｜
                科目：<span>{{ question_list_info.subjectName }}</span> ｜
                类型：<span>{{ question_list_info.paperType | paperTypeFilter }} </span>｜
                年级：<span>{{ question_list_info.gradeName | gradeNameFilter }}</span>
            </small>
        </div>
        <Row
                v-for="(item,index) in dataInfo"
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
                            <span>
                                {{ Number(index) + 1 }}、
                            </span>
                            <span :style="{fontWeight: 'normal'}">{{ item.Area ? item.Area : '' }}
                            {{ item.year ? item.year + '年' : '' }}
                            【{{ item.paperTpye | paperTypeFilter }}】
                                </span>
                            <span>
                                来源：<span style="color: #1daef8">{{ item.source }}</span>
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
                                @click="removeShoppingCart($event,item,index,'md52')"
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
                                <Col
                                        span="24"
                                        class="select-list"
                                >
                                    <p :style="{
                                        color: item.is_correct ? 'red': '',
                                        }"
                                    >
                                        A、<span v-html="item.option_a"></span>
                                    </p>
                                    <p :style="{
                                        color: item.is_correct ? 'red': '',
                                        }"
                                    >
                                        B、<span v-html="item.option_b"></span>
                                    </p>
                                    <p :style="{
                                        color: item.is_correct ? 'red': '',
                                        }"
                                    >
                                        C、<span v-html="item.option_c"></span>
                                    </p>
                                    <p :style="{
                                        color: item.is_correct ? 'red': '',
                                        }"
                                    >
                                        D、<span v-html="item.option_d"></span>
                                    </p>
                                </Col>
                            </Row>

                        </div>
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
                        <div style="font-weight: bold;">答案：<span v-html="item.answer1"/></div>
                    </Col>
                </Row>

                <!--<Row>
                    <Col
                            :style="{
                                textAlign: 'left',
                                padding: '10px'
                            }"
                            span="24"
                    >
                        <div v-html="item.answer2"></div>
                    </Col>
                </Row>-->

                <Row>
                    <Col
                            :style="{
                                textAlign: 'left',
                                padding: '10px'
                            }"
                            span="24"
                    >
                        <div v-html="item.parse"></div>
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
                                paddingRight: '20px',
                                color: '#333',
                                padding: '5px 0'
                            }"
                            class="global-rich-text-list-content-left"
                            span="24"
                    >
                       <span>
                                题型：<small style="color: #2d8cf0">{{ item.qtpye }}</small>
                       </span> ｜
                        <span>
                                难度：<small style="color: #2d8cf0">{{ item.diffName }}</small>
                        </span> |
                        <span>
                                题干与选项分离：<small style="color: #2d8cf0">{{ item.isNormal | isNormalFilter }}</small>
                        </span> |
                        <span>
                                所属科目：<small style="color: #2d8cf0">{{ item.subjectId }}</small>
                        </span> ｜
                        <span>
                                知识点名称: <small style="color: #2d8cf0">{{ item.knowledges }}</small>
                        </span> |
                        <span>
                            该题型总分：<small style="color: #2d8cf0">{{ item.scores }}</small>
                        </span> |
                        <span>
                            分值：<small style="color: #2d8cf0">{{ item.sorces }}</small>
                        </span>
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
                        <span>是否含有子题：{{ item.Issub }}--</span>

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
    </div>
</template>

<script>
import { mapState } from 'vuex'
import myMixin from '@/mixin'

export default {
  name: 'select-questions-detail',
  components: {},
  mixins: [myMixin],
  filters: {
    paperTypeFilter (val) {
      let str
      switch (Number(val)) {
        case 32:
          str = '模拟考'
          break
        case 34:
          str = '期末考'
          break
        case 35:
          str = '期中考'
          break
        case 36:
          str = '月考'
          break
        case 31:
          str = '中考'
          break
        case 38:
          str = '单元测试'
          break
        case 37:
          str = '其他类型'
          break
        case 33:
          str = '高考'
          break
      }
      return str
    },
    isNormalFilter (val) { // 是否题干分离 0为不分离 1为分离
      console.log(val)
      let str
      switch (Number(val)) {
        case 1:
          str = '是'
          break
        case 0:
          str = '否'
          break
      }
      return str
    },
    gradeNameFilter (val) {
      switch (val) {
        case '200': {
          return '七年级'
        }
      }
    }
  },
  data () {
    return {
      dataInfo: [],
      valueCustomText: 3.8, // 评分
      titleInfo: null,
      content: ''
    }
  },
  props: {},
  watch: {
    dataInfo: {
      handler (val) {
        this.content = val
        this.questionInit('md52')
      },
      deep: true
    },
    // 监听试题篮缓存的变化,改变试题列表的试题状态
    shoppingList: {
      handler (val) {
        console.log(val)
        // 初始化试题状态列表
        this.questionInit('md52')
        this.showLoading = false
      },
      deep: true
    }
  },
  methods: {
    // 获取试卷详情接口
    getData () {
      console.log(this.$route.query.titleInfo)
      this.titleInfo = this.$route.query.titleInfo
      const paperId = this.$route.query.ID
      const url = 'http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=getPaperQues&accessKey=37f600e9c80494c20d950d3081e497e5'
      this.$axios.get(`${url}&paperId=${paperId}`)
        .then(({ data }) => {
          console.log(data)
          data.data.forEach(item => {
            this.dataInfo.push(item)
          })
          console.log(Object.keys(data.data[0]))
        })
    }
  },
  computed: {
    ...mapState({
      shoppingList: state => state.shopping_cart.list, // 试题篮
      question_list_info: state => state.question_list_info, // 点击试卷列表信息
      base_interface_data_period: state => state.base_interface_data_period, // 学段接口返回的数据
      base_interface_data_type: state => state.base_interface_data_type // 难易度接口数据
    })
  },
  created () {
  },
  mounted () {
    this.getData() // 获取试卷详情数据
    window.onload = function () {
      console.log(11111)
      console.log(this.$refs.math_tool_out, document.getElementsByClassName('select-questions-detail')[0])
    }
    window.MathJax.typeset([this.$refs.math_tool_out])
  },
  destroyed () {
  }
}
</script>

<style scoped lang="less">
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

small {
    color: #999;
}

small > span {
    color: #333;
}

.select-list{
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
        padding: 10px 20px;
        display: flex;
        justify-content: left;
        align-items: center;
    }
}
</style>
