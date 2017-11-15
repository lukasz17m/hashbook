export default {
  leftNav: state => state.leftNav,

  leftNavCollapsed: state => state.leftNavCollapsed,

  notes: state => state.notes,

  notesValidated: state => (state.notes.filter((note) => {
    if (
      typeof note.content === 'undefined' ||
      typeof note.tags === 'undefined' ||
      note.content === null ||
      note.tags === null ||
      note.content.constructor !== String ||
      note.tags.constructor !== Array
    ) {
      return false;
    }
    return true;
  })),

  tags: state => state.tags,

  tagsActive: state => state.tagsActive,

  tagsInactiveVisible: state => state.tagsInactiveVisible,
};
