import Cookies from 'js-cookie'

// cookie存储时间默认以天为单位
export function setToken(token, time) {
  Cookies.set('elblog-token', token, { expires: time })
}

export function getToken() {
  return Cookies.get('elblog-token')
}

export function removeToken() {
  Cookies.remove('elblog-token')
}
