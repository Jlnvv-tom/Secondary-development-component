<template>
  <div class="trend">
    <div class="text" :style="{ color: textColor }">
      <slot v-if="slots.default"></slot>
      <div v-else>{{ text }}</div>
    </div>
    <div class="icon">
      <el-icon
        v-if="type === 'up'"
        :style="{ color: !reverseColor? upIconColor : '#52c41a'}"
       ><component :is="upIcon" />
      </el-icon>
      <el-icon v-else :style="{ color: !reverseColor? downIconColor : '#f5222d'}"><component :is="downIcon" /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, computed } from 'vue'
let props = defineProps({
  // 标记当前趋势是上升（up）还是下降（down)
  type: {
    type: String,
    default: "up",
  },
  // 父组件传递过来的文字
  text: {
    type: String,
    default:'文字'
  },
  // 自定义图标
  upIcon:{
    type: String,
    default: 'ArrowUp'
  },
  downIcon:{
    type: String,
    default: 'ArrowDown'
  },
  upIconColor: {
    type: String,
    default:'#f5222d'
  },
  downIconColor: {
    type: String,
    default:'#f5222d'
  },
  // 颜色反转只在默认的颜色下生效，如果使用了自定义颜色，这个属性就不生效
  reverseColor:{
    type: Boolean,
    default: false
  },
  // 文字颜色
  upTextColor: {
    type: String,
    default:'black'
  },
  downTextColor: {
    type: String,
    default:'black'
  },
});

let slots = useSlots()
// console.log(slots,'---------');

let textColor = computed(()=>{
  return props.type === 'up'? props.upTextColor: props.downTextColor
})
</script>

<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    margin-right: 4px;
  }
  
}
</style>
