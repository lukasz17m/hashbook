<template>
  <nav class="note__menu">
    <NoteItemMenuItems :inEditMode="inEditMode" @edit="$emit('edit')" @cancel="$emit('cancelEdit')" />
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
};
</script>
