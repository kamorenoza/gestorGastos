import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/router'
import store from '@/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import directives from '@/shared/directives'
import filters from '@/shared/filters'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/scss/main.scss'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)
Vue.use(filters)
Vue.use(directives)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
