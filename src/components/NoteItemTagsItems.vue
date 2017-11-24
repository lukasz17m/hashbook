<template>
  <ul v-if="tags.length" class="tags">
    <NoteItemTagsItem v-for="tag in tags" :key="tag" :tag="tag" />
  </ul>

  <div v-else class="note__tags--zero-tags">
    <span class="fa fa-hashtag"></span>
    <span>Empty</span>
  </div>
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
