<template>
  <el-menu
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
    class="el-menu-vertical-demo"
    >
    <template v-for="(item, index) in data" :key="index">
      <el-menu-item v-if="!item.children || !item.children.length" :index="item.index">
        <el-icon v-if="item.icon">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>

      <el-sub-menu v-if="item.children && item.children.length" :index="item.index">
        <template #title>
          <el-icon v-if="item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="(item1, index1) in item.children" :key="index1" :index="item1.index">
          <el-icon v-if="item1.icon">
            <component :is="item1.icon"></component>
          </el-icon>
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { MenuItem } from "./types";

let props = defineProps({
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  // 默认选中菜单
  defaultActive: {
    type: String,
    default: "",
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
