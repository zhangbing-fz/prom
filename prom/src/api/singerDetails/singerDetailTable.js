const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/sizhu",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("连接成功")
}).catch(()=>{
    console.log("连接失败");
});

let singerDetailSchema = new Schema({
    singer_name: {
        type:String,
        required:true
    },
    singer_mid: {
        type:String,
        required:true
    },
    singer_pmid: {
        type:String,
        required:true
    },
    singer_id: {
        type:Number,
        required:true
    },
    singerDesc: {
        type:String,
        required:true
    },
    songTotalNumber:{
        type:Number,
        required:true
    },
    fansTotalNumber:{
        type:Number,
        required:true
    },
    songList:[
        {
            songName:{
                type:String,
                required:true
            },
            songMid:{
                type:String,
                required:true
            },
            songAlbum:{
                type:String,
                required:true
            }
        }
    ]
});

//引用表规则
let singerDetailTable = mongoose.model("singerDetailTable", singerDetailSchema);

module.exports = {
    singerDetailTable,
}