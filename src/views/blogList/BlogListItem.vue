<template>
  <div id="blog">
    <div class="title">{{ blog.title }}</div>
    <div class="summary">摘要: {{ blog.summary }}</div>
    <div class="info">发表于{{ blog.releaseDate }} 阅读({{ blog.clickHit }}) 评论({{ blog.replyHit }})</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: {
        title: '这是标题',
        summary: '这是摘要',
        releaseDate: '2020-06-23 19:45',
        clickHit: 10,
        replyHit: 10
      }
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
  }

  .summary{
    padding-top:10px;
    font-size: 13px;
  }

  .info{
    float:right;
    font-size: 12px;
    padding-bottom:10px
  }
}
</style>
