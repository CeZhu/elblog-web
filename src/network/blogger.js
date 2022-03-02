import request from './request'

export function getBlogger() {
  return request({
    url: '/blogger/about'
  })
}

export function updateBlogger(data) {
  return request({
    url: '/blogger',
    method: 'put',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
