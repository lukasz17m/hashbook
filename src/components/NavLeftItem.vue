<template>
  <li :class="classItem" tabindex="0">
    <span class="left-nav__icon">
      <i :class="classIcon"></i>
    </span>
    <span v-if="!leftNavCollapsed" class="left-nav__label">{{label}}</span>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavLeftItem',

  props: {
    className: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    fa: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters(['leftNavCollapsed']),

    classItem() {
      return [
        'left-nav__item',
        this.className,
      ];
    },

    classIcon() {
      const faSize = this.leftNavCollapsed ? '4x' : '3x';

      return [
        'fa',
        `fa-${faSize}`,
        `fa-${this.fa}`,
      ];
    },
  },
};
</script>
