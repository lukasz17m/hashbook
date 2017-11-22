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
  editingID: state => state.editingID,

  leftNav: state => state.leftNav,

  leftNavCollapsed: state => state.leftNavCollapsed,

  loading: state => state.loading,

  noteContent: state => state.noteContent,

  notesValidated: state => state.notes.filter(validator.note),

  preview: state => state.preview,

  // I even have no idea how to indent it, will follow linter tips
  tags: state => [
    ...new Set([]
      .concat(...state.notes
        .filter(validator.note)
        .map(note => note.tags)
        .map(tags => tags.filter(tag => state.tagsActive.indexOf(tag) < 0)))),
  ],

  tagsActive: state => state.tagsActive,

  tagsInactiveVisible: state => state.tagsInactiveVisible,
};
