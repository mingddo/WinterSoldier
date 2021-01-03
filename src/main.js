import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';


// fontawesome 사용
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { dom } from '@fortawesome/fontawesome-svg-core';
import VueAutosuggest from "vue-autosuggest";

Vue.use(VueAutosuggest)
dom.watch();
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
