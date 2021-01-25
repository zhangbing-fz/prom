<comment>
# 内容过界 / 答错位置 / 其他疑问
</comment>
<template>
    <div class="base-popup-error">
        <Modal
                v-model="modal6"
                :loading="loading"
                :title="title"
                :width="width"
                @on-cancel="$emit('asyncCancel')"
                @on-ok="$emit('asyncOK')"
        >
            <p>{{ titleContent }}</p>
            <slot name="default"></slot>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'base-popup-error',
  components: {},
  data () {
    return {
      modal6: this.modal
    }
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
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
