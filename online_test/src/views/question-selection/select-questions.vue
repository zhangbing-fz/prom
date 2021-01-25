<comment>
# 试题选题
</comment>
<template>
    <Layout class="Select-questions">
        <Content>
            <!-- 面板分割 begin -->
            <!-- 试卷条件筛选框 -->
            <div :style="{background: '#fff', zIndex: '99'}" class="demo-split">
                <ul class="search-list">
                    <li>
                        <span>学科：</span>
                        <span
                                v-for="(item,index) in computed_base_interface_discipline.subjectsInfo"
                                :key="index"
                                :class="searchType.subjectId.button === index ? 'addclass' : ''"
                                :style="{cursor: 'pointer'}"
                                @click="getSearchData($event,index, item)"
                        >{{ item.name }}</span>
                        </li>
                    <li>
                        <span>年级：</span>
                        <span
                                v-for="(item,index) in computed_base_interface_data_period.child"
                                :key="index"
                                :class="searchType.gradeId.button === index ? 'addclass' : ''"
                                :style="{cursor: 'pointer'}"
                                @click="getSearchData($event,index, item)"
                        >{{ item.name }}</span>
                    </li>
                    <li>
                        <span>难易度：</span>
                        <span
                                v-for="(item,index) in base_interface_data_type.diffTypes"
                                :key="index"
                                :class="searchType.paperTypeId.button === index ? 'addclass' : ''"
                                :style="{cursor: 'pointer'}"
                                @click="getSearchData($event,index, item)"
                        >{{ item.name }}</span>
                    </li>
                </ul>
            </div>
            <div :style="{  minHeight: '280px', background: '#fff',marginTop: '20px', overflowY: 'scroll'}" class="demo-split">
                <div class="context">
                    <ul v-if="examinationPaper.length" :style="{ maxHeight: '500px'}">
                        <li
                                v-for="(item,index) in examinationPaper"
                                :key="index"
                                @click="getQuestionDetail(item)"
                        >
                            <Row>
                                <Col span="18">
                                    <div style="background-size: 65%;"></div>
                                    <div>
                                        <h4>{{ item.paperName }}</h4>
                                        <p>
                                            <small>科目：<span>{{ item.subjectName }}</span></small>
                                            <small>|</small>
                                            <small>年级：<span>{{ item.gradeName }}</span></small>
                                            <small>|</small>
                                            <small>类型：<span>{{ item.paperType }}</span></small>
                                            <small>|</small>
                                            <small>来源：<span>{{ item.area }}</span></small>
                                            <small>|</small>
                                            <small>年份：<span>{{ item.year }}</span></small>
                                            <small>|</small>
                                            <small>
                                                <Icon type="ios-eye-outline"/>
                                                612</small>
                                        </p>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <p>
                                        <span @click="jumpAnalysis">试卷分析</span>
                                        <span @click.stop="downloadQuestion">
                                            <Icon type="ios-cloud-download-outline"/>下载</span>
                                        <span @click.stop="collectionQuestion">
                                            <Icon type="ios-heart-outline"/>收藏</span>
                                    </p>
                                </Col>
                            </Row>
                        </li>
                    </ul>
                    <h3 v-else style="background-color: #f5f7f9;">暂无题卷信息！！！</h3>
                </div>
            </div>
        </Content>
        <template-download :modal="modal"/>
    </Layout>
</template>

<script>
import download from './component/download-modal'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Select-questions',
  components: {
    'template-download': download
  },
  data () {
    return {
      formItem: {
        input: ''
      },
      modal: {
        mark: false,
        title: '', // 标题
        content: '' // 内容
      },
      examinationPaper: [],

      searchCode: {
        knowledgeId: '', // 知识点ID // 根据知识点取试题-------- 通过 material计算获取
        page: '1', // 分页
        GradeCode: 0, // 年级 code
        material: 0, // 教材 code
        qtypeId: null, // 题型code
        diff: null, // 难度code
        paperType: null, // 类型code
        year: null // 年份
      },
      selectSubject: {
        stage: '高中',
        id: '1553',
        code: '3',
        subject: '数学',
        subjectId: '2'
      },

      searchType: {
        subjectId: { // 学科
          button: 0,
          id: ''
        },
        gradeId: { // 年级
          button: 0,
          id: ''
        },
        paperTypeId: { // 难度
          button: 0,
          id: ''
        }
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    ...mapMutations(['SET_SAVE_QUESTIONSINFO']),
    // 试卷分析弹出新页面
    jumpAnalysis () {
      const { href } = this.$router.resolve({
        path: '/question_analysis'
      })
      window.open(href, '_blank')
    },
    // 下载试卷
    downloadQuestion () {
      this.modal = {
        mark: true,
        title: '下载',
        content: '确定下载当前试卷？'
      }
    },
    collectionQuestion () {
      // 下载试卷
      this.$Modal.success({
        title: '收藏',
        content: '收藏试卷成功！'
      })
    },
    // 试卷列表初始化
    getData () {
      /*
      参数：
          subjectId 学科id，参考第1个API的code内容，必填字段
          gradeId 年级id，参考第1个API的code内容，必填字段（年级id目前不分上下学期，只接受七年级（id=200）这种）
          paperTypeId，参考第2个API的Papertypes内的id内容，必填字段
      */
      let url
      if (this.searchType.subjectId.id || this.searchType.gradeId.id || this.searchType.paperTypeId.id) {
        url = 'http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=getPaperList&subjectId=' + this.searchType.subjectId.id + '&gradeId=' + this.searchType.gradeId.id + '&paperTypeId=' + this.searchType.paperTypeId.id + '&accessKey=37f600e9c80494c20d950d3081e497e5'
      } else {
        url = 'http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=getPaperList&accessKey=37f600e9c80494c20d950d3081e497e5'
      }
      this.$axios.get(`${url}`)
        .then(res => {
          console.log(res.data)
          res.data.data.forEach(item => {
            this.examinationPaper.push(item)
          })
        })
    },
    /**
         *
         *
         * @date: 2020/12/24 15:48
         * @description: v-for遍历的数据
         * @param {*} item
         * @param {*} event
         * @memberof 试卷详情
         */
    getQuestionDetail (val) {
      console.log(val)
      this.$router.push({
        path: '/select_questions_detail',
        query: {
          ID: val.id,
          titleInfo: val
        }
      })
      this.SET_SAVE_QUESTIONSINFO(val)
    },
    // 设置筛选样式
    getSearchData (e, i, val) {
      // 获取title节点
      const ele = e.target.parentNode.firstElementChild.innerText
      console.log(i, val)
      switch (ele) {
        case '学科：':
          this.searchType.subjectId.button = i
          this.searchType.subjectId.id = val.code
          break
        case '年级：':
          this.searchType.gradeId.button = i
          this.searchType.gradeId.id = val.code
          break
        case '难易度：':
          this.searchType.paperTypeId.button = i
          this.searchType.paperTypeId.id = val.id
          break
      }
      this.getData()
    }
  },
  computed: {
    ...mapState({
      level_key: store => store.level_key,
      base_interface_data_period: state => state.base_interface_data_period, // 学段接口返回的数据
      base_interface_data_type: state => state.base_interface_data_type, // 难易度
      base_interface_discipline: state => state.base_interface_discipline // 所有学科
    }),
    computed_base_interface_data_period () {
      const data = this.base_interface_data_period
      return data.filter(item => item.name === this.selectSubject.stage)[0]
    },
    computed_base_interface_discipline () {
      const data = this.base_interface_discipline
      return data.filter(item => item.gradeInfo.name === this.selectSubject.stage)[0]
    }
  },
  created () {
  },
  mounted () {
    // 初始化试卷
    this.getData()
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
.context {
    background-color: white;

    ul {
        li {
            cursor: pointer;
            padding: 30px 20px;
            border-bottom: 1px dashed #ddd;

            > div {
                display: flex;
                justify-content: space-between;
                align-items: center;

                > div:first-child {
                    display: flex;
                    justify-content: left;

                    div:first-child {
                        width: 50px;
                        text-indent: -999em;
                        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAuCAYAAAHcqzBrAAAAAXNSR0IArs4c6QAABX5JREFUWAntWG9oHEUUn5lcYhKsraVFTSmWaASholaw4hcTqhQUBAWF6geJfigkJrm0Fm1t7nYv0VIt3F3+Sb7YgIpaMX6yILSo4AdFUj+UohCqBkvTWio0aS5p7nae7+3ubOZu93p7uZMG6cDum3nzm9+8eW/+7XKGSaQMkyQlGTXiTKTNuFN03lSOKAWiP2WcZWRP/DVPic12eQCV0aXQCyrP9Z5JafeuapX0rBEp872msbFGlL2qshLpERch4UkDqCrPdmzUSQ9VrB09dDtJ6DU4yTwg+mdESHGGKuaWll7FRgOUt1OprhXOc/DITyfjEsBQFUp2Pfak3TW3GQHyTFAgXfp8rlcyFrFk9GAiXxdQItfwlHmJquz+AzC2yhuo5HOebQ0fDGzCCtuHhLKDKvgJdJnJuFzrAbOL0MKA3U0givpMZuYvacGjVM5LImm8rysQvFeVCyeZ0vskAb2ufbUFitBAL4RDP56wp5NOJDg3OrfvsJefB1Qx1YF6vkQINajnfU0XNuuEOPGtjg89aL1RXh5kq0NsZEnvjTkPFLKglp2CF41fJNnfqkB6viZtPofPKzXpxEto1TWF0WWwhVzWYm9DBLSY3ITiu0jK3GlJ9hHjcBqXxATn/KAYNJ+xuuNflyS0AEZxOC2PjI3Vnlq4ME8NctH4NyhutRunjD9Q3im7jQa7rL9EKhHTy5XkHR9yuO6iLreDyqdNQY+rnzD8Gi0YGhV9xyBFJQBXUkXrn6cMSwdW5jtgAvf93JqxIxuItDIyYgCouZqZvxBJv7MjeKkRqESicwOH6qEsmftyxWTEYh9ELh0RB5JhhXeCccnnrd7YuNuG4W5yFtfzPXVDiQeWumKnlZ5kIBkAvAVRYzMBeNI8j2J8XTK5bk7MtkkJzSKdeCNnsTrUlyZjwNfSZYnIwD1zZvlsOx6lmPgCamkXuVo/eqh5sWP/76SlFGgZ7me0GbjbjrMvIGkPNeCcxR1SFtGJqC5wanBgn+Hs7qKHQJSgN74FN8sjmJX0IPlyKAmAyWdZJD3w+IP1GzsmsRKdfQmt/MFG4ktGY8MGXoXMtDnPudjrekBV01ViZctpmcHJ4QyIC3QCmV2VJDBcgX5bCXvViKjz1UvmmxpB96xi/iu8avnICgHFiIL0q9dn3L6DcZYIMrscHa7VmP3pARIMLrhRTuNKsLimn8Ctog13oHHcTNqLcXnfRb4ztViLKuhpXyCH2FQcb4jAzm5rvGvr5O7d9q1XdVHVCaJIy5LAahB/36nMTAbvCZm6kcP3q/Y33jhlCW3/wBqy2cUzNG9JfUPCumxPcI7CThv4avKcz1LfDudDuAr6UMJvm+P4fX88HwMb8YLRgsd2k9Lfku5vWZLWsF3meEsB1orn4kn0hoVH+zQw2CnwQMYr0oeqTZAs13M5zmAq/2HndOL1g4O3ZaXs44xfdB/3nwWQ3IaG7cL7zfcoW2sHEw/rbQvzoT1nN+RwBbec/TqJ69E2pfunu3v2hWPH2idmfn1WAutCb7Wh13CCAwr2scuDARCT2e7YL6pdkAxtHAi4F/klfjQe0Ikkk82o9xKFdOL8b9s3rG/86u/L8x0UTg7gM+Khxjs+p0vY9VIo47YcPVo/fWW6XzCxz4rGnNG7rDXJ/ufR5qdVJ9d6+qYwP3XRUTxFQtmON2keSfe/jAN6GzfcfQ6k+DuUcX+2ty+uGX5369zrBy7rVI1Dh5tAZH9e6FxeDHp9YX7zF8n6XE/fJ7go8gZYiFPlUMYRuNAw0mW63qTviNDp3It7FjjbExpf7moNTVwNYEnPFfujWmnn+i+9YlwljXP/Cfq+g4oRVlO/qsN607iVhvqm5/6XnuM0KvvmudLh/Uft6B/av3j8B00xWpQLAAAAAElFTkSuQmCC");
                        background-repeat: no-repeat;
                        padding: 15px 5px;
                    }

                    div:last-child {
                        text-align: left;
                        margin-left: 10px;

                        p {
                            color: #999;

                            small {
                                margin-left: 10px;
                                span{
                                    color: #333;
                                }
                            }

                            small:first-child {
                                margin: 0;
                            }
                        }
                    }
                }

                > div:last-child {
                    p {
                        display: flex;
                        justify-content: flex-end;
                        flex-wrap: nowrap;

                        span {
                            margin-left: 10px;
                        }
                    }
                }
            }

        }

        li:nth-child(even) {
            background-color: #f8f8f9;
        }

        li:hover {
            background-color: #ecf7ff;
        }

        li:first-child {
            margin: 0;
        }
    }
}

.search-list {
    color: pink;
    text-align: left;
    padding: 0 10px;

    li {
        color: #666;
        border-bottom: 1px dashed #dcdee2;
        line-height: 42px;

        span {
            white-space: nowrap;
            margin: 5px;
            padding: 2px 5px;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }

    li:last-child {
        border-bottom: none;
    }
}
</style>
