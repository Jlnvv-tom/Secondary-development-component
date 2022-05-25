<template>
  <div>
    <el-popover
      placement="bottom"
      :width="300"
      trigger="click"
    >
      <template #default>
        <slot></slot>
      </template>
      <template #reference>
        <el-badge :value="value" :max="max" :is-dot="isDot">
          <el-icon><component :is="icon" /></el-icon>
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
let props = defineProps({
  // 图标
  icon: {
    type: String,
    default: "Bell",
  },
  // 通知数量
  value: {
    type: [String, Number],
    default: "",
  },
  // 最大值
  max: {
    type: Number,
  },
  // 是否显示小圆点
  isDot: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
