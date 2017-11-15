<template>
  <section :class="{ notes: true, 'notes--flex': !notes.length }">
    <NotesWrapper />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import NotesWrapper from '@/components/NotesWrapper.vue';

export default {
  name: 'Notes',

  components: { NotesWrapper },

  computed: {
    ...mapGetters(['notes']),
  },
};
</script>
