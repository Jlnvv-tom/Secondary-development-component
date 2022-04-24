<template>
  <div>
    home
    <w-choose-icon title="图标按钮" v-model:visible="isVisible">选择图标</w-choose-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let isVisible = ref<boolean>(false)
</script>

<style lang="scss" scoped>

</style>