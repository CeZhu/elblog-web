<template>
  <div id="blog">
    <blog-item class="blog-body">
      <div slot="head">
        <img src="~assets/img/blog_show_icon.png" alt="博客信息">
        <span>博客信息</span>
      </div>
      <div slot="body">
        <div class="content">
          <h2>{{ blog.title }}</h2>
          <p class="info">发布时间: {{ releaseDate }} 博客类别: {{ blog.blogType.typename }} 阅读({{ blog.clickhit }}) 评论({{ blog.replyhit }})</p>
          <p v-html="blog.content" />
        </div>
        <div class="keyword">
          <strong>关键字:</strong> <span v-for="(item,index) in blog.keyword" :key="index">{{ item }}</span>
        </div>
        <div class="change-page">
          <p>上一篇: <span :class="{active:hasPrev}" @click="changeBlog(prevBlog.id)">{{ prevBlogTitle }}</span></p>
          <p>下一篇: <span :class="{active:hasNext}" @click="changeBlog(nextBlog.id)">{{ nextBlogTitle }}</span></p>
        </div>
      </div>
    </blog-item>
    <blog-item class="blog-comment">
      <div slot="head">
        <img src="~assets/img/comment_icon.png" alt="评论信息">
        <span>评论信息</span>
      </div>
      <div v-if="commentList.length!==0" slot="body">
        <div v-for="(comment,index) in commentList" :key="comment.id" class="comment-list">
          <strong>{{ commentList.length - index }} 楼</strong> <span>{{ comment.userip }}: {{ comment.content }}</span> <span>[{{ comment.commentdate }}]</span>
        </div>
      </div>
      <div v-else slot="body">
        <div class="no-comment">
          暂无评论
        </div>
      </div>
    </blog-item>
    <blog-item class="write-comment">
      <div slot="head">
        <img src="~assets/img/comment_icon.png" alt="发表评论">
        <span>发表评论</span>
      </div>
      <div slot="body">
        <mavon-editor v-model="editor" />
        <div class="editor-bottom">
          <label for="vCode">验证码:</label>
          <el-input id="vCode" v-model="vCode" placeholder="请输入..." size="mini" maxlength="5" />
          <img :src="img" alt="验证码" @click="refresh">
          <el-button type="primary" @click="submit">发表评论</el-button>
        </div>
      </div>
    </blog-item>
  </div>
</template>

<script>
import BlogItem from './BlogItem.vue'
import { getBlogById, getPrevBlog, getNextBlog } from 'network/home'
import { getCommentList, saveComment } from 'network/comment'
import { captcha } from 'network/auth'
import Datetime from 'utils/datetime'
export default {
  components: {
    BlogItem
  },
  data() {
    return {
      blog: {
        releasedate: '',
        blogType: {}
      },
      prevBlog: {},
      nextBlog: {},
      commentList: [],
      editor: '',
      vCode: '',
      img: '',
      key: ''
    }
  },
  computed: {
    releaseDate() {
      return Datetime.convertDate(this.blog.releasedate)
    },
    prevBlogTitle() {
      return this.prevBlog.title ? this.prevBlog.title.trim() : '没有了'
    },
    nextBlogTitle() {
      return this.nextBlog.title ? this.nextBlog.title.trim() : '没有了'
    },
    hasPrev() {
      return this.prevBlog.id !== undefined
    },
    hasNext() {
      return this.nextBlog.id !== undefined
    }
  },
  created() {
    const id = this.$route.params.id
    this._getBlogById(id)
    this._captcha()
  },
  methods: {
    _getBlogById(id) {
      getBlogById(id).then(res => {
        this.blog = res.data
        getPrevBlog(id).then(res => {
          this.prevBlog = res.data
        })
        getNextBlog(id).then(res => {
          this.nextBlog = res.data
        })
        getCommentList({ blogid: this.blog.id }).then(res => {
          this.commentList = res.data
          this.commentList.forEach(comment => {
            comment.commentdate = Datetime.convertDate(comment.commentdate)
          })
        })
      })
    },
    changeBlog(id) {
      this.$router.push({ path: `/blog/${id}` })
      this._getBlogById(id)
    },
    _captcha() {
      captcha().then(res => {
        this.img = res.data.img
        this.key = res.data.key
      })
    },
    refresh() {
      this._captcha()
    },
    submit() {
      if (this.vCode.length < 5) {
        this.$confirm('请输入完整的验证码')
        return
      }
      const comment = { blogid: this.blog.id, content: this.editor }
      saveComment(comment, this.vCode, this.key).then(res => {
        this.$confirm('评论已提交，请等待审核通过。')
        this.refresh()
      }, err => {
        console.log(err)
        this.$confirm('评论提交失败，请联系管理员。')
        this.refresh()
      })
    }
  }

}
</script>

<style lang="less" scoped>
#blog{
  h2{
    text-align: center;
  }
  .info{
    text-align: center;
  }
  p{
    margin:10px;
  }
  .change-page{
    border-top:1px #e7e7e7 solid;
    padding:20px;
  }
  .keyword{
    padding:40px;
  }

  .comment-list{
    padding:20px;
    span{
      margin-left: 20px;
    }
  }

  .no-comment{
    padding: 20px;
  }

  .editor-bottom{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding:20px;
    .el-input{
      width: 100px;
    }
    *{
      margin-right:20px;
    }
  }
}
.active{
  color:#409eff;
  cursor:pointer;
}
.active:hover{
  text-decoration: underline;
}
</style>
