<template>
  <div id="blog-type-admin">
    <crud
      :edible="edible"
      :removable="removable"
      @clickAdd="clickAdd"
      @clickEdit="clickEdit"
      @clickRemove="clickRemove"
    />
    <el-table :data="page.contents" @selection-change="selectionChangeHandler">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="typename" label="博客类型名称" />
      <el-table-column prop="orderno" label="排序序号" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary" @click="edit(scope.row)" />
          <el-button icon="el-icon-delete" type="danger" @click="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next"
      :total="page.total"
      @current-change="handleCurrentChange"
    />
    <blog-type-edit
      :dialog-visible="dialogVisible"
      @editClose="editClose"
      @refresh="_getBlogTypeWithParams"
    />
  </div>
</template>

<script>
import Crud from 'components/crud/Crud'
import { getBlogTypesWithParams, removeBlogTypeById, removeBlogTypeByIds } from 'network/blogType'
import BlogTypeEdit from './childComp/BlogTypeEdit.vue'
export default {
  components: {
    Crud,
    BlogTypeEdit
  },
  data() {
    return {
      page: {
        pageNum: 0,
        pageSize: 10,
        total: 0,
        contents: []
      },
      dialogVisible: false,
      selection: []
    }
  },
  computed: {
    edible() {
      return this.selection.length === 1
    },
    removable() {
      return this.selection.length !== 0
    }
  },
  created() {
    this._getBlogTypeWithParams()
  },
  methods: {
    _getBlogTypeWithParams() {
      const _page = {}
      _page.pageNum = this.page.pageNum
      _page.pageSize = this.page.pageSize
      getBlogTypesWithParams(_page).then(res => {
        this.page.contents = res.data.contents
        this.page.total = res.data.total
      })
    },
    clickAdd() {
      this.dialogVisible = true
      this.$store.commit('clearBlogType')
    },
    clickEdit() {
      this.dialogVisible = true
      this.$store.commit('editBlogType', this.selection[0])
    },
    clickRemove() {
      this.$confirm('确认删除选中的项目？').then(() => {
        const ids = this.selection.map(item => item.id)
        removeBlogTypeByIds(ids).then(() => {
          this._getBlogTypeWithParams()
        })
      }).catch(() => {})
    },
    editClose() {
      this.dialogVisible = false
    },
    handleCurrentChange(currentPage) {
      this.page.pageNum = currentPage - 1
      this._getBlogTypeWithParams()
    },
    selectionChangeHandler(val) {
      this.selection = val
    },
    edit(blogType) {
      this.dialogVisible = true
      this.$store.commit('editBlogType', blogType)
    },
    remove(blogType) {
      this.$confirm('确认删除选中的项目？').then(() => {
        removeBlogTypeById(blogType.id).then(() => {
          this._getBlogTypeWithParams()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
#blog-type-admin{
  .el-table{
    margin:20px auto;
  }
}
</style>
