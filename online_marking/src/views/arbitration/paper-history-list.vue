<comment>
    # 仲裁 / 仲裁试卷
</comment>
<template>
    <div class="arbitration-paper-history-list">
        <global-header-admin/>
        <div>
            <!-- 筛选条件 -->
            <Row class="history-list-sort">
                <Col span="24" style="text-align: left">
                    <ButtonGroup>
                        <Button
                                :key="index"
                                :type="searchInfo.cate.button === index? 'info':'default'"
                                @click="sortList($event, index,'cate')"
                                size="default"
                                v-for="(item,index) in searchInfo.cate.arr">{{item}}
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>
        <div class="history-list-content-img">
<!--            <transition-group name="list-complet">
                <li :key="index"
                    @click="getDetails(item)"
                    v-for="(item,index) in scoreArr"
                >
                    <div
                            v-if="item.base64_imgs[0].data"
                            style="padding: 10px"
                    >
                        <img :src="item.base64_imgs[0].data" alt="" width="100%">
                    </div>

                    <div class="bottom">
                        <span>得分：<i style="color: red; font-size: 18px">{{item.score}}</i></span>
                        <span><Icon size="18" type="ios-time-outline"/> {{item.create_time}}</span>
                    </div>
                </li>
            </transition-group>-->
            <global-table
                    :columnsTable="columnsTable"
                    :dataTable="dataTable"
                    :loading="loading"
                    :page_info="page_info"
                    @input="getPageInfo($event)"
                    @onSelect="getDetails"
                    style="cursor:pointer"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'arbitration-paper-history-list',
  components: {},
  filters: {
    scoreFilter (val) {
      return val + '分'
    }
  },
  data () {
    return {
      URL: '/score_api',
      loading: true,
      page_info: { // 分页信息
        total: 0,
        page_num: 1,
        page_size: 15
      },
      columnsTable: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '任务编号',
          key: 'id',
          align: 'center',
          sortable: true
        },
        {
          title: '仲裁说明',
          key: 'to_leader_cause',
          align: 'center',
          sortable: true
        },
        {
          title: '来源',
          key: 'to_leader_teacher',
          align: 'center',
          render (h, { row }) {
            let str
            let color
            if (row.to_leader_teacher === null) {
              str = '系统'
              color = 'red'
            } else {
              str = row.to_leader_teacher
              color = 'blue'
            }
            return h('span', {
              style: {
                color
              }
            }, str)
          }
        },
        /* {
          title: '最低分数',
          key: 'min_score',
          align: 'center',
          sortable: true
        },
        {
          title: '最高分数',
          key: 'max_score',
          align: 'center',
          sortable: true
        }, */
        {
          title: '是/否包含小题',
          key: 'has_child',
          align: 'center',
          render (h, { row }) {
            let val
            let color
            if (row.has_child) {
              val = '是'
              color = 'red'
            } else {
              val = '否'
              color = 'blue'
            }
            return h('span', {
              style: {
                color
              }
            }, val)
          }
        },
        // {
        //   title: '步骤',
        //   key: 'step',
        //   align: 'center',
        //   render (h, { row }) {
        //     return h('span', {
        //       style: {
        //         color: 'blue'
        //       }
        //     }, row.step)
        //   }
        // },
        {
          title: '分数记录',
          key: 'scores',
          align: 'center',
          render (h, { row }) {
            return h('span', {}, row.scores.toString())
          }
        }
      ], // 表头
      dataTable: [], // 表内容
      searchInfo: {
        cate: { // 类别
          title: '类别',
          button: 0,
          arr: ['管理员', '全部', '完成', '未完成']
        }
      },
      scoreArr: [], // 回评接口数据 arr
      searchTime: []
    }
  },
  props: {},
  watch: {},
  methods: {
    // 选择时间段
    getTime (val) {
      this.searchTime = val
      this.initialData()
    },

    // 初始化数据
    initialData (flag) {
      const data = {
        entry: 'score_api',
        service_name: 'query_leader_queues',
        flag: flag || 'to_leader',
        id: this.$route.query.ID / 1,
        page_num: this.page_num || 1,
        page_size: this.page_size || 15
      }
      this.getData('/scan_project/score_api', data)
        .then(res => {
          // console.log(res)
          this.page_info.total = res.result_info.totle
          this.dataTable = res.result_info.table_data
          this.loading = false
        })
    },
    // 分页函数
    getPageInfo (val) {
      this.page_num = val.num
      this.page_size = val.size
      console.log(this.searchInfo.cate.button)
      switch (this.searchInfo.cate.button) {
        case 0:
          this.initialData('to_leader')
          break

        case 1:
          this.initialData('all')
          break

        case 2:
          this.initialData('finish')
          break

        case 3:
          this.initialData('unfinish')
          break
        // default: //没有其他
        //   break
      }
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
          return item.score === this.searchInfo.score.button - 1
        })
      }
      if (this.searchInfo.time.button) {
        this.scoreArr.sort((a, b) => {
          return Date.parse(b.create_time) - Date.parse(a.create_time)
        })
      } else {
        this.scoreArr.sort((a, b) => {
          return Date.parse(a.create_time) - Date.parse(b.create_time)
        })
      }
    },
    // 排序 / 筛选
    sortList (e, index, name) {
      console.log(e.target.innerText)
      switch (e.target.innerText) {
        case '管理员':
          this.initialData('to_leader')
          break
        case '全部':
          this.initialData('all')
          break
        case '完成':
          this.initialData('finish')
          break
        case '未完成':
          this.initialData('unfinish')
          break
        default:
          break
      }
      this.searchInfo[name].button = index
    },
    getDetails (val) { // 仲裁详情
      console.log(val)
      this.$router.push(
        {
          path: '/arbitration',
          query: {
            ID: this.$route.query.ID,
            queue_id: val.id
          }
        }
      )
    }

  },
  computed: {
    ...mapState({
      score: state => state.scoreinfo.score
    })
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
        transition: all 0.3s ease-out;
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
    }

    .history-list-sort a {
        margin: 0 10px;
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
        width: calc(33.33% - 40px);
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
    }

    .history-list-content-img ul li .bottom {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        background-color: #f8f8f9;
        position: absolute;
        bottom: 0;
        width: 100%;
        line-height: 32px;
        color: #515a6e;
    }
</style>
