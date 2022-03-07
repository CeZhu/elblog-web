<template>
  <div id="front">
    <div class="top-img"><img src="~assets/img/logo.png" alt="JAVA个人博客系统"></div>
    <nav-bar @refreshHome="refreshPage" />
    <div class="main">
      <div class="left"><router-view :key="activeDate" /></div>
      <div class="right">
        <side-block>
          <div slot="img">
            <img src="~assets/img/user_icon.png" alt="">
          </div>
          <div slot="title">
            {{ blocks[0] }}
          </div>
          <div slot="content" class="side-block-content">
            <div>
              <el-avatar :src="blogger.imagename" :size="100" />
            </div>
            <div><b>{{ blogger.nickname }}</b></div>
            <div>{{ blogger.sign }}</div>
          </div>
        </side-block>
        <side-block>
          <div slot="img">
            <img src="~assets/img/byType_icon.png" alt="">
          </div>
          <div slot="title">
            {{ blocks[1] }}
          </div>
          <div slot="content" class="side-block-blog-type">
            <div v-for="item in blogTypeList" :key="item.id"><a @click="refreshPage({typeId:item.id})">{{ item.typename }}({{ item.count }})</a></div>
          </div>
        </side-block>
        <side-block>
          <div slot="img">
            <img src="~assets/img/byDate_icon.png" alt="">
          </div>
          <div slot="title">
            {{ blocks[2] }}
          </div>
          <div slot="content" />
        </side-block>
        <side-block>
          <div slot="img">
            <img src="~assets/img/link_icon.png" alt="">
          </div>
          <div slot="title">
            {{ blocks[3] }}
          </div>
          <div slot="content" />
        </side-block>

      </div>
    </div>

  </div>
</template>

<script>
import NavBar from 'views/navBar/NavBar'
import SideBlock from 'views/sideBlock/SideBlock'
import { getBlogger } from 'network/blogger'
import { countBlogType } from 'network/blogType'
export default {
  components: {
    NavBar,
    SideBlock
  },
  data() {
    return {
      blocks: ['博主信息', '按日志类别', '按日志日期', '友情链接'],
      blogger: {},
      blogTypeList: [],
      activeDate: ''
    }
  },
  created() {
    getBlogger().then(res => {
      this.blogger = res.data
    })
    countBlogType().then(res => {
      this.blogTypeList = res.data
    })
  },
  methods: {
    refreshPage(param) {
      this.activeDate = new Date().toString()
      this.$router.push({
        name: 'home',
        query: param
      })
    }
  }
}
</script>

<style lang="less">
#front{
  width:1020px;
  margin:auto;
  margin-bottom: 100px;
  font-family: "Helvet|ica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.top-img{
  height: 100px;
  overflow: hidden;
}
.main{
  display: flex;
  justify-content: space-between;
}

img{
  margin-right: 10px;
}

.side-block-content{
  text-align: center;
}
.side-block-content div{
  margin:10px;
}

.side-block-blog-type div{
  margin:10px 20px;
  font-size:14px;
  a{
    text-decoration: none;
    color: #337ab7;
  }
  a:hover{
    text-decoration: underline;
    cursor: pointer;
  }
}

</style>
