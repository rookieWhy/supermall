const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('assets', resolve('src/assets'))
            .set('network', resolve('src/network'))
            .set('views', resolve('src/views'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            //set第一个参数：设置的别名，第二个参数：设置的路径　　　　
    },
    devServer: {
        proxy: { //配置跨域
            '/api': {
                target: 'http://152.136.185.210:7878/api/hy66', //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true, //允许跨域
                pathRewrite: {
                    /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
                      实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
                     */
                    '^/api': ''
                }
            },
        }
    },
}