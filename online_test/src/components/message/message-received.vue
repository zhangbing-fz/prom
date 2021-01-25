<comment>
    # 收到的消息
</comment>
<template>
    <div class="message">
        <Content>
            <!-- 面板分割 begin -->
            <div :style="{background: '#fff',minHeight: 'initial'}" class="global-search demo-split">
                <!-- 搜索条件 -->
                <div class="search-list">年级：
                    <span
                            :class="searchInfo.grade.button === index ? 'addclass' : ''"
                            :key="index"
                            :style="{cursor: 'pointer'}"
                            @click="gradeDowm(index)"
                            v-for="(item,index) in searchInfo.grade.list"
                    >{{item}}</span>
                </div>
                <div>
                    <template>
                        <Form :label-width="45" :model="formItem" inline  :style="{display: 'flex', justifyContent: 'left', alignItems: 'center', height: '42px'}">
                            <FormItem label="日期:">
                                <DatePicker
                                        :value="value2"
                                        format="yyyy/MM/dd"
                                        placeholder="请选择起始日期"
                                        placement="bottom-end"
                                        style="width: 200px"
                                        type="daterange"
                                ></DatePicker>
                            </FormItem>
                            <FormItem label="标题:" :style="{marginLeft: '10px'}">
                                <Input placeholder="请输入关键字" v-model="formItem.input"></Input>
                            </FormItem>

                            <Button :style="{marginLeft: '20px'}" type="info">搜索</Button>
                        </Form>
                    </template>
                </div>
            </div>

            <Content :style="{minHeight: '280px'}">
                <div :style="{ marginTop: '20px', background: '#fff'}" class="demo-split">
                    <global-table/>
                </div>
            </Content>
        </Content>
    </div>
</template>

<script>
export default {
  name: 'message',
  components: {},
  data () {
    return {
      formItem: {
        input: ''
      },
      // 搜索组件
      searchInfo: {
        grade: { // 年级
          button: 0,
          list: ['全部', '未读', '已读']
        }
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    gradeDowm (i) {
      this.searchInfo.grade.button = i
    }
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
    .addclass {
        border: 1px solid #2db7f5;
        background-color: #2db7f5;
        color: white;
        border-radius: 3px;
    }

    .global-search {
        text-align: left;
        padding: 0 10px;

        .search-list {
            border-bottom: 1px dashed #dcdee2;
            line-height: 42px;
        }

        .search-list:last-child {
            border-bottom: none;
        }

        div > span {
            white-space: nowrap;
            margin: 5px;
            padding: 2px 5px;
            -moz-user-select: none; /*火狐*/
            -webkit-user-select: none; /*webkit浏览器*/
            -ms-user-select: none; /*IE10*/
            -khtml-user-select: none; /*早期浏览器*/
            user-select: none;
        }

    }

    .active {
        background-color: #1daef8;
        color: white;
    }

    button {
        outline: none;
    }

    .btn::after {
        background-color: transparent;
    }

    .ivu-form-item {
        margin: 0;
    }
</style>
