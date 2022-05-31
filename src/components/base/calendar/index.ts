import { App } from 'vue'
import calendar from './src/index.vue'

export default {
  install(app: App) {
    app.component('w-calendar', calendar)
  }
}