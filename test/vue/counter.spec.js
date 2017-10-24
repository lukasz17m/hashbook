'use strict';

import { expect } from 'chai';
import { mount } from 'vue-test-utils';
import Counter from '../../src/components/Counter.vue';

describe('Counter', () => {
  let wrapper;

  beforeEach(() => wrapper = mount(Counter));

  it('has default count set to 0', () => {
    expect(wrapper.vm.count).to.equal(0);
  });

  it('increments count by 2', () => {
    const incButton = wrapper.find('.increment');

    expect(wrapper.vm.count).to.equal(0);

    incButton.trigger('click');
    incButton.trigger('click');

    expect(wrapper.vm.count).to.equal(2);
  });

  it('decrements count to 5', () => {
    const decButton = wrapper.find('.decrement');

    wrapper.setData({
      count: 6
    });

    decButton.trigger('click');

    expect(wrapper.vm.count).to.equal(5);
  });
});
