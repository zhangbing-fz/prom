const { hots } = require('./hotTable')
// const { JSDOM } = require('jsdom')
// const request = require('request')
module.exports = {
  getHotData: function (req, res, next) {
    /* request({
      method: 'GET',
      url: 'http://tiku.yunxiao.com/album_api/v1/album/elite/list',
      qs: {
        period: '高中',
        subject: '数学',
        type: '',
        offset: '0',
        limit: '6'
      },
      headers: {
        'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
      }
    },
    // eslint-disable-next-line handle-callback-err
    function (err, response, body) {
      const dom = new JSDOM(body, { runScripts: 'dangerously' })
      // const songlist = JSON.stringify(dom.window.songlist[0]) // 转换成json格式

      res.send(`
        <!DOCTYPE HTML>
            <html>
                <head></head>
                <body>
                        <h1>这是测试数据</h1>
                    </body>
            </html>
        `)
    }) */
    hots.find({
    }).then((data) => {
      res.send(data)
    })
  }
}
