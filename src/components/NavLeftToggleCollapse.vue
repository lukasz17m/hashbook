<template>
  <li
    :class="classItem"
    :tabindex="tabindex"
    @click="toggleLeftNavCollapse"
    @keyup.enter.space="toggleLeftNavCollapse">
    <span class="left-nav__icon">
      <span :class="classIcon"></span>
    </span>
    <span v-if="!leftNavCollapsed" class="left-nav__label">Collapse</span>
  </li>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'NavLeftToggleCollapse',

  computed: {
    ...mapGetters(['leftNav', 'leftNavCollapsed']),

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

    tabindex() {
      return this.leftNav ? 0 : -1;
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
