<comment>
# 全局条件筛选
</comment>
<template>
    <div
            v-if="searchInfo"
            class="global-search"
    >
        <!-- 年级 -->
        <div
                v-if="$route.path !== '/question_knowledge' && searchInfo.grade.list.length>0"
                class="search-list"
        >
            <span>年级：</span>
            <span
                    v-for="(item,index) in searchInfo.grade.list"
                    :key="index"
                    :class="searchInfo.grade.button === index ? 'addclass' : ''"
                    :style="{cursor: 'pointer'}"
                    @click="getSearchData($event,index, item)"
            >{{ item.name }}</span>
        </div>
        <!-- 教材 -->
        <div
                v-if="$route.path !== '/question_knowledge' && searchInfo.material.list.length>0"
                class="search-list"
        >
            <span>教材：</span>
            <span
                    v-for="(item,index) in searchInfo.material.list"
                    :key="index"
                    :class="searchInfo.material.button === index ? 'addclass' : ''"
                    :style="{cursor: 'pointer'}"
                    @click="getSearchData($event,index, item)"
            >{{ item.name }}</span>
        </div>

        <!-- 题型 -->
        <div class="search-list">
            <span>题型：</span>
            <span
                    v-for="(item,index) in searchType.qtypeId.list"
                    :key="index"
                    :class="searchType.qtypeId.button === index ? 'addclass' : ''"
                    :style="{cursor: 'pointer'}"
                    @click="getSearchData($event,index, item)"
            >{{ item.typeName }}</span>
            <!--<span style="border-radius: 3px; border: 1px solid green; cursor: pointer">+多选</span>-->
        </div>

        <!-- 难度 -->
        <div class="search-list">
            <span>难度：</span>
            <span
                    v-for="(item,index) in searchType.diff.list"
                    :key="index"
                    :class="searchType.diff.button === index ? 'addclass' : ''"
                    :style="{cursor: 'pointer'}"
                    @click="getSearchData($event,index, item)"
            >{{ item.name }}</span>
        </div>

        <!-- 类型 -->
        <div class="search-list">
            <span>类型：</span>
            <span
                    v-for="(item,index) in searchType.paperType.list"
                    :key="index"
                    :class="searchType.paperType.button === index ? 'addclass' : ''"
                    :style="{cursor: 'pointer'}"
                    @click="getSearchData($event,index, item)"
            >{{ item.name }}</span>
        </div>
        <div class="search-list" style="display: flex;justify-content: left;align-items: center;">
            <span>时间：</span>
            <span style="display: flex; justify-content: left;">
                        <DatePicker
                                placeholder="年份"
                                style="width: 100px;"
                                type="year"
                                @on-change="$emit('changeYear', $event)"
                        />
                    </span>
        </div>
        <div class="search-list" style="display: flex;justify-content: left;align-items: center;">
            <span>过滤：</span>
            <span style="display: flex; justify-content: left;">
                        <CheckboxGroup v-model="searchInfo.moreInfo.border">
                            <Checkbox
                                    v-for="item in searchInfo.moreInfo.checkboxList"
                                    :key="item.value"
                                    :label="item.label"
                            />
                        </CheckboxGroup>
                    </span>
        </div>
        <slot class="search-list" name="default"></slot>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'global-search.vue',
  components: {},
  data () {
    return {
      // 搜索组件
      searchInfo: {
        grade: { // 年级
          button: 0,
          list: []
        },
        material: { // 教材
          button: 0,
          list: []
        },
        moreInfo: { // 更多 / 地区
          value2: '', // 选中年份
          border: [''],
          checkboxList: [
            {
              value: 1,
              label: '我已组卷'
            },
            {
              value: 2,
              label: '本年级已组卷'
            }
          ]
        }
      },
      searchType: {
        qtypeId: { // 题型
          button: 0,
          list: []
        },
        diff: { // 难易度
          button: 0,
          list: []
        },
        paperType: { // 类型
          button: 0,
          list: []
        }
      }
    }
  },
  props: {
    selectSubject: { // 学段 + 科目
      type: Object
    },
    searchInfoData: {
      type: Array
    }
  },
  watch: {
    selectSubject: {
      handler (val) {
        console.log(val, '监听学段')
        // 监听学段 + 科目
        this.setSearch(val) // 显示教材筛选项
        this.getData()
      },
      deep: true,
      immediate: true
    },
    searchInfo: {
      handler (val) {
        // this.$emit('setChapter', this.searchInfo)
      },
      deep: true
    }
  },
  methods: {
    // SET_INTERFACE_DATA_PERIOD 设置学段接口数据
    // SET_EASY_TYPE 设置难易度接口数据
    ...mapMutations(['SET_INTERFACE_DATA_PERIOD', 'SET_EASY_TYPE']),
    // 设置筛选年级
    setSearchList (data, val) {
      for (const value of data) { // subject
        if (value.name === val.stage) { // 确认学段
          value.child.forEach(item => {
            item.child.forEach(ele => {
              if (ele.name === val.subject) {
                this.searchInfo.grade.list.push(item) // 添加年级
              }
            })
          })
        }
      }
      this.setMaterialSearch(this.searchInfo.grade.list[0]) // callBack 设置学段信息、年级信息、教材信息、
      this.$emit('setChapter', this.searchInfo)// 发送年级 、教材数组给父组件
    },
    // 初始化 筛选条件模块
    setSearch (val) {
      this.searchInfo.grade.list = []
      const data = this.base_interface_data_period
      if (data === null) {
        this.setSearchList(data, val)
      } else {
        // this.$axios.get('http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=subjectEditionApi&accessKey=37f600e9c80494c20d950d3081e497e5')
        this.$axios.get('http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=subjectEditionApi')
          .then(res => {
            console.log(res, val)
            this.SET_INTERFACE_DATA_PERIOD(res.data.data)// 存储学段 、科目、接口
            // 设置数据
            this.setSearchList(res.data.data, val)
          })
      }
    },
    // 设置筛选条件回调
    setSearchItem (data) {
      this.searchType.diff.list = data.diffTypes // 设置难易度
      this.searchType.diff.list.unshift({ name: '全部' })
      this.searchType.paperType.list = data.paperTypes // 设置类型
      this.searchType.paperType.list.unshift({ name: '全部' })
      this.getQuestionType(data.qtypes)
    },
    // 获取筛选数据
    getData () {
      const data = this.base_interface_data_type
      if (data.length) {
        this.setSearchItem(data) // callback
      } else {
        this.$axios.get('http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=getOtherBasic&accessKey=37f600e9c80494c20d950d3081e497e5')
          .then(({ data }) => {
            this.SET_EASY_TYPE(data) // 缓存难易度 、 类型 、 题型接口
            this.setSearchItem(data) // callback
          })
          .catch(err => console.log(err))
      }
    },
    // 设置教材筛选项
    setMaterialSearch (ele) {
      ele.child.forEach(item => {
        if (item.name === this.selectSubject.subject) {
          this.searchInfo.material.list = item.child
        }
      })
    },
    // 通过学段、科目设置题型
    getQuestionType (arr) {
      console.log('this.selectSubject.code-----------------', this.selectSubject.code)
      this.searchType.qtypeId.list = []
      arr.forEach(item => {
        if (item.subjectId === this.selectSubject.subjectId && item.pharseId === this.selectSubject.code) { // 判断并显示题型
          this.searchType.qtypeId.list.push(item)// 添加题型并且去重
        }
      })
      this.searchType.qtypeId.list.unshift({ typeName: '全部' })
    },
    // 设置筛选样式
    getSearchData (e, i, val) {
      // 获取title节点
      const ele = e.target.parentNode.firstElementChild.innerText
      switch (ele) {
        case '年级：':
          this.searchInfo.grade.button = i
          this.$emit('changeGrade', i)
          this.setMaterialSearch(val) // callBack
          break
        case '教材：':
          this.$emit('changeMaterial', i)
          this.searchInfo.material.button = i
          break
        case '题型：':
          if (val.typeName === '全部') {
            val = null
          }
          this.$emit('changeQtypeId', val)
          this.searchType.qtypeId.button = i
          break
        case '难度：':
          if (val.name === '全部') {
            val = null
          }
          this.$emit('changeDiff', val)
          this.searchType.diff.button = i
          break
        case '类型：':
          if (val.name === '全部') {
            val = null
          }
          this.$emit('changePaperType', val)
          this.searchType.paperType.button = i
          break
      }
    }
  },
  computed: {
    ...mapState({
      base_interface_data_period: state => state.base_interface_data_period, // 学段接口返回的数据
      base_interface_data_type: state => state.base_interface_data_type // 难易度接口数据
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

<style lang="less" scoped>
.addclass {
    /*border: 1px solid #2db7f5;*/
    background-color: #2db7f5;
    color: white;
    border-radius: 3px;
}

.global-search {
    text-align: left;
    padding: 0 10px;

    .search-list {
        border-bottom: 1px dashed #dcdee2;
        line-height: 42px;
    }

    .search-list:last-child {
        border-bottom: none;
    }

    div > span {
        white-space: nowrap;
        margin: 5px;
        padding: 2px 5px;
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
    }

    div > span:first-child {
        color: rgb(128, 128, 128)
    }

}

.active {
    background-color: #1daef8;
    color: white;
}

button {
    outline: none;
}

.btn::after {
    background-color: transparent;
}
</style>
