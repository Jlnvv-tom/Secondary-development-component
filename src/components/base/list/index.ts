import { App } from 'vue'
import list from './src/index.vue';
export default {
  install(app: App) {
    app.component('w-list',list)
  }
}