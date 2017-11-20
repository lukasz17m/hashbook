<template>
  <div class="content" v-text="content">
  </div>
</template>

<script>
export default {
  name: 'NoteItemContentPreview',

  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>
