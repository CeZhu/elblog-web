<template>
  <div id="login" ref="login">
    <el-form :label-position="labelPosition">
      <h2>后台登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="username" prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password" prefix-icon="el-icon-edit" />
      </el-form-item>
      <div class="btns">
        <el-button type="primary">登录</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      labelPosition: 'right'
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less">
.el-form{
  z-index: 1;
  h2{
    text-align: center;
  }
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
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
