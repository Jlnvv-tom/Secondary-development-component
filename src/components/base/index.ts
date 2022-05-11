import {App} from 'vue'
import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'
import chooseAreaFour from './chooseAreaFour'
import wForm from './form'
import modelForm from './modelForm';
import wTable from './table';
const components =[
  chooseIcon,
  chooseArea,
  chooseAreaFour,
  wForm,
  modelForm,
  wTable
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}