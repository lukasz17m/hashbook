<template>
  <section :class="{ notes: true, 'notes--flex': !notesValidated.length }">
    <NotesWrapper :notes="notesValidated" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import NotesWrapper from '@/components/NotesWrapper.vue';

export default {
  name: 'Notes',

  components: { NotesWrapper },

  computed: {
    ...mapGetters(['notesValidated']),
  },
};
</script>
