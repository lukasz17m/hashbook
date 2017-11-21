<template>
  <section class="note__content">
    <Component :is="contentComponent" :content="content" :inEditMode="inEditMode" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters(['preview']),

    contentComponent() {
      return (this.preview && this.inEditMode) || !this.inEditMode
        ? 'NoteItemContentPreview'
        : 'NoteItemContentEdit';
    },
  },
};
</script>
