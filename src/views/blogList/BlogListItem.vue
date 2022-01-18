<template>
  <div id="blog">
    <div class="title" @click="goToBlog">{{ blog.title }}</div>
    <div class="summary">摘要: {{ blog.summary }}...</div>
    <div class="info">发表于{{ releaseDate }} 阅读({{ blog.clickhit }}) 评论({{ blog.replyhit }})</div>
  </div>
</template>

<script>
import Datetime from 'utils/datetime.js'
export default {
  props: {
    blog: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    releaseDate() {
      return Datetime.convertDate(this.blog.releasedate)
    }
  },
  methods: {
    goToBlog() {
      const id = this.blog.id
      this.$router.push({ path: `/blog/${id}` })
    }
  }
}
</script>

<style scoped lang="less">
#blog{
  margin-bottom:30px;
  border-bottom: 1px dashed #e7e7e7;
  overflow: hidden;
  .title{
    color: #935A32;
    font-weight: bold;
    cursor: pointer;
  }

  .summary{
    padding-top:10px;
    font-size: 13px;
  }

  .info{
    float:right;
    font-size: 12px;
    padding-bottom:10px;
    padding-top:10px;
  }
}
</style>
