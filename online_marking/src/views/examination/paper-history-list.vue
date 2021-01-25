<comment>
# 回评 / 历史批阅
</comment>
<template>
    <div class="examination-paper-history-list">
        <global-header-admin/>
        <div>
            <Row class="history-list-sort">
                <Col span="24" style="display: flex; justify-content: left">
                    <!--<span>
                         <a href="javascript: history.go(-1);" style="font-size: 18px"><Icon size="20" type="ios-arrow-back" />后退</a>
                    </span>-->
                    <ul class="examination-list">
                        <li>
                            <!-- 显示 -->
                            <span class="title">{{ searchInfo.cate.title }}:</span>
                            <ButtonGroup style="margin-left: 10px">
                                <Button
                                        v-for="(item,index) in searchInfo.cate.arr"
                                        :key="index"
                                        :size="btn_size"
                                        :type="searchInfo.cate.button === index? 'info':'default'"
                                        @click="sortList(index, 'cate',$event)">{{ item }}
                                </Button>
                            </ButtonGroup>
                        </li>
                        <li>
                            <!-- 评分 -->
                            <span class="title">{{ searchInfo.score.title }}:</span>
                            <ButtonGroup style="margin-left: 10px">
                                <Button
                                        v-for="(item,index) in searchInfo.score.arr"
                                        :key="index"
                                        :size="btn_size"
                                        :type="searchInfo.score.button === index? 'info':'default'"
                                        @click="sortList(index, 'score',$event)">{{ item | scoreFilter }}
                                </Button>
                            </ButtonGroup>
                        </li>
                        <li>
                            <!-- 排序 -->
                            <span class="title">{{ searchInfo.time.title }}:</span>
                            <ButtonGroup style="margin-left: 10px">
                                <Button
                                        v-for="(item,index) in searchInfo.time.arr"
                                        :key="index"
                                        :size="btn_size"
                                        :type="searchInfo.time.button === index? 'info':'default'"
                                        @click="sortList(index, 'time',$event)">{{ item }}
                                </Button>
                            </ButtonGroup>
                        </li>
                        <li>
                            <!-- 样卷 -->
                            <span class="title">{{ searchInfo.flag.title }}:</span>
                            <ButtonGroup style="margin-left: 10px">
                                <Button
                                        v-for="(item,index) in searchInfo.flag.arr"
                                        :key="index"
                                        :size="btn_size"
                                        :type="searchInfo.flag.button === index? 'info':'default'"
                                        @click="sortList(index, 'flag',$event)">{{ item }}
                                </Button>
                            </ButtonGroup>
                        </li>
                        <li>
                            <!-- 综合 -->
                            <span class="title">{{ searchInfo.composite.title }}:</span>
                            <DatePicker
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="请输入起始时间"
                                    style="width: 300px; margin-left: 10px"
                                    type="datetimerange"
                                    @on-change="getTime"
                            />
                        </li>
                    </ul>
                </Col>
            </Row>
        </div>
        <div class="history-list-content-img" v-if="!scoreArr.length">
            <p style="position: absolute; top: 200px; left: 0; width: 100%; font-size: 22px; color: #999;">没有可查看的回评试题！</p>
        </div>
        <div class="history-list-content-img" v-else>
            <transition-group
                    name="list-complet"
                    tag="ul"
            >
                <li
                        v-for="(item,index) in scoreArr"
                        :key="index"
                        @click="getDetails(item)"
                        @mouseleave="$refs.buttonMark[index].style.display='none'"
                        @mouseover="$refs.buttonMark[index].style.display='block'"
                >
                    ID:{{ item.id }}
                    <div
                            v-show="item.typical_flag || item.excellent_flag || item.bad_flag"
                            :style="{
                                position: 'absolute',
                                top: '10px',
                                left: '-30px',
                                zIndex:99,
                                transform: 'rotate(-45deg)',
                                boxShadow: '0 2px 3px rgba(0,0,0,0.4)',
                                color: 'white',
                                width: '100px',
                            }"
                    >
                        <p :style="{ backgroundColor: item.typical_flag ? '#42b983': ''}">
                            {{ item.typical_flag ? '优秀' : '' }}</p>
                        <p :style="{ backgroundColor: item.excellent_flag ? '#3994f1': ''}">
                            {{ item.excellent_flag ? '标准' : '' }}</p>
                        <p :style="{ backgroundColor: item.bad_flag ? 'red': ''}">{{ item.bad_flag ? '较差' : '' }}</p>
                    </div>
                    <div
                            v-if="item.base64_imgs[0].data"
                            style="padding: 10px 10px 30px; color: #3994f1"
                    >
                        <img :src="item.base64_imgs[0].data" alt="" width="100%">
                    </div>

                    <div class="bottom">
                        <span>得分：
                            <i :style="{color: 'red', fontSize: equipment? '26px': ''}">{{ item.score }}</i>
                        </span>
                        <span>
                            <Icon type="ios-time-outline"/>
                            <small
                                style="color: #999">{{ item.create_time }}</small>
                        </span>
                    </div>
                    <div ref="buttonMark" class="button-mark" style="display: none">
                        <Button
                                :shape="button_info.shape"
                                :size="button_info.buttonSize"
                                icon="ios-trash-outline"
                                type="default"
                                @click.stop="setFlag(item,'remove_flag')"
                        />
                        <Button
                                :shape="button_info.shape"
                                :size="button_info.buttonSize"
                                icon="ios-thumbs-up"
                                type="success"
                                @click.stop="setFlag(item,'typical_flag')"
                        />
                        <Button
                                :shape="button_info.shape"
                                :size="button_info.buttonSize"
                                icon="ios-flag"
                                type="primary"
                                @click.stop="setFlag(item,'excellent_flag')"
                        />
                        <Button
                                :shape="button_info.shape"
                                :size="button_info.buttonSize"
                                icon="ios-thumbs-down"
                                type="error"
                                @click.stop="setFlag(item, 'bad_flag')"
                        />
                    </div>
                </li>
            </transition-group>
        </div>
        <!-- 分页组件 -->
        <div v-show="page_info.total >= 15 ? true : false"
             class="global-footer">
            <!--pagePropsMixin['page-size']"-->
            <!-- 超过每页最大条数时，显示分页 -->
            <Page
                    v-bind="pagePropsMixin"
                    @on-change="pageChange"
                    @on-page-size-change="pageSwitch"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'examination-paper-history-list',
  components: {},
  filters: {
    scoreFilter (val) {
      return `${val}分`
    }
  },
  data () {
    return {
      btn_size: 'small',
      // 按钮信息
      button_info: {
        buttonSize: 'small', // 按钮大小
        shape: 'circle' // 按钮形状
      },
      URL: '/score_api',
      searchInfo: {
        cate: { // 类别
          title: '类别',
          button: 0,
          arr: ['答卷', '分数']
        },
        score: { // 评分
          title: '评分',
          button: 0,
          arr: []
        },
        time: { // 排序
          title: '排序',
          button: 0,
          arr: ['时间升序', '时间降序']
        },
        flag: { // 样卷类型
          title: '样卷',
          button: 0,
          arr: ['全部', '优秀', '标准', '较差']
        },
        composite: { // 综合搜索
          title: '综合'
        }
      },
      scoreArr: [], // 回评接口数据 arr
      searchTime: [],
      page_info: {
        total: 0,
        page_size: 10,
        page_num: 1
      } // 分页信息
    }
  },
  props: {},
  watch: {},
  methods: {
    // 修改样卷标记
    setFlag (ele, name) {
      const data = {
        entry: 'score_api',
        id: ele.id,
        service_name: 'edit_record_flag',
        excellent_flag: false,
        bad_flag: false,
        typical_flag: false
      }
      console.log(name)
      switch (name) {
        case 'remove_flag': { // eslint-disable-next-line no-case-declarations
          const { ...sum } = data
          // eslint-disable-next-line no-unused-expressions
          this.getData('/scan_project/score_api', sum).then(res => {
            this.validation(res)
          })
        }
          break
        case 'bad_flag': { // eslint-disable-next-line no-case-declarations
          const { ...sum } = data
          sum.bad_flag = true
          // eslint-disable-next-line no-unused-expressions
          this.getData('/scan_project/score_api', sum)
            .then(res => {
              this.validation(res)
            })
        }
          break
        case 'typical_flag': {
          const { ...sum } = data
          sum.typical_flag = true
          // eslint-disable-next-line no-unused-expressions
          this.getData('/scan_project/score_api', sum).then(res => {
            this.validation(res)
          })
        }
          break
        case 'excellent_flag': {
          const { ...sum } = data
          sum.excellent_flag = true
          // eslint-disable-next-line no-unused-expressions
          this.getData('/scan_project/score_api', sum).then(res => {
            this.validation(res)
          })
        }
          break
        default:
          // 没有其他
          break
      }
      // 异步更新视图列表
      setTimeout(() => {
        this.initialData()
      }, 500)
    },
    // 切换页码
    pageChange (val) {
      // console.log(val, '切换页码')
      this.page_info.page_num = val
      this.initialData()
    },
    // 每页显示数量切换
    pageSwitch (val) {
      // console.log(val, '每页显示数量切换')
      this.page_info.page_size = val
      this.initialData()
    },
    // 选择时间段
    getTime (val) {
      this.searchTime = val
      this.initialData()
    },

    // 初始化数据
    initialData (ev, index, name) {
      // 搜索分值
      // eslint-disable-next-line no-unused-vars
      let str
      if (ev && !isNaN(parseFloat(ev.target.innerText))) {
        str = parseFloat(ev.target.innerText).toString()
      }
      const data = {
        entry: 'score_api',
        id: this.$route.query.ID / 1,
        service_name: 'query_records',
        min_score: '',
        max_score: '',
        time_start: this.searchTime[0],
        time_end: this.searchTime[1],
        page_num: this.page_info.page_num,
        page_size: this.page_info.page_size
      }
      this.getData('/scan_project/score_api', data)
        .then(res => {
          console.log(res)
          this.validation(res)
          this.page_info.total = res.result_info.table_totle
          // 赋值列表数据
          this.scoreArr = res.result_info.table_data
          // 赋值评分筛选条件的按键
          const arr = []
          for (const value of this.scoreArr) {
            arr.push(value.score)
          }
          this.searchInfo.score.arr = [...new Set(arr)]
          this.searchInfo.score.arr.sort((a, b) => a - b)
          this.searchInfo.score.arr.unshift('全')
          this.shuntList(ev, index, name, res) // 前端数据排列
        })
        .catch(error => error)
    },

    // 多条件联查
    shuntList (e, index = 0, name = 'cate', res) {
      this.scoreArr = res.result_info.table_data
      if (this.searchInfo.cate.button) { // 类别
        this.scoreArr.forEach(item => {
          item.base64_imgs[0].data = ''
        })
      }
      if (this.searchInfo.score.button) { // 评分
        this.scoreArr = this.scoreArr.filter(item => {
          return item.score === this.searchInfo.score.arr[this.searchInfo.score.button]
        })
      }
      if (this.searchInfo.time.button) { // 时间排序
        this.scoreArr.sort((a, b) => {
          return Date.parse(b.create_time) - Date.parse(a.create_time)
        })
      } else {
        this.scoreArr.sort((a, b) => {
          return Date.parse(a.create_time) - Date.parse(b.create_time)
        })
      }
      if (this.searchInfo.flag.button === 1) { // 优秀样卷
        this.scoreArr = this.scoreArr.filter(item => {
          return item.typical_flag === true
        })
      }
      if (this.searchInfo.flag.button === 2) { // 标准样卷
        this.scoreArr = this.scoreArr.filter(item => {
          return item.excellent_flag === true
        })
      }
      if (this.searchInfo.flag.button === 3) { // 较差样卷
        this.scoreArr = this.scoreArr.filter(item => {
          return item.bad_flag === true
        })
      }
    },
    // 排序 / 筛选
    sortList (index, name, e) {
      this.searchInfo[name].button = index
      this.initialData(e, index, name)
    },
    getDetails ({ id }) { // 回评详情
      this.$router.push({ path: '/review', query: { ID: id } })
    }

  },
  computed: {
    ...mapState({
      score: state => state.scoreinfo.score,
      question_Num: state => state.scoreinfo.question_Num,
      equipment: state => state.equipment // 用户端
    }),
    pagePropsMixin () {
      return {
        'show-total': true, // 显示总数
        'show-sizer': false, // 显示分页
        'show-elevator': true, // 显示电梯
        placement: 'top', // 切换条数窗口展开方向
        total: this.page_info.total, // 总条数
        current: this.page_info.page_num // 当前页码
      }
    }
  },
  created () {
    this.initialData() // 数据初始化
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style scoped>

.list-complete-item {
    transition: all 0.3s;
    display: inline-block;
    margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */
{
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-leave-active {
    position: absolute;
}

ul, li {
    list-style: none;
}

.history-list-sort {
    display: flex;
    justify-content: left;
    padding: 0 20px;
    line-height: 44px;
    border-bottom: 1px dashed #ddd;
}

.history-list-sort a {
    margin: 0 10px;
}
.history-list-content-img{
    position: relative;
}

.history-list-content-img ul {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.history-list-content-img ul li {
    margin: 20px;
    /*border: 1px solid #ddd;*/
    width: calc(25% - 40px);
    min-height: 33px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
    transition: 0.3s ease-in-out;
    background-color: white;
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
}

.history-list-content-img ul li:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    transform: scale(1.05);
}

.history-list-content-img ul li .bottom {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    /*background-color: #f8f8f9;*/
    position: absolute;
    bottom: 0;
    width: 100%;
    line-height: 32px;
    color: #515a6e;
}

.examination-list {
    display: flex;
    justify-content: left;
}

.examination-list li {
    margin-left: 40px;
}

/* 列表鼠标移入 按钮 */
.button-mark {
    position: absolute;
    top: 0;
    right: 0;
}

.button-mark button {
    margin-left: 5px;
}

.global-footer {
    padding: 20px 0;
}
</style>
