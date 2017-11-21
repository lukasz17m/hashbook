<template>
  <div class="content" v-html="desiredContent">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NoteItemContentPreview',

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
    ...mapGetters(['noteContent']),

    desiredContent() {
      return this.inEditMode ? this.noteContent || '' : this.content;
    },
  },
};
</script>
