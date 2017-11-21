<template>
  <textarea v-model="content" v-content-editor></textarea>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { contentEditor } from '@/directives';

export default {
  name: 'NoteItemContentEdit',

  directives: { contentEditor },

  computed: {
    ...mapGetters(['noteContent']),

    content: {
      get() {
        return this.noteContent;
      },

      set(value) {
        this.setNoteContent(value);
      },
    },
  },

  methods: mapMutations(['setNoteContent']),
};
</script>
