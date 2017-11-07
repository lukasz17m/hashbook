<template>
  <li :class="classItem" :tabindex="tabindex" @click="temp">
    <span class="left-nav__icon">
      <span :class="classIcon"></span>
    </span>
    <span
      v-if="!leftNavCollapsed"
      class="left-nav__label"
      v-text="label"></span>
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
    ...mapGetters(['leftNav', 'leftNavCollapsed']),

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

    tabindex() {
      return this.leftNav ? 0 : -1;
    },
  },

  methods: {
    // TEMP: Only for scroll testing
    temp() {
      this.$store.commit('pushtags');
    },
  },
};
</script>
