import { last } from '@/utils';

export default {
  appendNote(_state) {
    const state = _state;
    const id = 'new';

    state.notes.push({ id, content: '', tags: [] });
    state.editingID = id;
    state.noteContent = '';
  },

  cancel(_state) {
    const state = _state;

    if (state.editingID === 'new') {
      state.notes.pop();
    }

    state.tagsActive = [];
    state.editingID = null;
    state.noteContent = null;
    state.preview = false;
  },

  edit(_state, id) {
    const state = _state;
    state.editingID = String(id);
    state.noteContent = state.notes.find(note => note.id === id).content;
  },

  disablePreview(_state) {
    const state = _state;
    state.preview = false;
  },

  enablePreview(_state) {
    const state = _state;
    state.preview = true;
  },

  hideLeftNav(_state) {
    const state = _state;
    state.leftNav = false;
  },

  showLeftNav(_state) {
    const state = _state;
    state.leftNav = true;
  },

  collapseLeftNav(_state) {
    const state = _state;
    state.leftNavCollapsed = true;
  },

  uncollapseLeftNav(_state) {
    const state = _state;
    state.leftNavCollapsed = false;
  },

  hideTagsInactive(_state) {
    const state = _state;
    state.tagsInactiveVisible = false;
  },

  showTagsInactive(_state) {
    const state = _state;
    state.tagsInactiveVisible = true;
  },

  pushActiveTag(_state, tag) {
    const state = _state;
    if (state.tagsActive.indexOf(tag) < 0) {
      state.tagsActive.push(tag);
    }
  },

  removeActiveTag(_state, tag) {
    const state = _state;
    state.tagsActive = state.tagsActive.filter(item => tag !== item);
  },

  setActiveTags(_state, tags) {
    const state = _state;
    state.tagsActive = [...tags];
  },

  removeNote(_state, id) {
    const state = _state;

    state.notes = state.notes.filter(note => note.id !== id);
  },

  createNote(_state, id) {
    const state = _state;
    last(state.notes).id = String(id);
    last(state.notes).content = state.noteContent;
    last(state.notes).tags = state.tagsActive;

    state.tagsActive = [];
    state.editingID = null;
    state.noteContent = null;
    state.preview = false;
  },

  updateNote(_state, id) {
    const state = _state;
    const note = state.notes.find(item => item.id === id);
    note.content = state.noteContent;
    note.tags = state.tagsActive;

    state.tagsActive = [];
    state.editingID = null;
    state.noteContent = null;
    state.preview = false;
  },

  setNoteContent(_state, value) {
    const state = _state;
    state.noteContent = String(value);
  },

  spin(_state, value) {
    const state = _state;
    state.loading = Boolean(value);
  },

  updateNotes(_state, notes) {
    const state = _state;
    state.notes = notes;
  },
};
