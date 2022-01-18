import request from './request'
export function captcha() {
  return request({
    url: '/auth/captcha'
  })
}
