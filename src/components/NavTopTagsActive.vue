<template>
  <aside v-if="tagsActive.length" class="tags-active">
    <div class="tags-active__scroll-wrapper" v-no-scrollbar:horizontal.wheel>
      <NavTopTagsActiveItems :tags="tagsActive" />
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import NavTopTagsActiveItems from '@/components/NavTopTagsActiveItems.vue';
import { noScrollbar } from '@/directives';

export default {
  name: 'NavTopTagsActive',

  components: { NavTopTagsActiveItems },

  directives: { noScrollbar },

  computed: mapGetters(['tagsActive']),
};
</script>
