<template>
  <div id="side-block">
    <div class="head">
      <slot name="img" />
      <slot name="title" />
    </div>
    <div class="body">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
#side-block{
  width:200px;
  background-color: #f8f8f8;
  border:1px solid #e7e7e7;
  border-radius: 4px;
  margin-top:20px;

  .head{
    display: flex;
    align-items: center;
    padding:10px;
    border-bottom: 1px solid #e7e7e7;
  }
}
</style>
