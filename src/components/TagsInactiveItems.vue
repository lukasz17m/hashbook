<template>
  <ul class="tags">
    <TagsInactiveItem
      v-for="(tag, i) in tags"
      :key="i"
      :tag="tag" />
  </ul>
</template>

<script>
import TagsInactiveItem from '@/components/TagsInactiveItem.vue';

export default {
  name: 'TagsInactiveItems',

  components: { TagsInactiveItem },

  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
