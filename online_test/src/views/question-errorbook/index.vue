<comment>
    # 错题合集
</comment>
<template>
    <div class="index">
        <div>
            <h3>错题本</h3>
            <div class="select-text">
                学科：
                <Button
                        :key="index"
                        :type="select_text.button === index ? 'info': 'default'"
                        @click="select_text.button=index"
                        v-for="(item,index) in select_text.list"
                >{{item}}
                </Button>
            </div>
            <ul class="question-list">
                <li>
                    <div class="top">
                        <span>题型：选择题</span>
                        <span style="margin-left: 10px">做题时间：2020-10-26 11:48</span>
                    </div>
                    <div class="content">
                        试题测试内容
                    </div>
                    <div class="bottom">
                        <span>
                            <Icon type="ios-list-box-outline"/>查看解析
                        </span>
                        <span>
                            <Icon type="ios-heart-outline"/>收藏
                        </span>
                        <span>
                            <Icon type="ios-close-circle-outline"/>纠错
                        </span>
                    </div>
                </li>

                <li>
                    <div class="top">
                        <span>题型：选择题</span>
                        <span style="margin-left: 10px">做题时间：2020-10-26 11:48</span>
                    </div>
                    <div class="content">
                        试题测试内容
                    </div>
                    <div class="bottom">
                        <span>
                            <Icon type="ios-list-box-outline"/>查看解析
                        </span>
                        <span>
                            <Icon type="ios-heart-outline"/>收藏
                        </span>
                        <span>
                            <Icon type="ios-close-circle-outline"/>纠错
                        </span>
                    </div>
                </li>

                <li>
                    <div class="top">
                        <span>题型：选择题</span>
                        <span style="margin-left: 10px">做题时间：2020-10-26 11:48</span>
                    </div>
                    <div class="content">
                        试题测试内容
                    </div>
                    <div class="bottom">
                        <span>
                            <Icon type="ios-list-box-outline"/>查看解析
                        </span>
                        <span>
                            <Icon type="ios-heart-outline"/>收藏
                        </span>
                        <span>
                            <Icon type="ios-close-circle-outline"/>纠错
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {
      select_text: {
        button: 0,
        list: ['语文', '数学', '英语', '历史', '地理', '政治', '生物', '物理', '化学', '科学道德与法治']
      }
    }
  },
  props: {},
  watch: {},
  methods: {
  },
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
    .index {
        background-color: white;

        > div {
            h3 {
                text-align: left;
                padding: 20px;
            }

            .select-text {
                text-align: left;
                padding: 20px;
                background-color: #f7f8f9;
                button{
                    margin-left: 5px;
                }
                button:first-child{
                    margin-left: 0;
                }
            }

            .question-list {
                padding: 20px;

                li {
                    border-radius: 5px;
                    overflow: hidden;
                    border: 1px solid #f0f0f0;
                    margin-top: 20px;
                    div {
                        text-align: left;
                    }

                    .top {
                        padding: 10px;
                        background-color: rgb(248, 248, 249);
                        border-bottom: 1px solid rgb(232, 234, 236);
                        span{

                        }
                    }

                    .content {
                        padding: 10px;
                    }

                    .bottom {
                        padding: 10px;
                        background-color: #f8f8f9;
                        border-top: 1px solid #e8eaec;
                        span{
                            margin-left: 20px;
                        }
                        span:first-child{
                            margin-left: 0;
                        }
                    }
                }
                li:first-child{
                    margin-top: 0;
                }
                li:hover{
                    box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
                    border-color: transparent;
                }
            }
        }
    }
</style>
