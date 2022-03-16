<template>
  <div id="write-blog">
    <el-form ref="ruleForm" label-position="top" :rules="rules" :model="blog">
      <el-form-item label="博客标题" prop="title">
        <el-input v-model="blog.title" />
      </el-form-item>
      <el-form-item label="所属类别" prop="blogType.id">
        <el-select v-model="blog.blogType.id" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.typename" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="博客内容" class="editor">
        <mavon-editor v-model="blog.content" />
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="blog.keyword" placeholder="多个关键字用空格分隔" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-success" @click="submit">
          <span v-if="blog.id===undefined">发布博客</span>
          <span v-else>更新博客</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getBlogTypes } from 'network/blogType'
import { addBlog } from 'network/home'
export default {
  data() {
    return {
      blog: {
        id: undefined,
        title: '',
        content: '',
        keyword: '',
        blogType: {
          id: ''
        }
      },
      options: [],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        blogType: {
          id: [{ required: true, message: '请选择类型', trigger: 'change' }]
        },
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: '请输入关键字', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this._getBlogTypes()
    this.init()
  },
  methods: {
    _getBlogTypes() {
      getBlogTypes().then(res => {
        this.options = res.data
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          addBlog(this.blog).then(res => {
            this.$alert('博客发布成功')
            if (!this.blog.id) {
              this.resetFields()
            }
          }, err => {
            // console.log(err.response)
            this.$alert(err.response.data.message)
          })
        } else {
          return false
        }
      })
    },
    resetFields() {
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields()
      })
      this.blog.blogType.id = ''
      this.blog.content = ''
    },
    init() {
      const params = this.$route.params
      this.blog.id = params.id
      this.blog.title = params.title
      this.blog.content = params.content
      this.blog.keyword = params.keyword
      if (params.blogType) { this.blog.blogType.id = params.blogType.id }
    }
  }
}
</script>

<style lang="less" scoped>
#write-blog{
  .el-form{
    .el-input{
      width:400px;
    }
  }
}
</style>
