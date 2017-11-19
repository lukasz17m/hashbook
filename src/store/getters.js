const validator = {
  note(note) {
    if (
      typeof note.id === 'undefined' ||
      typeof note.content === 'undefined' ||
      typeof note.tags === 'undefined' ||
      note.id === null ||
      note.content === null ||
      note.tags === null ||
      note.id.constructor !== String ||
      note.content.constructor !== String ||
      note.tags.constructor !== Array
    ) {
      return false;
    }
    return true;
  },
};

export default {
  editing: state => state.editing,

  editingID: state => state.editingID,

  leftNav: state => state.leftNav,

  leftNavCollapsed: state => state.leftNavCollapsed,

  notesValidated: state => state.notes.filter(validator.note),

  // I even have no idea how to indent it, will follow linter tips
  tags: state => [
    ...new Set([]
      .concat(...state.notes
        .filter(validator.note)
        .map(note => note.tags))),
  ],

  tagsActive: state => state.tagsActive,

  tagsInactiveVisible: state => state.tagsInactiveVisible,
};
