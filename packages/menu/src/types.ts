export interface MenuItem {
  icon?: string; // 图标
  i?: any; // 
  name: string;  // 导航名字
  index: string; // 标识
  children?: MenuItem[]; // 子菜单
}