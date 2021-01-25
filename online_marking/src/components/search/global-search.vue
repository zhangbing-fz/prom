<comment>
# 表格数据筛选
</comment>
<template>
    <div
            :style="{
                textAlign: 'left',
                paddingTop: '20px'
            }"
            class="global-search"
    >
        <!-- 遍历输入框控件 -->
        <Form :label-width="60" inline>
            <FormItem
                    v-for="(item,index) in searchData.select"
                    :key="index"
                    :label="item.title"
            >
                <Select
                        :style="{
                          width: '150px'
                        }"
                        clearable
                        @on-change="setSearch[item.key]=$event"
                >
                    <Option
                            v-for="(ele,i) in item.list"
                            :key="i"
                            :value="ele.class_id"
                    >{{ ele.grade_name }}{{ ele.name }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem
                    v-for="(item,index) in searchData.input"
                    :key="'info'+index"
                    :label="item.title"
            >
                <Input
                        v-model="setSearch[item.key]"
                        :placeholder="item.placeholder"
                        type="text"
                />
            </FormItem>
            <Button type="primary" @click="setSearchData">搜索</Button>
        </Form>
    </div>
</template>

<script>
export default {
  name: 'global-search',
  components: {},
  data () {
    return {
      searchData: {
        input: [],
        select: {}
      },
      setSearch: []
    }
  },
  props: {
    seatch_data: {
      type: Object
    }
  },
  watch: {
    seatch_data: {
      handler (val) {
        this.searchData = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setSearchData () {
      console.log(this.setSearch)
      this.$emit('change', this.setSearch)
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

<style scoped>
</style>
