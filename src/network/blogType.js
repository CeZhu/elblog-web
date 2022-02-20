import request from './request'

export function getBlogTypes() {
  return request({
    url: '/blogType'
  })
}

export function getBlogTypesWithParams(params) {
  return request({
    url: '/blogType/page',
    params
  })
}

export function addBlogType(data) {
  return request({
    url: '/blogType',
    method: 'post',
    data: data
  })
}

export function removeBlogTypeById(id) {
  return request({
    url: 'blogType',
    method: 'delete',
    params: {
      id
    }
  })
}

export function removeBlogTypeByIds(ids) {
  return request({
    url: '/blogType/deleteByIds',
    method: 'delete',
    data: ids
  })
}
