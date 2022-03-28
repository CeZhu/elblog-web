<template>
  <div id="admin">
    <el-container>
      <el-header height="100px">
        <img src="~assets/img/logo.png" @click="goToHome">
      </el-header>

      <el-container>
        <el-aside>
          <el-menu>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-document" />博客管理</template>
              <el-menu-item-group>
                <el-menu-item @click="goToWriteBlog">写博客</el-menu-item>
                <el-menu-item @click="goToBlogAdmin">博客信息管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-collection" />博客类别管理</template><el-menu-item-group>
                <el-menu-item @click="goToBlogTypeAdmin">博客类别信息管理</el-menu-item>
              </el-menu-item-group></el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-chat-round" />评论管理</template>
              <el-menu-item-group>
                <!-- <el-menu-item>评论审核</el-menu-item> -->
                <el-menu-item @click="goToCommentAdmin">评论信息管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-user" />个人信息管理</template>
              <el-menu-item-group>
                <el-menu-item @click="goToBloggerAdmin">修改个人信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-setting" />系统管理</template>
              <el-menu-item-group>
                <el-menu-item @click="goToLinkAdmin">友情链接管理</el-menu-item>
                <el-menu-item @click="modifyPassword">修改密码</el-menu-item>
                <!-- <el-menu-item>刷新系统缓存</el-menu-item> -->
                <el-menu-item @click="_logout">安全退出</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main><router-view :key="activeDate" /></el-main>
      </el-container>
    </el-container>

    <password-change
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import PasswordChange from './system/childComp/PasswordChange.vue'
import { logout } from 'network/auth'
import { removeToken } from 'network/token'
export default {
  components: {
    PasswordChange
  },
  data() {
    return {
      dialogVisible: false,
      activeDate: ''
    }
  },
  methods: {
    goToBlogAdmin() {
      this.$router.push('/admin/blog')
    },
    goToWriteBlog() {
      // this.$router.push('/admin/blank')
      this.activeDate = new Date().toString()
      this.$router.push('/admin/writeBlog')
    },
    goToBlogTypeAdmin() {
      this.$router.push('/admin/blogType')
    },
    goToHome() {
      this.$router.push('/home')
    },
    goToCommentAdmin() {
      this.$router.push('/admin/comment')
    },
    goToBloggerAdmin() {
      this.$router.push('/admin/blogger')
    },
    goToLinkAdmin() {
      this.$router.push('/admin/link')
    },
    modifyPassword() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    _logout() {
      logout().then(() => {
        removeToken()
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
#admin{
  .el-header{
    img{
      cursor: pointer;
    }
  }
}
</style>
