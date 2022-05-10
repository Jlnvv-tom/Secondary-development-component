import {App} from 'vue'
import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'
import chooseAreaFour from './chooseAreaFour'
import wForm from './form'
import modelForm from './modelForm';

const components =[
  chooseIcon,
  chooseArea,
  chooseAreaFour,
  wForm,
  modelForm
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}