<template>
  <div>
    <el-progress :percentage="p" v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
let props = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
  isAnimate: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Number,
    default: 3000,
  },
});

let p = ref(0);

onMounted(() => {
  if (props.isAnimate) {
    // 规定时间内加载完成
    let t = Math.ceil(props.time / props.percentage);
    let timer = setInterval(() => {
      p.value += 1;
      if (p.value >= props.percentage) {
        p.value = props.percentage;
        clearInterval(timer);
      }
    }, t);
  } else {
    p.value = props.percentage;
  }
});
</script>

<style lang="scss" scoped></style>
