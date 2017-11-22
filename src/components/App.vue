<template>
  <div :class="classObject">
    <NavTop />
    <NavLeft />
    <div class="main-flex">
      <TagsInactive />
      <Notes />
    </div>
    <Spinner v-if="loading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavLeft from '@/components/NavLeft.vue';
import NavTop from '@/components/NavTop.vue';
import Notes from '@/components/Notes.vue';
import Spinner from '@/components/common/Spinner.vue';
import TagsInactive from '@/components/TagsInactive.vue';

export default {
  name: 'App',

  components: {
    NavLeft,
    NavTop,
    Notes,
    Spinner,
    TagsInactive,
  },

  computed: {
    ...mapGetters(['leftNav', 'leftNavCollapsed', 'loading']),

    classObject() {
      return {
        'fix-top-padding': true,
        collapsed: this.leftNav && this.leftNavCollapsed,
        uncollapsed: this.leftNav && !this.leftNavCollapsed,
      };
    },
  },
};
</script>
