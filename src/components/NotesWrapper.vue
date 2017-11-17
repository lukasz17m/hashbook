<template>
  <div class="notes__wrapper" tabindex="0">
    <template v-if="!!notes.length">
      <NoteItem
        v-for="(note, i) in notes"
        :key="i"
        :id="note.id"
        :content="note.content"
        :tags="note.tags" />
    </template>
    <h1 v-else class="notes__zero-notes">
      <span class="fa fa-book"></span>
      <span>Your book is empty</span>
    </h1>
  </div>
</template>

<script>
import NoteItem from '@/components/NoteItem.vue';

export default {
  name: 'NotesWrapper',

  components: { NoteItem },

  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
};
</script>
