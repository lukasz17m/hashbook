<template>
  <ul class="tags">
    <NavTopTagsActiveItem v-for="(tag, i) in tags" :key="i" :tag="tag" />
  </ul>
</template>

<script>
import NavTopTagsActiveItem from '@/components/NavTopTagsActiveItem.vue';

export default {
  name: 'NavTopTagsActiveItems',

  components: { NavTopTagsActiveItem },

  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
