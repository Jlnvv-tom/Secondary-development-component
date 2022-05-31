import { App } from 'vue'
import wForm from './src/index.vue';
export default {
  install(app: App) {
    app.component('w-form',wForm)
  }
}
