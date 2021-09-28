import axios from 'axios'

export default function(config) {

    // 1.创建axios的实例
    const instance = axios.create({
        /*   baseURL: "http://152.136.185.210:7878/api/m5", */
        baseURL: '/api',
        timeout: 50000,

    });
    //axios拦截器
    //请求拦截
    instance.interceptors.request.use(config => {
            return config //拦截放行
        }, err => {
            console.log(err)
        })
        //响应拦截
    instance.interceptors.response.use(config => {
        return config
    }, err => {
        console.log(err)
    })


    // 2.传入对象进行网络请求

    return instance(config)
}