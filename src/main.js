import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import VueAutosuggest from "vue-autosuggest";
// 외부 css 파일 활용하기.
// import './assets/reset.css';
Vue.use(VueAutosuggest)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
