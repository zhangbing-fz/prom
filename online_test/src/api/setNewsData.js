// const request = require('request')
// const { JSDOM } = require('jsdom')
// const fs = require('fs')
const { news } = require('./newsTable')
console.log(news)
module.exports = {
  getNewsData: function (req, res, next) {
    news.find({
    }).then(data => {
      // console.log(data)
      res.send(data)
    })
  }
}
