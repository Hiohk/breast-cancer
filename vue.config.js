
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://127.0.0.4:8888',
        ws: true,
        changeOrigin: true,//开启跨域
        pathReWrite: {
          '^api': ''
        },
      }
    }
  }
}