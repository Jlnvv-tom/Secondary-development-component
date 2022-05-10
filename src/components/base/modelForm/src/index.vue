<template>
 <el-dialog
   v-model="dialogVisible"
   v-bind="$attrs"
 ></el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"


let props = defineProps({
  visible: {
    type: Boolean,
    defalut: false
  }
})
let emits = defineEmits(['update:visible'])

let dialogVisible = ref<boolean>(props.visible)

watch(() => props.visible, (val: any) => {
  dialogVisible.value = val
})

watch(() => dialogVisible.value, (val: any) => {
  emits(['update:visible', val])
})


</script>

<style lang="" scoped>

</style>