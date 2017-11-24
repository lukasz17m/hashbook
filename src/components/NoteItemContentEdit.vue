<template>
  <textarea v-model="content" v-content-editor v-fetch-hashtag="addTag"></textarea>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { contentEditor, fetchHashtag } from '@/directives';

export default {
  name: 'NoteItemContentEdit',

  directives: { contentEditor, fetchHashtag },

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

  methods: {
    ...mapMutations(['setNoteContent']),

    addTag() {
      this.$_eventBus.$emit('addTag');
    },
  },
};
</script>
