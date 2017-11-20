<template>
  <ul class="note__menu-items">
    <NoteItemMenuItem
      v-if="!editingID"
      label="Edit"
      fa="pencil"
      @hit="$emit('edit')" />

    <NoteItemMenuItem
      v-if="!inEditMode"
      label="Delete"
      fa="trash"
      @hit="temp" />

    <NoteItemMenuItem
      v-if="inEditMode"
      label="Save"
      fa="check"
      @hit="temp" />

    <NoteItemMenuItem
      v-if="inEditMode"
      label="Cancel"
      fa="times"
      @hit="$emit('cancel')" />

    <NoteItemMenuItem
      v-if="inEditMode"
      label="Preview"
      fa="eye"
      @hit="temp" />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteItemMenuItem from '@/components/NoteItemMenuItem.vue';

export default {
  name: 'NoteItemMenuItems',

  components: { NoteItemMenuItem },

  props: {
    inEditMode: {
      type: Boolean,
      required: true,
    },
  },

  computed: mapGetters(['editingID']),

  methods: {
    // TEMP
    temp() {
      /* eslint-disable no-console */
      console.log('Note menu');
    },
  },
};
</script>
