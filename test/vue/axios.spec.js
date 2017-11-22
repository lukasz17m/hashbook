import extend from 'extend';
import moxios from 'moxios';
import Vuex from 'vuex';
import { expect } from 'chai';
import { mount, createLocalVue } from 'vue-test-utils';
import App from '@/components/App.vue';
import NoteItem from '@/components/NoteItem.vue';
import store from '@/store';
import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Axios', () => {
  const initialState = extend(true, {}, state);

  let wrapper;

  const staticNotes = [
    {
      id: '5a0ee4cdd0ba8926aa9700ef',
      content: 'Lorem ipsum',
      tags: ['lorem ipsum'],
    },
    {
      id: '5a0ee592d339f45a6f783698',
      content: 'Foobar',
      tags: ['foo', 'bar'],
    },
  ];

  beforeEach(() => {
    moxios.install();

    moxios.stubRequest('/api/notes', {
      status: 200,
      response: staticNotes,
    });

    store.replaceState(extend(true, {}, initialState));

    wrapper = mount(App, { store, localVue });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('upates Vuex store', (done) => {
    moxios.wait(() => {
      expect(store.getters.notesValidated).eql(staticNotes);
      expect(store.getters.tags).eql(['lorem ipsum', 'foo', 'bar']);

      done();
    });
  });

  it('displays notes correctly', (done) => {
    moxios.wait(() => {
      const notes = wrapper.findAll(NoteItem);

      expect(notes).to.have.lengthOf(2);

      expect(notes.at(0).html()).contains('Lorem ipsum');
      expect(notes.at(1).html()).contains('Foobar');

      done();
    });
  });
});
