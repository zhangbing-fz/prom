<comment>
# 报表
</comment>
<template>
    <div class="index">
        <global-header-admin/>
        <div class="layout" style="border: none; z-index: 99; height: 100vh">
            <Sider
                    :style="{
                        position: 'absolute',
                        height: '100vh',
                        left: 0,
                        overflow: 'auto',
                        background: '#fff',
                        borderRight: '1px solid #ddd'
                    }"
            >
                <Menu
                        :open-names="[1]"
                        active-name="1-2"
                        theme="light"
                        width="auto"
                >
                    <div
                            v-for="(item,index) in menu_info.list"
                            :key="index"
                    >
                        <Submenu
                                v-if="item.has_child"
                                :name="item.id"

                        >
                            <template slot="title">
                                {{ item.name }}
                            </template>
                            <MenuItem
                                    v-for="(ele,i) in item.childs"
                                      :key="i"
                                      :name="item.id+'-'+i"
                                      @click.native="getReportData(ele)"
                            >{{ ele.name }}
                            </MenuItem>
                        </Submenu>
                        <MenuItem
                                v-else
                                :name="item.id"
                                @click.native="getReportData(item)"
                        >{{ item.name }}
                        </MenuItem>
                    </div>

                </Menu>
            </Sider>
            <Layout :style="{marginLeft: '200px'}">
                <Content :style="{padding: '10px'}">
                    <Row
                            v-if="search_info.length"
                            :style="{
                                backgroundColor: 'white',
                                padding: '16px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                marginBottom: '20px',
                         }"
                    >
                        <Col span="5">
                            <Form
                                    :label-width="80"
                                    style="background-color: #eee; border-radius: 3px"
                            >
                                <FormItem
                                        :label="search_info[0].title+'：'"
                                        style="margin-bottom: 0"
                                >
                                    <Input
                                            v-model="search_info_form.form"
                                            placeholder="请输入要查询的关键字..."
                                    />
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="1" style="display: flex; align-items: center; justify-content: center; height: 35px">
                            |
                        </Col>
                        <Col span="6">
                            <Form :label-width="80" style="background-color: #eee; border-radius: 3px">
                                <FormItem
                                        :label="search_info[1].title+'：'"
                                        style="margin-bottom: 0"
                                >
                                    <RadioGroup v-model="search_info_form.radio">
                                        <Radio
                                                v-for="(item,index) in search_info[1].choices"
                                                :key="index"
                                                :label="item"
                                        >
                                            {{ item }}
                                        </Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="1" style="display: flex; align-items: center; justify-content: center; height: 35px">
                            |
                        </Col>
                        <Col span="4">
                            <Form :label-width="80" style="background-color: #eee; border-radius: 3px">
                                <FormItem
                                        :label="search_info[2].title+'：'"
                                        style="margin-bottom: 0">
                                    <Select v-model="search_info_form.select">
                                        <Option
                                                v-for="(item,index) in search_info[2].choices"
                                                :key="index"
                                                :value="item"
                                        >
                                            {{ item }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="1" style="display: flex; align-items: center; justify-content: center; height: 35px">
                            |
                        </Col>
                        <Col span="6">
                            <Form
                                    :label-width="80"
                                    style="background-color: #eee; border-radius: 3px">
                                <FormItem
                                        :label="search_info[3].title+'：'"
                                        style="margin-bottom: 0"
                                >
                                    <CheckboxGroup v-model="search_info_form.checkbox">
                                        <Checkbox
                                                v-for="(item,index) in search_info[3].choices"
                                                :key="index"
                                                :label="item"
                                                :value="item"
                                        >
                                            {{ item }}
                                        </Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="24" style="text-align: left; margin-top: 10px">
                            <Button type="primary">搜索</Button>
                        </Col>
                    </Row>
                    <Card>
                        <div style="height: 600px; overflow-y: scroll">
                            <!-- @setEchartData="setData"-->
                            <global-table
                                    :columnsTable="columnsTable"
                                    :dataTable="dataTable"
                                    :loading="loading"
                                    :page_info="page_info"
                                    :spanMethod="handleSpan"
                            />
                        </div>
                    </Card>
                </Content>
            </Layout>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {
      page_info: { // 分页信息
        total: 0,
        page_num: 1,
        page_size: 15
      },
      columnsTable: [],
      dataTable: [],
      configTable: [],
      loading: true,
      search_info: [], // 筛选条件
      search_info_form: {
        radio: '选项1',
        checkbox: ['选项1', '选项2'],
        select: '选项1',
        form: ''
      },
      menu_info: {
        list: []
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    // 判断是否合并
    handleSpan ({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      // console.log(rowIndex, '当前行索引', columnIndex, '当前列索引')
      // console.log(row, '当前行', column, '当前列')
      if (this.configTable.length) {
        // 写死方法
        /* if (rowIndex === 0 && columnIndex === 0) {
                                          return [2, 1]
                                        } else if (rowIndex === 1 && columnIndex === 0) {
                                          return [0, 0]
                                        }

                                        if (rowIndex === 2 && columnIndex === 1) {
                                          return [1, 4]
                                        } else if (rowIndex === 2 && columnIndex === 2) {
                                          return [0, 0]
                                        } else if (rowIndex === 2 && columnIndex === 3) {
                                          return [0, 0]
                                        } else if (rowIndex === 2 && columnIndex === 4) {
                                          return [0, 0]
                                        }

                                        if (rowIndex === 4 && columnIndex === 2) {
                                          return [2, 2]
                                        } else if (rowIndex === 4 && columnIndex === 3) {
                                          return [0, 0]
                                        } else if (rowIndex === 5 && columnIndex === 2) {
                                          return [0, 0]
                                        } else if (rowIndex === 5 && columnIndex === 3) {
                                          return [0, 0]
                                        }

                                        if (rowIndex === 1 && columnIndex === 1) {
                                          return [2, 3]
                                        } else if (rowIndex === 1 && columnIndex === 2) {
                                          return [0, 0]
                                        } else if (rowIndex === 1 && columnIndex === 3) {
                                          return [0, 0]
                                        } else if (rowIndex === 2 && columnIndex === 1) {
                                          return [0, 0]
                                        } else if (rowIndex === 2 && columnIndex === 2) {
                                          return [0, 0]
                                        } else if (rowIndex === 2 && columnIndex === 3) {
                                          return [0, 0]
                                        } */

        // 循环遍历
        for (let i = 0, len = this.configTable.length; i < len; i++) {
          if (rowIndex === this.configTable[i].row_index && columnIndex === this.configTable[i].col_index) {
            return [this.configTable[i].row_span, this.configTable[i].col_span]
          }
          for (let j = 0; j < this.configTable[i].row_span; j++) {
            if (rowIndex === (this.configTable[i].row_index + j) && columnIndex === this.configTable[i].col_index) {
              return [0, 0]
            }
          }
          for (let k = 0; k < this.configTable[i].col_span; k++) {
            if (rowIndex === this.configTable[i].row_index && columnIndex === (this.configTable[i].col_index + k)) {
              return [0, 0]
            }
          }
        }
      }
    },
    // 获取报表数据
    getReportData (val) {
      this.loading = true
      const data = {
        entry: 'report_api',
        service_name: 'report_init',
        id: val.id
      }
      this.getData('/scan_project/report_api', data)
        .then(res => {
          console.log(res, res.result_info.table_span_config)
          this.configTable = res.result_info.table_span_config
          this.search_info = res.result_info.querys
          this.columnsTable = res.result_info.headers
          this.columnsTable.forEach(item => {
            item.align = 'center'
            if (item.childs) {
              item.children = item.childs
              item.children.forEach(ele => {
                ele.align = 'center'
              })
            }
          })
          this.dataTable = res.result_info.table_data
          this.loading = false
        })
        .catch(err => console.log(err))
    },
    // 初始化 menu
    getMenu () {
      const data = {
        entry: 'report_api',
        service_name: 'menu_init'
      }
      this.getData('/scan_project/report_api', data)
        .then(res => {
          console.log(res)
          this.validation(res)
          this.menu_info.list = res.result_info
        })
        .catch(err => console.log(err))
    }
  },
  computed: {},
  created () {
    this.getMenu()
  },
  mounted () {
    this.getReportData({ id: 4 })
  },
  destroyed () {
  }
}
</script>
<style>
.ivu-form-item-label {
    font-size: 18px;
    font-weight: bold;
}
</style>
<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}
</style>
