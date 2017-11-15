<template>
  <nav class="note__menu">
    <NoteItemMenuItems />
  </nav>
</template>

<script>
import NoteItemMenuItems from '@/components/NoteItemMenuItems.vue';

export default {
  name: 'NoteItemMenu',

  components: { NoteItemMenuItems },
};
</script>
