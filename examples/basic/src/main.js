import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// Dispatcher
import Dispatcher from 'vuex-dispatcher'
Vue.use(Dispatcher, store);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
