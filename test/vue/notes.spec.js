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

describe.only('Notes', () => {
  const initialState = state;

  let wrapper;

  const pushNotes = (invalid = false) => {
    let notes;

    if (invalid) {
      notes = [
        // Valid
        { content: 'Lorem ipsum dolor sit amet.', tags: ['lorem ipsum'] },
        // Valid
        { content: '', tags: [] },
        // Invalid
        { content: [], tags: ['lorem ipsum'] },
        // Invalid
        { content: {}, tags: ['lorem ipsum'] },
        // Invalid
        { content: null, tags: ['lorem ipsum'] },
        // Invalid
        { content: true, tags: ['lorem ipsum'] },
        // Invalid
        { content: false, tags: ['lorem ipsum'] },
        // Invalid
        { content: 7, tags: ['lorem ipsum'] },
        // Invalid
        { content: 'Lorem ipsum dolor sit amet.', tags: '' },
        // Invalid
        { content: 'Lorem ipsum dolor sit amet.', tags: {} },
        // Invalid
        { content: 'Lorem ipsum dolor sit amet.', tags: null },
        // Invalid
        { content: 'Lorem ipsum dolor sit amet.', tags: true },
        // Invalid
        { content: 'Lorem ipsum dolor sit amet.', tags: false },
        // Invalid
        { content: 'Lorem ipsum dolor sit amet.', tags: 7 },
        // Invalid
        { tags: [] },
        // Invalid
        { content: 'Lorem ipsum dolor sit amet.' },
        // Invalid
        {},
      ];
    } else {
      notes = [
        { content: 'Lorem ipsum dolor sit amet.', tags: ['lorem ipsum'] },
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
    it('has an array of notes in store', () => {
      expect(wrapper.vm.$store.getters.notes).to.be.an('array');
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
          { content: 'Correct content', tags: ['one', 'two'] },
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

  describe('Menu', () => {
    it('has Edit and Delete button', () => {
      pushNotes();

      const menu = wrapper.find(NoteItemMenu);

      expect(menu.html()).to.contain('Edit');
      expect(menu.html()).to.contain('Delete');
    });
  });
});
