<template>
  <div>
    <el-date-picker
      v-model="startDate"
      type="date"
      :placeholder="startPlaceholder"
      :disabledDate="startDisabledDate"
      v-bind="$attrs.startOptions"
    ></el-date-picker>

    <el-date-picker
      v-model="endDate"
      type="date"
      :placeholder="endPlaceholder"
      :disabled="endDateDisabled"
      :disabledDate="endDisabledDate"
      v-bind="$attrs.endOptions"
    ></el-date-picker>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
let props = defineProps({
  // 开始日期的占位符
  startPlaceholder: {
    type: String,
    default: "请选择开始日期",
  },
  // 结束日期的占位符
  endPlaceholder: {
    type: String,
    default: "请选择结束日期",
  },
  // 是否禁用选择今天之前的日期
  disableToday: {
    type: Boolean,
    default: true,
  },
});

let emits = defineEmits(["startChange", "endChange"]);

// 开始日期
let startDate = ref<Date | null>(null);
// 结束日期
let endDate = ref<Date | null>(null);
// 控制结束日期的禁用状态
let endDateDisabled = ref<boolean>(true);

// 禁用开始日期的函数
let startDisabledDate = (time: Date) => {
  if (props.disableToday)
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;
};
// 禁用结束日期的函数
let endDisabledDate = (time: Date) => {
  if (startDate.value) {
    return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24;
  }
};

// 监听开始的日期
watch(() => startDate.value, val => {
  if (!val) {
    endDateDisabled.value = true
    endDate.value = null
  } else {
    emits('startChange', val)
    endDateDisabled.value = false
  }
})
// 监听结束的日期
watch(() => endDate.value, val => {
  if (val) {
    emits('endChange', {
      startDate: startDate.value,
      endDate: val
    })
  }
})
</script>

<style lang="scss" scoped></style>
