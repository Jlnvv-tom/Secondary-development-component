<template>
  <div>
    about
   <w-choose-area @change="changeArea"></w-choose-area>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
let changeArea = (val: any) => {
  console.log(val);
  
}
</script>

<style lang="scss" scoped>

</style>