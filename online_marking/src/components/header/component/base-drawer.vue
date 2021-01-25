<comment>
# 个人中心
</comment>
<template>
    <div class="base-drawer">

        <Drawer
                v-model="value1"
                :closable="false" draggable
                placement="left"
                title="个人中心"
                @on-visible-change="$emit('change', value1)"
        >
            <div
                    :style="{
                        display: 'flex',
                        fontSize: '12px',
                        justifyContent: 'start',
                        alignItems: 'center',
                        color:'#999'
                    }"
            >
                当前角色：
                <h4>{{ newMark }}</h4>
            </div>
            <template v-if="newMark === '管理员'">
                <p
                        v-for="(item,index) in qid_list"
                        :key="index"
                        :style="{
                            // backgroundColor: examine_id === item.id ?'#808695': '',
                            color: examine_id === item.id ?'red': '',
                        }"
                        @click="$emit('selectQid',item,index)"
                >
                    <span>{{ item.name }}</span>
                </p>
            </template>
            <template v-if="newMark !== '管理员'">
                <p
                        v-for="(item,key,index) in newQidList"
                        :key="index"
                >
                    <strong>{{ key }}</strong>
                    <span
                            v-for="(ele,i) in item"
                            :key="i"
                            :style="{
                                paddingLeft: '10px',
                                color: examine_id === ele.id ?'white': '',
                                backgroundColor: examine_id === ele.id ?'#808695': '',
                                borderLeft: examine_id === ele.id ?'4px solid #515a6e': 'none',
                            }"
                            @click="selectCurrentState(ele, i)"
                    >
                    <Icon type="ios-copy-outline"/> {{ ele.question_id }}
                </span>

                </p>
            </template>

            <p>
                <a
                        type="error"
                        @click="$emit('changeMark', true)"
                >
                    <Icon type="ios-power"/>
                    退出账号
                </a>
            </p>
        </Drawer>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'base-drawer',
  components: {},
  filters: {},
  data () {
    return {
      // color_font: JSON.parse(localStorage.getItem('test_info')).id, // 初始选中题号
      value1: this.value, // 抽屉弹出层
      qid_list: this.qidList // 题号
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    qidList: {
      type: Array,
      default: () => {
        return []
      }
    },
    colorFont: {
      type: Number
    }
  },
  watch: {
    value (val) {
      this.value1 = val
    },
    qidList: {
      handler (val) {
        this.qid_list = val
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['SET_SCOREINFO']),
    selectCurrentState (ele, i, boxDivWrap) {
      console.log(ele, i)
      if (this.examine_id !== ele.id) {
        const boxDivWrap = document.getElementById('wrap')
        if (boxDivWrap) {
          boxDivWrap.innerHTML = ''
        }
        // 存储this
        const that = this
        if (this.$route.path !== '/score') {
          alert(123123)
          that.$emit('selectQid', ele, i)
          this.$nextTick(() => {
            that.$router.push('/score')
          })
          // that.$Modal.confirm({
          //   title: '提醒',
          //   content: '当前位置切换试题，跳转至阅卷！',
          //   onOk () {
          //     // 确定跳转
          //
          //   }
          // })
          console.log(123123)
        } else {
          that.$emit('selectQid', ele, i)
        }
      }
    },
    /**
         * @功能: selectQid
         * @date: 2020/9/11 09:11
         * @description: 选择题号
         * @param {base-drawer.vue}
         * @return:
         */
    // 选择题号
    selectQid (ele, i) {
      console.log('state', this.question_ID)
      this.$emit('changeID', ele)
      this.SET_SCOREINFO(ele)// 设置大题分数、均分、题号
      this.colorFont = i
      this.value1 = false
    }
  },
  computed: {
    ...mapState({ // 大题分数
      score: state => state.scoreinfo.score,
      question_ID: state => state.scoreinfo.question_ID, // 选择题号ID
      leaderMark: state => state.scoreinfo.leaderMark, // 仲裁开关
      question_Num: state => state.scoreinfo.question_Num,
      menu_mark: state => state.menu_mark.mark_personnel,
      menu_mark_arbitration: state => state.menu_mark.mark_arbitration,
      examine_id: state => state.login_info.examineID,
      mark: state => state.login_info.mark // 是否是管理员登录
    }),
    // 登录人身份
    newMark () {
      let str
      if (this.mark) {
        str = '管理员'
      } else {
        str = '阅卷员'
        if (this.leaderMark) {
          str += '/题组长'
        }
      }
      return str
    },

    /**
         *
         *
         * @date: 2020/12/9 13:16
         * @description: 个人中心列表显示优化
         * @returns
         * @memberof No such property: code for class: Script1
         */
    newQidList () {
      // eslint-disable-next-line no-unused-vars
      const result = this.qid_list.reduce((pre, next) => {
        if (!pre[next.exam_name]) {
          pre[next.exam_name] = []
        }
        pre[next.exam_name].push(next)
        return pre
      }, {})
      return result
    }
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>
p {
    cursor: pointer;
    line-height: 40px;
    font-size: 14px;
    //border-bottom: 1px dashed #ddd;
    span {
        transition: all 0.2s ease-in-out;
        display: block;
        border-bottom: 1px dashed rgba(0, 0, 0, .1);

        &:hover {
            background-color: rgba(0, 0, 0, .1);
            /*font-weight: bold;*/
            padding-left: 2px;
        }
    }

    &:last-child {
        position: absolute;
        bottom: 0;
        border-bottom: none;
    }

    &:last-child:hover {
        background-color: transparent;
        padding-left: 0;
    }
}

</style>
