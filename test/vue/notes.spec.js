import Vuex from 'vuex';
import extend from 'extend';
import { expect } from 'chai';
import { mount, createLocalVue } from 'vue-test-utils';
import App from '@/components/App.vue';
import NavTopTagsActive from '@/components/NavTopTagsActive.vue';
import NoteItemTags from '@/components/NoteItemTags.vue';
import NoteItemTagsItem from '@/components/NoteItemTagsItem.vue';
import NoteItemTagsItems from '@/components/NoteItemTagsItems.vue';
import NoteItemMenu from '@/components/NoteItemMenu.vue';
import NoteItemMenuItem from '@/components/NoteItemMenuItem.vue';
import NoteItemMenuItems from '@/components/NoteItemMenuItems.vue';
import NoteItemContent from '@/components/NoteItemContent.vue';
import NoteItemContentEdit from '@/components/NoteItemContentEdit.vue';
import NoteItemContentPreview from '@/components/NoteItemContentPreview.vue';
import NoteItem from '@/components/NoteItem.vue';
import Notes from '@/components/Notes.vue';
import NotesWrapper from '@/components/NotesWrapper.vue';
import store from '@/store';
import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);
// BUGFIX
localVue.prototype.$_eventBus = { $emit() {}, $on() {} };

describe('Notes', () => {
  const initialState = extend(true, {}, state);

  let wrapper;

  const pushNotes = (invalid = false) => {
    let notes;

    if (invalid) {
      notes = [
        // Only two first are valid
        { id: 'any length', content: '', tags: [] },
        { id: 'valid', content: 'Lorem ipsum.', tags: ['lorem ipsum'] },
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
        { id: 'valid2', content: 'Foobar', tags: ['foo', 'bar'] },
        { id: 'valid', content: 'Lorem ipsum', tags: ['lorem ipsum'] },
      ];
    }

    store.replaceState(extend(true, {}, initialState, { notes }));

    wrapper = mount(App, { store, localVue });
  };

  beforeEach(() => {
    store.replaceState(extend(true, {}, initialState));

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

    it('has a property named `editingID` which is `null` by default', () => {
      expect(wrapper.vm.$store.getters.editingID).to.be.null;
    });

    it('has a property named `noteContent` which is `null` by default', () => {
      expect(wrapper.vm.$store.getters.noteContent).to.be.null;
    });

    it('has a property named `preview` which is `false` by default', () => {
      expect(wrapper.vm.$store.getters.preview).to.be.false;
    });

    it('has a property named `loading` which is `false` by default', () => {
      expect(wrapper.vm.$store.getters.loading).to.be.false;
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

    it('shows `Empty` in tags wrapper when note has no tags', () => {
      store.replaceState(extend(true, {}, initialState, {
        notes: [
          { id: 'v', content: 'No tags', tags: [] },
        ],
      }));

      wrapper = mount(App, { store, localVue });

      expect(wrapper.find(NoteItemTagsItems).html()).contains('Empty');
    });

    it('shows correct content and tags', () => {
      store.replaceState(extend(true, {}, initialState, {
        notes: [
          { id: 'valid', content: 'Correct content', tags: ['one', 'two'] },
        ],
      }));

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

    it('has `NoteItemContentPreview` component in `NoteItemContent`', () => {
      pushNotes();

      const noteContent = wrapper.find(NoteItemContent);

      expect(noteContent.contains(NoteItemContentPreview)).to.be.true;
    });
  });

  describe('Menu edit mode on', () => {
    it('has `NoteItemContentEdit` component in edit mode', () => {
      pushNotes();

      const notes = wrapper.findAll(NoteItem);

      const note = notes.at(0);
      const note2 = notes.at(1);

      note.find('.is-info').trigger('click'); // Edit button
      wrapper.update();

      expect(note.contains(NoteItemContentEdit)).to.be.true;
      expect(note.contains(NoteItemContentPreview)).to.be.false;

      expect(note2.contains(NoteItemContentEdit)).to.be.false;
      expect(note2.contains(NoteItemContentPreview)).to.be.true;
    });

    it('has Save, Cancel and Preview buttons but not Edit and Delete', () => {
      pushNotes();

      const notes = wrapper.findAll(NoteItem);

      const note = notes.at(0);
      const note2 = notes.at(1);

      const menu = note.find(NoteItemMenu);
      const menu2 = note2.find(NoteItemMenu);

      menu.find('.is-info').trigger('click'); // Edit button
      wrapper.update();

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
    });

    it('can cancel note editing', () => {
      pushNotes();

      const notes = wrapper.findAll(NoteItem);

      const note = notes.at(0);
      const note2 = notes.at(1);

      const menu = note.find(NoteItemMenu);
      const menu2 = note2.find(NoteItemMenu);

      menu.find('.is-info').trigger('click'); // Edit button
      wrapper.update();

      expect(menu.html()).to.not.contain('Edit');
      expect(menu.html()).to.contain('Preview');
      expect(menu2.html()).to.not.contain('Edit');
      expect(menu2.html()).to.not.contain('Preview');

      menu.find('.is-danger').trigger('click'); // Cancel button
      wrapper.update();

      expect(menu.html()).to.contain('Edit');
      expect(menu.html()).to.not.contain('Preview');
      expect(menu2.html()).to.contain('Edit');
      expect(menu2.html()).to.not.contain('Preview');
    });

    it('makes tags of editing note active', () => {
      pushNotes();

      const notes = wrapper.findAll(NoteItem);
      const tagsActive = wrapper.find(NavTopTagsActive);

      const note = notes.at(0);
      const note2 = notes.at(1);

      const menu = note.find(NoteItemMenu);

      expect(note.find(NoteItemTags).html()).to.contain('lorem ipsum');
      expect(note2.find(NoteItemTags).html()).to.contain('foo');
      expect(note2.find(NoteItemTags).html()).to.contain('bar');

      menu.find('.is-info').trigger('click'); // Edit button
      wrapper.update();

      expect(note.find(NoteItemTags).html()).to.be.undefined;
      expect(note2.find(NoteItemTags).html()).to.contain('foo');
      expect(note2.find(NoteItemTags).html()).to.contain('bar');

      expect(tagsActive.html()).to.contain('lorem ipsum');

      menu.find('.is-danger').trigger('click'); // Cancel button
      wrapper.update();

      expect(note.find(NoteItemTags).html()).to.contain('lorem ipsum');
      expect(note2.find(NoteItemTags).html()).to.contain('foo');
      expect(note2.find(NoteItemTags).html()).to.contain('bar');

      expect(tagsActive.html()).to.be.undefined;
    });

    it('editor content is saved to Vuex and vice versa', () => {
      pushNotes();

      const note = wrapper.find(NoteItem);

      note.find('.is-info').trigger('click'); // Edit button

      note.find('textarea').element.value = 'Lorem ipsum dolor'; // Set content
      note.find('textarea').trigger('input'); // Force v-model update

      expect(store.getters.noteContent).equal('Lorem ipsum dolor');

      store.commit('setNoteContent', 'Foobar');
      wrapper.update();

      expect(note.find('textarea').element.value).equal('Foobar');
    });

    it('note content is set into editor', () => {
      pushNotes();

      const note = wrapper.find(NoteItem);

      note.find('.is-info').trigger('click'); // Edit button
      wrapper.update();

      expect(note.find('textarea').element.value).equal('Lorem ipsum');
    });

    it('empty content disables save buttons', () => {
      pushNotes();

      const note = wrapper.find(NoteItem);

      note.find('.is-info').trigger('click'); // Edit button
      wrapper.update();

      note.find('textarea').element.value = ''; // Set content
      note.find('textarea').trigger('input'); // Force v-model update
      wrapper.update();

      expect(note.find('.is-success').hasAttribute('disabled', 'disabled'))
        .to.be.true;

      expect(wrapper.find('.save-note').hasClass('disabled')).to.be.true;
    });
  });

  describe('Preview mode on', () => {
    it('change `NoteItemContentEdit` to `NoteItemContentPreview`', () => {
      pushNotes();

      const note = wrapper.find(NoteItem);

      note.find('.is-info').trigger('click'); // Edit button
      wrapper.update();

      expect(note.contains(NoteItemContentEdit)).to.be.true;
      expect(note.contains(NoteItemContentPreview)).to.be.false;

      note.find('.is-primary').trigger('click'); // Preview button, switch on
      wrapper.update();

      expect(note.find('.is-primary').hasClass('active')).to.be.true;

      expect(note.contains(NoteItemContentEdit)).to.be.false;
      expect(note.contains(NoteItemContentPreview)).to.be.true;

      note.find('.is-primary').trigger('click'); // Preview button, switch off
      wrapper.update();

      expect(note.find('.is-primary').hasClass('active')).to.be.false;

      expect(note.contains(NoteItemContentEdit)).to.be.true;
      expect(note.contains(NoteItemContentPreview)).to.be.false;
    });

    it('shows preview correctly', () => {
      pushNotes();

      const note = wrapper.find(NoteItem);

      note.find('.is-info').trigger('click'); // Edit button
      wrapper.update();

      note.find('textarea').element.value = '__Lorem__'; // Set content
      note.find('textarea').trigger('input'); // Force v-model update

      note.find('.is-primary').trigger('click'); // Preview button, switch on
      wrapper.update();

      expect(note.find('.content').html()).contains('<strong>Lorem</strong>');
    });
  });

  describe('New note', () => {
    it('prepends new note to Vuex when `New note` menu item is clicked', () => {
      wrapper.find('.new-note').trigger('click');

      expect(store.getters.notesValidated[0]).eql({
        id: 'new',
        content: '',
        tags: [],
      });

      expect(store.getters.editingID).equal('new');
    });

    it('enables edit mode for new note automatically', () => {
      wrapper.find('.new-note').trigger('click');
      wrapper.update();

      const note = wrapper.find(NoteItem);

      expect(note.contains('textarea')).to.be.true;
    });

    it('cancel button drops unsaved note', () => {
      wrapper.find('.new-note').trigger('click');
      wrapper.update();

      expect(store.getters.notesValidated).to.have.lengthOf(1);

      const note = wrapper.find(NoteItem);
      note.find('.is-danger').trigger('click'); // Cancel button
      wrapper.update();

      expect(store.getters.notesValidated).to.have.lengthOf(0);
    });
  });
});
