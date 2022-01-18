<template>
  <div id="blog-item">
    <div class="head">
      <slot name="head" />
    </div>
    <div class="body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
#blog-item{
  width:800px;
  background-color: #f8f8f8;
  border-radius: 4px;
  border:1px solid #e7e7e7;
  margin-top:20px;
  .head{
    padding: 10px;
    font-weight: bold;
    border-bottom: 1px solid #e7e7e7;
    margin:0 10px;
  }
}
</style>
