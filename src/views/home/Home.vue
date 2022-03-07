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
import { getBlogs } from 'network/home'
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
      getBlogs(params).then(res => {
        this.page = res.data
      })
    },
    pageHandler(currentPage) {
      this.page.pageNum = currentPage - 1
      this.init()
    },
    init() {
      const params = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        typeId: this.$route.query.typeId,
        releaseDateStr: this.$route.query.releaseDateStr
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
