<comment>
# 学科进度编辑操作
</comment>
<template>
    <div class="base-popup-editor">
        <Modal
                v-model="modal6"
                :title="title"
                :width="width"
                @on-cancel="$emit('asyncCancel')"
                @on-ok="$emit('asyncOK')">
            <p>{{ titleContent }}</p>
            <slot name="default"></slot>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'base-popup-editor',
  components: {},
  data () {
    return {
      modal6: this.modal
    }
  },
  props: {
    modal: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    titleContent: {
      type: String,
      required: true
    },
    width: {
      type: String
    }
  },
  watch: {
    modal (val) {
      // 监听开关状态，防止直接操纵父级 prop
      this.modal6 = val
    },
    title (val) {
      // console.log(val)
    }
  },
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
</style>
