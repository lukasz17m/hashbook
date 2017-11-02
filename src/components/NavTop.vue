<template>
  <header>
    <div class="burger-button" @click="toggleLeftNav">
      <div class="burger-button__bar"></div>
      <div class="burger-button__bar"></div>
      <div class="burger-button__bar"></div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['hideLeftNav', 'showLeftNav']),

    toggleLeftNav() {
      if (this.leftNav) {
        this.hideLeftNav();
      } else {
        this.showLeftNav();
      }
    },
  },

  computed: {
    ...mapGetters(['leftNav']),
  },
};
</script>
