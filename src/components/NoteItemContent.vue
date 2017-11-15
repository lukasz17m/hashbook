<template>
  <section class="note__content content" v-text="content">
  </section>
</template>

<script>
export default {
  name: 'NoteItemContent',

  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>
