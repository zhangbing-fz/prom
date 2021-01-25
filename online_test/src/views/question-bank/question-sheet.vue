<comment>
    # 组件注释
</comment>
<template>
    <div class="question-sheet">
        <div
                class="content"
                ref="refContent"
        >
            <div class="content-box">
                <!-- 页头 -->
                <div class="head">
                    <mark>
                        <span>↓↓↓</span>
                        第1张正面
                        <span>↓↓↓</span>
                    </mark>
                </div>
                <div class="foot">
                    <mark>
                        <span>↑↑↑</span>
                        第1张正面
                        <span>↑↑↑</span>
                    </mark>
                </div>
                <!-- 答题卡区域 -->
                <div
                        :style="{
                            width: newWidth,
                        }"
                        class="content-card"
                >

                    <div
                            class="content-card-box"
                            :style="{
                                width: newWidth,
                                height: newHeight
                            }"
                            ref="refContentCardBox1"
                    >
                        <div
                                class="content-context"
                                ref="refContentContext"
                        >

                            <!-- 标题 -->
                            <h1 class="title">主卷答题卡</h1>

                            <!-- 考生信息填写 -->
                            <div
                                    :style="{
                                        display: 'flex',
                                        flexFlow: newWarning[0],
                                        justifyContent: newWarning[1],
                                        alignItems: newWarning[2],
                                    }"
                            >

                                <!-- 学生信息、注意事项 -->
                                <div class="student-warning">

                                    <!-- 学生信息 -->
                                    <div class="student-info">
                                        <div>
                                            <span>学校：</span><span></span>
                                            <span>班级：</span><span></span>
                                        </div>
                                        <div>
                                            <span>姓名：</span><span></span>
                                            <span>考场号：</span><span></span>
                                        </div>
                                    </div>

                                    <!-- 注意事项 -->
                                    <div class="warning">
                                        <h3>注意事项</h3>
                                        <p>
                                            <small>1．答题前，考生先将姓名、准考证号等信息填写清楚。
                                            </small>
                                            <small>2．客观题必须使用2B铅笔填涂，修改时用橡皮擦干净。
                                            </small>
                                            <small>3．主观题答题，必须使用黑色签字笔书写。</small>
                                            <small>4．必须在题号对应的答题区域内作答，超出答题区域书写无效。</small>
                                            <small>5．保持答卷整洁。</small>
                                        </p>
                                        <p class="error">
                                            <small>6、填涂范例，正确填涂</small>
                                            <span></span>
                                            <small>错误填涂</small>
                                            <span> $  % </span>
                                        </p>
                                    </div>

                                </div>

                                <!-- 粘贴区域 -->
                                <div
                                        :style="{
                                               marginLeft:newWarning[3],
                                               marginTop: newWarning[4],
                                               width: `${toolInfo.width}mm`,
                                               height: `${toolInfo.height}mm`
                                         }"
                                        class="student-paste"
                                        v-if="newSize"
                                >
                                    <h3>条形码粘贴区域</h3>
                                    <small>请勿超出方框</small>
                                </div>

                                <!-- 准考证号码 -->
                                <div
                                        :style="{
                                           marginLeft:newWarning[3],
                                           marginTop: newWarning[4]
                                        }"
                                        class="student-fill"
                                        v-else
                                >
                                    <table
                                            :style="{
                                                width: `${7.5 * this.toolInfo.size}mm`
                                            }"
                                            border="1"
                                    >
                                        <tbody>
                                        <tr>
                                            <th :colspan="toolInfo.size">准考证号</th>
                                        </tr>
                                        <tr>
                                            <td
                                                    :key="index"
                                                    :style="{
                                                        width: '24px',
                                                        height: '24px'
                                                    }"
                                                    v-for="(item,index) in toolInfo.size"
                                            >
                                            </td>
                                        </tr>
                                        <tr
                                                :key="index"
                                                v-for="(item,index) in 10"
                                        >
                                            <td
                                                    :key="i"
                                                    v-for="(ele,i) in toolInfo.size"
                                            >
                                                <div>{{item-1}}</div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>

                        </div>

                        <!-- 试卷区域 -->
                        <div
                                class="content-questions"
                                ref="refContentQuestions1"
                                :style="{
                                    paddingTop: '20px'
                                }"
                        >
                            <!-- 小题题块 -->
                            <div class="subjective">
                                <h3>客观题答题区域</h3>
                                <ul>
                                    <!-- 客观题答题区域渲染 -->
                                    <li
                                            v-for="(item,index) in newObjectiveData"
                                            :key="index"
                                    >
                                        <div
                                                v-for="(ele,i) in item"
                                                :key="i"
                                        >
                                            <strong>{{ele.num}}</strong>
                                            <span
                                                    v-for="(val, num) in ele.questionArr"
                                                    :key="num"
                                            >{{val.slice(-1)}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="objective">
                                <h3>主观题答题区域</h3>
                                <ul>
                                    <li
                                            @click="subjectiveFill($event)"
                                            v-for="(item,index) in newSubjectiveData"
                                            :key="index"
                                    >
                                        <div>
                                            <strong>{{item.num}}:</strong>
                                            <p
                                                    v-html="item.title"
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div
                        >
                    </div>

                    <!-- 二维码 -->
                    <div
                            class="csode"
                            v-show="toolInfo.QrCsode"
                    />

                    <!-- 分页码 -->
                    <div
                            class="paging-code"
                            v-show="toolInfo.paging"
                    >1A
                    </div>

                    <!-- 分栏码 -->
                    <div
                            class="columns-code"
                            v-show="toolInfo.columns"
                    >1
                    </div>

                    <!-- 定位点 -->
                    <div
                            class="point"
                            ref="refPoint"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="content-box">
                <!-- 页头 -->
                <div class="head">
                    <mark>
                        <span>↓↓↓</span>
                        第1张正面
                        <span>↓↓↓</span>
                    </mark>
                </div>
                <div class="foot">
                    <mark>
                        <span>↑↑↑</span>
                        第1张正面
                        <span>↑↑↑</span>
                    </mark>
                </div>
                <div
                        :style="{
                            width: newWidth,
                        }"
                        class="content-card"
                >

                    <div
                            class="content-card-box"
                            :style="{
                                width: newWidth,
                                height: newHeight
                             }"
                            ref="refContentCardBox"
                    >

                        <!-- 试卷区域 -->
                        <div
                                class="content-questions"
                                ref="refContentQuestions"
                        >
                            <!-- 小题题块 -->
                            <div class="subjective">
                                <h3>客观题答题区域</h3>
                                <ul>
                                    <!-- 客观题答题区域渲染 -->
                                    <li
                                            v-for="(item,index) in newObjectiveData"
                                            :key="index"
                                    >
                                        <div v-for="(ele,i) in item"
                                             :key="i"
                                        >
                                            <strong>{{ele.num}}</strong>
                                            <span
                                                    v-for="(val, num) in ele.questionArr"
                                                    :key="num"
                                            >{{val.slice(-1)}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="objective">
                                <h3>主观题答题区域</h3>
                                <ul>
                                    <li
                                        @click="subjectiveFill($event)"
                                        v-for="(item,index) in newSubjectiveData"
                                        :key="index"
                                    >
                                        <div>
                                            <strong>{{item.num}}、</strong>
                                            <p
                                                v-html="item.title"
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div
                        >
                    </div>

                    <!-- 分页码 -->
                    <div
                            class="paging-code"
                            v-show="toolInfo.paging"
                    >1A
                    </div>

                    <!-- 分栏码 -->
                    <div
                            class="columns-code"
                            v-show="toolInfo.columns"
                    >2
                    </div>

                    <!-- 定位点 -->
                    <div class="point" ref="refPoint">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div
                    class="content-box"
                    v-if="toolInfo.column === '3栏'"
            >
                <!-- 页头 -->
                <div class="head">
                    <mark>
                        <span>↓↓↓</span>
                        第1张正面
                        <span>↓↓↓</span>
                    </mark>
                </div>
                <div class="foot">
                    <mark>
                        <span>↑↑↑</span>
                        第1张正面
                        <span>↑↑↑</span>
                    </mark>
                </div>
                <div
                        :style="{
                            width: newWidth,
                        }"
                        class="content-card"
                >

                    <div
                            class="content-card-box"
                            :style="{
                        width: newWidth,
                        height: newHeight
                     }"
                            ref="refContentCardBox"
                    >

                        <!-- 试卷区域 -->
                        <div
                                class="content-questions"
                                ref="refContentQuestions"
                        >
                            <!-- 小题题块 -->
                            <div class="subjective">
                                <h3>客观题答题区域</h3>
                                <ul>
                                    <!-- 客观题答题区域渲染 -->
                                    <li
                                            v-for="(item,index) in newObjectiveData"
                                            :key="index"
                                    >
                                        <div v-for="(ele,i) in item"
                                             :key="i"
                                        >
                                            <strong>{{ele.num}}</strong>
                                            <span
                                                    v-for="(val, num) in ele.questionArr"
                                                    :key="num"
                                            >{{val.slice(-1)}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="objective">
                                <h3>主观题答题区域</h3>
                                <ul>
                                    <li
                                            @click="subjectiveFill($event)"
                                            v-for="(item,index) in newSubjectiveData"
                                            :key="index"
                                    >
                                        <div>
                                            <strong>{{item.num}}、</strong>
                                            <p
                                                    v-html="item.title"
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div
                        >
                    </div>

                    <!-- 分页码 -->
                    <div
                            class="paging-code"
                            v-show="toolInfo.paging"
                    >1A
                    </div>

                    <!-- 分栏码 -->
                    <div
                            class="columns-code"
                            v-show="toolInfo.columns"
                    >3
                    </div>

                    <!-- 定位点 -->
                    <div class="point" ref="refPoint">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 右侧工具栏 -->
        <div class="tool">
            <Form>

                <h4>题卡规格</h4>
                <RadioGroup v-model="toolInfo.sheet">
                    <Radio label="A3"/>
                    <Radio
                            :style="{
                                marginLeft:'20px'
                            }"
                            label="A4"
                    />
                </RadioGroup>

                <FormItem>
                    <Checkbox v-model="toolInfo.singleAndDouble">
                        双面
                    </Checkbox>
                </FormItem>

                <h4 v-show="columnShow">分栏控制</h4>

                <RadioGroup
                        v-model="toolInfo.column"
                        v-show="columnShow"
                >
                    <Radio label="2栏"/>
                    <Radio
                            :style="{
                                marginLeft:'20px'
                            }"
                            label="3栏"
                    />
                </RadioGroup>

                <h4>标记设置</h4>
                <FormItem
                        :style="{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }"
                >
                    <span
                            :style="{
                                color: toolInfo.QrCsode ?'#3188f0':'',
                                fontWeight: toolInfo.QrCsode ?'bold':'normal',
                            }"
                    >二维码</span>
                    <i-switch
                            :style="{
                                marginLeft: '10px'
                            }"
                            size="large"
                            v-model="toolInfo.QrCsode"
                    >
                        <span slot="open">ON</span>
                        <span slot="close">OFF</span>
                    </i-switch>
                </FormItem>

                <FormItem>
                    <span
                            :style="{
                                color: toolInfo.paging ?'#3188f0':'',
                                fontWeight: toolInfo.paging ?'bold':'normal',
                            }"
                    >分页码</span>
                    <i-switch
                            :style="{
                                marginLeft: '10px'
                            }"
                            size="large"
                            v-model="toolInfo.paging"
                    >
                        <span slot="open">ON</span>
                        <span slot="close">OFF</span>
                    </i-switch>
                </FormItem>

                <FormItem>
                    <span
                            :style="{
                                color: toolInfo.columns ?'#3188f0':'',
                                fontWeight: toolInfo.columns ?'bold':'normal',
                            }"
                    >分栏码</span>
                    <i-switch
                            :style="{
                                marginLeft: '10px'
                            }"
                            size="large"
                            v-model="toolInfo.columns"
                    >
                        <span slot="open">ON</span>
                        <span slot="close">OFF</span>
                    </i-switch>
                </FormItem>

                <h4>考号设置</h4>

                <RadioGroup v-model="toolInfo.coding">
                    <Radio label="填涂"/>
                    <Radio
                            :style="{
                                marginLeft:'20px'
                            }"
                            label="条码"
                    />
                </RadioGroup>

                <FormItem
                        label="位长"
                        v-show="!newSize"
                >
                    <InputNumber
                            :active-change="false"
                            :max="10"
                            :min="1"
                            :style="{
                                width: '60px'
                            }"
                            v-model="toolInfo.size"
                    />
                </FormItem>

                <FormItem
                        label="宽度"
                        v-show="newSize"
                >
                    <InputNumber
                            :active-change="false"
                            :max="85"
                            :min="1"
                            :style="{
                                width: '60px'
                            }"
                            v-model="toolInfo.width"
                    />
                    mm
                </FormItem>

                <FormItem
                        label="高度"
                        v-show="newSize"
                >
                    <InputNumber
                            :active-change="false"
                            :max="55"
                            :min="1"
                            :style="{
                                width: '60px',
                            }"
                            v-model="toolInfo.height"
                    />
                    mm
                </FormItem>

                <h4>辅助显示</h4>
                <FormItem>
                    <span
                            :style="{
                                color: toolInfo.questionNumMark ?'#3188f0':'',
                                fontWeight: toolInfo.questionNumMark ?'bold':'normal',
                            }"
                    >题号</span>
                    <i-switch
                            :style="{
                                marginLeft: '10px'
                            }"
                            size="large"
                            v-model="toolInfo.questionNumMark"
                    >
                        <span slot="open">ON</span>
                        <span slot="close">OFF</span>
                    </i-switch>
                </FormItem>

                <h4>题卡编辑</h4>
                <FormItem>
                    <Checkbox v-model="toolInfo.subjoinQuestion">
                        包含附加卷
                    </Checkbox>
                </FormItem>
            </Form>

            <Button
                    disabled
                    :style="{
                        marginTop: '10px'
                    }"
                    type="primary"
            >
                <Icon type="md-add"/>
                新增题目
            </Button>
            <Button
                    :style="{
                        marginTop: '10px'
                    }"
                    type="primary"
            >
                <Icon type="md-transgender"/>
                生成模板
            </Button>
            <Button
                    :style="{
                        marginTop: '10px'
                    }"
                    disabled type="default"
            >
                <Icon type="md-download"/>
                下载主卷模板
            </Button>

            <Button @click="getBoundingRect">获取内容高度</Button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'question-sheet',
  components: {},
  data () {
    return {
      toolInfo: {
        sheet: 'A3', // 纸张规格
        singleAndDouble: true, // 单面还是双面
        column: '2栏', // 2栏还是3栏
        QrCsode: true, // 二维码
        paging: true, // 分页
        columns: true, // 分栏

        size: 8, // 位长
        coding: '条码', // 填涂或条码
        width: 75,
        height: 45,
        questionNumMark: true, // 题号是否显示
        subjoinQuestion: true // 附加卷
      },
      // 客观题数据
      objectiveData: [],
      // 主观题
      subjectiveData: []

    }
  },
  props: {},
  watch: {
    toolInfo: {
      handler () {
        if (this.toolInfo.sheet === 'A4') {
          this.toolInfo.column = '2栏'
        }
      },
      deep: true
    }
  },
  methods: {
    // 获取内容高度
    getBoundingRect () {
      const boxH = this.$refs.refContentCardBox1.offsetHeight
      const infoH = this.$refs.refContentContext.offsetHeight
      const carH = this.$refs.refContentQuestions1.offsetHeight
      console.log(boxH, infoH, carH)
      if (infoH && (infoH + carH) > boxH) {
        console.log('试卷内容超过了，需要截取', this.$refs.refContentQuestions1)
        this.$refs.refContentQuestions1.style.height = `${boxH - infoH - 60}px`
        this.$refs.refContentQuestions1.style.overflow = 'hidden'
      }
    },
    // 客观题数据源
    randomObjective () {
      const arr = JSON.parse(localStorage.getItem('shopping_cart_list'))
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].qtpye === '选择题' || arr[i].qtpye === '多选题' || arr[i].qtpye === '判断题') {
          this.objectiveData.push(arr[i])
        } else {
          this.subjectiveData.push(arr[i])
        }
      }
    },
    // 主观题可编辑操作
    subjectiveFill (e) {
      let ele = e.target
      while (ele.tagName !== 'LI') {
        ele = ele.parentNode
      }
      ele.contentEditable = true
    }
  },
  computed: {
    newSubjectiveData () {
      const data = this.subjectiveData
      data.forEach((item, i) => {
        item.num = i + 1
      })
      return data
    },
    newObjectiveData () {
      const data = this.objectiveData
      data.forEach((item, i) => {
        item.num = i + 1
        item.questionArr = []
        const ele = Object.entries(item)
        ele.forEach(el => {
          if (el[0].includes('option_')) {
            item.questionArr.push(el[0])
          }
        })
      })
      // eslint-disable-next-line no-unused-vars
      const arr = []
      const num = this.objectiveData.length % 5
      for (let i = 0; i <= num; i++) {
        arr[i] = data.splice(0, 5)
      }
      return arr
    },
    newWidth () {
      let num
      if (this.toolInfo.sheet === 'A3') {
        if (this.toolInfo.column === '2栏') {
          num = '210mm'
        } else if (this.toolInfo.column === '3栏') {
          num = '140mm'
        }
      } else if (this.toolInfo.sheet === 'A4') {
        num = '210mm'
      }
      return num
    },
    newHeight () {
      let num
      if (this.toolInfo.sheet === 'A3' || this.toolInfo.sheet === 'A4') {
        num = '297mm'
      }
      return num
    },
    columnShow () {
      let mark
      if (this.toolInfo.sheet === 'A3') {
        mark = true
      } else if (this.toolInfo.sheet === 'A4') {
        mark = false
      }
      return mark
    },
    newWarning () {
      let str
      if (this.toolInfo.column === '3栏') {
        str = ['column', 'center', 'center', '0', '20px']
      } else if (this.toolInfo.column === '2栏') {
        str = ['', 'flex-start', '', '20px', '0']
      }
      return str
    },
    newSize () {
      return this.toolInfo.coding === '条码'
    }
  },
  created () {
  },
  mounted () {
    this.randomObjective()
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>
    @magein-top: 20px;
    @magein-bottom: 20px;
    @magein-left: 20px;
    @magein-right: 20px;

    @magein-left40: 40px;
    @magein-top40: 40px;
    @magein-right40: 40px;

    @absoluteTop20: 20px;
    @absoluteRight20: 20px;
    @absoluteLeft20: 20px;
    @absoluteBottom20: 20px;

    @absoluteTop40: 40px;
    @absoluteRight40: 40px;
    @absoluteLeft40: 40px;
    @absoluteBottom40: 40px;

    @absoluteLeft30: 30px;

    @fontSize14: 14px;
    @fontSize20: 20px;
    @fontSize30: 30px;
    * {
        padding: 0;
        margin: 0;
    }

    .question-sheet {
        display: flex;

        .content {
            width: 100%;
            height: 100%;
            background-color: rgb(114, 118, 123);
            position: relative;

            .content-box{
                height: 100%;
                position: relative;
                overflow: hidden;
                .head,.foot{
                    z-index: 0;
                }
                .head {
                    top: 0;
                }

                .foot {
                    bottom: 0;
                }

                .head, .foot {
                    position: absolute;
                    height: 1px;
                    background-color: white;
                    margin: 24px 0;
                    width: 100%;

                    > mark {
                        padding: 0 20px;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%) translateY(-50%);

                        span {
                            letter-spacing: 4mm;
                            text-align: center;
                        }
                    }
                }

                .content-card {
                    color: black;
                    margin: 50px auto;
                    position: relative;
                    box-sizing: border-box;

                    .content-card-box{
                        height: inherit;
                        background-color: white;
                        box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
                    }
                    .content-context, .content-questions {
                        padding: 60px 30px;
                        margin-left: @magein-left40;
                        margin-right: @magein-right40;
                    }

                    .content-context {
                        padding-top: 40px;
                        padding-bottom: 0;
                        /*标题*/

                        .title {
                            font-weight: 400;
                            display: inline-block;
                        }

                        /*div*/

                        > div {
                            display: flex;
                            margin-top: @magein-top;
                            align-items: flex-end;

                            /*注意事项*/

                            .student-warning {
                                max-width: 366px;

                                /*考生信息栏*/

                                .student-info {
                                    display: flex;
                                    justify-content: flex-start;
                                    width: 350px;

                                    > div {
                                        width: 100%;
                                        text-align: left;

                                        span {
                                            display: inline-block;
                                        }

                                        span:nth-child(odd) {
                                            line-height: 1;
                                            width: 15mm;
                                            display: inline-block;
                                            text-align: justify;
                                            vertical-align: top;
                                        }

                                        span:nth-child(odd)::after {
                                            content: '';
                                            display: inline-block;
                                            padding-left: 100%;
                                        }

                                        span:nth-child(even) {
                                            width: 30mm;
                                            border-bottom: 1px solid black;
                                        }
                                    }
                                }

                                .warning {
                                    border: 1px solid black;
                                    padding: 10px;

                                    p {
                                        text-align: left;

                                        small {
                                            display: flex;
                                        }
                                    }

                                    .error {
                                        display: flex;
                                        justify-content: flex-start;
                                        align-items: center;

                                        small:nth-of-type(1) {
                                            margin-left: 0;
                                        }

                                        small {
                                            margin-left: @magein-left;
                                        }

                                        span {
                                            width: 5mm;
                                            height: 3mm;
                                            margin-left: 5px;
                                        }

                                        span:nth-of-type(1) {
                                            background-color: black;
                                        }

                                        span:nth-of-type(2) {
                                            width: 10mm;
                                            line-height: 3mm;
                                            font-family: "Block HX";
                                            font-size: 6mm;
                                            font-weight: bold;
                                        }

                                    }
                                }

                            }

                            /*粘贴区域*/

                            .student-paste {
                                border: 1px dashed rgb(140, 147, 157);
                                color: rgb(140, 147, 157);
                                display: flex;
                                flex-flow: column;
                                justify-content: space-between;

                                h3 {
                                    font-weight: bold;
                                }
                            }

                            /*准考证号填涂*/

                            .student-fill {
                                /*width: 250px;*/
                                table {
                                    width: 100%;
                                    border: 1px solid black;
                                    border-spacing: unset;

                                    tr:nth-of-type(2) {
                                        td {
                                            border: 1px solid black;
                                            border-left-width: 0;
                                            height: 18px;
                                            box-sizing: border-box;
                                        }

                                        td:last-of-type {
                                            border-right-width: 0;
                                        }
                                    }

                                    th {
                                        border: none;
                                    }

                                    td {
                                        border: none;
                                        padding: 0px;
                                        box-sizing: border-box;

                                        div {
                                            color: black;
                                            font-family: 'Block HX';
                                            font-size: 4mm;
                                            line-height: 1;
                                            font-weight: bold;
                                        }
                                    }
                                }
                            }
                        }

                    }

                    /*试卷内容区域*/

                    .content-questions {
                        .objective,.subjective{
                            text-align: left;
                            ul{
                                li{
                                    display: inline-block;
                                    padding: 2mm;
                                    vertical-align: top;
                                    >div{
                                        padding: 0;
                                        margin: 0;
                                        line-height: 1;

                                        strong{
                                            display: inline-block;
                                            text-align: center;
                                            width: 10mm;
                                        }
                                    }
                                }
                            }
                        }
                        /*客观题*/
                        .subjective {
                            ul{
                                border: 1px solid black;
                                li{
                                    div {
                                        span {
                                            width: 5mm;
                                            font-family: "Block HX";
                                            font-size: 5mm;
                                            font-weight: bold;
                                            margin-left: 2mm;
                                            text-align: center;
                                        }
                                    }
                                }
                            }
                        }

                        /*主观题*/
                        .objective{
                            margin-top: @magein-top;
                            ul{
                                display: flex;
                                flex-flow: column;
                                li{
                                    border: 1px solid black;
                                    border-bottom: none;
                                    >div{
                                        /*position: relative;*/
                                        strong{
                                            /*position: absolute;*/
                                            /*top: 1mm;*/
                                        }
                                        p{
                                            /*text-indent: 8mm;*/
                                            padding: 2mm;
                                            line-height: 1.5;
                                        }
                                    }
                                }
                                li:last-of-type{
                                    border-bottom: 1px solid black;
                                }
                            }
                        }

                        > div:last-of-type {
                            border-bottom: none;
                        }
                    }

                    /*分页码*/

                    .paging-code {
                        font-size: @fontSize20;
                        position: absolute;
                        left: @absoluteLeft30;
                        top: 10%;
                    }

                    /*分栏码*/

                    .columns-code {
                        position: absolute;
                        bottom: @absoluteBottom20;
                        font-size: @fontSize20;
                        left: 50%;
                    }

                    /*二维码*/

                    .csode {
                        position: absolute;
                        top: @absoluteTop20;
                        right: @absoluteRight40;
                        width: 68px;
                        height: 68px;
                        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAADC0lEQVR4Xu2bUZKDMAxD4f6H7g5s6YTU5skGptB6P5cQEkW2JUPHYRgew0F/j4c21TiO+ERrrva+5boyFz6sGTCtTNuFMOtXAaJupsfFOjUPOzpNlRXt/JHnK+t6MaQA+YerAJlAaHKaCUiE2kTZ7HV1Dd786v0zKwqQYWhTRAEyldZGIlwKEK9iLP+nZP91IfMTgNCpeXRtwbGUaESnXCqpFiDPo6VTXYC6HUME2/IaQjojkiNoLjJ3lIBvId09tqj5gkBUDhfLrjLJMiayICvRXRaQCAje2L05xAKHAKNqEt3XKf2QbJUpQDpjdQlAHtnUvMFFj8Z7234nLPVtF2MBssbEBISqAWmLSNK15Hrfo7CMHq0xUv1W+7EYQg8rQLr+wVcDsryGIH9BekCRxdTjiGiKTIJW9iD3VJXJLFA+FX7WWpQ9FCB9O3FJqkRXCqnpRFRDFpXTlm+i8LPynMSQAqRrOO8FhJiTvZ4xil71iyTglzDLhkx2wyS2ChDH6EWc8yEMsT6H2HvqnhyPJFOVsWQkoyLS7IcUIN3R/TQgVpUhQCIhQdSPzLU35Lx+yqrJXIB0n0MUIAcAokjgCL0taU7twoxppDnnxlSGIV8NCPVDMoaNEmkE0GwrMG3uCpDO3BUgjtulFqBSwymRUviRJqFQ9J5PbncVwvRexvqmI+oPtpo5R3uRrdah8ix8UVWAEO+F61nLnq0Mmea2xxZkiLD/tyG3BuSMn4dQrGaTo5V0CfzpHlKoK3NXgDjfumdCo79HLW+3YAjRinRKlJrUZKYDovWS5HeTqqVUaTGeDokssgDpuuq3AoRi/Ei3mqV2hMUE/mo/ZO62pPDcUGl+jUReZe/1DAieP3LLdQEStP8ZhkSEGYVfJHypEiqOXf4+JEK9AuSJlvqC2gNXNWmRw2nzHLFxHntGDlH8hZX5C5Cg8crks0MYEilvVHYtVUuKti/nBMRyPZu7Vmv8hHQvQJ5HQO1IzyN9hCGRMPHGKiff35ulOekTAhHdbgHyj8Apv6iKgHs1hvwBZelW+7NyaDcAAAAASUVORK5CYII=");
                    }

                    /*识别点*/

                    .point {
                        /*position: relative;*/

                        span {
                            background-color: black;
                            width: 5mm;
                            height: 3mm;
                        }

                        span:nth-child(1) {
                            position: absolute;
                            left: @absoluteLeft40;
                            top: @absoluteTop40;
                        }

                        span:nth-child(2) {
                            position: absolute;
                            left: @absoluteLeft40;
                            bottom: @absoluteBottom40;
                        }

                        span:nth-child(3) {
                            position: absolute;
                            right: @absoluteRight40;
                            bottom: @absoluteBottom40;
                        }
                    }
                }
            }

        }

        /*工具栏*/

        .tool {
            position: fixed;
            top: 0;
            right: 0;
            width: 180px;
            height: 100vh;
            padding: 10px;
            background-color: white;
            text-align: left;
            line-height: 2;
            display: flex;
            flex-direction: column;
            border-left: 1px solid #ddd;

            .ivu-form-item {
                margin-bottom: 0;
                width: 100%;
                display: flex;
            }

            h4 {
                border-top: 1px dashed #ddd;
                line-height: 2;
                margin: 10px 0 0 0;
            }

            h4:first-child {
                margin: 0;
                border-top: none;
            }

            h4::before {
                content: '';
                width: 148px;
                height: 1px;
                border-top: 1px dashed white;
                z-index: 99;
                position: absolute;
            }
        }
    }

    .ivu-input-number-handler-wrap {
        opacity: 1;
    }
</style>
