export interface TableOptions {
  label: string, // 表头
  prop: string, // 字段名称
  width?: string | number, // 列宽
  align?: 'left' | 'center' | 'right',
  slot?: string, // 自定义列表名称
  action?: boolean, // 是否代表操作项
  editable?: boolean, // 是否可编辑
}