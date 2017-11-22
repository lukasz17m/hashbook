<template>
  <section :class="{ notes: true, 'notes--flex': !notesValidated.length }">
    <NotesWrapper :notes="notesValidated" />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NotesWrapper from '@/components/NotesWrapper.vue';

export default {
  name: 'Notes',

  components: { NotesWrapper },

  computed: {
    ...mapGetters(['notesValidated']),
  },

  methods: mapActions(['getNotes']),

  mounted() {
    this.getNotes();
  },
};
</script>
