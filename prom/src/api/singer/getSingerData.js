const express = require("express");
const {singerTable} = require("./singerTable");

module.exports = {
    getSingerData : function (req, res, err) {
        singerTable.find({}, {
            _id: false,
            __v: false
        }).then((data) => {
            res.send(JSON.stringify(data));
        })
    }
}
// app.get("/api/getSingerData", function (req, res, err) {
//     singerTable.find({}, {
//         _id: false,
//         __v: false
//     }).then((data) => {
//         res.send(JSON.stringify(data));
//     })
// })