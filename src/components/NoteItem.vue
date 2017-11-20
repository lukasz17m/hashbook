<template>
  <article class="note">
    <NoteItemTags :inEditMode="inEditMode" :tags="tags" />
    <NoteItemMenu :inEditMode="inEditMode" @edit="startEdit" @cancelEdit="cancelEdit" />
    <NoteItemContent :content="content" :inEditMode="inEditMode" />
  </article>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import NoteItemContent from '@/components/NoteItemContent.vue';
import NoteItemMenu from '@/components/NoteItemMenu.vue';
import NoteItemTags from '@/components/NoteItemTags.vue';

export default {
  name: 'NoteItem',

  components: { NoteItemContent, NoteItemMenu, NoteItemTags },

  props: {
    id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters(['editingID']),

    inEditMode() {
      return this.editingID === this.id;
    },
  },

  methods: {
    ...mapMutations(['cancel', 'edit', 'pushActiveTags']),

    cancelEdit() {
      this.cancel();
      this.$el.style.height = 'auto';
    },

    startEdit() {
      this.edit({ id: this.id });
      this.pushActiveTags({ tags: this.tags });
      this.$el.dispatchEvent(new Event('editmodeon'));
    },
  },
};
</script>
