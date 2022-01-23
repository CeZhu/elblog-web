import request from './request'

export function getBlogger() {
  return request({
    url: '/blogger/about'
  })
}
