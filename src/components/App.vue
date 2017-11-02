<template>
  <div class="fix-top-padding">
    <NavTop />
    <NavLeft />
  </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue';
import NavTop from '@/components/NavTop.vue';

export default {
  data() {
    return {
    };
  },

  components: {
    NavLeft,
    NavTop,
  },

  methods: {
  },
};
</script>
