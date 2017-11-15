<template>
  <aside class="note__tags">
    <NoteItemTagsItems :tags="tags" />
  </aside>
</template>

<script>
import NoteItemTagsItems from '@/components/NoteItemTagsItems.vue';

export default {
  name: 'NoteItemTags',

  components: { NoteItemTagsItems },

  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
