// 四级联动区域选择组件
import { App } from 'vue'
import chooseAreaFour from './src/index.vue';
export default {
  install(app: App) {
    app.component('w-choose-areafour',chooseAreaFour)
  }
}