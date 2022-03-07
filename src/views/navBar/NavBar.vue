<template>
  <div id="nav-bar">
    <div class="wrapper">
      <div class="home link" @click="goHome">首页</div>
      <div class="link" @click="goAbout">关于博主</div>
      <div class="link" @click="showLogin">后台登录</div>
      <div class="right">
        <div class="search"><el-input placeholder="请输入要查询的关键字..." /></div>
        <div class="btn"><el-button type="primary">搜索</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: false
    }
  },
  methods: {
    goHome() {
      this.$emit('refreshHome')
    },
    goAbout() {
      this.$router.push('/about')
    },
    showLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.wrapper{
  display: flex;
  align-items: center;
  border:solid 1px #e7e7e7;
  padding: 10px 10px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.1);
  background-color: #f8f8f8;
  border-radius: 4px;

  div{
    margin-right:20px;
    font-size: 14px;
    font-weight: bold;
  }

  .right{
    margin-left:auto;
    display: flex;
  }
  .home{
    font-weight: bold;
    font-size: 18px;
  }

  .link{
    cursor: pointer;
  }
  .search{
    margin-right:20px;
  }
}
</style>
