import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast, { type PluginOptions, POSITION } from "vue-toastification";
import { library } from '@fortawesome/fontawesome-svg-core'
import "vue-toastification/dist/index.css";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faCalendarDays, 
  faUsers, 
  faTags, 
  faUser, 
  faRightFromBracket, 
  faPlus, 
  faPenToSquare, 
  faTrash, 
  faMapMarkerAlt,
  faChampagneGlasses,
  faCircleExclamation,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCalendarDays, 
  faUsers, 
  faTags, 
  faUser, 
  faRightFromBracket, 
  faPlus, 
  faPenToSquare, 
  faTrash, 
  faMapMarkerAlt,
  faChampagneGlasses,
  faCircleExclamation,
  faChevronLeft,
  faChevronRight
)

const app = createApp(App)

app.use(createPinia())
app.use(router)

const toastOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};

app.use(Toast, toastOptions);

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
