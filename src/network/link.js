import request from './request'

export function getLinks(params) {
  return request({
    url: '/link',
    params
  })
}

export function addLink(data) {
  return request({
    url: '/link',
    method: 'post',
    data
  })
}

export function deleteLinkById(id) {
  return request({
    url: '/link',
    method: 'delete',
    params: { id }
  })
}

export function batchDelete(ids) {
  return request({
    url: '/link/batchDelete',
    method: 'delete',
    data: ids
  })
}
