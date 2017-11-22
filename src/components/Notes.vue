<template>
  <section :class="{ notes: true, 'notes--flex': !notesValidated.length }">
    <NotesWrapper :notes="notesValidated" />
  </section>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
import NotesWrapper from '@/components/NotesWrapper.vue';

export default {
  name: 'Notes',

  components: { NotesWrapper },

  computed: {
    ...mapGetters(['notesValidated']),
  },

  methods: mapMutations(['updateNotes', 'spin']),

  mounted() {
    this.spin(true);

    axios.get('/api/notes')
      .catch(() => ({ data: [] }))
      .then(({ data: notes }) => {
        this.updateNotes(notes);
        this.spin(false);
      });
  },
};
</script>
