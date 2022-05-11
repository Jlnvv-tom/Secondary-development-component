<template>
  <div>
    <el-button type="primary" @click='open'>open</el-button>
    <w-model-form
      title="编辑"
      v-model:visible="visible"
      :options="options"
      :on-change="handleChange"
      :on-success="handleSuccess"
     >
      <template #uploadArea>
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
      <template #uploadTip>
        <div style="color:#ccc;font-size:12px;">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #footer="{ form }">
        <span class="dialog-footer">
          <el-button @click="Cancel">取 消</el-button>
          <el-button type="primary" @click="Confirm(form)">确 认</el-button
          >
        </span>
      </template>
    </w-model-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { FormOptions } from '../../components/base/form/src/types/types'
import { ElMessage } from 'element-plus'
let visible = ref<boolean>(false)

let open = () => {
  visible.value = true
}


let Cancel = () => {
  console.log('取消');
  // visible.value = false
}
let Confirm = (form: any) => {
  let validate = form.validate()
  let model = form.getFormData()
  validate((valid: any) => {
    if(valid){
      ElMessage.success('验证成功')
      console.log(model);
      visible.value = false
    } else {
      ElMessage.error('验证失败')
    }
  })
}

let options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max:6,
        message: '用户名在2-6位置之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true,
    }
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
       {
        min: 6,
        max:10,
        message: '密码长度6-10位置之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      showPassword: true,
      clearable: true
    }
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    attrs:{
      style: {
        width: '100%',
      },
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '销售',
        value: '3'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '排球',
        value: '3'
      }
    ]
  },
   {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: '1'
      },
      {
        type: 'radio',
        label: '女',
        value: '2'
      },
      {
        type: 'radio',
        label: '保密',
        value: '3'
      }
    ]
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs:{
      action: 'https://jsonplaceholder.typicode.com/posts/',
      multiple: true,
      limit: 3
    },
    rules: [
      {
        required: true,
        message: '请上传文件',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'editor',
    value: '',
    prop: 'desc',
    placeholder: '请输入内容hh',
    label: '描述',
    rules: [
      {
        required: true,
        message: '描述不能为空',
      }
    ]
  }
]

let handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}

let handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}

</script>

<style lang="" scoped>

</style>