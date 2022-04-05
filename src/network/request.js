import axios from 'axios'
import { getToken, removeToken } from 'network/token'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})

// 请求拦截
instance.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['token'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use(res => {
  return res
}, err => {
  const status = err.response.status
  console.log(status)
  if (status === 401) {
    removeToken()
  }
  return Promise.reject(err)
})

export default instance
