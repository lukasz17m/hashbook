<template>
  <nav class="note__menu">
    <NoteItemMenuItems :inEditMode="inEditMode" @action="onAction" />
  </nav>
</template>

<script>
import NoteItemMenuItems from '@/components/NoteItemMenuItems.vue';

export default {
  name: 'NoteItemMenu',

  components: { NoteItemMenuItems },

  props: {
    inEditMode: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    onAction(type) {
      this.$emit('action', type);
    },
  },
};
</script>
