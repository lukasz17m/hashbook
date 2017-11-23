<template>
  <div class="notes__wrapper" tabindex="0">
    <template v-if="!!notes.length">
      <NoteItem
        v-for="note in notes"
        :key="note.id"
        :ref="note.id"
        :id="note.id"
        :content="note.content"
        :tags="note.tags"
        v-adjust-editor="note.id" />
    </template>
    <h1 v-else class="notes__zero-notes">
      <span class="fa fa-book"></span>
      <span>Your book is empty</span>
    </h1>
  </div>
</template>

<script>
import NoteItem from '@/components/NoteItem.vue';
import { adjustEditor } from '@/directives';

export default {
  name: 'NotesWrapper',

  components: { NoteItem },

  directives: { adjustEditor },

  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
};
</script>
