import {App} from 'vue'
import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'

const components =[
  chooseIcon,
  chooseArea,
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}