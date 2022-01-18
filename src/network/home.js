import request from './request'

export function getBlogs(params) {
  return request({
    url: '/blog',
    params
  })
}
export function getBlogById(id) {
  return request({
    url: `/blog/${id}`
  })
}

export function getPrevBlog(id) {
  return request({
    url: '/blog/prev',
    params: {
      id
    }
  })
}

export function getNextBlog(id) {
  return request({
    url: '/blog/next',
    params: {
      id
    }
  })
}
