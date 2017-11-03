<template>
  <ul class="left-nav__items">
    <NavLeftItem className="new-note" label="New note" fa="pencil" />
    <NavLeftItem className="hashtags" label="Hashtags" fa="hashtag" />
    <NavLeftItem className="technologies" label="Technologies" fa="microchip" />
    <NavLeftItem className="github" label="GitHub" fa="github" />
    <NavLeftToggleCollapse />
  </ul>
</template>

<script>
import NavLeftItem from '@/components/NavLeftItem.vue';
import NavLeftToggleCollapse from '@/components/NavLeftToggleCollapse.vue';

export default {
  name: 'NavLeftItems',

  components: { NavLeftItem, NavLeftToggleCollapse },
};
</script>
