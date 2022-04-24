<template>
  <el-container>
    <el-aside width="auto">
      <side-bar :collapse="isCollapse"></side-bar>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SideBar from "./sideBar.vue";
import NavHeader from './navHeader.vue';

const isCollapse = ref(false)

</script>

<style lang="scss" scoped>
.el-header {
  background-color: pink;
  padding: 0;
  border-bottom: 1px solid #eee;
  opacity: 0.8;
}
</style>
