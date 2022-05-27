<template>
  <div class="sideBar">
    <!-- <el-menu
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
      <el-menu-item index="/wNotification">
        <el-icon><Folder/></el-icon>
        <span>通知组件</span>
      </el-menu-item>
      <el-menu-item index="/wMenu">
        <el-icon><Folder/></el-icon>
        <span>菜单组件</span>
      </el-menu-item>
    </el-menu> -->

    <w-menu
      :data="data"
      defaultActive="/"
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
      :collapse="collapse"
      router
    ></w-menu>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
let props = defineProps<{
  collapse: boolean
}>()

let data = [
  {
    name: "首 页",
    index: "/",
    icon: "location",
  },
  {
    name: "关 于",
    index: "/about",
    icon: "document",
  },
  {
    name: "设 置",
    index: "/setting",
    icon: "setting",
  },
  {
    name: "表单组件",
    index: "/form",
    icon: "Folder",
  },
  {
    name: "模态框表单组件",
    index: "/modelForm",
    icon: "Folder",
  },
   {
    name: "趋势组件",
    index: "/wTrend",
    icon: "document",
  },
  {
    name: "通知组件",
    index: "/wNotification",
    icon: "location",
  },
  {
    name: "菜单组件",
    index: "/wMenu",
    icon: "Folder",
  },
  {
    name: "表格组件",
    index: "/wTable",
    icon: "setting",
  },
  {
    name: "进度条组件",
    index: "/wProgress",
    icon: "setting",
  },
  {
    name: "时间组件",
    index: "/chooseTime",
    icon: "setting",
  },
]

// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
</script>

<style lang="scss" scoped>
.sideBar {
  height: 100%;
  background-color: #545c64;
  width: 100%
}

</style>

