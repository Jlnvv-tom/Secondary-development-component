<template>
  <div>
    <el-button type="primary" @click='open'>open</el-button>
    <w-model-form
    v-model:visible="visible"
    ></w-model-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
let visible = ref<boolean>(false)
let open = () => {
  visible.value = true
}


</script>

<style lang="" scoped>

</style>