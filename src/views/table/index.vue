<template>
  <div>
    <w-table
      :data="tableData"
      :options="options"
      elementLoadingText="加载中，等待一下吧……"
      elementLoadingBackground="black"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      v-model:editRowIndex="editRowIndex"
      isEditRow
      pagination
      paginationAlign="center"
      :total="total"
      :currentPage="current"
      :pageSize="pageSize"
      @check="check"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
     >
      <template #date="{scope}">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
      <template #name="{scope}">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
      <template #action="{scope}">
        <el-button size="small" type="primary" @click="edit(scope)">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>
      <template #editRow="{scope}">
        <el-button size="small" type="primary">确认</el-button>
        <el-button size="small" type="danger">取消</el-button>
      </template>
      <!-- <template #editCell="{scope}">
        <div style="display:flex;">
          <el-button size="small" type="primary">确认</el-button>
          <el-button size="small" type="danger">取消</el-button>
        </div>
      </template> -->
    </w-table>
  </div>
</template>

<script lang="ts" setup>
import { TableOptions } from '../../components/base/table/src/types'
import { ref, onMounted } from 'vue'
import axios from 'axios'

let options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date',
    editable: true
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name',
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center',
    editable: true,
  },
  {
    label: '操作',
    align: 'center',
    action: true
  }
]

interface TableData {
  date: string,
  name: string,
  address: string,
}

let tableData = ref<TableData[]>([])
let editRowIndex = ref<string>('')

let current = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)


onMounted(() => {
  getData()
})

let getData = () => {
  axios.post('/api/list', {
    current: current.value,
    pageSize: pageSize.value
  }).then((res:any) => {
    total.value = res.data.data.total
    tableData.value = res.data.data.rows
    console.log(res.data);
  })
}

let svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
  
  `

// setTimeout(() => {
// tableData.value = [
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-02',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-04',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-01',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
// ]
// }, 500)


let edit = (scope: any) => {
  // console.log(123, scope);
  editRowIndex.value = 'edit'
}

let check = (scope: any) => {
  console.log('父组件的scope',scope);
}

let sizeChange = (val: number) => {
  pageSize.value = val
  getData()
}

let currentChange = (val: number) => {
  current.value = val
  getData()
}


</script>

<style lang="scss" scoped>

</style>