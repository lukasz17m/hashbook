import Vue from 'vue';
import 'babel-polyfill';
import 'custom-event-polyfill';
import App from '@/components/App.vue';
import store from '@/store';
import '@/assets/scss/style.scss';

Vue.prototype.$_eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
