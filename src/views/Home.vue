<template>
  <div>
    home
    <w-choose-icon title="图标按钮" v-model:visible="isVisible">选择图标</w-choose-icon>
    粘贴到这里试一下<el-input v-model='test'></el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let isVisible = ref<boolean>(false)
let test = ref<string>('')
</script>

<style lang="scss" scoped>

</style>