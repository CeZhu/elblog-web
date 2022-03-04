<template>
  <div id="link-admin">
    <crud
      class="crud"
      :edible="edible"
      :removable="removable"
      @clickAdd="clickAdd"
      @clickEdit="clickEdit"
      @clickRemove="clickRemove"
    />
    <el-table :data="tableData" @selection-change="selectionChangeHandler">
      <el-table-column type="selection" />
      <el-table-column label="编号" prop="id" />
      <el-table-column label="友情链接名称" prop="linkname" />
      <el-table-column label="友情链接地址" prop="linkurl" />
      <el-table-column label="排序序号" prop="orderno" />
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
      @current-change="currentChangeHandler"
    />
    <link-admin-edit
      :dialog-visible="dialogVisible"
      @closeDialog="closeDialog"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import Crud from 'components/crud/Crud'
import LinkAdminEdit from './childComp/LinkAdminEdit.vue'
import { getLinks, deleteLinkById, batchDelete } from 'network/link'
export default {
  components: {
    Crud,
    LinkAdminEdit
  },
  data() {
    return {
      tableData: [],
      page: {
        pageNum: 0,
        pageSize: 10,
        total: 0
      },
      selection: [],
      dialogVisible: false
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
    this._getLinks()
  },
  methods: {
    _getLinks() {
      const _page = {}
      _page.pageNum = this.page.pageNum
      _page.pageSize = this.page.pageSize
      getLinks(_page).then(res => {
        this.tableData = res.data.contents
        this.page.total = res.data.total
      })
    },
    currentChangeHandler(currentPage) {
      this.page.pageNum = currentPage - 1
      this._getLinks()
    },
    clickAdd() {
      this.dialogVisible = true
      this.$store.commit('clearLink')
    },
    clickEdit() {
      this.dialogVisible = true
      this.$store.commit('editLink', this.selection[0])
    },
    clickRemove() {
      const ids = this.selection.map(item => item.id)
      this.$confirm('确认删除选中的项目?').then(() => {
        batchDelete(ids).then(() => {
          this._getLinks()
        })
      })
    },
    closeDialog() {
      this.dialogVisible = false
    },
    selectionChangeHandler(val) {
      this.selection = val
    },
    refresh() {
      this._getLinks()
    },
    edit(link) {
      this.$store.commit('editLink', link)
      this.dialogVisible = true
    },
    remove(link) {
      console.log(link)
      this.$confirm('确认删除该项?').then(() => {
        deleteLinkById(link.id).then(() => {
          this._getLinks()
        })
      })
    }
  }
}
</script>

<style lang="less">
#link-admin{
  .el-table{
    margin:20px auto;
  }
}
</style>
