import Vuex from 'vuex';
import { expect } from 'chai';
import { mount, createLocalVue } from 'vue-test-utils';
import App from '@/components/App.vue';
import Notes from '@/components/Notes.vue';
import NotesWrapper from '@/components/NotesWrapper.vue';
import store from '@/store';
import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe.only('Notes', () => {
  const initialState = state;

  let wrapper;

  beforeEach(() => {
    store.replaceState({ ...initialState });

    wrapper = mount(App, { store, localVue });
  });

  describe('Components', () => {
    it('has a component `Notes` in `.notes-flex`', () => {
      expect(wrapper.find('.main-flex').contains(Notes)).to.be.true;
    });

    it('has a component `NotesWrapper` in `Notes` component', () => {
      expect(wrapper.find(Notes).contains(NotesWrapper)).to.be.true;
    });
  });
});
