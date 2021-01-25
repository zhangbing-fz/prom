<comment>
    # 组件注释
</comment>
<template>
    <div class="popup-remove">
        <Modal
                v-model="modal2"
                @on-cancel="$emit('cancel',modal2)"
                @on-ok="$emit('ok',modal2)"
        >
            <p slot="header">
                <span>⚠️  提示</span>
            </p>
            <div class="context">
                {{context}}
            </div>
<!--            <p slot="footer"></p>-->
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'popup-remove',
  components: {},
  data () {
    return {
      modal2: false
    }
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    },
    context: {
      type: String
    }
  },
  watch: {
    modal (val) {
      this.modal2 = val
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
