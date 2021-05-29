import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//@ts-ignore
import isotope from 'vueisotope';
import './scripts/masonry-horizontal.js';
import axios from 'axios';
import './plugin/axios';
import './api/api';
import 'promise-polyfill/src/polyfill';
import 'es6-promise/auto'
import 'babel-polyfill'
import * as _ from "lodash";

export const bus = new Vue();


// import './quasar'
import './scripts/ui_common.js'

//bootstrap
// import { BootstrapVue } from 'bootstrap-vue'
// Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
