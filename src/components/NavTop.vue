<template>
  <header class="top-nav">
    <NavTopBurgerButton />
    <NavTopTagsActive />
    <NavTopTagsActiveAdd />
  </header>
</template>

<script>
import NavTopBurgerButton from '@/components/NavTopBurgerButton.vue';
import NavTopTagsActive from '@/components/NavTopTagsActive.vue';
import NavTopTagsActiveAdd from '@/components/NavTopTagsActiveAdd.vue';

export default {
  name: 'NavTop',

  components: { NavTopBurgerButton, NavTopTagsActive, NavTopTagsActiveAdd },
};
</script>
