const express = require('express')
const { getNewsData } = require('./setNewsData') // 新闻接口表
const { getHotData } = require('./setHotData')
// const bodyParser = require('body-parser')
const app = express()
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json)
// 解决跨域请求问题
app.all('*', function (req, res, next) {
  res.header({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    'Content-type': 'application/json; charset=utf-8'
  })
  if (req.method === 'OPTIONS') {
    res.status(200).send('OK')
    // eslint-disable-next-line no-console
    console.log('has option')
  } else {
    next()
  }
})
// 中间键
app.use((req, res, next) => {
  next()
})
app.get('/api/getNewsData', getNewsData) // 最热试卷列表接口
app.get('/api/getHotData', getHotData) // 最新试卷列表接口
app.listen(9527)
