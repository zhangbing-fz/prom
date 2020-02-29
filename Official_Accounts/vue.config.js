module.exports = {
  publicPath: './',
  outputDir: './dist',
  assetsDir: './assets',
  indexPath: './index.html',
  filenameHashing: false,

  pages: {
    index: {
      //定义page入口
      entry: 'src/main.js',
      //模板来源
      template: 'public/index.html',
      //输出位置
      filename: 'index.html',
      title: '首页',
      //在这个页面中包含的块，默认情况下会包含，
      //提取出来的通用chunk 和 vendor，chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },

  css: {
    //是否把组建中的css单独提取到一个独立的css文件
    extract: false,
    //是否为css 开启 source map
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    }
  },

  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 1024,
    https: false,
    hotOnly: true,
    // proxy: null,
    proxy: {
      '/allin': {
        //要访问的跨域的域名
        target: 'http://222.185.244.186',
        ws: true, // 是否启用websockets
        //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
        changOrigin: true,
      }
    },
    before: app => {

    }
  },

  // configureWebpack: {
  //   plugins: [

  //   ]
  // }
}
