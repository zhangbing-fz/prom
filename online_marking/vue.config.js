const webpack = require('webpack')
module.exports = {
  publicPath: './',
  assetsDir: 'static',
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  devServer: {
    port: 38770,
    // open: true,
    disableHostCheck: true,
    contentBase: './static',
    proxy: {
      '^/gdy': {
        target: 'http://udog.beautop.cn:33833',
        ws: true,
        changeOrigin: false
      },
      '^/chengjifabu/auth_api': {
        target: 'http://127.0.0.1:38767',
        ws: true,
        changeOrigin: false
      },
      '^/chengjifabu/answer_img': {
        target: 'https://cjyc.beautop.cn',
        ws: true,
        changeOrigin: false
      }

    }
  }
}
