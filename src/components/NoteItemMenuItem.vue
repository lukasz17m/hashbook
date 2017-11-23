<template>
  <li
    :class="classObject"
    tabindex="0"
    :disabled="disabled"
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
import { mapGetters } from 'vuex';
import { contains } from '@/utils';

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
    ...mapGetters(['noteContent']),

    classIcon() {
      return [
        'fa',
        'fa-2x',
        `fa-${this.fa}`,
      ];
    },

    classObject() {
      return {
        button: true,
        'note__menu-item': true,
        'is-danger': contains(this.label, 'Cancel', 'Delete'),
        'is-success': this.label.includes('Save'),
        'is-info': this.label.includes('Edit'),
        'is-primary is-outlined--preview': this.label.includes('Preview'),
      };
    },

    disabled() {
      return this.label.includes('Save') && this.noteContent === '';
    },
  },
};
</script>
