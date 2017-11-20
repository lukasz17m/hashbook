<template>
  <ul class="left-nav__items">
    <NavLeftItem
      :className="newNoteClass"
      :label="newNoteLabel"
      :fa="newNoteIcon"
      @hit="temp" />

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
    ...mapGetters(['tagsInactiveVisible']),

    newNoteClass() {
      return this.$store.getters.editingID ? 'save-note' : 'new-note';
    },

    newNoteIcon() {
      return this.$store.getters.editingID ? 'check' : 'pencil';
    },

    newNoteLabel() {
      return this.$store.getters.editingID ? 'Save note' : 'New note';
    },
  },

  methods: {
    ...mapMutations(['hideTagsInactive', 'showTagsInactive']),

    hashtags() {
      if (this.tagsInactiveVisible) {
        this.hideTagsInactive();
      } else {
        this.showTagsInactive();
      }
    },

    github() {
      window.open('https://github.com/lukasz17m/hashbook', '_blank');
    },

    technologies() {
      // TEMP
      /* eslint-disable no-console */
      console.log(JSON.stringify(['Vue.js', 'Node.js', 'MongoDB'], null, 2));
    },

    // TEMP: Only for scroll testing
    temp() {
      this.$store.commit('pushnotes');
    },
  },
};
</script>
