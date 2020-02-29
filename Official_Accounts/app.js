var express = require('express');
var app = express();
app.use(express.static(`${__dirname}/bundle`),function (req, res,next) {
  res.sendfile(`${__dirname}/bundle/index.html`);  //路径根据自己文件配置
});
app.listen(8080);