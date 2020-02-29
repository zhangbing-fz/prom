const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/sizhu", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("连接数据库成功")
}).catch(() => {
    console.log("连接数据库失败")
})


let detailSchema = new Schema({
    id: { //用于后期的数据识别
        type: String,
        required: true
    },
    cover: {//封面
        type: String,
        required: true
    },
    title: { //歌单名词
        type: String,
        required: true
    },
    tag: [ //歌单种类
        {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    songlist: [
        {
            mid: {//音乐ID
                type: String,
                required: true
            },
            name: {//音乐名称
                type: String,
                required: true
            },
            singer: [
                {
                    id: {//歌手ID
                        type: String,
                        required: true
                    },
                    mid: {//歌手的mid
                        type: String,
                        required: true
                    },
                    name: {//歌手的名字
                        type: String,
                        required: true
                    },
                    title: {//歌手的名字
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
})


let detailTable = mongoose.model("detailTable", detailSchema)

module.exports = {
    detailTable
}
