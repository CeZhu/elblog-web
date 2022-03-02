<template>
  <div id="blogger-admin">
    <el-form ref="form" :model="form" label-width="80px" label-position="right" :rules="formRule">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input v-model="form.sign" />
      </el-form-item>
      <el-form-item label="个人头像">
        <el-upload
          class="upload-demo"
          :file-list="fileList"
          list-type="picture"
          :auto-upload="false"
          :on-change="handleChanged"
          action="#"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="个人简介">
        <mavon-editor v-model="form.profile" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getBlogger, updateBlogger } from 'network/blogger'
export default {
  data() {
    return {
      form: {
        username: '',
        nickname: '',
        sign: '',
        imagename: '',
        profile: '',
        file: ''
      },
      fileList: [],
      formRule: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this._getBlogger()
  },
  methods: {
    _getBlogger() {
      getBlogger().then(res => {
        const blogger = res.data
        this.form.username = blogger.username
        this.form.nickname = blogger.nickname
        this.form.sign = blogger.sign
        this.form.profile = blogger.profile
      })
    },
    handleChanged(file, fileList) {
      this.fileList = fileList
      this.form.file = file.raw
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formData = new FormData()
          formData.append('username', this.form.username)
          formData.append('nickname', this.form.nickname)
          formData.append('sign', this.form.sign)
          formData.append('profile', this.form.profile)
          formData.append('file', this.form.file)
          console.log(formData.get('file'))
          updateBlogger(formData).then(() => {
            this.$message({
              message: '导入成功',
              type: 'success'
            })
            this._getBlogger()
          })
        }
      })
    }

  }
}
</script>

<style>

</style>
