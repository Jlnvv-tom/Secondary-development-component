<template>
  <div>
    <w-choose-time
      :startTime="12"
      @startChange="startChange"
      @endChange="endChange"
      >
    </w-choose-time>
  </div>
</template>

<script lang="ts" setup>

interface endValue {
  startTime: string,
  endTime: string
}

let startChange = (val: string) => {
  console.log(val);
};

let endChange = (val: endValue) => {
  console.log(val);
};
</script>

<style lang="scss" scoped></style>
