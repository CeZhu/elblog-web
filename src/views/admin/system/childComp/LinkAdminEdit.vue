<template>
  <div id="link-admin-edit">
    <el-dialog
      :title="form.title"
      :visible="dialogVisible"
      :before-close="handleClose"
      @open="formReset"
    >
      <el-form ref="form" :model="form" label-position="left" label-width="120px" :rules="formRule">
        <el-form-item label="友情链接名称" prop="linkname">
          <el-input v-model="form.linkname" />
        </el-form-item>
        <el-form-item label="友情链接地址" prop="linkurl">
          <el-input v-model="form.linkurl" />
        </el-form-item>
        <el-form-item label="排序序号" prop="orderno">
          <el-input v-model.number="form.orderno" />
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
import { addLink } from 'network/link'
export default {
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        id: '',
        title: '新增友情链接',
        linkname: '',
        linkurl: '',
        orderno: ''
      },
      formRule: {
        linkname: [{ required: true, message: '链接名称不得为空', trigger: 'blur' }],
        linkurl: [{ required: true, message: '链接地址不得为空', trigger: 'blur' }],
        orderno: [
          { required: true, message: '排序序号不得为空', trigger: 'blur' },
          { type: 'number', message: '请输入数字' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog')
    },
    formReset() {
      const storeLink = this.$store.state.link
      this.form.id = storeLink.id
      this.form.title = storeLink.title
      this.form.linkname = storeLink.linkname
      this.form.linkurl = storeLink.linkurl
      this.form.orderno = storeLink.orderno
      this.$refs.form.clearValidate()
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addLink(this.form).then(() => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$emit('refresh')
            this.resetForm()
            this.$nextTick(() => {
              this.$refs.form.clearValidate()
            })
          })
        }
      })
    },
    resetForm() {
      this.form.linkname = ''
      this.form.linkurl = ''
      this.form.orderno = ''
    }
  }
}
</script>

<style>

</style>
