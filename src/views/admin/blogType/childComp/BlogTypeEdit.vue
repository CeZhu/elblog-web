<template>
  <div id="blog-type-edit">
    <el-dialog
      :title="form.title"
      :visible="dialogVisible"
      :before-close="handleClose"
      width="500px"
      @open="refreshForm"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="right"
        label-width="120px"
        :rules="formRule"
      >
        <el-form-item label="博客类别名称" prop="typename">
          <el-input v-model="form.typename" size="mini" />
        </el-form-item>
        <el-form-item label="博客类别序号" prop="orderno">
          <el-input v-model.number="form.orderno" size="mini" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addBlogType } from 'network/blogType'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        title: '添加博客类别',
        id: '',
        typename: '',
        orderno: ''
      },
      formRule: {
        typename: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        orderno: [
          { required: true, message: '请输入序号', trigger: 'blur' },
          { type: 'number', message: '请输入数字' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('editClose')
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addBlogType(this.form).then(() => {
            this.$notify({
              title: '通知',
              message: '操作成功!'
            })
            this.$emit('refresh')
            this.form.typename = ''
            this.form.orderno = ''
          }).catch(err => {
            this.$notify({
              title: '错误信息',
              message: err.message
            })
          })
        } else {
          return false
        }
      })
    },
    refreshForm() {
      this.form.id = this.$store.state.blogType.id
      this.form.typename = this.$store.state.blogType.typename
      this.form.orderno = this.$store.state.blogType.orderno
      this.form.title = this.$store.state.blogType.title
    }
  }
}
</script>

<style lang="less">
#blog-type-edit{
  .el-input{
    width:300px;
  }
}
</style>
