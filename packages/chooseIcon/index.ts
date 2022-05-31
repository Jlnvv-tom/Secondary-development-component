import { App } from 'vue'
import chooseIcon from './src/index.vue';
export default {
  install(app: App) {
    app.component('w-choose-icon',chooseIcon)
  }
}