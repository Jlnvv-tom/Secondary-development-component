<template>
  <div>
    <w-choose-time
      @startChange="startChange"
      @endChange="endChange"
      >
    </w-choose-time>
  </div>

  <div style="margin-top:120px">
    <w-choose-date @startChange="dateStartChange" @endChange="dateEndChange"></w-choose-date>
  </div>

</template>

<script lang="ts" setup>

interface endValue {
  startTime: string,
  endTime: string
}

interface dateEndValue {
  startDate: Date,
  endDate: Date
}

let startChange = (val: string) => {
  console.log(val);
};

let endChange = (val: endValue) => {
  console.log(val);
};

let dateStartChange = (val: Date) => {
  console.log(val)
}
let dateEndChange = (val: dateEndValue) => {
  console.log(val)
}
</script>

<style lang="scss" scoped></style>
