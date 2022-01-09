import request from './request'

export function getBlogs(params) {
  return request({
    url: '/blog',
    params
  })
}
