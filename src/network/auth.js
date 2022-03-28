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

export function modiftyPassword(data) {
  return request({
    url: '/auth/password',
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function logout() {
  return request({
    url: '/sys/logout'
  })
}
