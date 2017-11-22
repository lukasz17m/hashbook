import axios from 'axios';

export default {
  getNotes({ commit }) {
    commit('spin', true);

    axios.get('/api/notes')
      .catch(() => ({ data: [] }))
      .then(({ data: notes }) => {
        commit('updateNotes', notes);
        commit('spin', false);
      });
  },
};
