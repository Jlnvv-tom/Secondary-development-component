import {App} from 'vue'
import chooseIcon from './chooseIcon'
import chooseArea from './chooseArea'
import chooseAreaFour from './chooseAreaFour'
import wForm from './form'
import modelForm from './modelForm';
import wTable from './table';
import wTrend from './trend';
import wNotification from './notification';
import wList from './list';
import wMenu from './menu';

const components =[
  chooseIcon,
  chooseArea,
  chooseAreaFour,
  wForm,
  modelForm,
  wTable,
  wTrend,
  wNotification,
  wList,
  wMenu
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}