<comment>
    # 我的试卷
</comment>
<template>
    <Layout>
        <Content>
            <!-- 面板分割 begin -->
            <Affix :offset-top="96">
                <div
                        :style="{
                            background: '#fff',
                             zIndex: '99'
                        }"
                        class="demo-split"
                >
                    <template>
                        <global-search>
                            <template v-slot:default>
                                <Form
                                        :label-width="45"
                                        :model="formItem"
                                        :style="{
                                            display: 'flex',
                                            height: '43px',
                                            justifyContent: 'left',
                                            alignItems: 'center'
                                        }"
                                        inline
                                >
                                    <FormItem
                                            label="日期:"
                                            style="margin-bottom: 0"
                                    >
                                        <DatePicker
                                                format="yyyy-MM-dd"
                                                placeholder="请选择开始-结束日期"
                                                style="width: 200px"
                                                type="datetimerange"
                                        />
                                    </FormItem>
                                    <FormItem
                                            label="标题:"
                                            style="margin-bottom: 0"
                                    >
                                        <Input
                                                :style="{
                                                    width: '200px',
                                                    textAlign: 'left'
                                                }"
                                                placeholder="请输入标题关键字..."
                                                v-model="formItem.input"
                                        />
                                    </FormItem>
                                    <FormItem style="margin-bottom: 0">
                                        <Button type="info">搜索</Button>
                                    </FormItem>
                                </Form>
                            </template>
                        </global-search>
                    </template>
                </div>
            </Affix>
            <Content :style="{ minHeight: '280px'}">
                <div
                        :style="{
                            marginTop: '20px',
                            background: '#fff'
                        }"
                        class="demo-split"
                >
                    <global-table/>
                </div>
            </Content>
        </Content>
    </Layout>
</template>

<script>
export default {
  name: 'My-examination-paper.vue',
  components: {},
  data () {
    return {
      formItem: {
        input: ''
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

<style lang="less">

</style>
