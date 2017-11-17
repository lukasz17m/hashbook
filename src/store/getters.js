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

  tags: state => state.tags,

  tagsActive: state => state.tagsActive,

  tagsInactiveVisible: state => state.tagsInactiveVisible,
};
