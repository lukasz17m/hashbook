<template>
  <li
    class="note__menu-item"
    tabindex="0"
    @click="$emit('hit')"
    @keyup.enter.space="$emit('hit')">
    <span class="note__menu-icon">
      <span :class="classIcon"></span>
    </span>
    <span
      class="note__menu-label"
      v-text="label"></span>
  </li>
</template>

<script>
export default {
  name: 'NoteItemMenuItem',

  props: {
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
    classIcon() {
      return [
        'fa',
        'fa-2x',
        `fa-${this.fa}`,
      ];
    },
  },
};
</script>
