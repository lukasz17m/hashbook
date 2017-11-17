<template>
  <ul class="note__menu-items">
    <NoteItemMenuItem
      v-if="editModeButton"
      label="Edit"
      fa="pencil"
      @hit="edit" />

    <NoteItemMenuItem
      v-if="!editModeButtons"
      label="Delete"
      fa="trash"
      @hit="temp" />

    <NoteItemMenuItem
      v-if="editModeButtons"
      label="Save"
      fa="check"
      @hit="temp" />

    <NoteItemMenuItem
      v-if="editModeButtons"
      label="Cancel"
      fa="times"
      @hit="cancelEdit" />

    <NoteItemMenuItem
      v-if="editModeButtons"
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

  props: {
    noteID: {
      type: String,
      required: true,
    },
  },

  computed: {
    editModeButton() {
      return !this.$store.getters.editing;
    },

    editModeButtons() {
      return this.$store.getters.editing
        && this.$store.getters.editingID === this.noteID;
    },
  },

  methods: {
    cancelEdit() {
      this.$store.commit('cancelEdit');
    },

    edit() {
      this.$store.commit('edit', { id: this.noteID });
    },

    // TEMP
    temp() {
      console.log('Note menu');
    },
  },
};
</script>
