<template>
  <div class="sideBar">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#fff"
      :collapse="collapse"
      router
      @open="handleOpen"
      @close="handleClose"
     >
      <el-menu-item index="/">
        <el-icon><location /></el-icon>
        <span>首 页</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon><document /></el-icon>
        <span>关 于</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <el-icon><setting /></el-icon>
        <span>设 置</span>
      </el-menu-item>
      <el-menu-item index="/form">
        <el-icon><Folder/></el-icon>
        <span>表单组件</span>
      </el-menu-item>
      <el-menu-item index="/modelForm">
        <el-icon><Folder/></el-icon>
        <span>模态框表单组件</span>
      </el-menu-item>
      <el-menu-item index="/wTable">
        <el-icon><Folder/></el-icon>
        <span>表格组件</span>
      </el-menu-item>
      <el-menu-item index="/wTrend">
        <el-icon><Folder/></el-icon>
        <span>趋势组件</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
let props = defineProps<{
  collapse: boolean
}>()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.sideBar {
  height: 100%;
  background-color: #545c64;
  width: 100%
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

