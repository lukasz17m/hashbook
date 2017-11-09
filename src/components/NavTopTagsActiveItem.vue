<template>
  <li
    class="tag is-medium"
    tabindex="0"
    v-text="tag"
    v-tag></li>
</template>

<script>
import { tag } from '@/directives';

export default {
  name: 'NavTopTagsActiveItem',

  directives: { tag },

  props: {
    tag: {
      type: String,
      required: true,
    },
  },
};
</script>
