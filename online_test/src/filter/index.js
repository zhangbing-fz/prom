const myFilter = {
  // 题型难度过滤
  difficultFilter (val) {
    let str = ''
    switch (val) {
      case '1':
        str = '容易'
        break
      case '2':
        str = '较易'
        break
      case '3':
        str = '一般'
        break
      case '4':
        str = '较难'
        break
      default:
        str = '困难'
        break
    }
    return str
  },
  // 题型过滤
  typeFilter (val) {
    if (val.length !== 1) {
      val = val.slice(1)
    }
    let str = ''
    switch (val) {
      case '1':
        str = '单选'
        break
      case '2':
        str = '多选'
        break
      case '3':
        str = '判断'
        break
      case '4':
        str = '填空'
        break
      case '5':
        str = '简答'
        break
      default:
        str = '写作'
        break
    }
    return str
  }

}
export default myFilter
