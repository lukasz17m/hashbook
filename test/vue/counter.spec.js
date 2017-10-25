'use strict';

import Vuex from 'vuex'
import { expect } from 'chai';
import { shallow, createLocalVue } from 'vue-test-utils';
import Counter from '../../src/components/Counter.vue';
import store from '../../src/store';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Counter', () => {
  let wrapper;

  beforeEach(() => {
    store.replaceState({
      count: 0
    });

    wrapper = shallow(Counter, { store, localVue });
  });

  it('has default count set to 0', () => {
    expect(wrapper.vm.count).to.equal(0);
  });

  it('increments count by 2', () => {
    const incButton = wrapper.find('.increment');

    incButton.trigger('click');
    incButton.trigger('click');

    expect(wrapper.vm.count).to.equal(2);
  });

  it('decrements count to 5', () => {
    const decButton = wrapper.find('.decrement');

    store.replaceState({
      count: 6
    });

    decButton.trigger('click');

    expect(wrapper.vm.count).to.equal(5);
  });
});
