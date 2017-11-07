<template>
  <header class="top-nav">
    <NavTopBurgerButton />
    <NavTopTagsActive />
  </header>
</template>

<script>
import NavTopBurgerButton from '@/components/NavTopBurgerButton.vue';
import NavTopTagsActive from '@/components/NavTopTagsActive.vue';

export default {
  name: 'NavTop',

  components: { NavTopBurgerButton, NavTopTagsActive },
};
</script>
