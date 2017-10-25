<template>
  <div>
    {{count}}
    <button class="increment" @click="increment">+1</button>
    <button class="decrement" @click="decrement">-1</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'count'
    ])
  },
  methods: {
    ...mapMutations([
      'increment',
      'decrement'
    ])
  }
};
</script>
