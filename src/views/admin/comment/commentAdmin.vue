<template>
  <div id="comment-admin">
    <div class="btns">
      <el-button icon="el-icon-check" type="primary" :disabled="passable" @click="batchPass(selection)">通过</el-button>
      <el-button icon="el-icon-close" type="warning" :disabled="unpassable" @click="batchUnpass(selection)">未通过</el-button>
      <el-button icon="el-icon-delete" type="danger" :disabled="removable" @click="batchDelete">删除</el-button>
    </div>
    <el-table
      :data="page.contents"
      @selection-change="selectionChangeHandler"
    >
      <el-table-column type="selection" />
      <el-table-column prop="id" label="编号" width="50px" />
      <el-table-column prop="" label="博客标题">
        <template slot-scope="scope">
          <span v-if="scope.row.blog">{{ scope.row.blog.title }}</span>
          <span v-else style="color:red">该博客已被删除</span>
        </template>
      </el-table-column>
      <el-table-column prop="userip" label="用户IP" width="100px" />
      <el-table-column prop="content" label="评论内容" />
      <el-table-column prop="commentdate" label="评论日期" />
      <el-table-column prop="state" label="评论状态" width="100px" :formatter="stateFormat" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-check" type="primary" :disabled="scope.row.state!==0 && scope.row.state!==2" @click="pass(scope.row)" />
          <el-button icon="el-icon-close" type="warning" :disabled="scope.row.state!==0 && scope.row.state!==1" @click="unpass(scope.row)" />
          <el-button icon="el-icon-delete" type="danger" @click="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next"
      :total="page.total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getCommentsByPage, update, deleteById, batchUpdate, batchDelete } from 'network/comment'
export default {
  data() {
    return {
      page: {
        pageNum: 0,
        pageSize: 10,
        total: 0,
        contents: []
      },
      selection: []
    }
  },
  computed: {
    passable() {
      if (this.selection.length === 0) return true
      for (let i = 0; i < this.selection.length; i++) {
        if (this.selection[i].state === 1) return true
      }
      return false
    },
    unpassable() {
      if (this.selection.length === 0) return true
      for (let i = 0; i < this.selection.length; i++) {
        if (this.selection[i].state === 2) return true
      }
      return false
    },
    removable() {
      return this.selection.length === 0
    }
  },
  created() {
    this._getCommentsByPage()
  },
  methods: {
    _getCommentsByPage() {
      const _page = {}
      _page.pageNum = this.page.pageNum
      _page.pageSize = this.page.pageSize
      getCommentsByPage(_page).then(res => {
        this.page.total = res.data.total
        this.page.contents = res.data.contents
      })
    },
    handleCurrentChange(currentPage) {
      this.page.pageNum = currentPage - 1
      this._getCommentsByPage()
    },
    stateFormat(row, column) {
      switch (row.state) {
        case 0:
          return '未审核'
        case 1:
          return '通过'
        case 2:
          return '未通过'
        default:
          return
      }
    },
    selectionChangeHandler(val) {
      this.selection = val
    },
    pass(comment) {
      comment.state = 1
      update(comment).then(() => {
        this._getCommentsByPage()
      })
    },
    unpass(comment) {
      comment.state = 2
      update(comment).then(() => {
        this._getCommentsByPage()
      })
    },
    remove(comment) {
      this.$confirm('确认删除该项?').then(() => {
        deleteById(comment.id).then(() => {
          this._getCommentsByPage()
        })
      }).catch(() => {})
    },
    batchPass(selection) {
      this.$confirm('确认修改选中的项目?').then(() => {
        selection.forEach(comment => { comment.state = 1 })
        batchUpdate(selection).then(() => {
          this._getCommentsByPage()
        })
      }).catch(() => {})
    },
    batchUnpass(selection) {
      this.$confirm('确认修改选中的项目?').then(() => {
        selection.forEach(comment => { comment.state = 2 })
        batchUpdate(selection).then(() => {
          this._getCommentsByPage()
        })
      }).catch(() => {})
    },
    batchDelete() {
      this.$confirm('确认删除选中的项目?').then(() => {
        const ids = this.selection.map(comment => comment.id)
        batchDelete(ids).then(() => {
          this._getCommentsByPage()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less">
#comment-admin{
  .el-table{
    margin:20px auto;
  }
}
</style>
