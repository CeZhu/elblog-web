const mutations = {
  editBlogType(state, payload) {
    state.blogType = payload
    state.blogType.title = '修改博客类别'
  },
  clearBlogType(state) {
    state.blogType = {}
    state.blogType.title = '添加博客类别'
  },
  editLink(state, payload) {
    state.link = payload
    state.link.title = '修改友情链接'
  },
  clearLink(state) {
    state.link = {}
    state.link.title = '添加友情链接'
  }
}
export default mutations
