import { App } from 'vue'
import wTable from './src/index.vue';
export default {
  install(app: App) {
    app.component('w-table',wTable)
  }
}
