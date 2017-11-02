<template>
  <nav :class="classObject">

  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['leftNav']),

    classObject() {
      return {
        collapsed: this.leftNav && false,
        uncollapsed: this.leftNav && true,
      };
    },
  },
};
</script>
