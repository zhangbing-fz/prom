<comment>
    # 首页
</comment>
<template>
    <div class="Home">
        <div class="menu-resources">
            <Row>
                <Col span="16">
                    <Card :bordered="false">
                        <p slot="title">
                            <Icon type="ios-film-outline"/>
                            推荐专辑
                        </p>
                        <a
                                @click.prevent="changeLimit"
                                href="#"
                                slot="extra"
                        >
                            <Icon type="ios-loop-strong"/>
                            更多>>
                        </a>
                        <ul class="menu-resources-list-context">
                            <li>
                                <div style="width: initial;">
                                    <Row style="width: 100%;">
                                        <Col span="8"><cite>高考真卷</cite></Col>
                                        <Col span="16"><h4>2020年高考真题</h4>
                                            <p><small>
                                                <Icon type="ios-pricetags-outline"/>
                                                高考真题</small><small>共13张试卷</small></p>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <small>
                                        <Icon type="ios-clock-outline"/>
                                        2019-03-05</small> |
                                    <small>
                                        <Icon type="ios-download-outline"/>
                                        4012</small> |
                                    <small>
                                        <Icon type="ios-eye-outline"/>
                                        1744</small>
                                </div>
                            </li>
                            <li>
                                <div style="width: initial;">
                                    <Row style="width: 100%;">
                                        <Col span="8"><cite>高考真卷</cite></Col>
                                        <Col span="16"><h4>2020年高考真卷</h4>
                                            <p><small>
                                                <Icon type="ios-pricetags-outline"/>
                                                高考真题</small><small>共13张试卷</small></p>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <small>
                                        <Icon type="ios-clock-outline"/>
                                        2019-03-05</small> |
                                    <small>
                                        <Icon type="ios-download-outline"/>
                                        4012</small> |
                                    <small>
                                        <Icon type="ios-eye-outline"/>
                                        1744</small>
                                </div>
                            </li>
                            <li>
                                <div style="width: initial;">
                                    <Row style="width: 100%;">
                                        <Col span="8"><cite>高考模拟</cite></Col>
                                        <Col span="16"><h4>全国Ⅰ高考模拟卷</h4>
                                            <p><small>
                                                <Icon type="ios-pricetags-outline"/>
                                                高考真题</small><small>共20张试卷</small></p>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <small>
                                        <Icon type="ios-clock-outline"/>
                                        2019-03-05</small> |
                                    <small>
                                        <Icon type="ios-download-outline"/>
                                        4012</small> |
                                    <small>
                                        <Icon type="ios-eye-outline"/>
                                        1744</small>
                                </div>
                            </li>
                            <li>
                                <div style="width: initial;">
                                    <Row style="width: 100%;">
                                        <Col span="8"><cite>高考真卷</cite></Col>
                                        <Col span="16"><h4>2014-2017年全国Ⅲ高考真卷</h4>
                                            <p>
                                                <small>
                                                <Icon type="ios-pricetags-outline"/>
                                                高考真题
                                                </small>
                                                <small>共4张试卷</small>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <small>
                                        <Icon type="ios-clock-outline"/>
                                        2019-03-05</small> |
                                    <small>
                                        <Icon type="ios-download-outline"/>
                                        4012</small> |
                                    <small>
                                        <Icon type="ios-eye-outline"/>
                                        1744</small>
                                </div>
                            </li>
                            <li>
                                <div style="width: initial;">
                                    <Row style="width: 100%;">
                                        <Col span="8"><cite>高考真卷</cite></Col>
                                        <Col span="16"><h4>2014-2017年全国高考Ⅰ真卷</h4>
                                            <p>
                                                <small>
                                                <Icon type="ios-pricetags-outline"/>
                                                高考真题
                                                </small>
                                                <small>共8张试卷</small>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <small>
                                        <Icon type="ios-clock-outline"/>
                                        2019-03-05</small> |
                                    <small>
                                        <Icon type="ios-download-outline"/>
                                        4012</small> |
                                    <small>
                                        <Icon type="ios-eye-outline"/>
                                        1744</small>
                                </div>
                            </li>
                            <li>
                                <div style="width: initial;">
                                    <Row style="width: 100%;">
                                        <Col span="8"><cite>高考模拟</cite></Col>
                                        <Col span="16"><h4>全国Ⅱ高考模拟卷</h4>
                                            <p>
                                                <small>
                                                <Icon type="ios-pricetags-outline"/>
                                                高考真题
                                                </small>
                                                <small>共20张试卷</small>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <small>
                                        <Icon type="ios-clock-outline"/>
                                        2019-03-05</small> |
                                    <small>
                                        <Icon type="ios-download-outline"/>
                                        4012</small> |
                                    <small>
                                        <Icon type="ios-eye-outline"/>
                                        1744</small>
                                </div>
                            </li>
                        </ul>
                    </Card>
                    <Card
                            :bordered="false"
                            style="margin: 20px 0;"
                    >
                        <p slot="title">
                            <Icon type="ios-film-outline"/>
                            资源导航
                        </p>
                        <a
                                @click.prevent="changeLimit"
                                href="#"
                                slot="extra"
                        >
                            <Icon type="ios-loop-strong"/>
                            更多>>
                        </a>
                        <div
                                :key="index"
                                class="menu-resources-list-box"
                                v-for="(item,index) in discipline.disciplineList"
                        >
                            <h4>{{item.type}}</h4>
                            <ul>
                                <li
                                        :key="i"
                                        v-for="(ele,i) in item.list"
                                        style="list-style: upper-roman; color: black"
                                >
                                    <div class="l">
                                        <span></span>
                                    </div>
                                    <div class="r">
                                        <span>{{ele}}</span>
                                        <span>
                                            <a href="#">{{discipline.questions}}</a>
                                            <a href="#">{{discipline.examinationPaper}}</a>
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </Col>
                <Col span="8">
                    <div style="margin-left: 20px">
                        <Card :bordered="false">
                            <p slot="title">
                                <Icon type="ios-film-outline"/>
                                网站数据
                            </p>
                            <a
                                    @click.prevent="changeLimit"
                                    href="#"
                                    slot="extra"
                            >
                                <Icon type="ios-loop-strong"/>
                                更多>>
                            </a>
                            <ul class="menu-resources-render">
                                <li>
                                    <div>
                                        <img
                                                alt=""
                                                src="../assets/dot-st.png"
                                                width="30"
                                        >
                                        <strong>试题</strong>

                                    </div>
                                    <div>
                                        <p>
                                            <small>试题总量：</small>
                                            <span>{{questionNum.toFixed(0)}}</span>
                                            <!--<input type="text" v-model.number="questionNum"/>-->
                                        </p>
                                        <p>
                                            <small>今日更新：</small>
                                            <span>{{questionAddNum.toFixed(0)}} </span>道
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <img
                                                alt=""
                                                src="../assets/dot-sj.png"
                                                width=30
                                        >
                                        <strong>试卷</strong>

                                    </div>
                                    <div>
                                        <p>
                                            <small>试题总量：</small>
                                            <span>{{questionNum.toFixed(0)}}</span>
                                        </p>
                                        <p>
                                            <small>今日更新：</small>
                                            <span>{{questionAddNum.toFixed(0)}} </span>道
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <img
                                                alt=""
                                                src="../assets/dot-zj.png"
                                                width="30"
                                        >
                                        <strong>组卷</strong>

                                    </div>
                                    <div>
                                        <p>
                                            <small>试题总量：</small>
                                            <span>{{questionNum.toFixed(0)}}</span>
                                        </p>
                                        <p>
                                            <small>今日更新：</small>
                                            <span>{{questionAddNum.toFixed(0)}} </span>道
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </Card>

                        <Card
                                :bordered="false"
                                style="margin-top: 20px"
                        >
                            <p slot="title">
                                <Icon type="ios-film-outline"/>
                                最热试卷
                            </p>
                            <a
                                    @click.prevent="changeLimit"
                                    href="#"
                                    slot="extra"
                            >
                                <Icon type="ios-loop-strong"/>
                                更多>>
                            </a>
                            <ul class="menu-resources-list">
                                <li
                                        :key="index"
                                        v-for="(item,index) in newsList"
                                >
                                    <span>{{item.content}}</span>
                                    <span>{{item.to_view}}</span>
                                </li>
                            </ul>
                        </Card>

                        <Card
                                :bordered="false"
                                style="margin-top: 20px"
                        >
                            <p slot="title">
                                <Icon type="ios-film-outline"/>
                                最新试卷
                            </p>
                            <a
                                    @click.prevent="changeLimit"
                                    href="#"
                                    slot="extra">
                                <Icon type="ios-loop-strong"/>
                                更多>>
                            </a>
                            <ul class="menu-resources-list">
                                <li
                                        :key="index"
                                        v-for="(item,index) in hotList"
                                >
                                    <span>{{item.content}}</span>
                                    <span>{{item.time}}</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import { TweenLite } from 'gsap'

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      questionAddNum: 0,
      questionNum: 0, // 试题总量
      newsList: [], // 最热试卷
      hotList: [], // 最热试卷
      discipline: {
        disciplineList: [
          {
            type: '高中',
            list: ['数学', '语文', '英语', '物理', '化学', '生物', '政治', '历史', '地理']
          },
          {
            type: '初中',
            list: ['数学', '语文', '英语', '物理', '化学', '生物', '政治', '历史', '地理']
          },
          {
            type: '小学',
            list: ['数学', '语文', '英语']
          }
        ],
        questions: '试题',
        examinationPaper: '试卷'
      }
    }
  },
  props: {},
  watch: {
    // questionNum (newValue) {
    //   TweenLite.to(this.$data, 1, { questionAddNum: newValue })
    // }
  },
  methods: {
    // 获取测试新闻列表
    getNews () {
      // 最热试卷
      this.$axios.get('http://localhost:9527/api/getNewsData')
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.newsList = res.data
          } else {
            this.$Modal.warning({
              title: '警告',
              content: res.status
            })
          }
        })
        .catch(err => {
          console.log(err)
        })

      this.$axios.get('http://localhost:9527/api/getHotData')
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.hotList = res.data
          } else {
            this.$Modal.warning({
              title: '警告',
              content: res.status
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    // animatedNumber () {
    //   return this.questionAddNum.toFixed(0)
    // }
  },
  created () {
  },
  mounted () {
    this.getNews() // 添加测试接口数据
    TweenLite.to(this.$data, 1, {
      questionAddNum: Math.random() * 998,
      questionNum: Math.random() * 998998
    })
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>
    .menu-resources {
        text-align: left;

        .menu-resources-list-context {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            li {
                transition: all 0.3s ease-in-out;
                cursor: pointer;
                border: 1px solid #e2e6ed;
                border-radius: 5px;
                width: calc(33.333% - 20px);
                margin: 10px;
                overflow: hidden;

                > div:first-child {
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;

                    div:first-child > cite {
                        /*border: 1px solid #ddd;*/
                        height: 70px;
                        display: inline-block;
                        padding: 15px 5px;
                        /*box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);*/
                        background-image: url("../assets/dot.png");
                        background-size: contain;
                        font-size: 12px;
                        background-repeat: no-repeat;
                    }

                    div:last-child {
                        small:last-child {
                            color: #999;
                            margin-left: 20px;
                        }

                        p {
                            margin-top: 15px;
                        }
                    }
                }

                > div:last-child {
                    transition: all 0.3s ease-in-out;
                    display: flex;
                    border-top: 1px dashed #ddd;
                    justify-content: space-between;
                    background-color: #f0f1f1;
                    color: #ddd;
                    padding: 5px 10px;

                    small {
                        color: black;
                    }
                }
            }

            li:hover {
                border: 1px solid #3399ff;

                > div:last-child {
                    background-color: #2d8cf0;
                    color: white;

                    small {
                        color: white;
                    }
                }
            }
        }

        .menu-resources-list-box {
            border-bottom: 1px dashed #ddd;
            margin: 20px;

            h4 {
                margin-bottom: 10px;
            }

            ul {
                display: flex;
                justify-content: start;
                margin-bottom: 10px;
                flex-wrap: wrap;

                li {
                    width: 200px;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    margin: 15px;
                    transition: all 0.3s ease-in-out;
                    background-color: #f8f8f9;
                    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
                    border-radius: 3px;
                    padding: 10px;

                    div.l {
                        display: flex;
                        align-items: center;

                        span {
                            display: inline-block;
                            cursor: pointer;
                            width: 60px;
                            height: 60px;
                            border-radius: 10px;
                            border: 2px solid #ddd;
                            /*background-color: #f8f8f9;*/
                            /*box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);*/
                            background-image: url("../assets/spriter-b.png");
                            background-size: unset;
                        }
                    }

                    div.r {
                        text-align: left;
                        margin: 10px;

                        a:hover {
                            color: red;
                            text-decoration: underline;
                        }

                        span:last-child {
                            display: flex;
                            justify-content: start;

                            a:last-child {
                                margin-left: 10px;
                            }
                        }
                    }
                }

                li:nth-child(1) > div:first-child span {
                    background-position: -363px -55px;
                }

                li:nth-child(2) > div:first-child span {
                    background-position: -55px -280px;
                }

                li:nth-child(3) > div:first-child span {
                    background-position: -235px -280px;
                }

                li:nth-child(4) > div:first-child span {
                    background-position: -175px -280px;
                }

                li:nth-child(5) > div:first-child span {
                    background-position: -364px 5px;
                }

                li:nth-child(6) > div:first-child span {
                    background-position: -364px -235px;
                }

                li:nth-child(7) > div:first-child span {
                    background-position: -295px -280px;
                }

                li:nth-child(8) > div:first-child span {
                    background-position: -364px -115px;
                }

                li:nth-child(9) > div:first-child span {
                    background-position: -115px -280px;
                }

                li:hover {
                    cursor: pointer;
                    transform: scale(1.1);
                    /*border-width: 10px;*/
                    box-sizing: border-box;
                }

                li:hover div.l:first-child span {
                    transition: all 0.3s ease-in-out;
                }
            }

        }

        .menu-resources-list {
            line-height: 32px;
            padding-left: 20px;
            li{
                list-style: circle;
                border-bottom: 1px dashed #ddd;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
                &:hover{
                    background-color: #ddd;
                }
            }

            span:last-child {
                color: #999;
            }
        }

        .menu-resources-render {
            li {
                border-bottom: 1px dashed #ddd;
                margin-top: 10px;
                line-height: 32px;
                display: flex;
                justify-content: start;
                align-items: center;

                div:first-child {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                div:last-child {
                    margin-left: 30px;
                    display: flex;

                    p {
                        span {
                            font-size: 22px;
                        }
                    }

                    p:first-child span {
                        color: orange;
                    }

                    p:last-child {
                        margin-left: 20px;

                        span {
                            color: #999999;
                        }
                    }
                }
            }
        }
    }
</style>
