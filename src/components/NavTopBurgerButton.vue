<template>
  <div
  class="burger-button"
  tabindex="0"
  @click="toggleLeftNav"
  @keyup.enter.space="toggleLeftNav">
    <div class="burger-button__bar"></div>
    <div class="burger-button__bar"></div>
    <div class="burger-button__bar"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'NavTopBurgerButton',

  computed: {
    ...mapGetters(['leftNav']),
  },

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
};
</script>
