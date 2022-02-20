const mutations = {
  editBlogType(state, payload) {
    state.blogType = payload
    state.blogType.title = '修改博客类别'
  },
  clearBlogType(state) {
    state.blogType = {}
    state.blogType.title = '添加博客类别'
  }
}
export default mutations
