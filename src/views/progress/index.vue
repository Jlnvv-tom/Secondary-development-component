<template>
  <div>
    <w-progress :percentage="80"></w-progress>
    <br>
     <w-progress :percentage="60" type="dashboard" ></w-progress>
    <br>
     <w-progress :percentage="80" isAnimate></w-progress>
    <br>
     <w-progress :percentage="80" type="circle" isAnimate></w-progress>
     <br>
     <w-progress  :time="5000" isAnimate  :text-inside="true" :stroke-width="24" :percentage="100" status="success" > </w-progress>
    <br>
     <w-progress :percentage="100" status="success" type="circle" isAnimate></w-progress>
    <br>
      <w-progress
        :percentage="100"
        status="success"
        :indeterminate="true"
        :duration="5">
      </w-progress>
    <br>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'

</script>

<style lang="scss" scoped>

</style>