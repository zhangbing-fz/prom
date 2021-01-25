const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hotSchema = new Schema({
  time: {
    type: String,
    default: new Date().toLocaleString() // 默认服务期时间
  },
  content: String
})

const hots = mongoose.model('hots', hotSchema)

// 文章Schema
const articleSchema = new Schema({
  title: {
    type: Schema.Types.ObjectId,
    ref: 'hots'
  },
  content: String
})

// 建立 article表
const article = mongoose.model('article', articleSchema)
article.create({
  title: '5f9921967c5f6a4d1c355c69',
  content: '这是测试内容'

}).then(() => {
  console.log('添加成功')
}).catch((err) => {
  throw err
})
module.exports = {
  hots
}

/* hots.create(
  {
    time: '10月14日',
    content: '苏教版（2019）必修1《4.2.2 对数的运算性质》2020年同步练习卷（1）'
  },
  {
    time: '10月14日',
    content: '2020年河南省高考数学质检试卷（理科）（6月份）'
  },
  {
    time: '10月14日',
    content: '2019-2020学年湖南省三湘名校教育联盟高一（上）期中数学试卷'
  },
  {
    time: '10月14日',
    content: '2020年广东省汕头市金山中学高考数学三模试卷（文科）'
  },
  {
    time: '10月14日',
    content: '2020年湖北省黄冈中学高考数学三模试卷（文科）'
  },
  {
    time: '10月14日',
    content: '苏教版（2019）必修1《7.2.3 三角函数的诱导公式》2020年同步练习卷（1）'
  }
).then(() => {
  console.log('添加成功')
}).catch((err) => {
  throw err
}) */

// 连接数据库
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('连接成功')
}).catch(() => {
  console.log('连接失败')
})
