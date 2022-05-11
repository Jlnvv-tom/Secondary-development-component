<template>
  <div>
    <el-table :data="data">
      <template v-for="(item, index) in tableOptions" :key="index">
        <el-table-column
          v-if="!item.slot"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
         >
        </el-table-column>
        <el-table-column
          v-else
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
         >
          <template #default="scope">
            <slot :name="item.slot" :scope="scope"></slot>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        :label="actionOptions!.label"
        :align="actionOptions!.align"
        :width="actionOptions!.width"
       >
        <template #default="scope">
          <slot name="action" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { TableOptions } from '../src/types'

let props = defineProps({
  // 表格配置
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true
  }
})

// 过滤操作选项之后的配置
let tableOptions = computed(() => props.options.filter(itme => !itme.action))

// 找出操作项的配置
let actionOptions = computed(() => props.options.find(itme => itme.action))



</script>

<style lang="scss" scoped>

</style>