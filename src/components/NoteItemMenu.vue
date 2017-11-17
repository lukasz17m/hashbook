<template>
  <nav class="note__menu">
    <NoteItemMenuItems :noteID="noteID" />
  </nav>
</template>

<script>
import NoteItemMenuItems from '@/components/NoteItemMenuItems.vue';

export default {
  name: 'NoteItemMenu',

  components: { NoteItemMenuItems },

  props: {
    noteID: {
      type: String,
      required: true,
    },
  },
};
</script>
