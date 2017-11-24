<template>
  <li
    class="tag is-medium"
    tabindex="0"
    v-text="tag"
    v-tag
    @click="pushActiveTag(tag)"></li>
</template>

<script>
import { mapMutations } from 'vuex';
import { tag } from '@/directives';

export default {
  name: 'TagsInactiveItem',

  directives: { tag },

  props: {
    tag: {
      type: String,
      required: true,
    },
  },

  methods: mapMutations(['pushActiveTag']),
};
</script>
