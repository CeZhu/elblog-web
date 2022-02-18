import request from './request'

export function getBlogTypes() {
  return request({
    url: '/blogType'
  })
}

export function getBlogTypesWithParams(params) {
  return request({
    url: '/blogType',
    params
  })
}
