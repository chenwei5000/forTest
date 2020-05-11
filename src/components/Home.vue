<template>
  <el-container>
    <el-header></el-header>
    <el-container>
      <el-aside width="100px"></el-aside>
      <el-main>
        <!-- 显示核心组件 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #666;
}

.el-aside {
  background-color: #f4f4f4;
}
</style>
