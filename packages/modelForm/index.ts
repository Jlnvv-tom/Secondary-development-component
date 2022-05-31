import { App } from 'vue'
import modelForm from './src/index.vue';
export default {
  install(app: App) {
    app.component('w-model-form',modelForm)
  }
}