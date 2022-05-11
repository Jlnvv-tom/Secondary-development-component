import { CSSProperties } from 'vue'
import { RuleItem } from './rules'
import { ValidateFieldsError } from 'async-validator'

interface Callback {
  (isValid: boolean, invalidFields?: ValidateFieldsError): void
}

// 表单每一项的配置选项
export interface FormOptions {
  // 表单项显示的元素
  type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' |
  'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' |
  'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' |
  'transfer' | 'upload' | 'editor',
  
  value?: any, // 表单项的值
  label?: string, // 表单项label
  prop?: string, // 表单项的标识
  rules?: RuleItem[], // 表单项验证规则
  placeholder?: string, // 占位符
  // 表单元素特有的属性
  attrs?: {
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean,
    // CSS 样式属性
    style?: CSSProperties,
  }
  // 表单项的子元素
  children?: FormOptions[],
  // 处理上传组件的属性和方法
  uploadAttrs?: {
    action: string,
    header?: string,
    method?: 'post' | 'put' | 'patch',
    multiple?: boolean,
    data?: any,
    name?: string,
    withCreadentials?: boolean,
    howFileList?: boolean,
    drag?: boolean,
    accept?:string,
    thumbnailMode?: boolean,
    listType?: 'text' | 'picture' | 'picture-card',
    autoUpload?: boolean,
    limit?:number,
  }
}

export interface ValidateFieldCallback { 
  (message: string, invalidFields?: ValidateFieldsError): void
}


export interface FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void,
  deregisterLabelWidth(width: number): void,
  autoLabelWidth: string | undefined,
  emit: (evt: string, ...args: any[]) => void,
  labelSuffix: string,
  inline?: boolean,
  model?: Record<string, unknown>,
  size?: string,
  showMessage?: boolean,
  labelPosition?: string,
  labelWidth?: string,
  rules?: Record<string, unknown>,
  statusIcon?: boolean,
  hideRequiredAsterisk?: boolean,
  disabled?: boolean,
  validate: (callback?: Callback) => Promise<boolean>,
  resetFields: () => void,
  clearValidate: (props?: string | string[]) => void,
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void,
}