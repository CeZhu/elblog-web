<template>
  <div id="login" ref="login">
    <el-form
      ref="loginForm"
      :label-position="labelPosition"
      :rules="rules"
      :model="user"
      @submit.native.prevent
    >
      <h2>后台登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password" prefix-icon="el-icon-lock" />
      </el-form-item>
      <div class="btns">
        <el-button type="primary" native-type="submit" :loading="loading" @click="_login">
          <span v-if="!loading">登录</span>
          <span v-else>登录中...</span>
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { login } from 'network/auth'
import { setToken } from 'network/token'
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      loading: false,
      labelPosition: 'right',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$router.back()
    },
    _login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          login(this.user).then(res => {
            setToken(res.data, 1)
            this.$router.push('/admin/blog')
          }).catch(err => {
            this.loading = false
            console.log(err.response)
            this.$notify.error({
              title: '错误',
              message: err.response.data.message
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#login{
  background-image: url('~assets/img/background.jpg');
  height:100vh;
}
.el-form{
  z-index: 1;
  h2{
    text-align: center;
  }
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  position: fixed;
  left: 50%;
  top:20%;
  transform: translateX(-50%);
  background-color: #fff;
  padding:40px;
  width:300px;
  .btns{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
