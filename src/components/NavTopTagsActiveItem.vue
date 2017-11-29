<template>
  <li
    class="tag is-medium"
    tabindex="0"
    v-text="tag"
    v-tag
    @click="removeActiveTag(tag)"
    @keyup.space.enter="removeActiveTag(tag)"></li>
</template>

<script>
import { mapMutations } from 'vuex';
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

  methods: mapMutations(['removeActiveTag']),
};
</script>
