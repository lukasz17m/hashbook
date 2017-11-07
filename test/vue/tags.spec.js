import Vuex from 'vuex';
import { expect } from 'chai';
import { mount, createLocalVue } from 'vue-test-utils';
import App from '@/components/App.vue';
import NavTopTagsActive from '@/components/NavTopTagsActive.vue';
import store from '@/store';
import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Tags', () => {
  const initialState = state;

  let wrapper;

  beforeEach(() => {
    store.replaceState({ ...initialState });

    wrapper = mount(App, { store, localVue });
  });

  describe('Vuex', () => {
    it('has an array of tags in store', () => {
      expect(wrapper.vm.$store.getters.tags).to.be.an('array');
    });

    it('has an array of active tags in store', () => {
      expect(wrapper.vm.$store.getters.tagsActive).to.be.an('array');
    });
  });

  describe('Components', () => {
    it('has a component `NavTopActiveTags` in `.top-nav`', () => {
      expect(wrapper.find('.top-nav').contains(NavTopTagsActive)).to.be.true;
    });

    it('`NavTopActiveTags` isn’t rendered when tagsActive is empty', () => {
      expect(wrapper.find('.top-nav').contains('.tags-active')).to.be.false;
    });

    it('`NavTopActiveTags` is rendered when tagsActive isn’t empty', () => {
      store.replaceState({
        ...initialState,
        tagsActive: ['lorem'],
      });

      wrapper = mount(App, { store, localVue });

      expect(wrapper.find('.top-nav').contains('.tags-active')).to.be.true;
    });
  });
});
