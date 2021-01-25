<comment>
# 添加附加规则弹窗
</comment>
<template>
    <div class="popup.vue">
        <Modal
                v-model="modal6"
                :loading="loading"
                :title="title"
                @on-ok="asyncOK"
        >
            <div>
                <div v-if="title==='客观题基础配置'">
                    <Row>
                        <Col span="12">是否使用附加规则</Col>
                        <Col span="12">
                            <i-switch v-model="content.extend_police" size="large">
                                <span slot="open">启用</span>
                                <span slot="close">关闭</span>
                            </i-switch>
                        </Col>
                    </Row>
                    <div
                            v-for="(item,index) in content.extend_polices"
                            :key="index"
                    >
                        <div :style="{
              marginTop: '10px',
              backgroundColor: '#f8f8f9',
              padding: '10px',
              border: '1px dashed #ddd'
            }">
                            <span>名称</span>
                            <span span="12">{{ item.name }}</span> |
                            <span span="12">标答</span>
                            <span span="12">{{ item.correct_choices }}</span> |
                            <span span="12">得分</span>
                            <span span="12">{{ item.max_score }}</span>
                        </div>
                    </div>
                    <Row class="content-list">
                        <Col span="12">标准答案</Col>
                        <Col span="12">
                            <Input
                                    v-model="content.correct_choices"
                                    placeholder="请输入最高分"
                                    size="small"
                                    style="width: 80px"
                                    type="text"
                            />
                        </Col>
                    </Row>
                    <Row class="content-list">
                        <Col span="12">最高分</Col>
                        <Col span="12">
                            <InputNumber v-model="content.max_score"
                                         :min="0"
                                         placeholder="请输入最高分"
                                         size="small"
                            />
                        </Col>
                    </Row>
                    <Row class="content-list">
                        <Col span="12">最低分</Col>
                        <Col span="12">
                            <InputNumber v-model="content.min_score"
                                         :min="0"
                                         placeholder="请输入最低分"
                                         size="small"
                            />
                        </Col>
                    </Row>
                </div>
                <div v-else-if="title==='添加附加规则'">
                    <Row class="content-list">
                        <Col span="12">名称</Col>
                        <Col span="12">
                            <Input v-model="submitInfo.name" placeholder="请输入名称" size="small" type="text"/>
                        </Col>
                    </Row>
                    <Row class="content-list">
                        <Col span="12">标准答案</Col>
                        <Col span="12">
                            <Input v-model="submitInfo.correct_choices" placeholder="请输入标准答案" size="small" type="text"/>
                        </Col>
                    </Row>
                    <Row class="content-list">
                        <Col span="12">得分</Col>
                        <Col span="12">
                            <InputNumber v-model="submitInfo.max_score" placeholder="请输入分数" size="small"
                                         style="width: 100%"/>
                        </Col>
                    </Row>
                </div>
                <div v-else-if="title==='删除附加规则'">

                    <div>
                        <RadioGroup
                                :style="{
                  width: '100%',
                }"
                                @on-change="removeId=$event"
                        >
                            <Radio
                                    v-for="(item,index) in content.extend_polices"
                                    :key="index"
                                    :label="item.id"
                                    :style="{
                      marginTop: '10px',
                      display: 'block',
                      backgroundColor: '#f8f8f9',
                      padding: '10px',
                      border: '1px dashed #ddd'
                    }"
                            >
                                <span>名称</span>
                                <span span="12">{{ item.name }}</span> |
                                <span span="12">标答</span>
                                <span span="12">{{ item.correct_choices }}</span> |
                                <span span="12">得分</span>
                                <span span="12">{{ item.max_score }}</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div v-else-if="title==='主观题基础配置'">
                    <div v-if="modalInfo.content.childs && modalInfo.content.childs.length">
                        <Row class="content-list">
                            <Col span="12">最高分</Col>
                            <Col span="12">
                                <InputNumber v-model="newMaxScore" disabled/>
                            </Col>
                        </Row>
                        <Row class="content-list">
                            <Col span="12">最低分</Col>
                            <Col span="12">
                                <InputNumber v-model="newMinScore" disabled/>
                            </Col>
                        </Row>
                        <h4 style="border-top: 1px dashed #ddd; line-height: 3; margin-top: 10px">主观题
                            {{ modalInfo.content.question_id }} 包含小题配置
                        </h4>
                        <global-table
                                :columnsTable="subDta.columnsDetails"
                                :dataTable="subDta.dataDetails"
                                :loading="subDta.loading"
                                :page_info="subDta.page_info"

                        />
                        <!--<div
                            v-for="(item,index) in modalInfo.content.childs"
                            :key="index"
                            :style="{
                              display: 'flex',
                              justifyContent: 'start',
                              alignItems: 'center',
                              lineHeight: 3,
                            }"
                        >
                          <span style="margin-left: 20px">{{ item.sub_question_id }})</span>
                          <span style="margin-left: 20px">最高分 <InputNumber size="small"  v-model="item.max_score" style="width: 50px" type="text"/></span>
                          <span style="margin-left: 20px">最低分 <InputNumber size="small"  v-model="item.min_score" style="width: 50px" type="text"/></span>
                          <span style="margin-left: 20px">步长<span
                              :style="{
                                color: 'red',
                                fontSize: '12px'
                            }"
                          >（点击增量）</span> <InputNumber size="small"  v-model="item.step" style="width: 50px" type="text"/></span>
                        </div>-->
                    </div>
                    <div v-else>
                        <Row class="content-list">
                            <Col span="12">最高分</Col>
                            <Col span="12">
                                <InputNumber v-model="content.max_score" placeholder="请输入最高分" size="small" type="text"/>
                            </Col>
                        </Row>
                        <Row class="content-list">
                            <Col span="12">最低分</Col>
                            <Col span="12">
                                <InputNumber v-model="content.min_score" placeholder="请输入最低分" size="small" type="text"/>
                            </Col>
                        </Row>
                        <Row class="content-list">
                            <Col span="12">步长</Col>
                            <Col span="12">
                                <InputNumber v-model="content.step" placeholder="请输入步长" size="small" type="text"/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'popup.vue',
  components: {},
  data () {
    return {
      modal6: false,
      loading: false,
      title: '',
      content: {
        extend_police: false
      },
      submitInfo: { // 添加附加项
        name: '',
        correct_choices: '',
        max_score: null
      },
      removeId: '', // 删除附加项
      subDta: {
        columnsDetails: [
          {
            title: '小题',
            key: 'sub_question_id',
            align: 'center',
            width: 80
          },
          {
            title: '最高分',
            key: 'max_score',
            align: 'center',
            render: (h, params) => {
              return h('InputNumber', {
                props: {
                  size: 'small',
                  value: params.row.max_score
                },
                on: {
                  input: (e) => {
                    this.content.childs[params.index].max_score = e
                  }
                }
              })
            }
          },
          {
            title: '最低分',
            key: 'min_score',
            align: 'center',
            render: (h, params) => {
              return h('InputNumber', {
                props: {
                  size: 'small',
                  value: params.row.min_score
                },
                on: {
                  input: (e) => {
                    this.content.childs[params.index].min_score = e
                  }
                }
              })
            }
          },
          {
            title: '步长',
            key: 'step',
            align: 'center',
            render: (h, params) => {
              return h('InputNumber', {
                props: {
                  size: 'small',
                  value: params.row.step
                },
                on: {
                  input: (e) => {
                    this.content.childs[params.index].step = e
                  }
                }
              })
            }
          }
        ],
        dataDetails: [],
        loading: true,
        page_info: {}
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
        console.log(val)
        this.modal6 = val.modal6
        this.title = val.title
        this.content = val.content
        this.subDta.dataDetails = val.content.childs
        this.subDta.loading = false
      },
      deep: true
      // immediate: true
    }
  },
  methods: {
    asyncOK () {
      if (this.title === '客观题基础配置') {
        const data = {
          entry: 'score_admin_api',
          id: this.modalInfo.content.id,
          service_name: 'basic_choice_config',
          correct_choices: this.modalInfo.content.correct_choices,
          extend_police: this.modalInfo.content.extend_police,
          min_score: this.modalInfo.content.min_score,
          max_score: this.modalInfo.content.max_score
        }
        this.getData('/scan_project/score_admin_api', data).then(res => {
          console.log(res)
          this.validation(res)
          this.$parent.getObjectiveData() // 渲染客观题
        })
      } else if (this.title === '添加附加规则') {
        const data = {
          entry: 'score_admin_api',
          id: this.modalInfo.content.id,
          service_name: 'add_extend_police',
          correct_choices: this.submitInfo.correct_choices.toLocaleUpperCase(),
          name: this.submitInfo.name.toLocaleUpperCase(),
          max_score: this.submitInfo.max_score
        }
        this.getData('/scan_project/score_admin_api', data).then(res => {
          console.log(res)
          this.validation(res)
          this.$parent.getObjectiveData() // 渲染客观题
          this.submitInfo.correct_choices = ''
          this.submitInfo.name = ''
          this.submitInfo.max_score = null
        })
      } else if (this.title === '删除附加规则') {
        console.log(this.removeId)
        const data = {
          entry: 'score_admin_api',
          id: this.removeId,
          service_name: 'delete_extend_police'
        }
        this.getData('/scan_project/score_admin_api', data).then(res => {
          console.log(res)
          this.validation(res)
          this.removeId = ''
          this.$parent.getObjectiveData() // 渲染客观题
        })
      } else if (this.title === '主观题基础配置') {
        const data = {
          entry: 'score_api',
          id: this.modalInfo.content.id, // 取自评或者评任意id
          service_name: 'basic_score_config',
          queue_policy: '',
          queue_limit: 0,
          step: 1,
          min_score: this.newMinScore,
          max_score: this.newMaxScore
        }
        this.getData('/scan_project/score_admin_api', data).then(res => {
          this.validation(res)
        })
      }
      this.$emit('changeMark', false)
    },
    asyncCancel () {
      this.$emit('changeMark', false)
      this.removeId = ''
      this.modalInfo.content.id = ''
      this.submitInfo.correct_choices = ''
      this.submitInfo.name = ''
      this.submitInfo.max_score = null
    }
  },
  computed: {
    newMaxScore () {
      let str = 0
      if (this.content.childs && this.content.childs.length) {
        this.content.childs.forEach(item => {
          str += item.max_score
        })
      } else {
        str = this.content.max_score
      }
      return str
    },
    newMinScore () {
      let str = 0
      if (this.content.childs && this.content.childs.length) {
        this.content.childs.forEach(item => {
          str += item.min_score
        })
      } else {
        str = this.content.min_score
      }
      return str
    }
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
.content-list {
    margin-top: 10px;
}
</style>
