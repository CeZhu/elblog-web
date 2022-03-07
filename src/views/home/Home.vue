<template>
  <div id="home">
    <blog-list :page="page" />
    <el-pagination
      layout="total,prev, pager, next"
      :total="page.total"
      :current-page.sync="currentPage"
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
      page: {},
      currentPage: 0
    }
  },
  created() {
    const params = {
      pageNum: this.currentPage,
      pageSize: 10,
      typeId: this.$route.query.typeId
    }
    this.getHomeData(params)
  },
  methods: {
    getHomeData(params) {
      getBlogs(params).then(res => {
        this.page = res.data
      })
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
