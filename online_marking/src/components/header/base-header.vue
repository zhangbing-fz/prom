<comment>
# 打分组件头部导航
</comment>
<template>
    <div class="base-header">
        <div class="global-top">
            <Row>
                <Col class="center" span="24">
                    <div class="global-tool close center">
                        <a class="my" @click="setList">
                            <Icon size="22" type="ios-contact"/>
                            我的
                        </a>
                        <span style="margin: 0 20px">|</span>
                        <!-- 批阅模式 / 多题批阅模式 -->
                        <!--<span class="center" style="color: #666;">
                            <Icon size="18" type="ios-bookmarks-outline"/>
                            模式
                            <Select
                                    @on-change="$emit('selectModel', formItem.select)"
                                    size="small"
                                    style="width:auto; margin-left: 5px"
                                    v-model="formItem.select"
                            >
                                    <Option :key="index" :value="item" v-for="(item,index) in 4">{{item}}道题</Option>
                            </Select>
                        </span>-->
                    </div>
                    <div class="global-tool title">
                        {{ question_Num }}（
                        分值：
                        <i
                                :style="{
                                fontSize: equipment? '30px':'',
                                color: 'red'
                            }"
                        >{{ score }}</i>
                        均分：
                        <i
                                :style="{
                            fontSize: equipment? '30px':'',
                            color: 'red'}"
                        >{{ score }}</i> ）
                    </div>
                    <div
                            class="global-tool"
                            :style="{
                                 textAlign: 'right',
                                 position: 'absolute',
                                 right: 0
                            }"
                    >
                        <ButtonGroup class="menu" style="font-size: 22px">
                            <Button
                                    v-if="menu_mark"
                                    class="menu-btn"
                                    title="人员"
                                    to="/paper-personnel-content"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="ios-people"/>
                                人员
                            </Button>
                            <!--v-if="menu_mark_arbitration"-->
                            <Button
                                    v-if="leaderMark && !menu_mark"
                                    :to="{ path: '/arbitration-paper-history', query: { ID: question_ID} }"
                                    class="menu-btn"
                                    title="仲裁"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="logo-buffer"/>
                                仲裁
                            </Button>
                            <!--<Button

                                    class="menu-btn"
                                    title="质量"
                                    :to="{path:'/paper-quality-content'}"
                                    type="text">
                                <Icon style="transform: rotateY(180deg)" type="ios-stats"/>
                                质量
                            </Button>-->
                            <Button
                                    v-if="menu_mark"
                                    class="menu-btn"
                                    target="_blank"
                                    title="审核"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                      type="ios-list-box-outline"/>
                                审核
                            </Button>
                            <Button
                                    :to="{path: '/score', query: {ID: question_ID}}"
                                    class="menu-btn"
                                    title="阅卷"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="logo-buffer"/>
                                阅卷
                            </Button>
                            <Button
                                    :to="{path: '/examination-paper-history', query: {ID: question_ID}}"
                                    class="menu-btn"
                                    title="回评"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="ios-redo-outline"/>
                                回评
                            </Button>
                            <!--<Button

                                    :to="{path: '/paper-sample-list'}"
                                    class="menu-btn"
                                    title="样卷" type="text">
                                <Icon type="ios-paper-outline"/>
                                样卷
                            </Button>-->
                            <Button
                                    :to="{ path: menu_mark ? '/paper-progress-content': '/quality-content'}"
                                    class="menu-btn"
                                    title="进度"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        type="ios-trending-up"/>
                                进度
                            </Button>
                            <Button
                                    :title="modal?'隐藏工具':'显示工具'"
                                    class="menu-btn"
                                    type="text"
                                    @click="$emit('change',modal)"
                            >
                                <Icon
                                        v-show="equipment"
                                        :type="modal?'ios-eye-off-outline':'ios-eye-outline'"/>
                                工具
                            </Button>
                            <Button
                                    class="menu-btn"
                                    title="全屏模式"
                                    type="text"
                                    @click="$emit('handleFullScreen', fullscreen)"
                            >
                                <Icon v-show="equipment" type="ios-expand"/>
                                {{ fullscreen ? '取消' : '全屏' }}
                            </Button>
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
        </div>
        <!-- 抽屉弹出层 -->
        <modal-drawer
                :colorFont="colorFont"
                :qidList="qidList"
                :value="value1"
                @change="value1=$event"
                @changeMark="modal6=$event"
                @selectQid="selectQid"
        />

        <!-- 退出登录弹窗 -->
        <modal-exit
                :loading="loading"
                :modal="modal6"
                @asyncCancel="modal6=false,value1=false"
                @asyncOK="asyncOK"
        />

        <!-- 仲裁弹框 -->
        <modal-error
                :loading="loading"
                :modal="modal7"
                :title=title
                :titleContent=titleContent
                width="700"
                @asyncCancel="modal7=false"
                @asyncOK="asyncOK_($event)"
        />
    </div>
</template>

<script>
import error from '../popup/base-popup-error'
import exit from '../popup/base-popup-exit'
import drawer from './component/base-drawer'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'base-header',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'modal-exit': exit,
    // eslint-disable-next-line vue/no-unused-components
    'modal-error': error,
    // eslint-disable-next-line vue/no-unused-components
    'modal-drawer': drawer
  },
  data () {
    return {
      colorFont: 0, // 初始选中题号
      value2: 0, // 缩放比例
      formItem: { // 模式 / 批阅模式
        select: 1,
        score: 3 // 题目分数
      },
      value1: false, // 抽屉弹出层
      modal6: false, // 退出登录弹框
      loading: true, // 退出登录loading
      modal7: false, // 正评 / 仲裁弹框
      evaluationType: '正评',
      qidList: [], // 题号
      title: '',
      titleContent: ''
      // currentChoose: 0, // 仲裁id
      /* columnsTable: [
                          {
                            // title: '考试ID',
                            key: 'id',
                            width: '80',
                            align: 'center'
                          },
                          {
                            title: 'id',
                            key: 'id',
                            align: 'center'
                          },
                          {
                            title: '最低分',
                            key: 'min_score',
                            align: 'center'
                          },
                          {
                            title: '最高分',
                            key: 'max_score',
                            align: 'center'
                          },
                          {
                            title: 'has_child',
                            key: 'has_child'
                          },
                          {
                            title: 'childs',
                            key: 'childs'
                          },
                          {
                            title: '步骤',
                            key: 'step',
                            align: 'center'
                          },
                          {
                            title: '分数',
                            key: 'scores',
                            align: 'center'
                          }
                        ], // 仲裁弹框表头 */
      // dataTable: [], // 仲裁弹框表格内容
      // page_info: { // 仲裁表格数据分页
      //   total: 0
      // }
    }
  },
  props: {
    fullscreen: {
      type: Boolean,
      required: true
    },
    modal: {
      type: Boolean,
      required: true
    },
    zoom: {
      type: Number
    }
  },
  watch: {
    zoom (val) {
      this.value2 = val
    }
  },
  methods: {
    ...mapMutations(['SET_SCOREINFO', 'SET_LOGIN_INFO', 'SET_QUESTION_SCORE_INFO']),
    // 退出账号
    asyncOK () {
      setTimeout(() => {
        this.modal6 = false
        this.$router.push('/login')
      }, 1000)
    },

    // 关闭选题弹框
    asyncOK_ () {
      console.log(arguments)
      this.modal7 = false
    },

    setList () {
      const data = {
        entry: 'score_api',
        service_name: 'query_queue'
      }

      this.value1 = true
      this.getData('/scan_project/score_api', data)
        .then(res => {
          console.log(res)
          this.qidList = res.result_info
        })
        .catch(error => error)
    },
    // 选择题号
    selectQid (ele, i) {
      console.log(ele, i)
      this.$emit('changeID', ele)
      const data = JSON.parse(localStorage.getItem('login_info'))
      data.id = ele.id
      this.SET_LOGIN_INFO(data) // 设置选择后试题ID
      this.SET_QUESTION_SCORE_INFO(ele) // 设置选择后的试题信息
      this.SET_SCOREINFO(ele)// 设置大题分数、均分、题号
      this.colorFont = ele.id
      this.value1 = false
    },
    initialData () {
      // 初始化数据窗口
      this.getData('/scan_project/score_api', {
        entry: 'score_api',
        service_name: 'query_queue'
      })
        .then(res => { // 初始选择题一死题号分数，动态加载传入分数/题号
          this.validation(res)
          this.selectQid(JSON.parse(localStorage.getItem('question_score_info')))
          // if (!res.result_info.length > 1) {
          //   this.modal7 = true
          //   this.title = '选题'
          //   this.titleContent = '请选择批阅大题！'
          // } else {
          //   this.selectQid(res.result_info[1], 1)
          // }
        })
        .catch(error => error)
    }
  },
  computed: {
    ...mapState({ // 大题分数
      score: state => state.scoreinfo.score,
      question_ID: state => state.scoreinfo.question_ID, // 选择题号ID
      leaderMark: state => state.scoreinfo.leaderMark, // 仲裁开关
      question_Num: state => state.scoreinfo.question_Num,
      menu_mark: state => state.menu_mark.mark_personnel,
      menu_mark_arbitration: state => state.menu_mark.mark_arbitration, // 仲裁按钮
      equipment: state => state.equipment // 用户端

    })
  },
  created () {
  },
  mounted () {
    // 初始化数据
    this.initialData()
  },
  destroyed () {
  }
}
</script>

<style scoped>
p {
    cursor: pointer;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
    transition: all 0.3s ease-in-out;
}

p:hover {
    background-color: rgba(0, 0, 0, .2);
    /*font-weight: bold;*/
    padding-left: 2px;
}

p:last-child {
    position: absolute;
    bottom: 0;
    border-bottom: none;
}

p:last-child:hover {
    background-color: transparent;
    padding-left: 0;
}

.ivu-select-selected-value {
    border: 1px solid red;
}

/********************* 顶部工具栏 *********************/
.global-top {
    padding: 0 5px;
    background-color: #17233d;
    border-bottom: 1px solid #ddd;
}

.global-tool.close {
    position: absolute;
    left: 0;
}

.global-top .global-tool.close {
    text-align: left;
}

.global-top .global-tool.title {
    font-size: 18px;
    text-align: center;
    color: whitesmoke;
    font-weight: normal;
}

.ivu-form-item {
    margin: 0;
}

.menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
}

.menu-btn {
    color: #3994f1;
}

.ivu-btn-text:hover {
    font-weight: bold;
    transition: all 0.3s linear;
    background-color: #23385a;
}

/* 通用上下居中 */
.center {
    display: flex;
    justify-content: center;
    align-items: center
}

.global-tool {
    height: 50px;
    line-height: 50px;
    text-align: right;
}

a.my {
    display: inline-block;
    color: #666;
}

a.my:hover {
    color: white;
}

.global-tool button {
    margin-left: 5px;
    line-height: 24px;
}

.ivu-btn {
    font-size: 12px;
    padding: 0 10px;
}
</style>
