const express = require("express");
const {getRecommendData} = require("./recommend/getRecommendData");
const {getRecommendDetailData} = require("./recommendDetail/setDetailData")
const {getSingerData} = require("./singer/getSingerData")
const {getSingerData_qqMusic} = require("./singer/setSingerData"); //写入singer目录下的demo.json
const {getSingerDetailData} = require("./singerDetails/getSingerDetailData")
const {getSongDetail} = require("./songDetail/getSongDetail")

const bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.all("*", function (req, res, next) { //解决跨域请求问题
    res.header({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
        'Content-type': 'application/json; charset=utf-8'
    });
    if (req.method === 'OPTIONS') {
        res.status(200).send('OK');
        // eslint-disable-next-line no-console
        console.log('has option')
    } else {
        next();
    }
});

app.get("/api/getRecommendData", getRecommendData);
app.get("/api/getRecommendDetailData/:id", getRecommendDetailData);
app.get("/api/getSingerData", getSingerData)
app.get("/api/getSingerData_qqMusic", getSingerData_qqMusic)
app.post("/api/getSingerDetailData", getSingerDetailData)
app.post("/api/getSongDetailData", getSongDetail);

app.listen(1110);