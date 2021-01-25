<comment>
# 终极画布
</comment>
<template>
    <div ref="wrap" class="global-canvas">
        <div
                class="canvas"
                style="position: relative"
                @mouseenter="setBtnBlock(index)"
                @mouseleave="setBtnNone"
        >
            <div id="wrap" style="position: absolute; z-index: 100"></div>
            <Button
                    ref="allQuestions"
                    :style="{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 0,
                      transform: 'translateY(-20px) scale(1.2)',
                      opacity: 0
                    }"
                    icon="md-globe"
                    type="warning"
                    @click="getAllQuestions(index)"
            >
                全卷
            </Button>
            <canvas :id="'myCanvasMark'+index"
                    :ref="'myCanvasMark'+index"
                    style="position: absolute; display: none"
                    @mousedown.capture="selectTool($event)"
            >
            </canvas>
            <canvas :id="'myCanvas'+index"
                    :ref="'myCanvas'+index"
                    @mousedown.capture="selectTool($event)"
            >当前浏览器版本不支持canvas，请下载最新版本
            </canvas>
            <!--<div><input :id="'file'+index" multiple type="file"></div>-->

            <!-- 模拟滚动条 -->
        </div>
        <div ref="scrollr" class="scroll_r"><i></i></div>
        <div ref="scrollb" class="scroll_b"><i></i></div>

        <!-- 文字标注框 -->
        <textarea
                ref="fontModel"
                v-model="value6"
                class="font-model"
                placeholder="请输入文字..."
                type="textarea"
        />
    </div>
</template>

<script>
import { bus } from '@/main.js'
import { mapState, mapMutations } from 'vuex'
import dagou from '../../assets/svg/dagou.svg'
import bandui from '../../assets/svg/bandui.svg'
import dacha from '../../assets/svg/dacha.svg'
// eslint-disable-next-line no-unused-vars
import { ref, reactive } from '@vue/composition-api'

export default {
  name: 'global-canvas',
  components: {},
  data () {
    return {
      URL: '/score_api',
      value6: '', // 文字标注内容
      modal1: false, // 清空画布弹框开关
      imgData: [], // 批阅坐标标记信息
      imgInfo: [],
      imgW: 0,
      imgH: 0, // 上传图片的宽高
      file: null, // 上传文件路径
      loadingStatus: false, // loading
      myCanvas: null, // 试卷层 canvas DOM
      myCanvasSave: [], // 备份的试卷层信息 canvas DOM
      myCanvasMark: null, // 批阅标注层 canvas DOM
      button: {
        barX: 0,
        barY: 0,
        barW: 0,
        barH: 0,
        title: '图像移动'
      },
      oldIndex: 0, // 点击选中的图案 index
      oldIndexH: 0, // 点击选中的图案所对应的num间距
      num_score: 0, // 设置自定义属性对勾------------临时设置
      ID: 0, // 试卷id
      base64Imgs: [] // 接收父组件的数据
    }
  },
  props: {
    zoom: { // 缩放比例 / 变焦
      type: Number,
      default: 0
    },
    buttonInfo: {
      type: Object,
      required: true
    },
    isWidthHeight: {
      type: Object,
      required: true
    },
    index: { // canvas索引
      type: Number
    },
    dataInfo: { // 父组件传递的试题图像数据
      type: Object,
      required: true
    },
    numScore: {
      default: 0
    },
    oldPosition: {
      type: Object,
      validator (value) { // 验证器
        return typeof value
      }
    }
  },
  watch: {
    // 监听初始化的缩放比例以及canvas宽高
    oldPosition () {
      this.setWidthHeight()
    },
    isWidthHeight: { // 改变模式重新渲染画布
      handler () {
        this.setWidthHeight()
      },
      deep: true
    },
    zoom () { // 缩放重新渲染画布
      // console.log(val, '监听缩放比例')
      this.setWidthHeight()
    },
    dataInfo: {
      handler (val) {
        this.base64Imgs = val.result_info.base64_imgs
        this.hanleUpload() // 获取试卷图片
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['SET_SCOREINFO', 'SET_QUESTION_SCORE_TAG', 'SET_IMG_INFO']),
    /**
         * @功能: setBtnBlock
         * @date: 2020/9/4 11:16
         * @description: 控制鼠标移入的canvas，按钮和打分框的显示
         * @return:
         */
    setBtnBlock (i) {
      const ele = this.$refs.allQuestions.$el
      ele.style.transition = 'all 0.3s ease-in-out'
      ele.style.opacity = 1
      ele.style.zIndex = 99
      ele.style.transform = 'translateY(0) scale(1)'
    },
    /**
         * @功能: setBtnNone
         * @date: 2020/9/4 11:16
         * @description: 控制鼠标移入的canvas，按钮和打分框的隐藏
         * @return:
         */
    setBtnNone (i) {
      const ele = this.$refs.allQuestions.$el
      ele.style.opacity = 0
      ele.style.zIndex = 0
      ele.style.transform = 'translateY(-20px) scale(1.2)'
    },
    /**
         * @功能: getAllQuestions
         * @date: 2020/9/4 11:17
         * @description: 查看全卷
         * @return:
         */
    getAllQuestions (i) {
      const div = document.createElement('div')
      const can = document.createElement('canvas')
      const close = document.createElement('a')
      close.innerHTML = '<i class="ivu-icon ivu-icon-md-close" style="font-size: 32px;"></i>'
      close.style.cssText = 'position: fixed; right: 10px; top: 5px; z-index: 99; color: #999'
      can.style.cssText = 'position: absolute;'
      can.width = innerWidth - 45
      can.height = div.offsetHeight
      can.id = 'AllQuestions'
      close.className = 'closeAllQuestions'
      div.appendChild(close)
      div.appendChild(can)
      div.style.cssText = `
        position: absolute;
        z-index: 100; top:0;
        width:${innerWidth - 45}px; height: 100%;
        margin-left: 45px;
        overflow: scroll;
        background-color: white
      `
      const data = {
        entry: 'score_api',
        id: this.ID,
        service_name: 'query_queue_img'
      }
      this.getData('/scan_project/score_api', data)
        .then(res => {
          console.log('查看全卷res')
          this.validation(res)
          for (const value of res.result_info) {
            value.urls.forEach(item => {
              const img = document.createElement('img')
              img.classList.add('allImg')
              img.src = item
              // img.width = innerWidth - 45 // 设置全卷大小
              div.appendChild(img)
              setTimeout(() => {
                console.log(img.width)
              }, 1000)
            })
          }
          document.body.appendChild(div)
          document.getElementsByClassName('closeAllQuestions')[0].addEventListener('click', () => {
            document.body.removeChild(div)
          })
        })
        .catch(error => error)
    },

    // 事件分流
    selectTool (ev) {
      const oldImgInfo = this.$store.state._img_info_arr // 获取存储的canvas图案数组,监测所点击的像素点位置，是否存在与存储的图片数组
      const state = JSON.parse(localStorage.getItem('question_score_state'))
      if (state.result_code !== '00') {
        this.$Modal.warning(state.result_info)
        return
      }
      const canvas = this.$refs[`myCanvas${this.index}`] // 获取 canvas 试卷层
      const canvasMark = this.$refs[`myCanvasMark${this.index}`]// 获取 canvas 标注层
      this.myCanvas = canvas.getContext('2d') // 获取 canvas元素 的渲染上下文
      this.myCanvasMark = canvasMark.getContext('2d') // 获取 canvas元素 的渲染上下文
      const fontBox = this.$refs.fontModel
      this.myCanvasMark.canvas.ontouchstart = null
      this.myCanvasMark.canvas.ontouchmove = null
      this.myCanvasMark.canvas.ontouchend = null
      this.myCanvasMark.canvas.onmousedown = null
      this.myCanvasMark.canvas.onmouseup = null
      if (!Number.isInteger(this.num_score)) {
        this.num_score.toFixed(1)
      }
      const ele = document.querySelector('.canvas')
      let num = 0 // 试题图像数组的间隔
      oldImgInfo.forEach((item, index) => {
        // 限制标记范围
        /*        let x = Math.min(item.width, ev.offsetX)
                        x = Math.max(0, x)
                        let y = Math.min(item.height, ev.offsetY)
                        y = Math.max(0, y)
                        console.log('x:' + x, 'y:' + y, '高：' + num, item.width, item.height) */
        const ctx = ev.target.getContext('2d')
        ctx.strokeStyle = 'rgba(0,0,0,0)'
        ctx.rect(0, num, item.width, item.height)
        ctx.stroke()
        if (ctx.isPointInPath(ev.offsetX, ev.offsetY) && ev.offsetY <= num + item.height && ev.offsetY >= num) {
          console.log(item, index)
          this.oldIndex = index
          this.oldIndexH = num
        }
        num += item.height
      })
      switch (this.buttonInfo.title) {
        case '图像移动': {
          fontBox.style.display = 'none'
          const mouseTop = ev.clientY
          const mouseLeft = ev.clientX
          const startT = ele.offsetTop // 获取 对象的初始top 和left
          const startL = ele.offsetLeft
          ele.onmousemove = (e) => {
            const valueTop = startT + (e.clientY - mouseTop)
            const valueLeft = startL + (e.clientX - mouseLeft)
            ele.style.top = valueTop + 'px'
            ele.style.left = valueLeft + 'px'
            this.setScorrlStyle(ele.offsetWidth, ele.offsetHeight, ele.style.left, ele.style.top)
          }
        }
          break

        case '添加对勾标注':
          this.num_score += this.numScore
          if (this.num_score === this.score) { // 持续标分，大于等于目标分数时，自动提交分数
            this.$Message.success('自动提交')
            bus.$emit('change', this.num_score, this.imgData) // 标记数分数等于最大分数
          }
          console.log(this.num_score, this.imgData)
          bus.$emit('change', this.num_score, this.imgData)
          fontBox.style.display = 'none'
          this.imgData.push(this.setDOM(ev, '对勾标注', dagou, this.oldIndex, this.oldIndexH))
          break

        case '添加半对标注':
          // 判断是否选中的是 添加半对标注
          bus.$emit('change', this.num_score, this.imgData)
          fontBox.style.display = 'none'
          this.imgData.push(this.setDOM(ev, '半对标注', bandui, this.oldIndex, this.oldIndexH))
          break

        case '添加错误标注':
          // 持续减分，小于等于 0时，自动提交
          this.num_score -= this.numScore
          if (this.num_score < 0) {
            this.num_score = 0
          }
          bus.$emit('change', this.num_score, this.imgData)
          fontBox.style.display = 'none'
          this.imgData.push(this.setDOM(ev, '错误标注', dacha, this.oldIndex, this.oldIndexH))
          break

        case '添加线条标注':
          bus.$emit('change', this.num_score, this.imgData)
          fontBox.style.display = 'none'
          this.imgData.push(this.setDOM(ev, '直线标注', '直线标注', this.oldIndex, this.oldIndexH))
          break

        case '添加高亮标注':
          bus.$emit('change', this.num_score, this.imgData)
          fontBox.style.display = 'none'
          this.imgData.push(this.setDOM(ev, '高亮标注', '高亮标注', this.oldIndex, this.oldIndexH))
          break

        case '添加文字标注':
          bus.$emit('change', this.num_score, this.imgData)
          fontBox.style.display = 'none'
          this.setDOM(ev, '文字标注', '文字标注', this.oldIndex, this.oldIndexH)
          break
      }

      document.onmouseup = () => {
        ele.onmousemove = null
      }
      document.oncontextmenu = () => {
        ele.onmousemove = null
      }
      this.SET_QUESTION_SCORE_TAG(this.imgData) // 存储当前试卷批阅标记
    },

    /**
         *
         *
         * @date: 2020/12/1 15:12
         * @description: 初始化试卷图像
         * @returns
         */
    hanleUpload () {
      this.imgData = []
      let num = 0// 清除上一的批阅
      let index = 0// 初始位置
      let promise
      // let allHeight = 0 // 图像列表的高度总和
      const imgInfoArr = []
      this.validation(this.dataInfo)
      this.myCanvas.clearRect(0, 0, this.myCanvas.canvas.width, this.myCanvas.canvas.height)
      this.myCanvas.font = '40px Microsoft Yahei'
      this.myCanvas.fillStyle = 'red'
      this.myCanvas.fillText(this.dataInfo.result_info, this.myCanvas.canvas.width / 2 - this.dataInfo.result_info.length * 20, 200)
      // 接口请求成功，图像数组[]为空时
      if (this.dataInfo.result_info.base64_imgs.length <= 0) {
        this.myCanvas.font = '40px Microsoft Yahei'
        this.myCanvas.fillStyle = 'blue'
        this.myCanvas.fillText('试题图片不存在，请刷新')
        return
      }

      this.myCanvas.clearRect(0, 0, this.myCanvas.canvas.width, this.myCanvas.canvas.height)
      this.myCanvasSave = [] // 每次存储图像信息前，先清空上一次阅卷的试题数组
      this.base64Imgs.forEach((item, i, arr) => {
        const that = this
        this.imgInfo[i] = new Image()
        this.imgInfo[i].src = this.base64Imgs[i].data
        this.ID = this.dataInfo.result_info.id
        promise = new Promise((resolve, reject) => {
          that.imgInfo[i].onload = () => {
            // allHeight += this.imgInfo[i].naturalHeight
            // console.log('第几张图片', index)
            return resolve(index++)
          }
        })
        promise.then(i => {
          // 防止图片加载不完全，启用定时器
          setTimeout(() => {
            // 执行图片 callback
            // eslint-disable-next-line no-unused-vars
            const { poorNumW, poorNumH, nw, nh } = that.setImgInfo(that.imgInfo[i], i)
            // 备份试卷 / 图片
            that.myCanvasSave.push(that.imgInfo[i])
            console.log(0, // poorNumW 居中
              Math.round(num),
              Math.round(nw),
              Math.round(nh))
            // 复制图片绘制信息
            // imgInfoArr.push(that.myCanvas.getImageData(0, num, nw, nh))
            that.myCanvas.beginPath() // 老师作画
            that.myCanvas.closePath() // 清除画布
            that.myCanvas.drawImage(
              that.imgInfo[i],
              0, // poorNumW 居中
              Math.round(num),
              Math.round(nw),
              Math.round(nh)
            )
            // 图片高度
            num += nh
            this.SET_IMG_INFO(imgInfoArr)
          }, 17)
        })
      })
      this.$emit('beginTime', new Date()) // 记录获取试卷时间
      console.log('开始时间', new Date())
    },

    /**
         *
         *
         * @date: 2020/12/2 10:44
         * @description: 确保图片完全显示/居中显示
         * @param {*} img 试卷imgbase64数组的item
         * @param {*} i 索引
         * @returns
         * @memberof No such property: code for class: Script1
         */
    setImgInfo (img, i) {
      // eslint-disable-next-line no-return-assign
      this.imgW = img.naturalWidth // 原始图片宽、高
      this.imgH = img.naturalHeight
      let nw
      let nh
      // 自动拉伸图片
      /*      if (this.imgW > this.imgH &&
                                this.myCanvas.canvas.width < this.myCanvas.canvas.height) {
                    nw = this.myCanvas.canvas.width
                    nh = this.imgH / this.imgW * nw
                  } else if (this.imgW < this.imgH &&
                                this.myCanvas.canvas.width > this.myCanvas.canvas.height) {
                    nh = this.myCanvas.canvas.height
                    nw = this.imgW / this.imgH * nh
                  } else {
                    nw = this.myCanvas.canvas.width
                    nh = this.imgH / this.imgW * nw
                  } */
      // 不拉伸图片/原图展示
      if (this.imgW > this.imgH &&
                    this.myCanvas.canvas.width < this.myCanvas.canvas.height) {
        nw = this.imgW
        nh = Math.trunc(this.imgH / this.imgW * nw)
      } else if (this.imgW < this.imgH &&
                    this.myCanvas.canvas.width > this.myCanvas.canvas.height) {
        nh = this.imgH
        nw = Math.trunc(this.imgW / this.imgH * nh)
      } else {
        nw = this.imgW
        nh = Math.trunc(this.imgH / this.imgW * nw)
      }
      const poorNumW = Math.trunc(this.isWidthHeight.w / 2 - nw / 2)
      const poorNumH = Math.trunc(this.isWidthHeight.h / 2 - nh / 2)
      console.log(nw * (this.equipment ? 0.93 : 0.7), nh * (this.equipment ? 0.93 : 0.7))
      console.log(nw, this.equipment, nh, '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
      return {
        nw: nw * (this.equipment ? 0.93 : 0.7), // 图像按比例缩放
        nh: nh * (this.equipment ? 0.93 : 0.7),
        poorNumW,
        poorNumH
      }
    },

    // 设置初始 canvas的宽高
    setWidthHeight () {
      const canvas = this.$refs[`myCanvas${this.index}`] // 获取 canvas 试卷层
      if (!canvas) return
      const canvasMark = this.$refs[`myCanvasMark${this.index}`]// 获取 canvas 标注层
      const ele = document.querySelector('.canvas')
      this.myCanvas = canvas.getContext('2d') // 获取 canvas元素 的渲染上下文
      this.myCanvasMark = canvasMark.getContext('2d') // 获取 canvas元素 的渲染上下文
      this.myCanvas.imageSmoothingEnabled = true
      this.myCanvasMark.imageSmoothingEnabled = true
      canvas.setAttribute('width', this.isWidthHeight.w)
      canvas.setAttribute('height', this.isWidthHeight.h)
      canvasMark.setAttribute('width', this.isWidthHeight.w)
      canvasMark.setAttribute('height', this.isWidthHeight.h)
      if (this.myCanvasSave.length > 0 && this.myCanvasSave[0].tagName === 'IMG') { // 判断是否存在试卷 / 图像
        let num = 0 // 初始位置
        for (let i = 0, len = this.myCanvasSave.length; i < len; i++) {
          // eslint-disable-next-line no-unused-vars
          const { poorNumW, poorNumH, nw, nh } = this.setImgInfo(this.myCanvasSave[i], i) // 执行图片 callback
          this.myCanvas.beginPath() // 老师作画
          this.myCanvas.closePath() // 清除画布
          this.myCanvas.drawImage(
            this.myCanvasSave[i],
            Math.round(0), // poorNumW 居中
            Math.round(num),
            Math.round(nw),
            Math.round(nh)
          )
          num += nh
        }
      }
      ele.style.transformOrigin = 'center'
      ele.style.transform = `scale(${1 + this.zoom / 100})` // 缩放
      ele.style.position = 'absolute'
      if (this.oldPosition.oldLeft) {
        ele.style.left = this.oldPosition.oldLeft + 'px'
        ele.style.top = this.oldPosition.oldTop + 'px'
      }
    },
    // 设置标注DOM节点
    setDOM (ev, name, svg, index, h) {
      // 监听是否开启持续标分模式
      const scoreMark = JSON.parse(localStorage.getItem('num_score')) // 持续标分分值/0为关闭/其他数值为开启
      const scoreInfo = JSON.parse(localStorage.getItem('score_info'))
      const maxScore = scoreInfo.max_score
      const minScore = scoreInfo.min_score
      const base64imgs = JSON.parse(localStorage.getItem('base64imgs_info'))
      console.log(base64imgs)

      // eslint-disable-next-line camelcase
      const page_num = base64imgs[index].page_num
      const side = base64imgs[index].side
      const x = base64imgs[index].x // 获取题块所属全卷坐标
      const y = base64imgs[index].y
      console.log(`x坐标：${x}--y坐标：${y}`, page_num, side)
      const boxDiv = document.createElement('div')
      const boxDivWrap = document.getElementById('wrap')
      // eslint-disable-next-line no-case-declarations
      // const oTip = document.createElement('div') //创建坐标框DOM
      boxDiv.className = 'wrapBox'
      boxDiv.style.position = 'absolute'
      boxDiv.style.top = ev.offsetY + 'px'
      boxDiv.style.left = ev.offsetX + 'px'
      boxDiv.style.display = 'flex'
      // x ,y 坐标框
      /* oTip.id = 'drawTip'
                    oTip.textContent = 'X: ' + ev.clientX + '  ' + 'Y: ' + ev.clientY
                    oTip.style.width = '100px' // 指定宽度
                    oTip.style.height = '28px' // 指定高度
                    oTip.style.textAlign = 'center'
                    oTip.style.fontSize = '14px'
                    oTip.style.fontFamily = 'PingFang SC'
                    oTip.style.fontWeight = 'normal'
                    oTip.style.lineHeight = '28px'
                    oTip.style.fontStretch = 'normal'
                    oTip.style.color = '#ffffff'
                    oTip.style.backgroundColor = 'pink'
                    oTip.style.letterSpacing = '0px'
                    oTip.style.border = '1px solid #0E1B27' // 设置边框
                    oTip.style.borderRadius = '15px'
                    oTip.style.position = 'absolute' // 为新创建的DIV指定绝对定位
                    oTip.style.left = 0 + 'px' // 指定创建的DIV在文档中距离左侧的位置
                    oTip.style.top = 50 + 'px' // 指定创建的DIV在文档中距离顶部的位置 */
      const close = document.createElement('div')
      const oDiv = document.createElement('div')
      if (name === '对勾标注' || name === '半对标注') {
        if (scoreMark < 0) {
          this.$Modal.warning({
            title: '提醒',
            content: '持续标分为负分，请用打叉工具标记'
          })
          return
        }
        const scoreIpt = document.createElement('input')
        oDiv.id = 'drawTask'
        close.className = 'close'
        close.innerText = 'X'
        close.dataset.index = this.imgData.length
        close.style.padding = '0px 6px'
        close.style.color = 'white'
        close.style.backgroundColor = 'black'
        close.style.height = '20px'
        close.style.cursor = 'pointer'
        close.style.display = 'none'
        scoreIpt.className = 'continuous-score'
        scoreIpt.type = 'number'
        scoreIpt.step = '0.5'
        scoreIpt.max = '10'
        scoreIpt.min = '0'
        scoreIpt.value = scoreMark || ''
        scoreIpt.style.fontSize = '14px'
        scoreIpt.style.border = 'none'
        scoreIpt.style.border = '1px solid red'
        scoreIpt.style.backgroundColor = 'transparent'
        scoreIpt.style.color = 'red'
        scoreIpt.style.fontStyle = 'oblique'
        scoreIpt.onchange = () => {
          if (Number(scoreIpt.value) > maxScore) {
            scoreIpt.value = maxScore
            return this.$Message.error('不能超过最大分值' + maxScore)
          }
        }
        scoreIpt.onblur = () => {
          if (Number(scoreIpt.value) && Number(scoreIpt.value) !== minScore) {
            scoreIpt.value = Number(scoreIpt.value) <= minScore ? Number(scoreIpt.value).toFixed(1) : Number(scoreIpt.value)
          } else {
            scoreIpt.value = ''
          }
        }
        oDiv.style.backgroundImage = `url(${svg})` // svg
        oDiv.style.backgroundRepeat = 'no-repeat'
        oDiv.style.backgroundSize = '100%'
        oDiv.style.backgroundPosition = 'center'
        oDiv.style.width = '40px' // 指定宽度
        oDiv.style.height = '30px' // 指定高度
        boxDiv.appendChild(oDiv)
        boxDiv.appendChild(scoreIpt)
        boxDiv.appendChild(close)
        // boxDiv.appendChild(oTip) // x , y 坐标框
        boxDivWrap.appendChild(boxDiv)
        console.log(scoreIpt.value)
        return {
          w: oDiv.offsetWidth,
          h: oDiv.offsetHeight,
          x: ev.offsetX / (this.equipment ? 0.93 : 0.7) + x,
          y: (ev.offsetY - h) / (this.equipment ? 0.93 : 0.7) + y,
          type: 'gou',
          data: scoreIpt.value,
          page_num,
          side
        }
      } else if (name === '错误标注') {
        if (scoreMark > 0) {
          this.$Modal.warning({
            title: '提醒',
            content: '持续标分为正分，请用打勾工具标记'
          })
          return
        }
        const scoreIpt = document.createElement('input')
        close.className = 'close'
        close.innerText = 'X'
        close.dataset.index = this.imgData.length
        close.style.padding = '0px 6px'
        close.style.color = 'white'
        close.style.backgroundColor = 'black'
        close.style.height = '20px'
        close.style.cursor = 'pointer'
        close.style.display = 'none'
        oDiv.id = 'drawTask'
        scoreIpt.className = 'continuous-score'
        scoreIpt.type = 'number'
        scoreIpt.step = '0.5'
        scoreIpt.max = '0'
        scoreIpt.min = '-10'
        scoreIpt.value = scoreMark || ''
        scoreIpt.style.fontSize = '14px'
        scoreIpt.style.border = 'none'
        scoreIpt.style.backgroundColor = 'transparent'
        scoreIpt.style.color = 'red'
        scoreIpt.onchange = () => {
          if (scoreIpt.value / 1 < -maxScore || scoreIpt.value / 1 > minScore) {
            scoreIpt.value = -maxScore
            return this.$Message.error('不能小于最低分数' + '-' + maxScore)
          }
        }
        scoreIpt.onblur = () => {
          console.log(scoreIpt.value / 1 <= -maxScore)
          if (Number(scoreIpt.value) && Number(scoreIpt.value) <= minScore) {
            scoreIpt.value = Number(scoreIpt.value) <= -maxScore ? Number(scoreIpt.value).toFixed(1) : Number(scoreIpt.value)
          } else {
            scoreIpt.value = ''
          }
        }
        scoreIpt.style.fontStyle = 'oblique'
        oDiv.style.backgroundImage = `url(${svg})` // svg
        oDiv.style.backgroundRepeat = 'no-repeat'
        oDiv.style.backgroundSize = '100%'
        oDiv.style.backgroundPosition = 'center'
        oDiv.style.width = '40px' // 指定宽度
        oDiv.style.height = '30px' // 指定高度
        boxDiv.appendChild(oDiv)
        boxDiv.appendChild(scoreIpt)
        boxDiv.appendChild(close)
        // boxDiv.appendChild(oTip) // x , y 坐标框
        boxDivWrap.appendChild(boxDiv)
        return {
          w: oDiv.offsetWidth,
          h: oDiv.offsetHeight,
          x: ev.offsetX / (this.equipment ? 0.93 : 0.7) + x,
          y: (ev.offsetY - h) / (this.equipment ? 0.93 : 0.7) + y,
          type: 'cha',
          data: scoreIpt.value,
          page_num,
          side
        }
      } else if (name === '高亮标注') {
        const oldX = ev.clientX
        const oldY = ev.clientY
        close.className = 'close'
        close.innerText = 'X'
        close.style.padding = '0px 6px'
        close.style.color = 'white'
        close.dataset.index = this.imgData.length
        close.style.backgroundColor = 'black'
        close.style.cursor = 'pointer'
        close.style.height = '20px'
        close.style.display = 'none'
        oDiv.id = 'drawTask'
        oDiv.style.backgroundColor = 'rgba(252,255,0,0.3)' // 设置涂抹背景
        oDiv.style.backgroundRepeat = 'no-repeat'
        oDiv.style.backgroundSize = '100%'
        oDiv.style.backgroundPosition = 'center'
        oDiv.style.width = '40px' // 指定宽度
        oDiv.style.height = '30px' // 指定高度
        window.onmousemove = (ev) => {
          if (ev.clientX - oldX <= 1) {
            window.onmouseup = () => {
              window.onmousemove = null
            }
            return
          }
          close.style.left = (ev.clientX) + 'px' // 指定创建的DIV在文档中距离左侧的位置
          oDiv.style.width = (ev.clientX - oldX) + 'px' // 指定宽度
          oDiv.style.height = (ev.clientY - oldY) + 'px' // 指定高度
          boxDiv.appendChild(oDiv)
          boxDiv.appendChild(close)
          // boxDiv.appendChild(oTip) // x , y 坐标框
          boxDivWrap.appendChild(boxDiv)
        }
        return {
          w: oDiv.offsetWidth,
          h: oDiv.offsetHeight,
          x: ev.offsetX / (this.equipment ? 0.93 : 0.7) + x,
          y: (ev.offsetY - h) / (this.equipment ? 0.93 : 0.7) + y,
          type: 'gaoliang',
          data: {
            x: ev.offsetX / (this.equipment ? 0.93 : 0.7),
            y: ev.offsetY / (this.equipment ? 0.93 : 0.7)
          },
          page_num,
          side
        }
      } else if (name === '直线标注') {
        const oldX = ev.clientX
        const oldY = ev.clientY
        close.className = 'close'
        close.innerText = 'X'
        close.style.padding = '0px 6px'
        close.style.color = 'white'
        close.dataset.index = this.imgData.length
        close.style.backgroundColor = 'black'
        close.style.cursor = 'pointer'
        close.style.display = 'none'
        oDiv.id = 'drawTask'
        oDiv.style.border = '2px solid red' // 设置涂抹背景
        oDiv.style.backgroundRepeat = 'no-repeat'
        oDiv.style.backgroundSize = '100%'
        oDiv.style.backgroundPosition = 'center'
        oDiv.style.width = '40px' // 指定宽度
        oDiv.style.height = '30px' // 指定高度
        document.onmousemove = (ev) => {
          if (!ev.clientX - oldX < 4) {
            boxDiv.style.transform = `translateY(${ev.clientY - oldY}px)`
            oDiv.style.width = (40 + ev.clientX - oldX) + 'px' // 指定宽度
            oDiv.style.height = (20 + ev.clientY - oldY) + 'px' // 指定高度
            oDiv.style.width = ev.clientX - oldX + 'px' // 指定宽度
            oDiv.style.height = 2 + 'px' // 指定高度
            boxDiv.appendChild(oDiv)
            boxDiv.appendChild(close)
            // boxDiv.appendChild(oTip) // x , y 坐标框
            boxDivWrap.appendChild(boxDiv)
          }
          document.onmouseup = () => {
            document.onmousemove = null
          }
        }

        return {
          w: oDiv.offsetWidth,
          h: oDiv.offsetHeight,
          x: ev.offsetX / (this.equipment ? 0.93 : 0.7) + x,
          y: (ev.offsetY - h) / (this.equipment ? 0.93 : 0.7) + y,
          type: 'line',
          data: {
            x: ev.offsetX / (this.equipment ? 0.93 : 0.7),
            y: ev.offsetY / (this.equipment ? 0.93 : 0.7)
          },
          page_num,
          side
        }
      } else if (name === '文字标注') {
        // eslint-disable-next-line no-unused-vars
        const promise = new Promise((resolve) => {
          close.className = 'close'
          close.innerText = 'X'
          close.style.padding = '0px 6px'
          close.style.color = 'white'
          close.dataset.index = this.imgData.length
          close.style.backgroundColor = 'black'
          close.style.cursor = 'pointer'
          close.style.height = '20px'
          close.style.display = 'none'
          oDiv.id = 'drawTask'
          oDiv.style.backgroundRepeat = 'no-repeat'
          oDiv.style.backgroundSize = '100%'
          oDiv.style.backgroundPosition = 'center'
          oDiv.style.width = '160px' // 指定宽度
          oDiv.style.minHeight = '30px' // 指定高度
          oDiv.style.border = '1px dotted red'
          oDiv.style.textAlign = 'left'
          oDiv.style.color = 'red'
          const oDivtextarea = document.createElement('textarea')
          oDivtextarea.placeholder = '请输入文字'
          oDivtextarea.style.cssText = 'background-color: transparent; border: none;'
          oDiv.appendChild(oDivtextarea)
          // eslint-disable-next-line no-unused-vars
          let newData = {}
          oDiv.addEventListener('mouseout', (ev) => {
            // eslint-disable-next-line no-unused-vars
            if (!oDivtextarea.value) {
              boxDiv.removeChild(oDiv)
              boxDiv.removeChild(close)
              // oDiv.remove() // 如果未输入文字则删除该节点DOM
            } else {
              oDivtextarea.style.cssText = 'display: none'
              oDiv.style.border = 'none'
              oDiv.innerText = oDivtextarea.value
              newData = {
                w: oDiv.offsetWidth,
                h: oDiv.offsetWidth,
                x: ev.offsetX / (this.equipment ? 0.93 : 0.7) + x,
                y: (ev.offsetY - h) / (this.equipment ? 0.93 : 0.7) + y,
                type: 'text',
                data: oDiv.innerText, // 所对应的文字
                page_num,
                side
              }
              this.imgData.push(newData)
              return resolve(newData)
            }
          })
          // 存储标注坐标信息
          // boxDiv.appendChild(oTip) // x , y 坐标框
          boxDiv.appendChild(oDiv)
          boxDiv.appendChild(close)
          boxDivWrap.appendChild(boxDiv)
          console.log(this.imgData)
        })
      }
    },
    //
    resize () {
      alert('resize函数')
      this.myCanvas.width = this
    },
    async setScorrlStyle (w, h, x, y) {
      // eslint-disable-next-line no-unused-vars
      const wrap = await this.$refs.wrap // 获取可视区域
      // eslint-disable-next-line no-unused-vars
      const scrollRight = await this.$refs.scrollr // 获取右侧滚动条
      // eslint-disable-next-line no-unused-vars
      const scrollBottom = await this.$refs.scrollb // 获取下方滚动条
      // eslint-disable-next-line no-unused-vars
      const scrollRightBar = await scrollRight.children[0] // 右侧滚动条按钮
      // eslint-disable-next-line no-unused-vars
      const scrollBottomBar = await scrollBottom.children[0] // 下方滚动条按钮
      // console.log(scrollRight, scrollBottom, scrollRightBar, scrollBottomBar)

      // wrap.children[0].offsetHeight // 可视区域高度
      //  this.button.barH + parseInt(this.button.barY) - 21 //拖动后的实际高度
      //  console.log(wrap.children[0].offsetHeight)

      // eslint-disable-next-line no-unused-vars
      const ele = this.$refs['myCanvas' + this.index]
      // 计算 视图区域 和实际拖动后的高度比值
      const scaleR = Math.min(wrap.children[0].offsetHeight / (h + parseInt(y) - 21), 1)
      // 计算 视图区域 和实际拖动后的宽度比值
      const scaleB = Math.min(wrap.children[0].offsetWidth / (w + parseInt(x) - 50), 1)
      // 计算 右侧滚动条 的高度
      const barH = scaleR * scrollRight.offsetHeight
      // 计算 底部滚动条 的宽度
      const barW = scaleB * scrollBottom.offsetWidth
      // console.log(barH, barW)
      // 计算 右侧滚动条 能滚动的距离
      const maxbarR = scrollRight.offsetHeight - barH
      // 计算 底部滚动条 能滚动的距离
      const maxbarB = scrollBottom.offsetWidth - barW
      // 计算 内容 区域 能滚动的距离
      const maxcon = (h + parseInt(y) - 21) - wrap.children[0].offsetHeight
      scrollRight.style.opacity = 1
      scrollBottom.style.opacity = 1
      scrollRightBar.style.height = `${barH}px`
      scrollBottomBar.style.width = `${barW}px`
      scrollRight.addEventListener('click', function (e) {
        // 判断是不是滚动区域
        if (e.target !== this) return
        let valR = e.clientY - this.getBoundingClientRect().y - barH / 2
        valR = Math.max(0, valR)
        valR = Math.min(maxbarR, valR)
        // 计算 内容区域 实际滚动距离
        // eslint-disable-next-line no-unused-vars
        const contentT = maxcon * (valR / maxbarR)
        scrollRightBar.style.top = `${valR - 2}px`
      })

      scrollBottom.addEventListener('click', function (e) {
        // 判断是不是滚动区域
        if (e.target !== this) return
        let valB = e.clientX - this.getBoundingClientRect().x - barW / 2
        valB = Math.max(0, valB)
        valB = Math.min(maxbarB, valB)
        // 计算 内容区域 实际滚动距离
        scrollBottomBar.style.left = `${valB - 2}px`
      })
    },
    mouseoutAndmouseover () {
      const ele = document.querySelector('#wrap')
      ele.addEventListener('mouseover', (e) => {
        let ment = e.target
        if (ment.parentNode.id !== 'wrap') {
          while (ment.className !== 'wrapBox') {
            ment = ment.parentNode
          }
        }
        if (ment.children.length >= 3) { // 节点DOM数量大于等于 3 的时候
          ment.children[ment.children.length - 2].style.border = '1px solid red'
        }
        if (ment.children[ment.children.length - 1]) {
          ment.children[ment.children.length - 1].style.display = 'block'
        }
      })
      ele.addEventListener('mouseout', (e) => {
        let ment = e.target
        if (ment.parentNode && ment.parentNode.id !== 'wrap') {
          while (ment.className !== 'wrapBox') {
            ment = ment.parentNode
          }
          if (ment.children.length >= 3) {
            ment.children[ment.children.length - 2].style.border = 'none'
          }
          ment.children[ment.children.length - 1].style.display = 'none'
        }
      })
    },
    fn (ev) { // 事件分流函数
      /**
             * 1、点击某个按钮操作，执行fn事件分流函数（ 点击页面增加一块 textarea ）
             * 2、textarea里面文字输入完毕之后返回一系列信息给 newData
             * 3、最后fn 函数return newData
             *
             * 现在的情况点击某个按钮操作，执行fn事件分流函数的瞬间就已经 return newData并且为 { }
             */
      let newData = {}
      const element = ev.taregt
      element.addEventListener('mouseout', () => {
        newData = {
          // 一些对象信息
        }
      })
      return newData
    }
  },
  computed: {
    ...mapState({ // 大题分数
      score: state => state.scoreinfo.score,
      equipment: state => state.equipment // 用户端
    })
  },
  created () {
  },
  mounted () {
    this.mouseoutAndmouseover()
    // 多题批阅模式
    // this.hanleUpload()
    // 自执行设置canvas样式
    this.setWidthHeight()
    // 画布拖动后的滚动条
    this.setScorrlStyle()
    // 监听点击close清除标记
    window.addEventListener('click', (e) => {
      if (e.target.className === 'close') {
        this.imgData.splice(e.target.dataset.index, 1) // 从点击位置开始删除一个
        e.target.parentNode.remove()
      }
    })
    // 根据窗口的改变重新设置 canvas 样式
    window.addEventListener('resize', () => this.setWidthHeight())
  },
  setup (props, context) {
    // const state = reactive({})
    // console.log(props, context, 'setup钩子-->props, context')
    // console.log(state, 'setup钩子-->reactive')
  }
}
</script>

<style scoped>
#myCanvas,
#myCanvas0,
#myCanvas1,
#myCanvas2,
#myCanvas3,
#myCanvas4,
#myCanvas5,
#myCanvas6 {
    /*width: 100%;*/
    /*height: 80%;*/
    background-color: #808695;
    border: 1px solid #666;
}

#myCanvasMark,
#myCanvasMark0,
#myCanvasMark1,
#myCanvasMark2,
#myCanvasMark3,
#myCanvasMark4,
#myCanvasMark5,
#myCanvasMark6 {
    width: 100%;
    height: 80%;
    border: 1px solid #999;
    /*transition: all 0.3s ease-in-out;*/
}

.scroll_r {
    position: absolute;
    right: 0;
    top: 0;
    width: 8px;
    height: calc(100% - 20px);
    background-color: #ccc;
    box-shadow: 0 0 6px 0 #666 inset;
    border-radius: 10px;
    border: 1px solid #999;
}

.scroll_r i {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #eee;
    border-radius: 10px;
    left: 0;
    cursor: pointer;
}

/*.scroll_r i, .scroll_b i {*/
/*    transition: all 0.3s linear;*/
/*}*/

/*.scroll_r, .scroll_b {*/
/*    opacity: 0;*/
/*    transition: all 0.3s linear;*/
/*}*/

.scroll_b {
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(100% - 20px);
    height: 8px;
    background-color: #ccc;
    box-shadow: 0 0 6px 0 #666 inset;
    border-radius: 10px;
    border: 1px solid #888;
}

.scroll_b i {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #eee;
    border-radius: 10px;
    left: 0;
    cursor: pointer;
}

.font-model {
    min-width: 200px;
    font-size: 16px;
    color: red;
    /*min-height: 100px;*/
    background-color: transparent;
    border: 1px dotted red;
    text-align: left;
    position: absolute;
    display: none;
    outline: none;
}
</style>
