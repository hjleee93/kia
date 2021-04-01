import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//@ts-ignore
import isotope from 'vueisotope';
import './scripts/masonry-horizontal.js';
import axios from 'axios';
import './plugin/axios';


// import './quasar'
import './scripts/ui_common.js'


Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
