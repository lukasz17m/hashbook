<template>
  <li class="tag is-medium" v-text="tag" v-tag></li>
</template>

<script>
import { tag } from '@/directives';

export default {
  name: 'NoteItemMenuItem',

  directives: { tag },

  props: {
    tag: {
      type: String,
      required: true,
    },
  },
};
</script>
