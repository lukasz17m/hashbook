import Vue from 'vue';
import VueResource from 'vue-resource';
import 'babel-polyfill';
import App from '@/components/App.vue';
import store from '@/store';
import '@/assets/scss/style.scss';

Vue.use(VueResource);

Vue.prototype.$_eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
