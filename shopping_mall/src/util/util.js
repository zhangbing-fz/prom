import Vue from 'vue'
const util = {
  data() {
    return {}
  },
  methods: {
    // 成功提示
    successNotice(title) {
      this.$Notice.success({
        title: title,
        duration: 3
      })
    },
    // 失败提示
    errorNotice(title) {
      this.$Notice.error({
        title: title,
        duration: 3
      })
    },
    // 警告提示
    warningNotice(title) {
      this.$Notice.warning({
        title: title,
        duration: 3
      })
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields()
    },
    // 表单验证promise化
    validateForm(form) {
      var promise = new Promise((resolve, reject) => {
        this.$refs[form].validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
      return promise
    },
    // 表单校验单项
    validateFormItem(form, item) {
      this.$refs.form.validateField(item)
    },
    // 我们自己定义的快速生成表单重置
    resetSimpleForm(form) {
      this.$refs[form].$children[0].resetFields()
    },
    // 我们自己定义的快速生成表单验证promise化
    validateSimpleForm(form) {
      var promise = new Promise((resolve, reject) => {
        this.$refs.form.$children[0].validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
      return promise
    },
    // 单点修改不能为空为空,0也算true
    editNotEmpty(val) {
      if (val) {
        return true
      } else {
        // 考虑0的情况
        if (typeof val == 'number') {
          return true
        }
        return false
      }
    },
    // 对象选项数据转为数组
    obj2arr(obj = {}) {
      var arr = []
      for (var i in obj) {
        arr.push({
          label: obj[i],
          value: i * 1
        })
      }
      return arr
    },
    // 对象选项数据转为数组
    arr2obj(arr = []) {
      var obj = {}
      arr.forEach(item => {
        obj[item.value] = item.label
      })
      return obj
    },
    copyObj(obj = {}) {
      return JSON.parse(JSON.stringify(obj))
    },
    // 快捷搜索处理逻辑
    quickSearch(queryData) {
      var searchData = {}
      this.searchParams.forEach(item => {
        if (item.type == 'quick-daterange') {
          searchData[item.key] = quickDate2range(queryData[item.key])
        } else {
          searchData[item.key] = queryData[item.key] || ''
        }
      })
      this.searchData = searchData
      this.$nextTick(() => {
        this.searchList()
      })
    }
  },
  computed: {},
  watch: {},
  activated() {}
}
Vue.mixin(util)
