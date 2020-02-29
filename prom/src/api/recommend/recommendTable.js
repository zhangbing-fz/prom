const mongoose = require("mongoose");
const Schema = mongoose.Schema;


mongoose.connect("mongodb://127.0.0.1:27017/sizhu", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('数据库连接成功')
}).catch(() => {
  console.log('数据库连接失败')
})

const recommendSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  categoryList: [
    {
      id: {
        type: String,
        required: true
      },
      cover: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true,
      }
    }
  ]
})

const recommendDates = mongoose.model("recommendDetail", recommendSchema)

module.exports = {
  recommendTable: recommendDates
}
