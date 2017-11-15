<template>
  <ul class="note__menu-items">
    <NoteItemMenuItem
      label="Edit"
      fa="pencil"
      @hit="temp" />

    <NoteItemMenuItem
      label="Delete"
      fa="trash"
      @hit="temp" />

    <NoteItemMenuItem
      label="Save"
      fa="check"
      @hit="temp" />

    <NoteItemMenuItem
      label="Cancel"
      fa="times"
      @hit="temp" />

    <NoteItemMenuItem
      label="Preview"
      fa="eye"
      @hit="temp" />
  </ul>
</template>

<script>
import NoteItemMenuItem from '@/components/NoteItemMenuItem.vue';

export default {
  name: 'NoteItemMenuItems',

  components: { NoteItemMenuItem },

  methods: {
    // TEMP
    temp() {
      console.log('Note menu');
    },
  },
};
</script>
