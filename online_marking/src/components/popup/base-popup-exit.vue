<comment>
# 弹窗退出
</comment>
<template>
    <div class="popup-exit">
        <Modal
                v-model="modal6"
                :loading="loading"
                title="退出"
                @on-ok="$emit('asyncOK')"
                @on-cancel="$emit('asyncCancel')"
        >
            <p>您确定要退出当前账号？</p>
            <p>点击确定, 将在1秒钟后自动关闭窗口</p>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'base-popup-exit',
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
    }
  },
  watch: {
    modal (val) {
      // 监听开关状态，防止直接操纵父级 prop
      this.modal6 = val
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
