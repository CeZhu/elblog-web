import request from './request'
// import qs from 'qs'

export function getCommentList(params) {
  return request({
    url: '/comment',
    params
  })
}

export function saveComment(comment, vCode, key) {
  return request({
    url: '/comment',
    method: 'post',
    data: { comment, vCode, key },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getCommentsByPage(params) {
  return request({
    url: '/comment/page',
    params
  })
}

export function update(data) {
  return request({
    url: '/comment',
    method: 'put',
    data
  })
}

export function deleteById(id) {
  return request({
    url: '/comment',
    method: 'delete',
    params: { id }
  })
}

export function batchUpdate(comments) {
  return request({
    url: '/comment/batchUpdate',
    method: 'put',
    data: comments
  })
}

export function batchDelete(ids) {
  return request({
    url: '/comment/batchDelete',
    method: 'delete',
    data: ids
  })
}
