import Vue from 'vue';
import 'babel-polyfill';
import 'custom-event-polyfill';
import App from '@/components/App.vue';
import store from '@/store';
import '@/assets/scss/style.scss';


try {
  if (window.localStorage.getItem('leftNav') === null) {
    const state = document.documentElement.offsetWidth < 768 ? '' : '1';
    window.localStorage.setItem('leftNav', state);
  }

  if (window.localStorage.getItem('leftNavCollapsed') === null) {
    window.localStorage.setItem('leftNavCollapsed', '');
  }
} catch (_) {
  //
}

Vue.prototype.$_eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
