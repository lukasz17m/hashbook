'use strict';

import App from './components/App.vue';
import Vue from 'vue';
import VueResource from 'vue-resource';
import 'babel-polyfill';
import './assets/scss/style.scss';

Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
});
