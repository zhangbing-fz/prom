/* 输出接口数据到前端 */
// const express = require("express");
const {recommendTable} = require("./recommendTable");

// let app = express();
// app.get("/api/getRecommendData", function (req, res) {
//   recommendTable.find({}, {
//     __v: false,
//     _id: false
//   }).then((data) => {
//     //请求成功
//     res.send(JSON.stringify(data));
//   }).catch((err)=>{
//     //请求失败
//     if(err) throw err;
//   })
// })
// app.listen(9527)

module.exports = {
    getRecommendData : function (req, res) {
        recommendTable.find({}, {
            __v: false,
            _id: false
        }).then((data) => {
            //请求成功
            res.send(JSON.stringify(data));
        }).catch((err)=>{
            //请求失败
            if(err) throw err;
        })
    }
}
