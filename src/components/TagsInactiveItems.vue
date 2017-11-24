<template>
  <ul v-if="tags.length" class="tags">
    <TagsInactiveItem v-for="tag in tags" :key="tag" :tag="tag" />
  </ul>

  <div v-else class="tags-inactive__scroll-wrapper--zero-tags">
    <span class="fa fa-hashtag"></span>
    <span>No tags to show</span>
  </div>
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
