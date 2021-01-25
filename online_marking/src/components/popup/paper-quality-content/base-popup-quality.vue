<comment>
# 请选择题目弹窗
</comment>
<template>
    <div class="popup-popup-quality">
        <Modal
                v-model="modal6"
                :loading="loading"
                title="请选择题目"
                @on-cancel="$emit('asyncCancel')"
                @on-ok="$emit('asyncOK',button)"
        >
            <p>
                <Button
                        v-for="(item,index) in list"
                        :key="index"
                        :type="button.index === index? 'info': 'default'"
                        style="margin: 5px; width:calc(20% - 10px)"
                        @click="selectBtn(item,index)"
                >{{ item.name.name }}
                </Button>
            </p>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'popup-popup-quality',
  components: {},
  data () {
    return {
      button: {
        index: -1,
        name: '',
        id: -1
      },
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
    list: {
      type: Array,
      required: true
    }
  },
  watch: {
    modal (val) {
      // 监听开关状态，防止直接操纵父级 prop
      this.modal6 = val
    }
  },
  methods: {
    selectBtn (item, index) {
      this.button = {
        index,
        name: item.name.name,
        id: item.name.id
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

<style scoped>
</style>
