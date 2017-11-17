import Vuex from 'vuex';
import { expect } from 'chai';
import { mount, createLocalVue } from 'vue-test-utils';
import App from '@/components/App.vue';
import NoteItemTags from '@/components/NoteItemTags.vue';
import NoteItemTagsItem from '@/components/NoteItemTagsItem.vue';
import NoteItemTagsItems from '@/components/NoteItemTagsItems.vue';
import NoteItemMenu from '@/components/NoteItemMenu.vue';
import NoteItemMenuItem from '@/components/NoteItemMenuItem.vue';
import NoteItemMenuItems from '@/components/NoteItemMenuItems.vue';
import NoteItemContent from '@/components/NoteItemContent.vue';
import NoteItem from '@/components/NoteItem.vue';
import Notes from '@/components/Notes.vue';
import NotesWrapper from '@/components/NotesWrapper.vue';
import store from '@/store';
import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Notes', () => {
  const initialState = state;

  let wrapper;

  const pushNotes = (invalid = false) => {
    let notes;

    if (invalid) {
      notes = [
        // Only two first are valid
        { id: 'valid', content: 'Lorem ipsum.', tags: ['lorem ipsum'] },
        { id: 'any length', content: '', tags: [] },
        { id: [], content: 'Lorem ipsum', tags: ['lorem ipsum'] },
        { id: {}, content: 'Lorem ipsum', tags: ['lorem ipsum'] },
        { id: null, content: 'Lorem ipsum', tags: ['lorem ipsum'] },
        { id: true, content: 'Lorem ipsum', tags: ['lorem ipsum'] },
        { id: false, content: 'Lorem ipsum', tags: ['lorem ipsum'] },
        { id: 7, content: 'Lorem ipsum', tags: ['lorem ipsum'] },
        { id: 'valid', content: [], tags: ['lorem ipsum'] },
        { id: 'valid', content: {}, tags: ['lorem ipsum'] },
        { id: 'valid', content: null, tags: ['lorem ipsum'] },
        { id: 'valid', content: true, tags: ['lorem ipsum'] },
        { id: 'valid', content: false, tags: ['lorem ipsum'] },
        { id: 'valid', content: 7, tags: ['lorem ipsum'] },
        { id: 'valid', content: 'Lorem ipsum', tags: '' },
        { id: 'valid', content: 'Lorem ipsum', tags: {} },
        { id: 'valid', content: 'Lorem ipsum', tags: null },
        { id: 'valid', content: 'Lorem ipsum', tags: true },
        { id: 'valid', content: 'Lorem ipsum', tags: false },
        { id: 'valid', content: 'Lorem ipsum', tags: 7 },
        { content: 'Lorem ipsum', tags: [] },
        { id: 'valid', tags: [] },
        { id: 'valid', content: 'Lorem ipsum' },
        {},
      ];
    } else {
      notes = [
        { id: 'valid', content: 'Lorem ipsum', tags: ['lorem ipsum'] },
        { id: 'valid2', content: 'Lorem ipsum', tags: ['lorem ipsum'] },
      ];
    }

    store.replaceState({ ...initialState, notes });

    wrapper = mount(App, { store, localVue });
  };

  beforeEach(() => {
    store.replaceState({ ...initialState });

    wrapper = mount(App, { store, localVue });
  });

  describe('Vuex', () => {
    it('has an array of notes in state but not in getters', () => {
      expect(wrapper.vm.$store.state.notes).to.be.an('array');
      expect(wrapper.vm.$store.getters.notes).to.be.undefined;
    });

    it('has an array of valid notes in getters but not in state', () => {
      expect(wrapper.vm.$store.getters.notesValidated).to.be.an('array');
      expect(wrapper.vm.$store.state.notesValidated).to.be.undefined;
    });

    it('has a boolean that indicates if edit mode is on', () => {
      expect(wrapper.vm.$store.getters.editing).to.be.a('boolean');
    });

    it('edit mode is set to false by default', () => {
      expect(wrapper.vm.$store.getters.editing).to.be.false;
    });

    it('has a property named `editingID` with `null` by default', () => {
      expect(wrapper.vm.$store.getters.editingID).to.be.null;
    });
  });

  describe('Components', () => {
    it('has a component `Notes` in `.notes-flex`', () => {
      expect(wrapper.find('.main-flex').contains(Notes)).to.be.true;
    });

    it('has a component `NotesWrapper` in `Notes` component', () => {
      expect(wrapper.find(Notes).contains(NotesWrapper)).to.be.true;
    });

    it(
      'has a component `NoteItem` in `NotesWrapper` if there are some notes',
      () => {
        pushNotes();

        expect(wrapper.find(NotesWrapper).contains(NoteItem)).to.be.true;
      },
    );

    it('has three proper components in `NoteItem` component', () => {
      pushNotes();

      expect(wrapper.find(NoteItem).contains(NoteItemTags)).to.be.true;
      expect(wrapper.find(NoteItem).contains(NoteItemMenu)).to.be.true;
      expect(wrapper.find(NoteItem).contains(NoteItemContent)).to.be.true;
    });

    it('has a component `NoteItemTagsItems`', () => {
      pushNotes();

      expect(wrapper.find(NoteItemTags).contains(NoteItemTagsItems)).to.be.true;
    });

    it('has a component `NoteItemTagsItem`', () => {
      pushNotes();

      expect(wrapper.find(NoteItemTagsItems).contains(NoteItemTagsItem))
        .to.be.true;
    });

    it('has a component `NoteItemMenuItems`', () => {
      pushNotes();

      expect(wrapper.find(NoteItemMenu).contains(NoteItemMenuItems)).to.be.true;
    });

    it('has a component `NoteItemMenuItem`', () => {
      pushNotes();

      expect(wrapper.find(NoteItemMenuItems).contains(NoteItemMenuItem))
        .to.be.true;
    });
  });

  describe('Validation', () => {
    it('returns only valid notes', () => {
      pushNotes(true);

      expect(wrapper.vm.$store.getters.notesValidated).to.have.lengthOf(2);
    });
  });

  describe('Rendering', () => {
    it('shows `Your book is empty` when there are no notes', () => {
      expect(wrapper.find(Notes).html()).contains('Your book is empty');
    });

    it('shows correct count of notes', () => {
      pushNotes(true);

      expect(wrapper.findAll(NoteItem)).to.have.lengthOf(2);
    });

    it('shows correct content and tags', () => {
      store.replaceState({
        ...initialState,
        notes: [
          { id: 'valid', content: 'Correct content', tags: ['one', 'two'] },
        ],
      });

      wrapper = mount(App, { store, localVue });

      const note = wrapper.find(NoteItem);
      const noteTags = note.find(NoteItemTags);
      const noteContent = note.find(NoteItemContent);

      expect(noteContent.html()).to.contain('Correct content');
      expect(noteTags.html()).to.contain('one');
      expect(noteTags.html()).to.contain('two');
      expect(noteTags.findAll(NoteItemTagsItem)).to.have.lengthOf(2);
    });
  });

  describe('Menu edit mode off', () => {
    it('has Edit and Delete buttons but not Save, Cancel and Preview', () => {
      pushNotes();

      const menu = wrapper.find(NoteItemMenu);

      expect(menu.html()).to.contain('Edit');
      expect(menu.html()).to.contain('Delete');
      expect(menu.html()).to.not.contain('Save');
      expect(menu.html()).to.not.contain('Cancel');
      expect(menu.html()).to.not.contain('Preview');
    });
  });

  describe('Menu edit mode on', () => {
    it('has Save, Cancel and Preview buttons but not Edit and Delete', (done) => {
      pushNotes();

      const notes = wrapper.findAll(NoteItem);

      const note = notes.at(0);
      const note2 = notes.at(1);

      const menu = note.find(NoteItemMenu);
      const menu2 = note2.find(NoteItemMenu);

      menu.find('.is-info').trigger('click'); // Edit button

      localVue.nextTick(() => {
        expect(menu.html()).to.not.contain('Edit');
        expect(menu.html()).to.not.contain('Delete');
        expect(menu.html()).to.contain('Save');
        expect(menu.html()).to.contain('Cancel');
        expect(menu.html()).to.contain('Preview');

        expect(menu2.html()).to.not.contain('Edit');
        expect(menu2.html()).to.contain('Delete');
        expect(menu2.html()).to.not.contain('Save');
        expect(menu2.html()).to.not.contain('Cancel');
        expect(menu2.html()).to.not.contain('Preview');

        done();
      });
    });

    it('can cancel note editing', (done) => {
      pushNotes();

      const notes = wrapper.findAll(NoteItem);

      const note = notes.at(0);
      const note2 = notes.at(1);

      const menu = note.find(NoteItemMenu);
      const menu2 = note2.find(NoteItemMenu);

      menu.find('.is-info').trigger('click'); // Edit button

      localVue.nextTick(() => {
        expect(menu.html()).to.not.contain('Edit');
        expect(menu.html()).to.contain('Preview');
        expect(menu2.html()).to.not.contain('Edit');
        expect(menu2.html()).to.not.contain('Preview');

        menu.find('.is-danger').trigger('click'); // Cancel button

        localVue.nextTick(() => {
          expect(menu.html()).to.contain('Edit');
          expect(menu.html()).to.not.contain('Preview');
          expect(menu2.html()).to.contain('Edit');
          expect(menu2.html()).to.not.contain('Preview');
        });

        done();
      });
    });
  });
});
