import axios from 'axios'
import { getToken } from 'network/token'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})

instance.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['token'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

export default instance
