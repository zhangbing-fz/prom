<comment>
    # 添加试题
</comment>
<template>
    <div class="Add-test-questions">
        <!-- 添加类型 begin -->
        <Layout>
            <Content>
                <!-- 面板分割 begin -->
                <Content
                        :style="{
                            minHeight: '280px',
                            background: '#fff'
                        }"
                >
                    <div
                            :style="{
                                background: '#fff'
                            }"
                            class="demo-split"
                    >
                        <template>
                            <Tabs
                                    :style="{
                                        padding: '20px'
                                    }"
                                    animated
                                    type="line"
                                    value="name1"
                            >
                                <TabPane
                                        :style="{
                                            border: '0'
                                        }"
                                        disabled
                                        label="添加类型:"
                                        tab="测试"/>
                                <TabPane
                                        icon="ios-create"
                                        label="单题添加"
                                        name="name1"
                                >
                                    <div
                                            :style="{
                                                padding: '20px',
                                                 backgroundColor: '#f8f8f9',
                                                 textAlign: 'left',
                                                 border: '1px solid #abdcff',
                                                 backgroundColor: '#f0faff',
                                                 borderRadius: '4px'
                                            }"
                                    >
                                        <Icon
                                                :style="{
                                                    color: '#2d8cf0'
                                                }"
                                                type="md-information-circle"/>
                                        由于浏览器安全保护的问题，您从WORD直接复制的图片可能会无法粘贴，建议您可单独对图片进行抓图后粘贴
                                    </div>
                                    <tab-content-add :addEditor="addEditor"/>
                                </TabPane>
                                <TabPane
                                        icon="ios-cloud-upload"
                                        label="模板上传"
                                        name="name2"
                                >
                                    <div
                                            :style="{
                                                padding: '20px',
                                                backgroundColor: '#f8f8f9',
                                                textAlign: 'left',
                                                border: '1px solid #abdcff',
                                                backgroundColor: '#f0faff',
                                                borderRadius: '4px',
                                                lineHeight: '38px'
                                            }"
                                    >
                                        <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                                        1.建议使用word2007或更高版本文档（后缀名为.docx)<br>

                                        <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                                        2.必须严格按照模板格式编写内容，【题文】…【选项】…【考点】…【答案】…【解析】…【结束】，其中【选项】为类型为：选择题（包括单选、双选、多选）专有，其他题型，可以不用；【考点】为可选，如果没有，可以不需要这个标签<br>

                                        <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                                        3.选择题的选项，各选项必须以“A.”、“B.”、“C.”、“D.”开头（若有更多选项，以此类推）,每个选项必须新起一行<br>

                                        <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                                        4.点击
                                        <Button
                                                size="small"
                                                type="info"
                                        >
                                            <Icon type="ios-cloud-download"/>
                                            下载模板
                                        </Button>
                                        进行试题编写<br>

                                        <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                                        5.点击
                                        <Button
                                                size="small"
                                                type="success"
                                        >
                                            <Icon type="ios-cloud-upload"/>
                                            上传试题
                                        </Button>
                                        进行试题上传
                                    </div>
                                </TabPane>
                                <TabPane
                                        icon="md-git-compare"
                                        label="整卷识别"
                                         name="name3"
                                >
                                    <div
                                            :style="{
                                                padding: '20px',
                                                backgroundColor: '#f8f8f9',
                                                textAlign: 'left',
                                                border: '1px solid #abdcff',
                                                backgroundColor: '#f0faff',
                                                borderRadius: '4px',
                                                lineHeight: '38px'
                                            }"
                                    >
                                        <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                                        1.建议使用word2007或更高版本文档（后缀名为.docx)<br>

                                        <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                                        2.目前整卷识别支持在各题后带答案解析，但如果您的答案解析是集中放在卷后，请您分成两个文件，上传试题成功后再上传答案解析<br>

                                        <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                                        3.整卷识别主要依托于系统特征库，如果您的试卷识别不全或无法识别，请联系您的管理员<br>

                                        <Icon :style="{color: '#2d8cf0'}" type="md-information-circle"/>
                                        4.点击
                                        <Button
                                                size="small"
                                                type="success"
                                        >
                                            <Icon type="ios-cloud-upload"/>
                                            上传试题
                                        </Button>
                                        进行试题上传
                                    </div>
                                </TabPane>
                            </Tabs>
                        </template>
                    </div>
                </Content>
            </Content>
        </Layout>
    </div>
</template>

<script>
import tabContentAdd from '../components/questions-management/Add-test-questions-component/tab-content-add.vue'

export default {
  name: 'Add-test-questions.vue',
  components: {
    'tab-content-add': tabContentAdd
  },
  data () {
    return {
      addEditor: {} // 添加试题
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created () {
    /*    const data = {
                      entry: 'question_bank_api',
                      service_name: 'add_question_init',
                      stage: '高中',
                      subject: '语文'
                    }
                    this.$axios.post('/question_bank_api', data).then(res => {
                      const { data } = res
                      // console.log(data)
                      this.addEditor = data.result_info
                      localStorage.setItem('addEditor', JSON.stringify(data.result_info))
                      // console.log('父组件数据', this.addEditor)
                    }).catch() */
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style scoped>
    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
        height: 120px;
        margin-top: -16px;
        margin-left: 200px;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
        background: #fff;
        padding: 16px;
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-color: transparent;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-color: #fff;
    }

    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-radius: 0;
        background: #fff;
    }

    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-top: 1px solid #3399ff;
    }

    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
