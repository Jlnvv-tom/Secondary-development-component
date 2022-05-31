<template>
  <div>
    <el-table
      :data="tableData"
      v-bind="$attrs"
      v-loading="isLoading"
      :element-loading-text="elementLoadingText"
      :element-loading-spinner="elementLoadingSpinner"
      :element-loading-background="elementLoadingBackground"
      :element-loading-svg="elementLoadingSvg"
      :element-loading-svg-view-box="elementLoadingSvgViewBox"
      @row-click="rowClick"
     >
      <template v-for="(item, index) in tableOptions" :key="index">
        <el-table-column
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
         >
          <template #default="scope">
           <template v-if="scope.row.rowEdit">
            <el-input v-model="scope.row[item.prop]"></el-input>
           </template>
           <template v-else>
            <template v-if="(scope.$index + scope.column.id) === currentEdit">
              <div style="display:flex">
                <el-input v-model="scope.row[item.prop]"></el-input>
                <div @click.stop="clickEditCell(scope)">
                  <slot name="editCell" :scope="scope" v-if="$slots.editCell"></slot>
                  <div class="icons" v-else>
                    <span @click="check(scope)" class="check"><el-icon><Check /></el-icon></span>
                    <span @click="close(scope)" class="close"><el-icon><Close /></el-icon></span>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop] }}</span>
              <component
                v-if="item.editable"
                @click.stop="clickEdit(scope)"
                class="edit"
                :is="editIcon"
               >
                <!-- <el-icon><edit /></el-icon> -->
              </component>
            </template>
           </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        :label="actionOptions!.label"
        :align="actionOptions!.align"
        :width="actionOptions!.width"
       >
        <template #default="scope">
          <slot v-if="scope.row.rowEdit" name="editRow"></slot>
          <slot v-else name="action" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-if="pagination  && !isLoading" 
      class="pagination"
      :style="{ justifyContent: paginationAliginJustify }"
     >
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, computed, onMounted, watch} from 'vue'
import { TableOptions } from '../src/types'
import cloneDeep from 'lodash/cloneDeep'


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
  },
  // 加载文案
  elementLoadingText: {
    type: String,
  },
  // 加载图标名
  elementLoadingSpinner: {
    type: String,
  },
  // 加载背景颜色
  elementLoadingBackground: {
    type: String,
  },
  // 加载图标是svg
  elementLoadingSvg: {
    type: String
  },
  // 加载svg的配置
  elementLoadingSvgViewBox: {
    type: String,
  },
  // 可编辑单元显示的图标
  editIcon: {
    type: String,
    default: "edit"
  },
  // 是否可编辑行
  isEditRow: {
    type: Boolean,
    defalut: false,
  },
  // 编辑行按钮的标识
  editRowIndex: {
    type: String,
    defalut: ''
  },
  // 是否显示分页
  pagination: {
    type:Boolean,
    defalut: false
  },
   // 显示分页的对齐方式
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  // 当前为第几页
  currentPage: {
    type: Number,
    default: 1
  },
  // 一页多少数据
  pageSize:{
    type: Number,
    default:10 
  },
  // 每页的数据选项
  pageSizes: {
    type: Array as PropType<number[]>,
    default:[10, 20, 30, 40]
  },
  // 数据总数
  total: {
    type: Number,
    default: 0
  }
})

// 分发事件
let emits = defineEmits(['check','close','update:editRowIndex', 'sizeChange', 'currentChange'])

// 当前点击的单元格
let currentEdit = ref<string>('')

//拷贝表格数据
let tableData = ref<any[]>(cloneDeep(props.data))

// 拷贝按钮标识
let cloneEditRowIndex = ref<string>(props.editRowIndex)

// 监听父组件传递过来的数据
watch(() => props.data, val => {
  tableData.value = cloneDeep(val)
  tableData.value.map(item => item.rowEdit = false)
})

// 监听父组件传递过来的标识
watch(() => props.editRowIndex, val => {
  if(val) cloneEditRowIndex.value = val
})

onMounted(() => {
  tableData.value.map(item => {
    // 当前是否为可编辑状态
    item.rowEdit = false
  })
})

// 点击编辑图片
let clickEdit = (scope: any) => {
  currentEdit.value = scope.$index + scope.column.id
  // console.log(scope);
  
}

let clickEditCell = (scope: any) => {
  currentEdit.value = ''
  emits('check', scope)
}

let check = (scope: any) => {
  currentEdit.value = ''
  emits('check', scope)
}

let close = (scope: any) => {
  currentEdit.value = ''
  emits('close', scope)
}

let rowClick = (row: any, column: any) => {
  // 判断当前点击的是否为操作项的内容
  if(column.label === actionOptions.value!.label){
    console.log('操作项');
    // 编辑行的操作 
    if(props.isEditRow && cloneEditRowIndex.value === props.editRowIndex){
      row.rowEdit = !row.rowEdit;
      // 重置其它数据的isEditRow
      tableData.value.map(item => {
        if (item !== row) item.rowEdit = false
      })
      // 重置按钮标识
      if(!row.rowEdit) emits('update:editRowIndex','')
    }
  }
  console.log(row, column);
}
 
// 分页的页数改变
let handleSizeChange = (val:number) => {
  emits('sizeChange',val);
}

let handleCurrentChange = (val:number) => {
  emits('currentChange',val);
}

// 表格是否在加载中
let isLoading = computed(() => !props.data || !props.data.length)

// 过滤操作选项之后的配置
let tableOptions = computed(() => props.options.filter(itme => !itme.action))

// 找出操作项的配置
let actionOptions = computed(() => props.options.find(itme => itme.action))

// 和flex 布局结合的排列方式
let paginationAliginJustify = computed(() => {
  if(props.paginationAlign === 'left') return 'flex-start'
  else if(props.paginationAlign === 'center') return 'center'
  else return 'flex-end'
})

</script>

<style lang="scss" scoped>
.edit {
  width: 1rem;
  height: 1rem;
  position: relative;
  top: 2px;
  left: 15px;
  cursor: pointer;
}
.icons{
  display:flex;
  .check{
    color: green;
    width: 1em;
    height: 1em;
    margin-left: 8px;
    position: relative;
    top: 8px;
    cursor: pointer;
    svg{
      width: 2rem;
      height: 2rem;
    }
  }
  .close{
    color: red;
    margin-left: 8px;
    position: relative;
    top: 8px;
    cursor: pointer;
    svg{
      width: 2em;
      height: 2em;
    }
  }
}
.pagination{
  display:flex;
  justify-content: center;
  margin-top: 18px;
}
</style>