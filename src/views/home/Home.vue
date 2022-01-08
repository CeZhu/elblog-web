<template>
  <div id="home">
    <blog-list />
    <el-pagination
      layout="prev, pager, next"
      :total="100"
    />
  </div>
</template>

<script>
import BlogList from 'views/blogList/BlogList'
export default {
  components: {
    BlogList
  }
}
</script>

<style scoped>
#home{
  width:800px;
  margin-bottom: 60px;
}
</style>
