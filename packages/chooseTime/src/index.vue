<template>
  <div>
    <el-time-select
      v-model="startTime"
      v-bind="$attrs"
      :start="startTimeStart"
      :step="startStep"
      :end="startTimeEnd"
      :placeholder="startPlaceholder"
    />
     <el-time-select
      v-model="endTime"
      v-bind="$attrs"
      :min-time="startTime"
      :start="endTimeStart"
      :step="endStep"
      :end="endTimeEnd"
      :placeholder="endPlaceholder"
      :disabled="endTimeDisabled"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

let startTime = ref<string>('') // 开始时间
let endTime = ref<string>('') // 结束时间

let endTimeDisabled = ref<boolean>(true)

let emits = defineEmits(['startChange', 'endChange'])

let props = defineProps({
  // 开始时间的占位符
  startPlaceholder: {
    type: String,
    default: "请选择开始时间",
  },
  // 结束时间的占位符
  endPlaceholder: {
    type: String,
    default: "请选择结束时间",
  },
  // 开始时间的开始选择
  startTimeStart: {
    type: String,
    default: "08:00",
  },
  // 开始时间的步进
  startStep: {
    type: String,
    default: "00:30",
  },
  // 开始时间的结束选择
  startTimeEnd: {
    type: String,
    default: "24:00",
  },
  // 结束时间的开始选择
  endTimeStart: {
    type: String,
    default: "08:00",
  },
  // 结束时间的步进
  endStep: {
    type: String,
    default: "00:30",
  },
  // 结束时间的结束选择
  endTimeEnd: {
    type: String,
    default: "24:00",
  },
});

watch(() => startTime.value, (val: string) =>{
  if(val === '') {
    endTime.value = ''
    endTimeDisabled.value = true
  }
  else {
    endTimeDisabled.value = false
    emits('startChange', val)
  }
})

watch(() => endTime.value, (val: string) => {
  if(val !== '') {
    emits('endChange', {
      startTime: startTime.value,
      endTime: val
    })
  }
})


</script>

<style lang="scss" scoped></style>
