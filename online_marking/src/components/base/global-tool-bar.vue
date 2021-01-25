<comment>
# 左侧工具栏
</comment>
<template>
    <div class="global-tool-bar">
        <!-- canvas 工具栏 begin -->
        <ul
                ref="toolList"
                :style="{
                    transform: modal?'translate(0px, -100px)': 'translate(-50px,-100px)',
                    transition: '0.3s ease-in-out'
                }"
        >
            <li v-show="equipment">
                <a
                        title="记分模式"
                        @click.prevent="$emit('accountScore',true)"
                >
                    <Icon type="ios-calculator"/>
                </a>
            </li>
            <li v-show="equipment">
                <a
                        title="图像自适应"
                        @click.prevent="$emit('autoScreen',true)"
                >
                    <Icon type="md-qr-scanner"/>
                </a>
            </li>
            <li v-show="equipment">
                <a
                        title="放大"
                        @click.prevent="$emit('clickBig',true)"
                >
                    <Icon
                            :style="{
                                position: 'absolute',
                                transform: 'translate(-2px, -2px)'
                            }"
                            size="12"
                            type="md-add"
                    />
                    <Icon type="ios-search"/>
                </a>
            </li>
            <li v-show="equipment">
                <a
                        title="缩小"
                        @click.prevent="$emit('clickSmall',true)"
                >
                    <Icon
                            :style="{
                                position: 'absolute',
                                transform: 'translate(-2px, -2px)'
                            }"
                            size="12"
                            type="md-remove"
                    />
                    <Icon type="ios-search"/>
                </a>
            </li>

            <li
                    v-for="(item,index) in toolInfo"
                    :key="index"
            >
                <a
                        :class="button.num === index ? 'addclass' : ''"
                        :style="{
                            position: 'relative'
                        }"
                        :title="item.title"
                        @click="$emit('selectTool', {num:index, title: item.title}), button ={num:index, title: item.title} "
                >
                    <Icon :type="item.icon"/>
                    <span
                            :style="{
                                transform: 'scale(0.6)',
                                position: 'absolute',
                                right: 0,
                                bottom: '-13px'
                            }"
                    >
                        {{ item.font }}
                    </span>
                </a>
            </li>
            <li>
                <a
                        title="清除画布"
                        @click="$emit('removeCanvs',true)"
                >
                    <Icon type="ios-trash"/>
                </a>
            </li>
        </ul>
        <!-- canvas 工具栏 end -->
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'global-tool-bar',
  components: {},
  data () {
    return {
      button: { // 当前选中工具索引
        num: 0,
        title: '图像移动'
      },
      toolInfo: [
        {
          title: '图像移动',
          icon: 'ios-hand'
        },
        {
          title: '添加对勾标注',
          icon: 'md-checkmark'
        },
        {
          title: '添加半对标注',
          icon: 'md-done-all'
        },
        {
          title: '添加错误标注',
          icon: 'md-close'
        },
        {
          title: '添加线条标注',
          icon: 'md-create'
        },
        {
          title: '添加高亮标注',
          icon: 'ios-color-wand'
        },
        {
          title: '添加文字标注',
          icon: 'logo-angular'
        }
      ]
    }
  },
  props: {
    modal: {
      type: Boolean,
      required: true
    },
    numScoreStyle: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    numScoreStyle (val) {
      console.log(val)
      this.setScoreStyle(val)
    }
  },
  methods: {
    setScoreStyle (val) {
      if (val) {
        this.$set(this.toolInfo[2], 'font', '记')
        this.$set(this.toolInfo[4], 'font', '记')
      } else {
        this.$delete(this.toolInfo[2], 'font', '记')
        this.$delete(this.toolInfo[4], 'font', '记')
      }
    }

  },
  computed: {
    ...mapState({
      equipment: state => state.equipment // 用户端
    })
  },
  created () {
  },
  mounted () {
    this.setScoreStyle(JSON.parse(localStorage.getItem('num_score')))
  },
  destroyed () {
  }
}
</script>

<style scoped>
ul, li {
    list-style: none;
}

.ivu-icon {
    font-size: 24px;
}

.global-score-dialog {
    height: 100%;
    position: relative;
}

.global-score-dialog ul li a {
    font-weight: bold;
    width: 36px;
    height: 36px;
    line-height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    color: #dbdbdb
}

.global-score-dialog ul {
    position: fixed;
    left: 0;
    top: 30%;
    z-index: 99;
    border-radius: 5px;
    padding: 5px;
    background-color: rgba(73, 73, 73, 1);
}

.global-score-dialog ul li {
    text-align: center;
    margin: 2px 0;
}

.global-score-dialog ul li a:hover {
    border: 1px solid #5b5b5b;
    background-color: rgba(59, 59, 59, 1);
}

.addclass {
    border: 1px solid #5b5b5b;
    background-color: #313131;
}
</style>
