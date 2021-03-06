<template>
  <article class="note">
    <NoteItemTags :inEditMode="inEditMode" :tags="tags" />
    <NoteItemMenu :inEditMode="inEditMode" @action="handleAction" />
    <NoteItemContent :content="content" :inEditMode="inEditMode" />
  </article>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
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
    ...mapGetters(['editingID', 'noteContent', 'preview']),

    inEditMode() {
      return this.editingID === this.id;
    },
  },

  methods: {
    ...mapActions(['deleteNote', 'saveNote']),

    ...mapMutations([
      'cancel',
      'disablePreview',
      'edit',
      'enablePreview',
      'setActiveTags',
    ]),

    handleAction(type) {
      switch (type) {
        case 'edit': {
          this.edit(this.id);
          this.setActiveTags(this.tags);
          this.$el.dispatchEvent(new CustomEvent('editmodeon'));

          break;
        }

        case 'delete': {
          this.deleteNote(this.id);

          break;
        }

        case 'save': {
          if (this.noteContent === '') break;
          this.saveNote();
          this.$_eventBus.$emit('save');

          break;
        }

        case 'cancel': {
          this.cancel();
          this.$el.dispatchEvent(new CustomEvent('editmodeoff'));

          break;
        }

        case 'preview': {
          if (this.preview) {
            this.disablePreview();
            this.$el.dispatchEvent(new CustomEvent('previewmodeoff'));
          } else {
            this.enablePreview();
            this.$el.dispatchEvent(new CustomEvent('previewmodeon'));
          }

          break;
        }

        default:
      }
    },
  },

  created() {
    this.$_eventBus.$on('save', () => {
      if (this.inEditMode) {
        this.$el.dispatchEvent(new CustomEvent('editmodeoff'));
      }
    });
  },

  mounted() {
    if (this.id === 'new') {
      this.$nextTick(() => {
        this.$el.dispatchEvent(new CustomEvent('editmodeon'));
      });
    }
  },
};
</script>
