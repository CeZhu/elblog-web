import request from './request'
export function captcha() {
  return request({
    url: '/auth/captcha'
  })
}
export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}
