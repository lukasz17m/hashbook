export default {
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
  // TEMP: Only for note testing
  pushnotes: (_state) => {
    const state = _state;
    state.notes.push(
      { content: 'Lorem ipsum dolor sit amet.', tags: ['lorem ipsum'] },
      { content: 'Two tags note.', tags: ['lorem', 'ipsum'] },
      { content: '', tags: ['blank', 'content'] },
      { content: 'No tags', tags: ['', 'sds'] },
      { content: null, tags: 'lorem ipsum' },
      {},
    );
  },
};
