<template>
  <ul class="left-nav__items">
    <NavLeftItem
      :className="newNoteClass"
      :label="newNoteLabel"
      :fa="newNoteIcon"
      @hit="newNoteAction" />

    <NavLeftItem
      className="hashtags"
      label="Hashtags"
      fa="hashtag"
      @hit="hashtags" />

    <NavLeftItem
      className="technologies"
      label="Technologies"
      fa="microchip"
      @hit="technologies" />

    <NavLeftItem
      className="github"
      label="GitHub"
      fa="github"
      @hit="github" />

    <NavLeftToggleCollapse />
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import NavLeftItem from '@/components/NavLeftItem.vue';
import NavLeftToggleCollapse from '@/components/NavLeftToggleCollapse.vue';

export default {
  name: 'NavLeftItems',

  components: { NavLeftItem, NavLeftToggleCollapse },

  computed: {
    ...mapGetters(['editingID', 'tagsInactiveVisible']),

    newNoteClass() {
      return this.editingID ? 'save-note' : 'new-note';
    },

    newNoteIcon() {
      return this.editingID ? 'check' : 'pencil';
    },

    newNoteLabel() {
      return this.editingID ? 'Save note' : 'New note';
    },
  },

  methods: {
    ...mapMutations(['hideTagsInactive', 'prependNote', 'showTagsInactive']),

    newNoteAction() {
      if (this.editingID) {
        // Save note
      } else {
        this.prependNote();
      }
    },

    hashtags() {
      if (this.tagsInactiveVisible) {
        this.hideTagsInactive();
      } else {
        this.showTagsInactive();
      }
    },

    technologies() {
      // TEMP
      /* eslint-disable no-console */
      console.log(JSON.stringify(['Vue.js', 'Node.js', 'MongoDB'], null, 2));
    },

    github() {
      window.open('https://github.com/lukasz17m/hashbook', '_blank');
    },
  },
};
</script>
