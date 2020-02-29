// 脚手架配置
module.exports = {
  // 静态资源路径
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  // 生成环境是否需要source map
  productionSourceMap: false,
  // webpack-dev-server配置，一般我们需要配置proxy接口代理
  devServer: {
    host: 'zhongyin.xn.com', // can be overwritten by process.env.HOST
    port: 81, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: {
      '/api': {
        // target:'http://count.xn.com',http://laravelcount.xn.com,http://data.bumblebee.wiki,
        // 测试站
        target: 'http://127.0.0.1:8887',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    https: false,
    hotOnly: false
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
