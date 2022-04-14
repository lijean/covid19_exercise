import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App.vue'
import router from './router'

createApp(App)
  .use(VueAxios, axios)
  .component('Loading', Loading)
  .use(router)
  .mount('#app')
