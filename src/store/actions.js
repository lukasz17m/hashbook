import axios from 'axios';

export default {
  deleteNote({ commit }, id) {
    if (id === 'new') {
      commit('removeNote', id);
    } else {
      commit('spin', true);
      axios.delete(`/api/notes/${id}`)
        .catch(() => undefined)
        .then(() => {
          commit('removeNote', id);
          commit('spin', false);
        });
    }
  },

  getNotes({ commit }) {
    commit('spin', true);

    axios.get('/api/notes')
      .catch(() => ({ data: [] }))
      .then(({ data: notes }) => {
        commit('updateNotes', notes);
        commit('spin', false);
      });
  },

  saveNote({ commit, getters }) {
    const { editingID } = getters;
    commit('spin', true);

    if (editingID === 'new') {
      axios.post('/api/notes', {
        content: getters.noteContent,
        tags: getters.tagsActive,
      })
        .catch(() => ({ data: { id: null } }))
        .then(({ data: { id } }) => {
          if (id !== null) {
            commit('createNote', id);
          }
          commit('spin', false);
        });
    } else {
      axios.put(`/api/notes/${editingID}`, {
        content: getters.noteContent,
        tags: getters.tagsActive,
      })
        .catch(() => ({ data: { id: null } }))
        .then(({ data: { id } }) => {
          if (id !== null) {
            commit('updateNote', id);
          }
          commit('spin', false);
        });
    }
  },
};
