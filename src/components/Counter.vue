<template>
  <div>
    {{count}}
    <button class="increment" @click="increment">+1</button>
    <button class="decrement" @click="decrement">-1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
};
</script>
