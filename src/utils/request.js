import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8795/api-bcra', //后期要处理跨域问题
  timeout: 1500000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    // token 先不处理，后续使用时在完善
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
service.interceptors.response.use(
  res => {
    return Promise.resolve(res.data)
  },
  error => {
    return Promise.reject(error.response)
  })


export default service
