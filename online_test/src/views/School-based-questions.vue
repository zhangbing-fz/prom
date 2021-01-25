<comment>
    # 校本试题
</comment>
<template>
    <Layout>
        <!-- 侧边栏 begin -->
        <Sider hide-trigger>
            <Sider :style="{
                background: '#fff',
                border: '1px solid #dcdee2',
                 zIndex: '1', overflow: 'scroll'
            }"
                   hide-trigger
            >

                <div
                        :style="{
                            lineHeight: '42px',
                            borderBottom: '1px solid #e8eaec',
                            backgroundColor: '#f8f8f9'
                        }"
                >高中·语文</div>
                <!--                <cellGroup>-->
                <!--                    <Cell title="高中·语文" selected />-->
                <!--                </cellGroup>-->
                <div ref="nav">
                    <global-nav/>
                </div>
            </Sider>
        </Sider>
        <Content>
            <!-- 面板分割 begin -->
            <div
                    :style="{
                        marginLeft: '20px'
                    }"
            >
                <div
                        :style="{
                            background: '#fff'
                        }"
                        class="demo-split"
                >
                    <global-search/>
                </div>
                <div
                        :style="{
                            background: '#fff',
                            marginTop: '20px'
                        }"
                        class="demo-split"
                >
                    <global-rich-text :contentInfo="contentInfo"/>
                </div>
            </div>

        </Content>
    </Layout>
</template>

<script>
export default {
  name: 'School-based-test-questions.vue',
  components: {},
  data () {
    return {
      split2: 0.5, // 分隔栏比例
      imgSrc: require('../../public/img/logo_.png'), // logo
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

      searchInfo: null,
      contentInfo: []

    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created () {
    /* const data = {
      entry: 'question_bank_api',
      service_name: 'query_question',
      page_num: 1,
      page_size: 10,
      stage: '高中',
      subject: '语文'
    }
    this.$axios.post('/question_bank_api', data).then(res => {
      const { data } = res
      console.log(data)
      // console.log('获取本地的json文件' + JSON.stringify(res))
      this.contentInfo = res.data.result_info.table_data
      // console.log(res.data.result_info)
    }) */
  },
  mounted () {

  },
  destroyed () {
  }
}
</script>

<style lang="less">
    .ivu-layout-sider {
        background-color: transparent;
    }

</style>
