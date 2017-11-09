<template>
  <div v-if="hasActive" class="tags-active">
    <div class="tags-active__scroll-wrapper">
      <NavTopTagsActiveItems :tags="tagsActive" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavTopTagsActiveItems from '@/components/NavTopTagsActiveItems.vue';

export default {
  name: 'NavTopTagsActive',

  components: { NavTopTagsActiveItems },

  computed: {
    ...mapGetters(['tagsActive']),

    hasActive() {
      return !!this.tagsActive.length;
    },
  },
};
</script>
