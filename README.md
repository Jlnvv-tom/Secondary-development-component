# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## 学习步骤，起步搭建文章

- [Vue3+Vite+TS基于Element plus 二次封装业务组件(含Vue3知识点)](https://juejin.cn/post/7090917855524782088)


**main.ts文件的配置情况**
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import WComponents from './components/base';
const app = createApp(App)

// 遍历注册全局icon
for(let icon in Icons) {
  app.component(icon, (Icons as any)[icon])
}

app.use(router).use(ElementPlus).use(WComponents)
app.mount('#app')

```
### 起步效果
![image](https://user-images.githubusercontent.com/82532729/167629057-7c227a19-4f48-4f19-9da5-7b156f540edc.png)
![modelform](https://user-images.githubusercontent.com/82532729/167869653-e2445102-7504-4965-8aba-dd4ea6cde65a.gif)
