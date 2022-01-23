<template>
  <div class="about">
    <blog-item>
      <div slot="head">
        <img src="~assets/img/about_icon.png" alt="关于博主">
        <span>关于博主</span>
      </div>
      <div slot="body">
        <div class="profile" v-html="profile" />
      </div>
    </blog-item>
  </div>
</template>

<script>
import BlogItem from 'views/blog/BlogItem'
import { getBlogger } from 'network/blogger'
export default {
  components: {
    BlogItem
  },
  data() {
    return {
      profile: ''
    }
  },
  created() {
    getBlogger().then(res => {
      this.profile = res.data.profile
    })
  }
}
</script>

<style lang="less" scoped>
.about{
  .profile{
    padding:20px;
  }
}
</style>
