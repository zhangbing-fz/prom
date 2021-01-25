<comment>
    # 试卷解构设置 排序、删除
</comment>
<template>
    <div class="popup-sort">
        <Modal
                @on-cancel="$emit('cancel',modal2)"
                @on-ok="$emit('ok',modal2)"
                v-model="modal2"
        >
            <p slot="header">
                <span>排序</span>
            </p>
            <div class="context">
                <!-- 多选 -->
                <div>
                    <h4>需要排序的题块</h4>
                    <div>
                        <CheckboxGroup
                                @on-change="checkAllGroupChange"
                                v-model="checkboxSelect"
                        >
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :value="checkAll"
                                    @click.prevent.native="handleCheckAll"
                                    label="全选"
                            ></Checkbox>
                            <Checkbox
                                    :key="item.label"
                                    :label="item.label"
                                    v-for="item in checkboxList"
                            >{{item.value}}
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>

                <!-- 单选 -->
                <div>
                    <h4>选择排序方式：</h4>
                    <div>
                        <RadioGroup v-model="radioSelect">
                            <Radio
                                    :key="item.label"
                                    :label="item.label"
                                    v-for="item in radioList"
                            >{{item.label}}
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>

            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'popup-sort',
  components: {},
  data () {
    return {
      modal2: false,
      indeterminate: true,
      checkAll: false,
      checkboxSelect: ['选择题'],
      checkboxList: [
        { label: '选择题', value: '选择题' },
        { label: '多选题', value: '多选题' },
        { label: '填空题', value: '填空题' },
        { label: '解答题', value: '解答题' }
      ],
      radioSelect: '由容易到困难排序',
      radioList: [
        {
          label: '由容易到困难排序',
          value: '由容易到困难排序'
        },
        {
          label: '由困难到容易排序',
          value: '由困难到容易排序'
        }
      ]
    }
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    modal (val) {
      this.modal2 = val
    }
  },
  methods: {
    // 全选
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.checkboxSelect = ['选择题', '多选题', '填空题', '解答题']
      } else {
        this.checkboxSelect = []
      }
    },
    // 单选
    checkAllGroupChange (data) {
      if (data.length === 4) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
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
    .context {
        text-align: left;

        > div {
            padding: 20px 10px;
            border-bottom: 1px dashed #ddd;

            h4 {
                margin-bottom: 10px;
            }
        }

        > div:last-child {
            border-bottom: none;
        }
    }
</style>
