<template>
  <div id="password-change">
    <el-dialog
      :visible="dialogVisible"
      :before-close="handleClose"
      :title="title"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="100px"
        :rules="formRule"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="typeAgain">
          <el-input v-model="form.typeAgain" type="password" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { modiftyPassword } from 'network/auth'
export default {
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      title: '修改密码',
      form: {
        oldPassword: '',
        newPassword: '',
        typeAgain: ''
      },
      formRule: {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        typeAgain: [{ required: true, message: '再次输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
      this.resetForm('form')
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('oldPassword', this.form.oldPassword)
          formData.append('newPassword', this.form.newPassword)
          modiftyPassword(formData).then(() => {
            this.$message({
              message: '密码修改成功!',
              type: 'success'
            })
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>

</style>
