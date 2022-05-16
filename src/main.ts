import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import WComponents from './components/base';
import './mock'

const app = createApp(App)

// 遍历注册全局icon
for(let icon in Icons) {
  app.component(icon, (Icons as any)[icon])
}

app.use(router).use(ElementPlus).use(WComponents)
app.mount('#app')
