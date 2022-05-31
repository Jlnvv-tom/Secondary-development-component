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
import wProgress from './progress';
import chooseTime from './chooseTime'
import chooseDate from './chooseDate'
import chooseCity from './chooseCity'
import calendar from './calendar'

const components =[
  chooseIcon,
  chooseArea,
  chooseAreaFour,
  chooseTime,
  chooseDate,
  chooseCity,
  wForm,
  modelForm,
  wTable,
  wTrend,
  wNotification,
  wList,
  wMenu,
  wProgress,
  calendar
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}