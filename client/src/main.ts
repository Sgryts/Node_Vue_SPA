import Vue from 'vue';
import {sync} from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store/store';
import 'vue-awesome-notifications/dist/styles/style.css';
// import VueAWN from 'vue-awesome-notifications';
import 'vue-awesome-notifications/dist/styles/style.css';

Vue.config.productionTip = false;
// Vue.use(VueAWN);

sync(store, router);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
