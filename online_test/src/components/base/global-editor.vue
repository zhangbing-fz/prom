<comment>
    # 富文本编辑器
</comment>
<template>
    <div class="tu-wen">
        <!--        {{id}}-->
        <!--        <div v-html="textInfo"></div>-->
        <Upload
                :action="uploadRichTextImg"
                :before-upload="beforeUpload"
                :format="['jpg','jpeg','png','gif']"
                :headers="header"
                :id="id"
                :max-size="2048"
                :on-success="handleSuccessQuill"
                :show-upload-list="false"
                multiple
                name="richTextAccessory"
                style="display:none;"
        >
            <!--            <Button icon="ios-cloud-upload-outline"></Button>-->
        </Upload>
        <quill-editor
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @change="onEditorChange($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                ref="myQuillEditor"
                v-model="content"
        >
        </quill-editor>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill' // 引入编辑器

// 上传图片
// eslint-disable-next-line no-unused-vars
// import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
// Quill.register('modules/ImageExtend', ImageExtend)

import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module' // 调节图片大小
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

const toolbarOptions = [ // 工具栏
  /* 简约 */
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'] // 链接、图片、视频

  /*      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{'header': 1}, {'header': 2}],               // custom button values
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
          [{'direction': 'rtl'}],                         // text direction

          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
          [{'header': [1, 2, 3, 4, 5, 6, false]}],

          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          [{'font': []}],
          [{'align': []}],
          ['link', 'image', 'video'],
          ['clean']                                         // remove formatting button */

  /*  ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
          ['blockquote', 'code-block'], // 引用，代码块

          [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
          [{ list: 'ordered' }, { list: 'bullet' }], // 列表
          [{ script: 'sub' }, { script: 'super' }], // 上下标
          [{ indent: '-1' }, { indent: '+1' }], // 缩进
          [{ direction: 'rtl' }], // 文本方向
          [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
          [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
          [{ font: [] }], // 字体
          [{ align: [] }], // 对齐方式
          ['clean'], // 清除字体样式
          ['image', 'video'] // 上传图片、上传视频 */
]
export default {
  name: 'global-editor.vue',
  components: {
    'quill-editor': quillEditor
  },
  props: ['textInfo', 'id'],
  data () {
    const _this = this
    return {
      header: {
        service_name: 'save_content_img'
      }, // 设置请求头
      uploadRichTextImg: 'http://192.168.1.142:38770/gdy/system_admin/file_api', // 富文本编辑器的图文列表
      uploadList: [], // 富文本编辑器的图文列表
      content: '', // 富文本里的内容
      editorOption: { // 富文本编辑器的工具栏
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) { // 对图片进行改造，默认是通过base64 ,现通过iview 去传。
                if (value) {
                  // console.log(_this.id, 'ID')
                  document.querySelector('#' + _this.id + ' input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        },
        imageDrop: true, // 图片拖拽
        imageResize: { // 图片放大缩小
          displayStyles: {
            backgroundColor: 'black',
            border: 'none',
            color: 'white'
          },
          modules: ['Resize', 'DisplaySize', 'Toolbar']
        },
        placeholder: '请输入文章内容',
        theme: 'snow', // 主题
        syntax: true // 语法检测

      },
      contentTxt: ''// 富文本编辑器里的前面100个文字
    }
  },
  watch: {
    textInfo: {
      handler () {
        if (this.textInfo) {
          // console.log(this.textInfo)
          this.content = this.textInfo
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onEditorReady (editor) {
      // console.log(editor)
    }, // 准备编辑器
    /**
             * @作者: 张兵
             * @功能: 失去焦点
             * @date: 2020/7/1 13:35
             * @description: onEditorBlur
             */
    onEditorBlur () { // 失去焦点
      this.$emit('blur')
      return this.name
    },
    /**
             * @作者: 张兵
             * @功能: 激活焦点
             * @date: 2020/7/1 13:35
             * @description: onEditorFocus
             */
    onEditorFocus (e) { // 激活焦点
      console.log('激活焦点', this.name)
      return this.name
    },
    /**
             * @作者: 张兵
             * @功能: 文本变化
             * @date: 2020/7/1 13:36
             * @description: onEditorChange
             */
    onEditorChange (e) {
      console.log('文本变化')
      const _this = this
      _this.content = e.html // 标签以<p></p> 形式渲染 （重点）
      // _this.contentTxt = e.text.substr(0, 100) //限制字数
      _this.$emit('change', _this.content)
    },
    // 上传图片前
    beforeUpload (file) { // element 上传图片的方法
      /* const _this = this
      const quill = this.$refs.myQuillEditor.quill // 获取富文本组件实例
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        const formData = new FormData()
        // formData.append('service_name', 'save_content_img')
        formData.append('service_name', file)
        _this.$axios.post('/file_api', _this.$qs.stringify(formData)).then(res => {
          /!* const URL = window.URL.createObjectURL(file)
          console.log(URL) *!/
          console.log(res)
          const { data } = res
          if (data.result_code === '00') {
            quill.focus()
            const length = quill.getSelection(true).index // 获取光标所在位置
            quill.insertEmbed(length, 'image', data) // 插入图片  res.info为服务器返回的图片地址
            quill.setSelection(length + 1) // 调整光标到最后
          } else {
            _this.$Message.error('图片上传失败!')
          }
        })
      }
      // console.log(window.URL.createObjectURL(file), 'file')
      return file */
    },

    /**
             * @作者: 张兵
             * @功能: 富文本编辑器的上传图片成功的操作
             * @date: 2020/7/1 13:36
             * @description: handleSuccessQuill
             */
    handleSuccessQuill (res, file) {
      console.log(arguments)
      // const formData = new FormData()
      // formData.append('service_name', 'save_content_img')
      try {
        const quill = this.$refs.myQuillEditor.quill // 获取富文本组件实例
        const length = quill.getSelection().index // 获取光标所在位置
        const URL = window.URL.createObjectURL(file)
        console.log(URL)
        quill.insertEmbed(length, 'image', '')// 插入图片，res为服务器返回的图片链接地址
        quill.setSelection(length + 1)// 调整光标到最后
      } catch (e) {
        console.log(e)
      } finally {
        // loading动画消失
        // this.quillUpdateImg = false
      }
    }
  },
  computed: {},
  created () {
  },
  mounted () {
    // console.log(this.textInfo) // 输出props传递过来编辑器的内容
  },
  destroyed () {
  }
}
</script>

<style>
    button, span {
        outline: none;
    }

    .quill-editor {
        line-height: normal;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: "14px" !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
        content: "10px" !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
        content: "18px" !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
        content: "32px" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: "文本" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: "标题1" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: "标题2" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: "标题3" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: "标题4" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: "标题5" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: "标题6" !important;
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: "标准字体" !important;
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
        content: "衬线字体" !important;
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
        content: "等宽字体" !important;
    }
</style>
