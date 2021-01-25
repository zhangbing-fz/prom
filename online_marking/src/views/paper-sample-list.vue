<comment>
# 样卷
</comment>
<template>
    <div class="paper-sample" style="padding: 20px; height: 100vh">
        <Tabs type="card">
            <TabPane
                    class="ivu-exception"
                    icon="md-bookmarks"
                    label="参考答案"
            >
                <div class="ivu-exception-img">
                    <div class="ivu-exception-img-element"
                         style="background-image: url('https://file.iviewui.com/iview-pro/icon-403.svg');"/>
                </div>
                <div class="ivu-exception-content"><h1>403</h1>
                    <div class="ivu-exception-content-desc">抱歉，你无权访问该页面</div>
                    <div class="ivu-exception-content-actions">
                        <a
                                class="ivu-btn ivu-btn-primary ivu-btn-large"
                                href="/"
                                target="_self">
                            <span>返回首页</span>
                        </a>
                    </div>
                </div>
            </TabPane>
            <TabPane icon="md-thumbs-up" label="优秀">优秀</TabPane>
            <TabPane icon="md-thumbs-down" label="糟糕">糟糕</TabPane>
            <TabPane icon="md-flag" label="典型">典型</TabPane>
        </Tabs>
    </div>
</template>

<script>
// import errorBg from '../assets/images/icon-403.svg'
export default {
  name: 'paper-sample',
  components: {},
  data () {
    return {}
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

<style scoped>
.ivu-exception {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 80%;
    min-height: 500px;
}

.ivu-exception-img-element {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
}

.ivu-exception-img {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    width: 50%;
    /*padding-right: 152px;*/
    zoom: 1;
}

.ivu-exception-content {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
}

.ivu-exception-content h1 {
    margin-bottom: 24px;
    color: #515a6e;
    font-weight: 600;
    font-size: 72px;
    line-height: 72px;
}

.ivu-exception-content-desc {
    margin-bottom: 16px;
    color: #808695;
    font-size: 20px;
    line-height: 28px;
}

</style>
