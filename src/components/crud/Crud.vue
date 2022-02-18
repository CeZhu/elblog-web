<template>
  <div id="crud">
    <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    <el-button type="success" icon="el-icon-edit" :disabled="!edible" @click="edit">修改</el-button>
    <el-button type="danger" icon="el-icon-delete" :disabled="!removable" @click="remove">删除</el-button>
  </div>
</template>

<script>
export default {
  props: {
    edible: {
      type: Boolean,
      default: false
    },
    removable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    add() {
      this.$emit('clickAdd')
    },
    edit() {
      this.$emit('clickEdit')
    },
    remove() {
      this.$emit('clickRemove')
    }
  }
}
</script>

<style>

</style>
