<template>
  <div class="header">
   <span @click="toggle">
    <div v-if="collapse"><el-icon><expand /></el-icon></div>
    <div v-else><el-icon><fold /></el-icon></div>
   </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
let props = defineProps<{
  collapse: boolean
}>()

let emits = defineEmits(['update:collapse'])

let toggle = () => {
  emits('update:collapse', !props.collapse)
}
</script>

<style lang="scss" scoped>
.header{
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>