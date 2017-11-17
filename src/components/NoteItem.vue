<template>
  <article class="note">
    <NoteItemTags :tags="tags" />
    <NoteItemMenu :noteID="id" />
    <NoteItemContent :content="content" />
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
    id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
