<comment>
# 知识点选题
</comment>
<template>
    <Layout>
        <!-- 侧边栏 begin -->
        <Sider
                :style="{
                    boxShadow: '0 1px 1px 0 rgba(0,0,0,.1)',
                    zIndex: '1',
                    borderRadius: '4px',
                }"
                hide-trigger
                width="300"
        >
            <!--<Affix :offset-top="185">-->
            <div
                    class="btn-menu"
                    style="background-color: white"
                    @mouseenter="$refs.navTitleList.style.display = 'block'"
                    @mouseleave="$refs.navTitleList.style.display = 'none'"
            >
                <div class="navTitle">
                    <!-- 学段、科目 -->
                    <span ref="navTitle">
                        {{ selectSubject.stage }}·{{ selectSubject.subject }}
                    </span>
                    <Icon type="ios-desktop-outline"/>
                </div>
                <div ref="navTitleList" class="navTitleList">
                    <dl
                            v-for="(item,index) in navTitleList"
                            :key="index"
                    >
                        <dd>
                            {{ item.gradeInfo.name }}
                        </dd>
                        <dt>
                                <span
                                        v-for="(ele,num) in item.subjectsInfo"
                                        :key="num"
                                        @click="setNavTitle(item.gradeInfo, ele)"
                                >{{ ele.name }}</span>
                        </dt>
                    </dl>
                </div>
            </div>

            <div ref="nav">
                <!-- 学段和树结构 -->
                <keep-alive>
                    <global-nav @getSelect="getSelect"/>
                </keep-alive>
            </div>
            <!--</Affix>-->

        </Sider>
        <Content style="overflow-x: inherit">
            <!-- 面板分割 begin -->
            <div :style="{marginLeft: '20px'}">
                <div :style="{background: '#fff'}"
                     class="demo-split">
                    <!-- 筛选条件组件 -->
                    <keep-alive>
                        <global-search
                                :selectSubject="selectSubject"
                                @changeDiff="searchCode.diff=$event"
                                @changeGrade="searchCode.GradeCode=$event"
                                @changeMaterial="searchCode.material=$event"

                                @changePaperType="searchCode.paperType=$event"
                                @changeQtypeId="searchCode.qtypeId=$event"
                                @changeYear="searchCode.year=$event"
                                @setChapter="setChapter"
                        />
                    </keep-alive>
                </div>
                <div style="margin-top: 20px">
                    <Row style="background-color: white">
                        <Col span="14">
                            <Row>
                                <Col class="search-sort" span="24">
                                    <div
                                            v-for="(item,index) in sortInfo.list"
                                            :key="item.value"
                                            :style="{color: sortInfo.button === index? 'rgb(43, 133, 228)':''}"
                                            @click="getSearchData($event, index)"
                                    >
                                        <small>{{ item.label }}</small>
                                        <template v-if="item.label!== '综合'">
                                            <span class="btn-sort">
                                                <Icon type="md-arrow-dropup"/>
                                                <Icon type="md-arrow-dropdown"/>
                                            </span>
                                        </template>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col
                                :style="{
                                    position: 'relative'
                                }"
                                class="search-sort"
                                span="10"
                        >
                            <global-min-page
                                    :pageInfo="pageInfo"
                                    :style="{
                                        display: 'flex',
                                        justifyContent: 'right',
                                        position: 'absolute',
                                        top: 0,
                                        right: '20px',
                                    }"
                                    @change="searchCode.page=$event,pageInfo.current=$event"
                            />
                        </Col>
                    </Row>
                    <global-rich-text-question
                            :content-info="contentInfo"
                            :style="{
                                background: 'white',
                                padding: '30px',
                                boxShadow: '0 1px 1px 0 rgba(0,0,0,.1)',
                                borderRadius: '4px'
                            }"
                            @change="editorErrorCorrection"
                            @changeTow="editorParsing"
                    />
                </div>
            </div>
            <!-- 纠错 弹框 -->
            <model-error-correction
                    v-show="modal1"
                    :model1="modal1"
                    @change="changeModal1"
            />
            <!-- 解析 弹框 -->
            <model-parsing
                    v-show="modal2"
                    :model2="modal2"
                    :parsingInfo="parsingInfo"
                    @change="changeModal2"
            />
            <global-page
                    :pageInfo="pageInfo"
                    :style="{
                        marginTop: '20px'
                    }"
                    @change="searchCode.page=$event, pageInfo.current=$event"/>
        </Content>
    </Layout>
</template>

<script>
import errorCorrection from '@/components/base/rich-text/component/model-error-correction.vue'
import parsing from '@/components/base/rich-text/component/model-parsing.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'questions-Knowledge.vue',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'model-error-correction': errorCorrection,
    // eslint-disable-next-line vue/no-unused-components
    'model-parsing': parsing
  },
  data () {
    return {
      pageInfo: {
        total: 0,
        current: 1
      },
      searchCode: {
        knowledgeId: '', // 知识点ID // 根据知识点取试题-------- 通过 material计算获取
        page: '1', // 分页
        GradeCode: 0, // 年级 code
        material: 0, // 教材 code
        qtypeId: null, // 题型code
        diff: null, // 难度code
        paperType: null, // 类型code
        year: null, // 年份
        current: 1
      },
      sortInfo: {
        button: 0,
        list: [
          {
            value: '综合',
            label: '综合'
          },
          {
            value: '时间',
            label: '时间'
          },
          {
            value: '组卷',
            label: '组卷'
          },
          {
            value: '作答',
            label: '作答'
          },
          {
            value: '得分率',
            label: '得分率'
          }
        ]
      },
      modal1: false, // 纠错弹框
      modal2: false, // 解析弹框
      parsingInfo: null, // 解析弹框的数据
      navTitleVlaue: '',
      navTitleList: [ // 学习阶段及科目
        {
          gradeInfo: {
            name: '',
            id: ''
          },
          subjectsInfo: [
            {
              name: '',
              code: ''
            }
          ]
        }
      ],
      split2: 0.5, // 分隔栏比例
      imgSrc: require('../../../public/img/logo_.png'), // logo
      materialTree: [{ // 教材树
        // title: '教材',
        // expand: true,
        // children: []
      }], // 无限级菜单
      justTree: [{ // 知识点树
        // title: '知识点',
        // expand: true,
        // children: []
      }], // 无限级菜单
      map: {
        title: 'name', // 接口返回的名称
        children: 'HasChild', // 接口返回的子节点
        id: 'id',
        parentId: 'parent_id'
      },

      contentInfo: [], // 题目列表
      selectSubject: {
        stage: '高中',
        id: '1553',
        code: '3',
        subject: '数学',
        subjectId: '2'
      },
      chapter: null
    }
  },
  props: {},
  watch: {
    searchCode: { // 选择章节树获取试题列表
      handler (val) {
        // console.log('章节点树改变监听到了')
        this.getQuestions()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['SET_SAVE_SELECT_SUBJECT', 'SET_SAVE_DISCIPLINE']),
    // 点击树的项事件
    getSelect (val) {
      // console.log(val)
      // console.log(this.searchCode.material)
      // console.log(val[0])
      if (!val.length) {
        return
      }
      let oldId
      while (val[0].children.length !== 0) {
        oldId = val[0].children
        val = oldId
      }
      this.searchCode.knowledgeId = val[this.searchCode.material].oldId // 默认显示章节树ID
    },
    // 试题排序
    getSearchData (e, i) {
      if (e.target.tagName === 'DIV') {
        this.sortInfo.button = i
        const ele = e.target.firstElementChild.children
        if (ele[0].classList.contains('active')) {
          ele[0].classList.remove('active')
          ele[1].classList.add('active')
        } else {
          ele[0].classList.add('active')
          ele[1].classList.remove('active')
        }
      }
    },
    // 纠错
    changeModal1 (val) {
      // this.modal1 = arguments[0]
      this.modal1 = val
    },
    // 解析
    changeModal2 (val) {
      // this.modal1 = arguments[0]
      this.modal2 = val
    },
    editorErrorCorrection () {
      this.modal1 = true
    },
    editorParsing (ele, i) {
      console.log('axios11111')
      const url = 'http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=getAnswer&accessKey=37f600e9c80494c20d950d3081e497e5'
      this.$axios.get(`${url}&qid=${ele.qid}`)
        .then(res => {
          console.log(i)
          this.parsingInfo = res.data
          this.parsingInfo.index = i // 传入题目序号
          this.modal2 = true
        })
    },

    // 选择学段、学科
    setNavTitle (item, ele) {
      this.$refs.navTitleList.style.display = 'none'
      this.selectSubject = { // 复制学段 id  code
        stage: item.name,
        id: item.id,
        code: item.code, // 学段
        subject: ele.name,
        subjectId: ele.code // 学科
      }
      // console.log('选择学科', item, ele)
      this.SET_SAVE_SELECT_SUBJECT(this.selectSubject)
    },

    // 设置知识点树
    setChapter (val) {
      if (val.grade.list.length) {
        this.chapter = val
        // eslint-disable-next-line no-unused-vars
        const url = 'http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=knowledgeApi&accessKey=37f600e9c80494c20d950d3081e497e5' // 绑定账号登录时的学段、科目
        this.$axios.get(`${url}
          &pharseId=${this.selectSubject.code}
          &subjectId=${this.selectSubject.subjectId}
          &gradeId=${val.grade.list[this.searchCode.GradeCode].code}
          &editionId=${val.material.list[this.searchCode.material].code}
      `)
          .then(({ data }) => {
            switch (data.errorCode) {
              case '1':
                this.$Modal.warning(
                  {
                    title: '提醒',
                    content: '请求错误，get、post切换'
                  }
                )
                break
              case '2':
                this.$Modal.warning(
                  {
                    title: '提醒',
                    content: 'accessKey参数空白错误'
                  }
                )
                break
              case '3':
                this.$Modal.warning(
                  {
                    title: '提醒',
                    content: 'accessKey校验错误，过期或者不存在'
                  }
                )
                break
              case '4':
                this.$Modal.warning(
                  {
                    title: '提醒',
                    content: '该accessKey访问量超过或者当日访问超量'
                  }
                )
                break
            }
            // console.log(data, '知识点树接口返回data-------------------------------')
            this.$store.dispatch('SAVE_TREE_KNOWLEDGE', data.data) // 设置知识点树
          })
      }
    },

    // 存储学段 、科目、接口
    getData () {
      this.navTitleList = []
      // 调用缓存
      const data = this.base_interface_data_period

      for (let i = 0, len = data.length; i < len; i++) {
        this.navTitleList.push({
          gradeInfo: {
            name: data[i].name,
            id: data[i].id,
            code: data[i].code
          }
        })

        const arrList = []
        data[i].child.forEach(item => {
          item.child.forEach(ele => {
            arrList.push({
              name: ele.name,
              code: ele.code
            })
          })
        })

        // 数组对象去重
        const keyArr = new Set()
        arrList.forEach(item => {
          keyArr.add(item.name)
        })
        // console.log(keyArr)
        const newArr = []
        keyArr.forEach(item => {
          const index = arrList.findIndex(item2 => item2.name === item)
          newArr.push(arrList[index])
        })
        // console.log(newArr)
        this.navTitleList[i].subjectsInfo = newArr
      }
      this.SET_SAVE_DISCIPLINE(this.navTitleList)
    },
    // 根据知识点获取试题列表
    getQuestions () {
      const url = 'http://udog.beautop.cn:33833/gdy/question_bank/xukubao_api?s=Index&m=Api&a=getQuestions&accessKey=37f600e9c80494c20d950d3081e497e5'
      // eslint-disable-next-line no-unused-vars
      let knowledgeId, qtypeId, paperType, diff, year, page

      // eslint-disable-next-line prefer-const
      knowledgeId = this.searchCode.knowledgeId ? `&knowledgeId=${this.searchCode.knowledgeId}` : `&knowledgeId=${this.searchCode.knowledgeId}` // knowledgeId 教材*必传 id

      // eslint-disable-next-line prefer-const
      qtypeId = this.searchCode.qtypeId ? `&qtypeId=${this.searchCode.qtypeId.id}` : ''// qtypeId 题型 id

      // eslint-disable-next-line prefer-const
      paperType = this.searchCode.paperType ? `&paperType=${this.searchCode.paperType.id}` : ''// paperType 试卷类型 id

      // eslint-disable-next-line prefer-const
      diff = this.searchCode.diff ? `&diff=${this.searchCode.diff.id}` : '' // diff 难度 id

      // eslint-disable-next-line prefer-const
      year = this.searchCode.year ? `&year=${this.searchCode.year}` : '' // // year 年份

      // eslint-disable-next-line prefer-const
      page = this.searchCode.page ? `&page=${this.searchCode.page.toString()}` : '1'// page 分页码 *必传

      this.$axios.get(`${url}${knowledgeId}${qtypeId}${paperType}${diff}${year}${page}`)
        .then(res => {
          // console.log(res.data.data)
          if (res.data.data.length) {
            this.pageInfo.total = res.data.dataCount / 1
            this.contentInfo = res.data.data
          } else {
            this.contentInfo = []
          }
        })
        .catch(err => console.log(err))
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
    this.getData()
  },
  destroyed () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="less">
.ivu-layout-sider {
    background-color: transparent;
}

.navTitle {
    line-height: 43px;
    /*background-color: #f8f8f9;*/
    padding: 0 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-weight: bold;
    }
}

.navTitleList {
    display: none;
    background-color: white;

    dd {
        text-align: left;
        padding: 10px 15px;
        color: #2d8cf0;
        font-weight: bold;
    }

    dt {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        border-bottom: 1px dashed #ddd;

        span {
            margin: 5px 0 5px 15px;
            padding: 2px 5px;
            cursor: pointer;
        }

        span:hover {
            /*border: 1px solid #2db7f5;*/
            background-color: #2db7f5;
            color: white;
            border-radius: 3px;
        }
    }
}

.btn-menu {
    text-align: left;
    border-bottom: 1px solid #e8eaec;

    .navTitle {
        color: white;
        background-color: #2db7f5;
    }
}

.search-sort {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 20px;
    padding: 0 20px;

    div {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span.btn-sort {
            margin-left: 5px;
            display: flex;
            flex-direction: column;

            .active {
                color: #333;
            }

            i {
                font-size: 12px;
            }

            i:first-child {
                transform: translateY(3px);
            }

            i:last-child {
                transform: translateY(-3px);
            }
        }
    }

    > div::after {
        content: '';
        margin: 0 20px;
        width: 1px;
        height: 20px;
        border-right: 1px solid #ddd;
    }
}
</style>
