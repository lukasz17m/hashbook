<template>
  <ul class="tags">
    <NoteItemTagsItem v-for="tag in tags" :key="tag" :tag="tag" />
  </ul>
</template>

<script>
import NoteItemTagsItem from '@/components/NoteItemTagsItem.vue';

export default {
  name: 'NoteItemTagsItems',

  components: { NoteItemTagsItem },

  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
