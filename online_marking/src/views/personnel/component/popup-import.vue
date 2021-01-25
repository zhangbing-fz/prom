<comment>
# 导入老师模板
</comment>
<template>
    <div class="popup-import">
        <Modal
                v-model="modal"
                :title="propTitle"
                @on-ok="ok"
                @on-cancel="cancel"
        >
            <p style="display: flex; justify-content: space-between; line-height: 3; align-items: center">
                请选择导入方式:
                <Select
                        v-model="reset"
                        style="width: 150px"
                >
                    <Option value="Y">全量导入</Option>
                    <Option value="N">增量覆盖导入</Option>
                </Select>
            </p>
            <p>
                <Upload
                        ref="upload"
                        :data="uploadData"
                        :format="['xlsx','xls']"
                        :on-error="handleError"
                        :on-format-error="handleFormatError"
                        :on-success="handleSuccess"
                        :show-upload-list="true"
                        action="/gdy/scan_project/score_admin_api"
                        name="file"
                >
                    <Button size="small">上传老师数据</Button>
                </Upload>
            </p>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'popup-import',
  components: {},
  data () {
    return {
      modal: this.propModal,
      uploadData: {}, // 入参
      reset: 'Y'
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
  watch: {
    propModal (val) {
      this.modal = val
    },
    propUploadData: {
      handler (val) {
        console.log(val)
        this.uploadData = val
        this.uploadData.id = this.question_ID
        this.uploadData.reset = this.reset
      },
      deep: true,
      immediate: true
    },
    reset (val) {
      this.uploadData.reset = val
    }

  },
  methods: {
    ok () {
      this.$emit('onOk', this.modal)
      this.$refs.upload.clearFiles()
    },
    cancel () {
      this.$emit('onCancel', this.modal)
      this.$refs.upload.clearFiles()
      this.id = ''
    },
    /**
         *
         *
         * @date: 2020/12/3 11:36
         * @description: 导入文件
         * @param {*} type
         * @param {*} event
         * @returns
         * @memberof No such property: code for class: Script1
         */
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc:
                        '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
      })
    },
    handleSuccess (res, file) {
      if (res.errcode === 0) {
        this.dialoLead = false
        this.$Message.success('数据导入成功！')
        this._getBookList()
        this.$refs.upload.clearFiles()
      }
    },
    // eslint-disable-next-line handle-callback-err
    handleError (error, file) {
      this.$Message.error('数据导入失败！')
    }
  },
  computed: {
    ...mapState({
      question_ID: state => state.scoreinfo.question_ID // 考试id
    })
  },
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
