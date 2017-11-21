export default {
  cancel: (_state) => {
    const state = _state;
    state.tagsActive = [];
    state.editingID = null;
    state.noteContent = null;
    state.preview = false;
  },

  edit: (_state, { id }) => {
    const state = _state;
    state.editingID = id;
    state.noteContent = state.notes.find(note => note.id === id).content;
  },

  disablePreview: (_state) => {
    const state = _state;
    state.preview = false;
  },

  enablePreview: (_state) => {
    const state = _state;
    state.preview = true;
  },

  hideLeftNav: (_state) => {
    const state = _state;
    state.leftNav = false;
  },

  showLeftNav: (_state) => {
    const state = _state;
    state.leftNav = true;
  },

  collapseLeftNav: (_state) => {
    const state = _state;
    state.leftNavCollapsed = true;
  },

  uncollapseLeftNav: (_state) => {
    const state = _state;
    state.leftNavCollapsed = false;
  },

  hideTagsInactive: (_state) => {
    const state = _state;
    state.tagsInactiveVisible = false;
  },

  showTagsInactive: (_state) => {
    const state = _state;
    state.tagsInactiveVisible = true;
  },

  pushActiveTags: (_state, { tags }) => {
    const state = _state;
    state.tagsActive.push(...tags);
  },

  setNoteContent: (_state, value) => {
    const state = _state;
    state.noteContent = value;
  },

  updateNotes: (_state, notes) => {
    const state = _state;
    state.notes = notes;
  },

  // TEMP: Only for note testing
  pushnotes: (_state) => {
    const state = _state;
    state.notes.push(
      { id: 'valid', content: 'Lorem ipsum dolor sit amet.', tags: ['lorem'] },
      { id: 'valid2', content: 'Two tags note.', tags: ['lorem', 'ipsum'] },
      { id: 'valid3', content: '', tags: ['blank', 'content'] },
      { id: 'valid4', content: 'No tags', tags: ['', 'sds'] },
      { id: 'invalid', content: null, tags: 'lorem ipsum' },
      {},
    );
  },
};
