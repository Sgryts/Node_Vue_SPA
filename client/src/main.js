// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { sync } from 'vuex-router-sync'
import store from './store/store'

import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/dist/vuetify.min'

import VueAWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'

// export const eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(Vuetify, VueAWN)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
