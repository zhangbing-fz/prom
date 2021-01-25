<comment>
    # 纠错
</comment>
<template>
    <Modal
            @on-cancel="cancel"
            @on-ok="ok"
            class="model-error-correction"
            ok-text="提交"
            title="纠错"
            v-model="modal1"
    >
        <p>错误原因:</p>
        <p
                :style="{
                    margin: '20px 0'
                }"
        >
            <CheckboxGroup v-model="fruit">
                <Checkbox
                        :key="index"
                        :label="item"
                        v-for="(item,index) in errorInfo.checkbox"
                />
            </CheckboxGroup>
        </p>
        <p
                :style="{
                    margin: '20px 0'
                }"
        >
            <template>
                <Input
                        placeholder="Enter something..."
                        style="width: 100%"
                        type="textarea"
                        v-model="value"
                />
            </template>
        </p>
        <p
                :style="{
                    color: '#999',
                    fontSize: '12px'
                }"
        >试题编号：c896bda4-a28c-4e54-bdf5-57b334639c64</p>
    </Modal>
</template>

<script>

export default {
  name: 'model-error-correction',
  components: {},
  data () {
    return {
      errorInfo: {
        checkbox: [
          '题干错误',
          '答案错误',
          '解析错误',
          '知识点标注错',
          '误题型标注错误',
          '难度差异较大',
          '符号、公式、格式、图片等问题'
        ],
        expanded: ''
      },
      fruit: [],
      value: '',
      modal1: false
    }
  },
  props: ['model1'],
  watch: {
    model1 (val) {
      console.log(val)
      this.modal1 = val
    }

  },
  methods: {
    ok () {
      this.$Message.info('提交')
      this.modal1 = false
      this.$emit('change', false)
    },
    cancel () {
      this.$Message.info('取消')
      this.modal1 = false
      this.$emit('change', false)
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
