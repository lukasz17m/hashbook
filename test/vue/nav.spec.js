import Vuex from 'vuex';
import { expect } from 'chai';
import { mount, createLocalVue } from 'vue-test-utils';
import App from '@/components/App.vue';
import store from '@/store';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Nav', () => {
  let wrapper;

  // beforeEach(() => {
  // });

  it('hides left menu when burger button is clicked', () => {
    store.replaceState({
      leftNav: true,
    });

    wrapper = mount(App, { store, localVue });

    const burgerBtn = wrapper.find('.burger-button');
    const leftNav = wrapper.find('nav');

    expect(wrapper.vm.$store.getters.leftNav).to.be.true;
    expect(leftNav.hasClass('collapsed')).to.be.false;
    expect(leftNav.hasClass('uncollapsed')).to.be.true;

    burgerBtn.trigger('click');

    expect(wrapper.vm.$store.getters.leftNav).to.be.false;
    expect(leftNav.hasClass('collapsed')).to.be.false;
    expect(leftNav.hasClass('uncollapsed')).to.be.false;
  });

  it('shows left menu when burger button is clicked', () => {
    store.replaceState({
      leftNav: false,
    });

    wrapper = mount(App, { store, localVue });

    const burgerBtn = wrapper.find('.burger-button');
    const leftNav = wrapper.find('nav');

    expect(wrapper.vm.$store.getters.leftNav).to.be.false;
    expect(leftNav.hasClass('collapsed')).to.be.false;
    expect(leftNav.hasClass('uncollapsed')).to.be.false;

    burgerBtn.trigger('click');

    expect(wrapper.vm.$store.getters.leftNav).to.be.true;
    expect(leftNav.hasClass('collapsed')).to.be.false;
    expect(leftNav.hasClass('uncollapsed')).to.be.true;
  });
});
