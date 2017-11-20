<template>
  <section class="note__content">
    <Component :is="contentComponent" :content="content" />
  </section>
</template>

<script>
import NoteItemContentPreview from '@/components/NoteItemContentPreview.vue';
import NoteItemContentEdit from '@/components/NoteItemContentEdit.vue';

export default {
  name: 'NoteItemContent',

  components: { NoteItemContentEdit, NoteItemContentPreview },

  props: {
    content: {
      type: String,
      required: true,
    },
    inEditMode: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    contentComponent() {
      return this.inEditMode ? 'NoteItemContentEdit' : 'NoteItemContentPreview';
    },
  },
};
</script>
