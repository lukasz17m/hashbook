<template>
  <nav :class="classObject">
    <NavLeftItems />
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import NavLeftItems from '@/components/NavLeftItems.vue';

export default {
  name: 'NavLeft',

  components: { NavLeftItems },

  computed: {
    ...mapGetters(['leftNav', 'leftNavCollapsed']),

    classObject() {
      return {
        'left-nav': true,
        collapsed: this.leftNavCollapsed,
        uncollapsed: !this.leftNavCollapsed,
        hidden: !this.leftNav,
      };
    },
  },
};
</script>
