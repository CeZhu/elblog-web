<template>
  <el-container id="blog-list">
    <el-header height="40px">
      <img src="~assets/img/list_icon.png" alt="">
      <span id="title">最新博客</span>
    </el-header>
    <el-main>
      <div v-if="page.contents && page.contents.length!==0">
        <blog-list-item v-for="(item,index) in page.contents" :key="index" :blog="item" />
      </div>
      <div v-else>没有找到相关内容</div>
    </el-main>

  </el-container>
</template>

<script>
import BlogListItem from './BlogListItem.vue'
export default {
  components: {
    BlogListItem
  },
  props: {
    page: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
#blog-list{
  background-color: #f8f8f8;
  margin-top:20px;
  margin-bottom:20px;
  border:1px solid #e7e7e7;
  border-radius: 4px;
  padding:0 10px;

  .el-header{
    border-bottom: 1px #e5e5e5 solid;
    font-size: 15px;
    font-weight: bold;
    img{
      margin-right:10px;
    }

    #title{
      line-height: 40px;
    }
  }
}
</style>
