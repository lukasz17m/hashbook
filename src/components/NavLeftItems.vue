<template>
  <ul class="left-nav__items">
    <NavLeftItem
      className="new-note"
      label="New note"
      fa="pencil"
      @hit="temp" />

    <NavLeftItem
      className="hashtags"
      label="Hashtags"
      fa="hashtag"
      @hit="temp" />

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
import NavLeftItem from '@/components/NavLeftItem.vue';
import NavLeftToggleCollapse from '@/components/NavLeftToggleCollapse.vue';

export default {
  name: 'NavLeftItems',

  components: { NavLeftItem, NavLeftToggleCollapse },

  methods: {
    github() {
      window.open('https://github.com/lukasz17m/hashbook', '_blank');
    },
    technologies() {
      // TEMP
      console.log(JSON.stringify(['Vue.js', 'Node.js', 'MongoDB'], null, 2));
    },
    // TEMP: Only for scroll testing
    temp() {
      this.$store.commit('pushtags');
    },
  },
};
</script>
