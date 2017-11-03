<template>
  <li
  :class="classItem"
  tabindex="0"
  @click="toggleLeftNavCollapse"
  @keyup.enter.space="toggleLeftNavCollapse">
    <span class="left-nav__icon">
      <i :class="classIcon"></i>
    </span>
    <span v-if="!leftNavCollapsed" class="left-nav__label">Collapse</span>
  </li>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'NavLeftToggleCollapse',

  computed: {
    ...mapGetters(['leftNavCollapsed']),

    classItem() {
      return {
        'left-nav__item': true,
        collapse: !this.leftNavCollapsed,
        uncollapse: this.leftNavCollapsed,
      };
    },

    classIcon() {
      return {
        fa: true,
        'fa-3x': !this.leftNavCollapsed,
        'fa-4x': this.leftNavCollapsed,
        'fa-angle-left': true,
        'fa-rotate-180': this.leftNavCollapsed,
      };
    },
  },

  methods: {
    ...mapMutations(['collapseLeftNav', 'uncollapseLeftNav']),

    toggleLeftNavCollapse() {
      if (this.leftNavCollapsed) {
        this.uncollapseLeftNav();
      } else {
        this.collapseLeftNav();
      }
    },
  },
};
</script>
