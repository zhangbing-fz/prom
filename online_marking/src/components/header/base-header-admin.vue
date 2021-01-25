<comment>
# 除打分组件之外头部导航
</comment>
<template>
    <div class="base-header-admin">
        <div class="global-top">
            <Row>
                <Col class="center" span="24">
                    <div class="global-tool close center">
                        <a class="my" @click="setList">
                            <Icon size="22" type="ios-contact"/>
                            我的
                        </a>
                    </div>
                    <div class="global-tool title">
                        <!-- 非管理员登录显示标题 -->
                        <div v-if="!menu_mark">
                            <slot>默认内容</slot>
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
                                        color: 'red'
                                    }"
                            >{{ score }}</i> ）
                        </div>

                        <!-- 非管理员登录显示标题 -->
                        <div v-if="menu_mark">
                            当前考试: {{ test_name }}
                        </div>
                    </div>
                    <div
                            :style="{
                                textAlign: 'right',
                                position: 'absolute',
                                right: 0
                            }"
                            class="global-tool"
                    >
                        <ButtonGroup class="menu" style="font-size: 22px">
                            <Button
                                    v-if="!menu_mark"
                                    :to="{ path: '/score'}"
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
                                    :to="{path:'/paper-quality-content'}"
                                    class="menu-btn"
                                    title="质量"
                                    type="text">
                                <Icon style="transform: rotateY(180deg)" type="ios-stats"/>
                                质量
                            </Button>-->
                            <Button

                                    :to="{path: menu_mark ? '/paper-progress-content': '/quality-content'}"
                                    class="menu-btn"
                                    icon=""
                                    title="进度"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="ios-trending-up"/>
                                进度
                            </Button>
                            <Button
                                    v-if="menu_mark"
                                    class="menu-btn"
                                    target="_blank"
                                    title="审核"
                                    type="text"
                            >
                                <!--                <Icon style="transform: rotateY(180deg)" type=""/>-->
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="ios-list-box-outline"/>
                                审核
                            </Button>
                            <Button
                                    v-if="!menu_mark"
                                    :to="{path: '/examination-paper-history', query: {ID: question_ID}}"
                                    class="menu-btn"
                                    title="回评"
                                    type="text"
                            >
                                <!--                <Icon style="transform: rotateY(180deg)" type=""/>-->
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="ios-redo-outline"/>
                                回评
                            </Button>
                            <!--<Button
                                    :to="{path: '/paper-sample-list'}"
                                    class="menu-btn"
                                    title="样卷" type="text"
                                    v-if="!menu_mark">
                                <Icon type="ios-paper-outline"/>
                                样卷
                            </Button>-->
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
                            <Button
                                    v-if="menu_mark"
                                    class="menu-btn"
                                    title="学生"
                                    to="/student-list"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="md-person"/>
                                学生
                            </Button>
                            <Button
                                    v-if="menu_mark"
                                    :to="{path:'/results'}"
                                    class="menu-btn"
                                    title="成绩"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="ios-medal"/>
                                成绩
                            </Button>
                            <Button
                                    v-if="menu_mark"
                                    :to="{path: '/report'}"
                                    class="menu-btn"
                                    title="报表"
                                    type="text"
                            >
                                <Icon
                                        v-show="equipment"
                                        style="transform: rotateY(180deg)"
                                        type="ios-stats"/>
                                报表
                            </Button>
                        </ButtonGroup>
                    </div>

                </Col>

            </Row>
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
                    @asyncCancel="modal6=false"
                    @asyncOK="asyncOK"
            />
        </div>
    </div>
</template>

<script>
import drawer from './component/base-drawer'
import exit from '../popup/base-popup-exit'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'base-header-admin',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'modal-exit': exit,
    // eslint-disable-next-line vue/no-unused-components
    'modal-drawer': drawer
  },
  data () {
    return {
      value1: false, // 抽屉弹出层
      qidList: [], // 题号
      modal6: false, // 退出登录弹框
      loading: true, // 退出登录loading
      colorFont: 0
    }
  },
  props: {},
  watch: {},
  methods: {
    ...mapMutations(['SET_SCOREINFO', 'SET_TEST_NAME', 'SET_LOGIN_INFO']),
    // 退出账号
    asyncOK () {
      setTimeout(() => {
        this.modal6 = false
        this.$router.push('/login')
      }, 1000)
    },
    setList () {
      let data
      let api
      this.value1 = true
      if (this.menu_mark) { // 管理员登录
        data = {
          entry: 'score_admin_api',
          service_name: 'query_exam'
        }
        api = '/scan_project/score_admin_api'
        this.getData(api, data)
          .then(res => {
            console.log(res)
            this.validation(res)
            this.qidList = res.result_info.table_data
          })
          .catch(error => error)
      } else { // 非管理员登录
        data = {
          entry: 'score_api',
          service_name: 'query_queue'
        }
        api = '/scan_project/score_api'
        this.getData(api, data)
          .then(res => {
            // console.log(res)
            this.qidList = res.result_info
          })
          .catch(error => error)
      }
    },
    // 选择题号
    selectQid (ele, i) {
      console.log('个人中心', ele)
      this.$emit('changeID', ele)
      const data = JSON.parse(localStorage.getItem('login_info'))
      data.id = ele.id
      this.SET_LOGIN_INFO(data)
      this.SET_TEST_NAME(ele) // 设置考试信息
      this.SET_SCOREINFO(ele)// 设置大题分数、均分、题号
      this.colorFont = ele.id
      this.value1 = false
    }
  },
  computed: {
    ...mapState({
      score: state => state.scoreinfo.score,
      question_ID: state => state.scoreinfo.question_ID, // 选择题号ID
      leaderMark: state => state.scoreinfo.leaderMark, // 仲裁开关
      test_name: state => state.scoreinfo.test_info.name, // 获取考试信息
      question_Num: state => state.scoreinfo.question_Num,
      menu_mark: state => state.menu_mark.mark_personnel, // 是否是管理员登录
      menu_mark_arbitration: state => state.menu_mark.mark_arbitration,
      equipment: state => state.equipment // 用户端
    })
  },
  created () {
  },
  mounted () {

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
    transition: all 0.2s ease-in-out;
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
    position: relative;
    height: 50px;
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
