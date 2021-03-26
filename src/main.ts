import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import './scripts/ui_common.js'
import './scripts/masonry-horizontal.js'
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
