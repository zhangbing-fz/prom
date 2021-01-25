<comment>
# 导出模板/导出老师信息
</comment>
<template>
    <div class="popup-export">
        <Modal
                v-model="modal"
                :title="propTitle"
                @on-ok="ok"
                @on-cancel="cancel"
        >
            <p>{{ propTitle | propTitleFilter }}</p>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'popup-export',
  components: {},
  data () {
    return {
      modal: this.propModal,
      uploadData: {} // 入参
    }
  },
  props: {
    propModal: {
      type: Boolean,
      required: true
    },
    propUploadData: {
      type: Object,
      required: true
    },
    propTitle: {
      type: String,
      required: true
    }
  },
  filters: {
    propTitleFilter (val) {
      if (val === '导出模板') {
        return '确定导出模板？'
      } else {
        return '确定导出老师信息？'
      }
    }
  },
  watch: {
    propModal (val) {
      this.modal = val
    },
    propUploadData: {
      handler (val) {
        this.uploadData = val
      },
      deep: true
    }
  },
  methods: {
    ok () {
      this.$emit('onOk', this.modal)
      this.uploadData.id = JSON.parse(localStorage.getItem('test_info')).id
      this.$fetch('/scan_project/score_admin_api', this.uploadData, 'post', 'fetch')
        .then(response => response.blob())
        .then(res => {
          console.log(res)
          // let blob = new Blob([res.data], {type: 'application/x-excel'})
          const downloadElemnt = document.createElement('a')
          downloadElemnt.href = window.URL.createObjectURL(res)
          downloadElemnt.download = 'temp.xlsx'
          document.body.appendChild(downloadElemnt)
          downloadElemnt.click()
          document.body.removeChild(downloadElemnt)
        })
      this.id = ''
    },
    cancel () {
      this.$emit('onCancel', this.modal)
      this.id = ''
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
