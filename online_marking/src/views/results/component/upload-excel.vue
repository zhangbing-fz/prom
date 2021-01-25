<comment>
# 组件注释
</comment>
<template>
    <div class="upload-excel">
    <span>
      <input
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              class="input-file"
              type="file"
              value="上传"
              @change="exportData"
      />
    </span>
    </div>
</template>

<script>
export default {
  name: 'upload-excel',
  data () {
    return {}
  },
  components: {},
  mounted () {
  },
  methods: {
    // 上传excel
    btnClick () {
      document.querySelector('.input-file').click()
      // 测试
    },
    exportData (event) {
      // console.log(event.target.files[0] === event.currentTarget.files[0]) // 输出 true
      if (!event.currentTarget.files.length) {
        return
      }
      const that = this
      // 拿取文件对象
      const f = event.currentTarget.files[0]
      // 用FileReader来读取
      const reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        let binary = ''
        let wb // 读取完成的数据
        let outdata // 你需要的数据
        const reader = new FileReader()
        reader.onload = function (e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          const bytes = new Uint8Array(reader.result)
          const length = bytes.byteLength
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 接下来就是xlsx了，具体可看api
          const XLSX = require('xlsx')
          wb = XLSX.read(binary, {
            type: 'binary'
          })
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          // 自定义方法向父组件传递数据
          // console.log('outdata = ' + JSON.stringify(outdata))
          that.$emit('getResult', outdata)
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(f)
    }
  },
  watch: {}
}
</script>

<style scoped>
</style>
