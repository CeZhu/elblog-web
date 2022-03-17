<template>
  <div id="blog-admin">
    <div class="top-bar">
      <crud
        class="crud"
        :edible="edible"
        :removable="removable"
        :exportable="exportable"
        @clickAdd="clickAdd"
        @clickEdit="clickEdit"
        @clickRemove="clickRemove"
        @clickDownload="clickDownload"
      />
      <div class="search-bar">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          value-format="yyyy-MM-dd"
        />
        <el-input v-model="title" placeholder="请输入标题" clearable="" />
        <el-button type="primary" icon="el-icon-search" size="mini" @click="_getBlogs">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" @selection-change="selectionChangeHandler">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="编号" width="100" />
      <el-table-column prop="title" label="标题" width="400" />
      <el-table-column prop="releasedate" label="发布日期" />
      <el-table-column prop="blogType.typename" label="博客类别" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary" @click="editBlog(scope.row)" />
          <el-button icon="el-icon-delete" type="danger" @click="removeBlog(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next"
      :total="page.total"
      @current-change="currentChangeHandler"
    />
  </div>
</template>

<script>
import Crud from 'components/crud/Crud'
import { getBlogs, deleteBlog, deleteBlogs, download } from 'network/home'
export default {
  components: {
    Crud
  },
  data() {
    return {
      tableData: [],
      pageNum: 0,
      pageSize: 10,
      page: {},
      selection: [],
      title: '',
      dateRange: []
    }
  },
  computed: {
    edible() {
      return this.selection.length === 1
    },
    removable() {
      return this.selection.length !== 0
    },
    exportable() {
      return true
    }
  },
  created() {
    this._getBlogs()
  },
  methods: {
    _getBlogs() {
      getBlogs(this.getQueryParams()).then(res => {
        this.page = res.data
        this.tableData = res.data.contents
      })
    },
    getQueryParams() {
      let startDate = ''
      let endDate = ''
      if (this.dateRange) {
        startDate = this.dateRange.length !== 0 ? this.dateRange[0] : ''
        endDate = this.dateRange.length !== 0 ? this.dateRange[1] : ''
      }
      return {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: this.title,
        startDate,
        endDate
      }
    },
    editBlog(blog) {
      this.$router.push({ name: 'writeBlog', params: blog })
    },
    removeBlog(blog) {
      this.$confirm('确认删除选中的项目？').then(() => {
        deleteBlog(blog.id).then(res => {
          this._getBlogs()
        })
      }).catch(() => {})
    },
    clickAdd() {
      this.$router.push('/admin/writeBlog')
    },
    clickEdit() {
      this.$router.push({ name: 'writeBlog', params: this.selection[0] })
    },
    clickRemove() {
      this.$confirm('确认删除选中的项目？').then(() => {
        const ids = this.selection.map(item => item.id)
        deleteBlogs(ids).then(() => {
          this._getBlogs()
        })
      }).catch(() => {})
    },
    clickDownload() {
      download(this.getQueryParams()).then(res => {
        const blob = new Blob([res.data])
        console.log(blob)
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        const fileName = 'download.xlsx'
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
    },
    currentChangeHandler(currentPage) {
      this.pageNum = currentPage - 1
      this._getBlogs()
    },
    selectionChangeHandler(val) {
      this.selection = val
    }
  }
}
</script>

<style lang="less" scoped>
#blog-admin{
  .top-bar{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .search-bar{
        display: flex;
        margin-left: auto;
        .el-button{
          margin-left: 20px;
        }
        .el-input{
          width:200px;
          margin-left:20px;
        }

      }
      .crud{
        margin-right: 20px;
      }
  }

  .el-table{
    margin-bottom: 20px;
  }
}
</style>
