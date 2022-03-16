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

export function viewBlogById(id) {
  return request({
    url: `/blog/view/${id}`
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

export function sortByDate() {
  return request({
    url: '/blog/sortByDate'
  })
}

export function addBlog(blog) {
  return request({
    url: '/blog',
    method: 'post',
    data: blog
  })
}

export function deleteBlog(id) {
  return request({
    url: '/blog',
    method: 'delete',
    params: {
      id
    }
  })
}

export function deleteBlogs(ids) {
  return request({
    url: '/blog/deleteBlogs',
    method: 'delete',
    data: ids
  })
}

export function elasticsearch(params) {
  return request({
    url: '/search',
    params
  })
}
