import axios from 'axios'
import querystring from 'querystring'
const service = axios.create({
  // baseURL: '/api',
  timeout: 10 * 1000
})

// 拦截器
service.interceptors.request.use(config => {
  if (
    config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'delete'
  ) {
    
    // config.headers = { "Content-Type": "application/json" }
    // config.data = JSON.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default service
