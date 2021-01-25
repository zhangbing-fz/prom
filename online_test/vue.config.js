const webpack = require('webpack')
module.exports = {
  publicPath: './',
  assetsDir: 'static',
  filenameHashing: false, // 输出文件是否添加哈希值
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill'
    }])
  },
  devServer: {
    port: 38770,
    // open: true,
    disableHostCheck: true,
    contentBase: './static',
    proxy: {
      '^/index.php': {
        target: 'http://www.xuekubao.com/',
        // secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 重写路径
        }
      }
      // '^/chengjifabu/auth_api': {
      //   target: 'http://127.0.0.1:38767',
      //   ws: true,
      //   changeOrigin: false
      // },
      // '^/chengjifabu/answer_img': {
      //   target: 'https://cjyc.beautop.cn',
      //   ws: true,
      //   changeOrigin: false
      // }

    }
  }
}
