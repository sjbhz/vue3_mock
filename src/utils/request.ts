import axios from "axios";
import { baseURL_dev, baseURL_dev_mock } from '../config/baseURL'

//初始化一个axios对象
const instance = axios.create({
    // baseURL: baseURL_dev,
    baseURL: baseURL_dev_mock,
    timeout: 30000,
    // headers: {
    //     "Content-Type":'application/json;charset:utf-8',
    //     'X-Custom-Header': 'foobar' 
    //   }
});
// 请求拦截器
instance.interceptors.request.use((config) => {
    // 每次请求前添加token
    config.headers['token'] = sessionStorage.getItem('token')
    return config
}, (error) => {
    return Promise.reject(error)

})
// 响应拦截器
instance.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)

})

//get请求方法
export const $get = async (url: string, params: object = {}) => {
    let { data } = await instance.get(url, { params })
    return data
}

//post方法
export const $post = async (url: string, params: object = {}) => {
    let { data } = await instance.post(url, params)
    return data

}