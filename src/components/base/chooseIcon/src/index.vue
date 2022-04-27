<template>
  <div>
    <el-button @click="handleClick" type="primary">
      <slot></slot>
    </el-button>
  </div>
  <div>
    <el-dialog :title="title" v-model="dialogVisible">
      <div class="container">
        <div class="item"
          v-for="(item, index) in Object.keys(Icons)"
          :key="index"
          @click="clickItem(item)"
         >
          <div class="text">
            <component :is=item></component>
          </div>  
          <div class="icon">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, defineProps, defineEmits } from 'vue'
import * as Icons from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'

let props = defineProps<{
  title: string, // 弹框标题
  visible: boolean, // 控制弹出框的显示与隐藏
}>()

let emits = defineEmits(['update:visible'])

let dialogVisible = ref<boolean>(props.visible)

let handleClick = () => {
  emits('update:visible', !props.visible)
}

const useCopy = (text: string) => {
  let input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  ElMessage.success('复制成功')
}

let clickItem = (item: string) => {
  let text = `<${item}/>`
  useCopy(text)
  dialogVisible.value = false
}

watch(() => props.visible, (val:boolean) => {
  dialogVisible.value = val
})

watch(() => dialogVisible.value, (val: boolean) => {
  emits('update:visible', val)
})

</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .item{
    width: 25%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    margin-bottom: 20px;
    .text {
      font-size: 14px;
      svg {
        height: 2em;
        width: 2em;
      }
    }
    .icon {
      flex: 1;
    }
  }
}
</style>