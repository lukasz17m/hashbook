export default {
  cancel(_state) {
    const state = _state;

    if (state.editingID === 'new') {
      state.notes.shift();
    }

    state.tagsActive = [];
    state.editingID = null;
    state.noteContent = null;
    state.preview = false;
  },

  edit(_state, { id }) {
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

  prependNote(_state) {
    const state = _state;
    const id = 'new';

    state.notes.unshift({ id, content: '', tags: [] });
    state.editingID = id;
  },

  pushActiveTags(_state, { tags }) {
    const state = _state;
    state.tagsActive.push(...tags);
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
