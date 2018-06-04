import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faFile from '@fortawesome/fontawesome-free-regular/faFile'

fontawesome.library.add(
  faBars,
  faSearch,
  faEdit,
  faFile,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
