<template>
  <div id="front">
    <div class="top-img"><img src="~assets/img/logo.png" alt="JAVA个人博客系统"></div>
    <nav-bar />
    <div class="main">
      <div class="left"><router-view /></div>
      <div class="right">
        <side-block>
          <div slot="img">
            <img src="~assets/img/user_icon.png" alt="">
          </div>
          <div slot="title">
            {{ blocks[0] }}
          </div>
          <div slot="content" />
        </side-block>
        <side-block>
          <div slot="img">
            <img src="~assets/img/byType_icon.png" alt="">
          </div>
          <div slot="title">
            {{ blocks[1] }}
          </div>
          <div slot="content" />
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
export default {
  components: {
    NavBar,
    SideBlock
  },
  data() {
    return {
      blocks: ['博主信息', '按日志类别', '按日志日期', '友情链接']
    }
  }
}
</script>

<style lang="less">
#front{
  width:1020px;
  margin:auto;
  margin-bottom: 100px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
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

</style>
