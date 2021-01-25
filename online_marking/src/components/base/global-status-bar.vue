<comment>
# 打分界面右下角状态栏
</comment>
<template>
    <div class="global-status-bar">
        <div
                ref="statuscar"
                class="global-right title"
        >
            <ul>
                <li
                        v-for="(item, index) in bar_info.list"
                        :key="index"
                        :title="item.title"
                        @click="clickBar($event, index)"
                >
                    <Icon
                            :size="bar_info.size"
                            :type="item.icon"
                    />
                    {{ item.title }}
                </li>
            </ul>
            <div
                    class="arrow-btn"
                    @click="setMobileStyle"
            >
                <Icon
                        :style="{
                            transition: 'all 0.3s',
                            transform: `rotate(${setMobileStyleMark? '180deg': '0'})`
                        }"
                        size="30"
                        type="ios-arrow-forward"
                />
            </div>
        </div>

        <!-- 试题异常弹窗 -->
        <modal-error
                :loading="loading"
                :modal="modal6"
                :title=title
                :titleContent=titleContent
                @asyncCancel="asyncCancel"
                @asyncOK="asyncOK"
        >
            <Input
                    v-if="to_leader_modal"
                    v-model="to_leader_value"
                    placeholder="请输入仲裁原因..."
            />
        </modal-error>
    </div>
</template>

<script>
import error from '../popup/base-popup-error'

export default {
  name: 'global-status-bar',
  components: {
    'modal-error': error
  },
  data () {
    return {
      loading: true,
      title: '', // 警告弹框标题
      titleContent: '', // 警告弹框内容
      modal6: false, // 警告弹框开关
      bar_info: {
        size: 18,
        list: [{
          icon: 'ios-alert-outline',
          title: '内容过界'
        }, {
          icon: 'ios-alert-outline',
          title: '答错位置'
        }, {
          icon: 'ios-alert-outline',
          title: '其他疑问'
        }, {
          icon: 'ios-alert-outline',
          title: '提交仲裁'
        }]
      },
      to_leader: false, // 仲裁提交开关 false/取消  true/确定
      to_leader_modal: false,
      to_leader_value: '',
      setMobileStyleMark: false
    }
  },
  props: {
    questionID: {
      type: Number
    }
  },
  setup (props, context) {
    // console.log(arguments, 'setup-->props, context')
  },
  watch: {},
  methods: {
    /**
         * @功能: clickBar
         * @date: 2020/9/3 15:08
         * @description: 状态栏信息报错
         * @param {global-status-bar.vue}
         * @return:
         */
    clickBar (e, i) {
      this.to_leader_modal = false
      const titleArr = [
        {
          title: '内容过界',
          titleContent: '您确定答题内容过界么?'
        }, {
          title: '答错位置',
          titleContent: '您确定答题内容答错位置么?'
        }, {
          title: '其他疑问',
          titleContent: '提交其他疑问?'
        }, {
          title: '提交仲裁',
          titleContent: ''
        }
      ]
      const ele = e.target.innerText.trim()
      if (!JSON.parse(localStorage.getItem('userinfo')).result_info.length) {
        this.$Modal.error({
          title: '警告',
          content: '当前没有可批阅试题！'
        })
        return
      }
      this.modal6 = true
      console.log('当前题目所属任务编号', this.questionID)
      switch (ele) {
        case '内容过界':
          this.title = titleArr[i].title
          this.titleContent = titleArr[i].titleContent
          break

        case '答错位置':
          this.title = titleArr[i].title
          this.titleContent = titleArr[i].titleContent
          break

        case '其他疑问':
          this.title = titleArr[i].title
          this.titleContent = titleArr[i].titleContent
          break

        case '提交仲裁':
          this.to_leader_modal = true
          this.title = titleArr[i].title
          this.titleContent = titleArr[i].titleContent
          break
        default:
          console.log('default')
          break
      }
    },
    /**
         * @功能: asyncCancel
         * @date: 2020/9/9 09:07
         * @description: 取消
         * @param {global-status-bar.vue}
         * @return:
         */
    asyncCancel () {
      this.modal6 = false
      this.to_leader = false
    },
    /**
         * @功能: asyncOK
         * @date: 2020/9/3 14:39
         * @description: 关闭 / 显示警告弹框
         * @param {global-status-bar.vue}
         * @return:
         */
    asyncOK () {
      this.modal6 = false
      this.to_leader = true
      this.getData('/scan_project/score_api', {
        entry: 'score_api',
        id: this.questionID,
        score: '0',
        service_name: 'apply_score',
        has_child: false,
        childs: [],
        marks: [{ x: 100, y: 100, w: 20, h: 20, type: 'image', data: null, image_index: 0 }],
        excellent_flag: false,
        bad_flag: false,
        to_leader: this.to_leader,
        to_leader_cause: this.to_leader_value,
        typical_flag: false
      })
        .then(res => {
          console.log(res)
          if (res.result_code !== '00') {
            this.$Modal.warning({
              title: '提醒',
              content: `${res.result_info},状态码：${res.result_code}`
            })
          } else {
            this.$Message.success('提交仲裁成功！')
            // 提交仲裁成功，重新加载新的题目
            this.$emit('setScore')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
         * @功能: setMobileStyle
         * @date: 2020/8/31 11:46
         * @description: 随屏右侧侧边栏
         * @return:
         */
    setMobileStyle () {
      const ele = this.$refs.statuscar
      ele.classList.toggle('btn_active')
      this.setMobileStyleMark = ele.classList.contains('btn_active')
    }
  },
  computed: {},
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>
.btn_active {
    z-index: 99;
    transition: all 0.3s ease-in-out;
    transform: translateX(0px) !important;
}

/* 右侧浮动框 */
.global-right.title {
    position: fixed;
    left: 0;
    padding: 0;
    bottom: 10px;
    z-index: 100;
    transition: 0.3s all ease-out;
    display: flex;
    width: initial;
    justify-content: space-between;
    align-items: center;
    transform: translateX(-104px);

    div.arrow-btn {
        //background-color: #19be6b;
        background-color: white;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
        box-shadow: 5px 5px 5px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    }

    ul {
        background-color: white;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    }
}

.global-right.title ul li {
    cursor: pointer;
    color: #42b983;
    line-height: 40px;
    /*writing-mode: vertical-lr;*/
    text-align: left;
    transition: 0.3s all ease-in-out;
}

.global-right.title ul li:hover {
    color: red;
    text-decoration: underline;
}

.global-right.title ul li i {
    margin-right: 5px;
}
</style>
