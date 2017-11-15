<template>
  <article class="note">
    <NoteItemTags :tags="note.tags" />
    <NoteItemMenu />
    <NoteItemContent :content="note.content" />
  </article>
</template>

<script>
import NoteItemContent from '@/components/NoteItemContent.vue';
import NoteItemMenu from '@/components/NoteItemMenu.vue';
import NoteItemTags from '@/components/NoteItemTags.vue';

export default {
  name: 'NoteItem',

  components: { NoteItemContent, NoteItemMenu, NoteItemTags },

  props: {
    note: {
      type: Object,
      required: true,
    },
  },
};
</script>
