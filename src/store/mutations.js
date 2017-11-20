export default {
  cancel: (_state) => {
    const state = _state;
    state.tagsActive = [];
    state.editing = false;
    state.editingID = null;
  },

  edit: (_state, { id }) => {
    const state = _state;
    state.editing = true;
    state.editingID = id;
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

  pushActiveTags(_state, { tags }) {
    const state = _state;
    state.tagsActive.push(...tags);
  },

  showTagsInactive: (_state) => {
    const state = _state;
    state.tagsInactiveVisible = true;
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
