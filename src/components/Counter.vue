<template>
  <div>
    {{count}}
    <button class="increment" @click="increment">+1</button>
    <button class="decrement" @click="decrement">-1</button>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.getters.count;
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    }
  }
};
</script>
