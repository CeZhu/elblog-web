<template>
  <div id="home">
    <blog-list :page="page" />
    <el-pagination
      layout="total,prev, pager, next"
      :total="page.total"
      @current-change="pageHandler"
    />
  </div>
</template>

<script>
import BlogList from 'views/blogList/BlogList'
import { getBlogs, elasticsearch } from 'network/home'
export default {
  components: {
    BlogList
  },
  data() {
    return {
      page: {
        pageNum: 0,
        pageSize: 10
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    getHomeData(params) {
      if (params.searchParam) {
        elasticsearch(params).then(res => {
          this.page = res.data
        })
      } else {
        getBlogs(params).then(res => {
          this.page = res.data
        })
      }
    },
    pageHandler(currentPage) {
      // document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.page.pageNum = currentPage - 1
      this.init()
    },
    init() {
      const params = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        typeId: this.$route.query.typeId,
        releaseDateStr: this.$route.query.releaseDateStr,
        searchParam: this.$route.query.searchParam
      }
      this.getHomeData(params)
    }
  }
}
</script>

<style scoped>
#home{
  width:800px;
  margin-bottom: 60px;
}
</style>
