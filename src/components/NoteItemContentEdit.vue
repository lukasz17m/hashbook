<template>
  <textarea v-content-editor></textarea>
</template>

<script>
import { contentEditor } from '@/directives';

export default {
  name: 'NoteItemContentEdit',

  directives: { contentEditor },
};
</script>
