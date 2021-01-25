<comment>
# 组件注释
</comment>
<template>
    <div class="cumulative-popup">
        <Modal
                v-model="modal6"
                :loading="loading"
                :title="title"
                @on-ok="asyncOK"
        >
            <div class="content">
                <div
                        v-for="(item,index) in content.queue_statistics"
                        :key="index"
                        class="content-list"
                >
                    <Row>
                        <Col span="6">题号：</Col>
                        <Col span="18">{{ item.sub_type + item.question_id }}</Col>
                    </Row>
                    <Row>
                        <Col span="6">题目总数：</Col>
                        <Col span="18">{{ item.count_all }}</Col>
                    </Row>
                    <Row>
                        <Col span="6">已完成：</Col>
                        <Col span="18">{{ item.count_ready }}</Col>
                    </Row>
                </div>
                <Row>
                    <Col span="6">总人数：</Col>
                    <Col span="18"> {{ content.student_count_all }}</Col>
                </Row>
                <Row>
                    <Col span="6">已交卷人数：</Col>
                    <Col span="18">{{ content.student_count_ready }}</Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'cumulative-popup',
  components: {},
  data () {
    return {
      modal6: false,
      loading: false,
      title: '',
      queData: null,
      content: {
        queue_statistics: []
      }
    }
  },
  props: {
    modalInfo: {
      type: Object,
      required: true
    }
  },
  watch: {
    modalInfo: {
      handler (val) {
        // console.log(val)
        this.modal6 = val.modal6
        this.title = val.title
        this.content = val.content
        this.queData = val.data
      },
      deep: true
      // immediate: true
    }
  },
  methods: {
    asyncOK () {
      this.queData.pre_check = false

      this.$fetch('/scan_project/score_admin_api', this.queData, 'post', 'fetch')
        .then(response => response.blob())
        .then(res => {
          // console.log(res)
          const downloadElement = document.createElement('a')
          downloadElement.href = window.URL.createObjectURL(res)
          downloadElement.download = 'temp.xlsx'
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
        })
      this.$emit('changeMark', false)
    },
    asyncCancel () {
      this.$emit('changeMark', false)
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
ul, li {
    list-style: none;
}

.content {
    div.content-list {
        background-color: #e9e9e9;
        border-bottom: 1px dashed #ddd;
    }

    div.ivu-row {
        padding-left: 10px;
        display: flex;
        justify-content: space-between;
        line-height: 2;
    }
}
</style>
