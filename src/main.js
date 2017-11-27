import Vue from 'vue';
import 'babel-polyfill';
import 'custom-event-polyfill';
import App from '@/components/App.vue';
import store from '@/store';
import '@/assets/scss/style.scss';

if (window.localStorage.getItem('leftNav') === null) {
  window.localStorage.setItem('leftNav', '1');
}

if (window.localStorage.getItem('leftNavCollapsed') === null) {
  window.localStorage.setItem('leftNavCollapsed', '');
}

Vue.prototype.$_eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
