const mongoose = require('mongoose')
const Schema = mongoose.Schema // 创建表规则

// 创建用户测试数据表
const newSchema = new Schema({
  username: String,
  password: {
    type: String,
    required: true, // 布尔值或函数，如果为 true，为此属性添加 required验证器
    default: 'admin', // 任何值或函数，设置此路径默认值。如果是函数，函数返回值为默认值
    lowercase: true // 这个属性只会作用与字符串，作用就是在保存数据时，会把所有的字符改成小写
  },
  age: Number,
  sex: String,
  mail: String,
  tel: Number,
  signature: String,
  time: String,
  content: String,
  to_view: Number
})

// 最热试卷
const news = mongoose.model('news', newSchema)
module.exports = {
  news
}

// 增数据
/* news.create(  {
        time: new Date().toLocaleString(),
        content: '2020-2021学年四川省成都市双流区棠湖中学高三（上）开学数学试卷（理科）',
        to_view: 932
    },
    {
        time: new Date().toLocaleString(),
        content: '2020-2021学年吉林省实验中学高二（上）9月月考数学（文）试卷',
        to_view: 346
    },
    {
        time: new Date().toLocaleString(),
        content: '2020-2021学年黑龙江省牡丹江一中高三（上）开学数学试卷（文科）',
        to_view: 175
    },
    {
        time: new Date().toLocaleString(),
        content: '2020-2021学年北京市首师大附中高三（上）开学数学试卷',
        to_view: 162
    },
    {
        time: new Date().toLocaleString(),
        content: '2020-2021学年江苏省盐城市东台市安丰中学高一（上）周练数学试卷（一）',
        to_view: 151
    },
    {
        time: new Date().toLocaleString(),
        content: '2020-2021学年河南省鹤壁高级中学高二（上）段考数学试卷（二）',
        to_view: 131
    }
).then(() => {
    console.log('添加成功')
}).catch((err) => {
    throw err
}) */

// 删除数据（deleteOne删除满足条件的第一条数据）
// news.deleteOne({
//   username: 'zhangb'
// }, function (err) {
//   if (err) throw err
//   console.log('删除成功')
// })

// 删除满足条件的所有数据
// news.deleteMany({
//   username: 'zhangb'
// }, function (err) {
//   if (err) throw err
//   console.log('删除成功')
// })

// news.find({
//   $where: function () {
//     return this.to_view > 175
//   }
// }).then((data) => {
//   console.log('查找成功')
// }).catch((err) => {
//   throw err
// })

// 连接数据库
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('连接数据库成功')
}).catch(() => {
  console.log('连接数据库失败')
})
