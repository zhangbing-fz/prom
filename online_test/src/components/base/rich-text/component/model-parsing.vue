<comment>
    # 解析
</comment>
<template>
    <Modal
            @on-cancel="cancel"
            @on-ok="ok"
            class="model-parsing"
            title="解析"
            width="800"
            v-model="modal2"
            v-if="parsing"
    >
        <p
                v-for="(item,index) in parsing.data"
           :key="index"
        >
            <Row>
                <Col span="24"><h4>{{++parsing.index}}）、{{item.source}}---{{item.qtpye}}</h4></Col>
            </Row>

            <Row>
                <Col span="24">
                    <span v-html="item.answer1"></span>
                </Col>
            </Row>
            <br>

            <Row>
                <Col span="24">
                    <span v-html="item.answer2"></span>
                </Col>
            </Row>
            <br>

            <Row>
                <Col span="24">
                    <span v-html="item.parse"></span>
                </Col>
            </Row>
            <br>

            <Row>
                <Col span="24">
                    <span v-html="item.title"></span>
                </Col>
            </Row>
<!--            <Row>
                <Col span="4">【知识点】</Col>
                <Col span="20">
                    <span class="dot-span" v-for="(ele,i) in item.knowledges" :key="i">{{ele | knowledgeFilter}}</span>
                </Col>
            </Row>-->
<!--            <Row>
                <Col span="4">【教材】</Col>
                <Col span="20">
                    <span class="dot-span"></span>
                </Col>
            </Row>
            <Row>
                <Col span="4">【题型】</Col>
                <Col span="20">{{item.type | typeFilter}}题
                </Col>
            </Row>-->
        </p>
    </Modal>
</template>

<script>

export default {
  name: 'model-parsing',
  components: {},
  filters: {
    chaptersFilter (val) {
      let str
      const ele = JSON.parse(localStorage.getItem('select_material'))
      ele.forEach(item => {
        if (item.id === val) {
          str = item.name
        }
      })
      return str
    },
    knowledgeFilter (val) {
      let str
      const ele = JSON.parse(localStorage.getItem('select_knowledge'))
      ele.forEach(item => {
        if (item.id === val) {
          str = item.name
        }
      })
      return str
    }
  },
  data () {
    return {
      modal2: false,
      parsing: null,
      editorListIndex: [] // 英文 26字母
    }
  },
  props: ['model2', 'parsingInfo'],
  watch: {
    model2 (val) {
      console.log(val)
      this.modal2 = val
    },
    parsingInfo (val) {
      console.log(val)
      this.parsing = val
    }
  },
  methods: {
    ok () {
      this.$Message.info('提交')
      this.modal2 = false
      this.$emit('change', false)
    },
    cancel () {
      this.$Message.info('取消')
      this.modal2 = false
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
    p{
        border-bottom: 1px dashed #ddd;padding: 10px 0; /* dashed */
    }
    p:nth-child(odd){
        background-color: #f8f8f9;
    }
    p:last-child{
        border-bottom: none;
    }
    .dot-span{
        border-radius: 3px;
        border: 1px solid #ddd;
        background-color: white;
        padding: 2px 5px;
        color: #999;
        margin-right: 10px;
        white-space: nowrap;
        line-height: 24px;
        font-size: 12px;
    }
</style>
