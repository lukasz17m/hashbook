<template>
  <div class="notes__wrapper" tabindex="0">
    <template v-if="!!notesValidated.length">
      <NoteItem v-for="(note, i) in notesValidated" :key="i" :note="note"/>
    </template>
    <h1 v-else class="notes__zero-notes">
      <span class="fa fa-book"></span>
      <span>Your book is empty</span>
    </h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteItem from '@/components/NoteItem.vue';

export default {
  name: 'NotesWrapper',

  components: { NoteItem },

  computed: {
    ...mapGetters(['notesValidated']),
  },
};
</script>
