<comment>
    # 组件注释
</comment>
<template>
    <div class="download-modal">
        <Modal
                v-model="modal1"
                title="下载"
                @on-ok="ok"
                @on-cancel="cancel"
        >
            <p>确定要下载当前试题？</p>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'download-modal',
  components: {},
  data () {
    return {
      modal1: this.modal.mark
    }
  },
  props: {
    modal: {
      type: Object
    }
  },
  watch: {
    modal: {
      handler (val) {
        this.modal1 = val.mark
      },
      deep: true
    }
  },
  methods: {
    ok () {},
    cancel () {}
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
