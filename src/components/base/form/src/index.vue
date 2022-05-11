<template>
  <el-form
    ref="form"
    v-if="model"
    :validate-on-rule-change='false'
    :model='model'
    :rules='rules'
    v-bind="$attrs"
   >
    <template v-for="(item,index) in options" :key="index">
      <el-form-item
        v-if="!item.children || !item.children!.length"
        :prop="item.prop"
        :label="item.label"
       >
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
          v-model="model[item.prop!]"
          >
        </component>
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
         >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
        <div class="full-screen-container" >
          <div id="toolbar" v-if="item.type === 'editor'" style="z-index: 101;"></div>
          <div id="editor" v-if="item.type === 'editor'" style="height: 200px; z-index: 100;"></div>
        </div>
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children.length"
        :prop="item.prop"
        :label="item.label"
       >
        <component
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
          v-model="model[item.prop!]"
         >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label='child.label'
            :value='child.value'
          >
          </component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form='form' :model='model'></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { PropType, ref, onMounted, watch, nextTick } from 'vue'
import { FormOptions, FormInstance } from './types/types'
import cloneDeep from 'lodash/cloneDeep'
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar, IEditorConfig, IDomEditor } from '@wangeditor/editor'


let props = defineProps({
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function
  }
})

let emits = defineEmits([
  'on-preview', 'on-remove', 'on-success', 'on-error', 
  'on-progress', 'on_change', 'before-upload', 'before-remove','on-exceed'
])

let model = ref<any>(null)
let rules = ref<any>(null)
let edit = ref()

let form = ref<FormInstance | null>()

// 初始化表单方法
let initForm = () => {
  if(props.options && props.options.length){
    let m: any = {username: '', password: ''}
    let r: any = {}
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
      // 初始化富文本编辑器
      if(item.type === 'editor'){
        nextTick(()=> {
          if(document.getElementById('editor') && document.getElementById('toolbar')){
            const editorConfig: Partial<IEditorConfig> = {}
            editorConfig.placeholder = item.placeholder!
            editorConfig.onChange = (editor: IDomEditor) => {
              // 当编辑器选区、内容变化时，即触发
              // console.log('content', editor.children)
              // console.log('html', editor.getHtml())
              // console.log('text', editor.getText());
              
              model.value[item.prop!] = editor.getHtml()
            }

            // 创建编辑器
            const editor = createEditor({
              selector: '#editor',
              config: editorConfig,
              mode: 'default' // 或 'simple' 参考下文
            })
            // 创建工具栏
            const toolbar = createToolbar({
              editor,
              selector: '#toolbar',
              mode: 'default' // 或 'simple' 参考下文
            })
            edit.value = editor
          }
        })
      }
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}
onMounted(() => {
  initForm()
})

// 组件重写表单重置的方法
let resetFields = () => {
  // 1、重置element-plus 的表单
  form.value!.resetFields()
  // 2、重置富文本编辑器的内容
  if(props.options && props.options.length){
    // 清空富文本内容
    edit.value.clear()
  }
}

// 表单验证
let validate = () => {
  return form.value!.validate
}

// 获取表单数据
let getFormData = () => {
  return model.value
}

// 使用vue3的新api 分发方法，它替代了之前的$children方法
defineExpose({
  resetFields,
  validate,
  getFormData
})

// 监听父组件传递过来的options
watch(() => props.options, () => {
  initForm()
},{ deep: true })

// 上传组件的所以方法
let onPreview = (file: File) => {
  emits('on-preview', file)
}

let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}

let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功， 给表单上传项赋值
  let uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList})
}

let onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList })
}

let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}

let onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}

let beforeUpload = (file: File) => {
  emits('before-upload', file)
}

let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList})
}

let onExceed = (file: File, fileList: FileList) => {
  emits('on-exceed', { file, fileList })
}

</script>

<style lang="" scoped>

</style>