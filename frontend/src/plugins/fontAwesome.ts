import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faCalendarDays, 
  faUsers, 
  faTags, 
  faRightFromBracket, 
  faPlus, 
  faPenToSquare, 
  faTrash, 
  faMapMarkerAlt,
  faCircleExclamation,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass, 
  faChampagneGlasses
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCalendarDays, 
  faUsers, 
  faTags, 
  faRightFromBracket, 
  faPlus, 
  faPenToSquare, 
  faTrash, 
  faMapMarkerAlt,
  faChampagneGlasses,
  faCircleExclamation,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass
)

export function registerFontAwesome(app: any) {
  app.component('font-awesome-icon', FontAwesomeIcon)
}