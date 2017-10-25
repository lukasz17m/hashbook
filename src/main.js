'use strict';

import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './components/App.vue';
import store from './store';
import 'babel-polyfill';
import './assets/scss/style.scss';

Vue.use(VueResource);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
