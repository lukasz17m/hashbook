<template>
  <ul class="tags" v-scroll="direction">
    <NavTopTagsActiveItem
      v-for="(tag, i) in tags"
      :key="i"
      :tag="tag" />
  </ul>
</template>

<script>
import { scroll } from '@/directives';
import NavTopTagsActiveItem from '@/components/NavTopTagsActiveItem.vue';

export default {
  name: 'NavTopTagsActiveItems',

  components: { NavTopTagsActiveItem },

  directives: { scroll },

  props: {
    tags: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      direction: 'horizontal',
    };
  },
};
</script>
