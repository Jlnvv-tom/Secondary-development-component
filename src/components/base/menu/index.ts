import { App } from 'vue'
import menu from './src/index.vue';
import infiniteMenu from './src/menu'
export default {
  install(app: App) {
    app.component('w-menu',menu)
    app.component('w-infinite-menu',infiniteMenu)
  }
}