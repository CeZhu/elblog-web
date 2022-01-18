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
