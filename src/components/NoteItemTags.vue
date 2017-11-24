<template>
  <aside v-if="!inEditMode" class="note__tags">
    <NoteItemTagsItems :tags="tags" />
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteItemTagsItems from '@/components/NoteItemTagsItems.vue';

export default {
  name: 'NoteItemTags',

  components: { NoteItemTagsItems },

  props: {
    inEditMode: {
      type: Boolean,
      required: true,
    },

    tags: {
      type: Array,
      required: true,
    },
  },

  computed: mapGetters(['editingID']),
};
</script>
