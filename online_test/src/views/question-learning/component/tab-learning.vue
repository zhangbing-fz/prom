<comment>
    # 学情分析
</comment>
<template>
    <div class="tab-learning">
        <div class="title">
            <h2>高一数学往期考试学情</h2>
        </div>
        <Tabs
                type="card"
                value="name1">
            <TabPane label="作业"
                     name="name1">
                <div class="homework">
                    <div class="select-text">
                        <Form
                                :style="{
                                display: 'flex',
                                justifyContent: 'start',
                                padding: '10px 20px'}"
                                inline>
                            <FormItem :style="{width: '260px'}"
                                      label="班级：">
                                <Select
                                        :style="{
                                width: '200px',
                                textAlign: 'left'
                            }"
                                        v-model="formItem.discipline">
                                    <Option value="数学">数学</Option>
                                    <Option value="语文">语文</Option>
                                    <Option value="英语">英语</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="content">
                        <div>
                            <span></span>
                            <p>高一还没有往期作业学情哦!</p>
                            <p>多用极课出作业,读卷后就会有往期试卷学情啦</p>
                            <Button
                                    style="margin-top: 20px"
                                    type="primary">立即布置作业
                            </Button>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane label="考试"
                     name="name2">
                <div class="test">
                    <div class="select-text">
                        <Form
                                :style="{
                                display: 'flex',
                                justifyContent: 'start',
                                padding: '10px 20px'}"
                                inline>
                            <FormItem :style="{width: '260px'}"
                                      label="班级：">
                                <Select
                                        :style="{
                                width: '200px',
                                textAlign: 'left'
                            }"
                                        v-model="formItem.discipline">
                                    <Option value="数学">数学</Option>
                                    <Option value="语文">语文</Option>
                                    <Option value="英语">英语</Option>
                                </Select>
                            </FormItem>
                            <Input placeholder="请输入考试名称或关键词" style="width: 300px" />
                            <Button type="primary" style="margin-left: 10px">查询</Button>
                        </Form>
                    </div>
                    <div class="content">
                        <ul>
                            <li>
                                <Row>
                                    <Col align="left" span="18">
                                        <h3>2020-2021学年第一学期高一选择性作业七</h3>
                                        <div>
                                            <span>更新时间： 2020-10-29 23:11:24</span>
                                            <span>满分：150</span>
                                            <span>上传人数：1065/1300</span>
                                            <span>已上传成绩班级数：22/26</span>
                                        </div>
                                    </Col>
                                    <Col align="right" span="6">
                                        <Button>查看学情</Button>
                                    </Col>
                                </Row>
                            </li>
                            <li>
                                <Row>
                                    <Col align="left" span="18">
                                        <h3>2020-2021学年第一学期高一选择性作业七</h3>
                                        <div>
                                            <span>更新时间： 2020-10-29 23:11:24</span>
                                            <span>满分：150</span>
                                            <span>上传人数：1065/1300</span>
                                            <span>已上传成绩班级数：22/26</span>
                                        </div>
                                    </Col>
                                    <Col align="right" span="6">
                                        <Button>查看学情</Button>
                                    </Col>
                                </Row>
                            </li>
                            <li>
                                <Row>
                                    <Col align="left" span="18">
                                        <h3>2020-2021学年第一学期高一选择性作业七</h3>
                                        <div>
                                            <span>更新时间： 2020-10-29 23:11:24</span>
                                            <span>满分：150</span>
                                            <span>上传人数：1065/1300</span>
                                            <span>已上传成绩班级数：22/26</span>
                                        </div>
                                    </Col>
                                    <Col align="right" span="6">
                                        <Button>查看学情</Button>
                                    </Col>
                                </Row>
                            </li>
                            <li>
                                <Row>
                                    <Col align="left" span="18">
                                        <h3>2020-2021学年第一学期高一选择性作业七</h3>
                                        <div>
                                            <span>更新时间： 2020-10-29 23:11:24</span>
                                            <span>满分：150</span>
                                            <span>上传人数：1065/1300</span>
                                            <span>已上传成绩班级数：22/26</span>
                                        </div>
                                    </Col>
                                    <Col align="right" span="6">
                                        <Button>查看学情</Button>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
  name: 'tab-learning',
  components: {},
  data () {
    return {
      formItem: {
        discipline: ''
      }
    }
  },
  props: {},
  watch: {},
  methods: {},
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
    .ivu-form-item{
        margin-bottom: 0;
    }

    .tab-learning {
        background-color: white;
        padding-bottom: 20px;
        position: relative;

        .title {
            text-align: left;
            padding: 10px 20px;

            h2 {
                color: black;
                height: 40px;
                display: flex;
                align-items: center;
            }
        }

        .homework {
            .select-text {
                background-color: #f7f8f9;
            }

            .content {
                padding: 40px;

                div {
                    > span {
                        display: block;
                        margin: auto;
                        width: 120px;
                        height: 100px;
                        margin-bottom: 20px;
                        background: url(data:image/png;base64,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) no-repeat;
                        background-size: 120px 100px;
                    }

                    p {
                        color: #ccc;
                    }
                }
            }
        }

        .test {
            .select-text {
                background-color: #f7f8f9;
            }

            .content {
                li {
                    transition: all 0.3s;
                    cursor: pointer;
                    padding: 30px 20px;
                    border-bottom: 1px dashed #ddd;

                    h3 {
                        color: black;
                    }
                }

                li:nth-child(even) {
                    background-color: #f8f8f9;
                }

                li:hover {
                    background-color: #ecf7ff;
                }
            }
        }

    }
</style>
