/* 获取歌单数据 */
const request = require("request");
const fs = require("fs");
const {recommendTable} = require("./recommendTable")

// console.log(recommendTable)
request({
    method: "GET",
    url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
    qs: {
        "cgiKey": "GetHomePage",
        "_": 1576499692284,
        "data": `{"comm":{"g_tk":1679733952,"uin":526705707,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
    }
}, async (err, res, body) => {
    /*
      初次写入json数据
      // console.log(body)// 打印请求到的数据接口
      fs.writeFile(`${__dirname}/demo.json`, body, {
        encoding: 'utf8'
      }, err => {
        if (err) throw err;
        console.log("写入成功");
      })*/

    await recommendTable.deleteMany({});
    let data = JSON.parse(body).MusicHallHomePage.data.v_shelf;//获取初次写入的json中 推荐栏目的信息

    // console.log(data)
    data.forEach(item => {
        let category = item.title_template;
        let categoryList = item.v_niche[0].v_card; //获取该分区里面的详细歌单列表
        let arr = [];
        categoryList.forEach(list => {
            if (list.id) {
                arr.push({
                    id: list.id,
                    cover: list.cover,
                    title: list.title
                })
            }
        });
        if (arr.length !== 0) { //当数组不为 0的时候，添加数据
            recommendTable.create({
                category: category,
                categoryList: arr
            }).then(() => {
                console.log("写入数据库成功")
            }).catch((err) => {
                console.log("写入数据库失败", err);
            })
        }

    })

})
