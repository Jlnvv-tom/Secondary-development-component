<template>
  <div>
    <div style="margin-bottom:50px">
      三级选择
      <w-choose-area @change="changeArea"></w-choose-area>
    </div>
   
    <div>
      四级选择
      <w-choose-areafour @change="changeAreaFour"></w-choose-areafour>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
let changeArea = (val: any) => {
  console.log(val);
}

let changeAreaFour = (val: any) => {
  console.log(val);
}

</script>

<style lang="scss" scoped>

</style>