import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router'
import VuePageTransition from 'vue-page-transition'

Vue.use(BootstrapVue)
Vue.use(VuePageTransition)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
