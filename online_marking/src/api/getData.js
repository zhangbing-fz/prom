// 测试通过后端请求目标数据
const request = require('request')
// eslint-disable-next-line no-unused-vars
const fs = require('fs')
request({
  method: 'POST',
  // url: 'http://udog.beautop.cn/LSYJ/account/Logon', //登录的接口
  url: 'http://udog.beautop.cn/LSYJ/home/GetStat',
  qs: {
    // name: 'sxkzz', //登录的 formData
    // pwd: 123
    FunID: 2000,
    LessonID: 602,
    QuesID: 2
  }
}, async (err, res, body) => {
  console.log(body)
  fs.writeFile(`${__dirname}/demo.json`, body, {
    encoding: 'utf8'
  }, err => {
    if (err) throw err
    console.log('写入成功')
  })
  /* if (!err && res.statusCode === 200) {
      fs.writeFile(`${__dirname}/demo.json`, res, {
        encoding: 'utf8'
      }, err => {
        if (err) throw err
        console.log('写入成功')
      })
    } */
})

/* request({
  method: 'POST',
  url: 'http://udog.beautop.cn/LSYJ/home/GetStat',
  qs: {
    FunID: 2000,
    LessonID: 602,
    QuesID: 2
  }
}, (err, res, body) => {
  if (!err && res.statusCode === 200) {
    console.log(res)
  }
}) */
