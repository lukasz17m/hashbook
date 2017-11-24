<template>
  <aside v-if="tagsInactiveVisible" class="tags-inactive">
    <div class="tags-inactive__scroll-wrapper" v-no-scrollbar:vertical.flex>
      <TagsInactiveItems :tags="tags" />
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import TagsInactiveItems from '@/components/TagsInactiveItems.vue';
import { noScrollbar } from '@/directives/';

export default {
  name: 'TagsInactive',

  components: { TagsInactiveItems },

  directives: { noScrollbar },

  computed: mapGetters(['tags', 'tagsInactiveVisible']),
};
</script>
