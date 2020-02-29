const request = require("request");
const {JSDOM} = require("jsdom");
const fs = require("fs");
const {detailTable} = require("./detailTable");


module.exports = {
    getRecommendDetailData: function (req, res) {
        console.log(req.params)
        request({
            method: "GET",
            url: "https://i.y.qq.com/n2/m/share/details/taoge.html",
            qs: {
                ADTAG: "newyqq.taoge",
                id: req.params.id
            }
        }, function (err, response, body) {
            let dom = new JSDOM(body, {runScripts: "dangerously"}); //运行里面的js {runScripts: "dangerously"}
            let songlist = JSON.stringify(dom.window.firstPageData); //转换成json格式

            detailTable.find({
                id: req.params.id,
            }).then((data) => {
                // console.log(data)
                if (data.length === 0) {

                    console.log("当前数据库中无数据");
                    let finalData = {}; //存储待添加到数据库的数据
                    // console.log(songlist.taogeData);
                    finalData.id = songlist.taogeData.id;
                    finalData.cover = songlist.taogeData.picur; //设置歌单封面
                    finalData.title = songlist.taogeData.title; //设置歌单的名称
                    finalData.songlist = [];
                    finalData.tag = songlist.taogeData.tag;

                    songlist.taogeData.songlist.forEach((item) => {
                        let singer = item.singer;
                        finalData.songlist.push({
                            singer: singer,
                            mid: item.mid,
                            name: item.name
                        })
                    })
                    res.send(JSON.stringify(finalData));
                    detailTable.create(finalData); //创建对象
                } else {
                    res.send(JSON.stringify(data));
                }
            })
        })

    }
}

