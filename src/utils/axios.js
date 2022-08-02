import axios from 'axios';

const BASE_API = axios.defaults.baseURL = 'http://127.0.0.1:8080';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: BASE_API,
  // 超时
  timeout: 10000
})

// 响应拦截器
axios.interceptors.response.use(
    res => res.data,  // 拦截到响应对象，将响应对象的 data 属性返回给调用的地方
    err => Promise.reject(err)
)

export default service
