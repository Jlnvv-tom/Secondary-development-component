import {App} from 'vue'
import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'
import chooseAreaFour from './chooseAreaFour'


const components =[
  chooseIcon,
  chooseArea,
  chooseAreaFour,
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}