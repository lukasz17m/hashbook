<template>
  <div v-if="!hidden" class="ls-policy">
    <span class="ls-policy__text">This site uses Local Storage</span>
    <button class="button is-info ls-policy__close" @click="hide" @keyup.enter.space="hide">Close</button>
  </div>
</template>

<script>
export default {
  name: 'LocalStoragePolicy',

  data() {
    return {
      hidden: false,
    };
  },

  methods: {
    hide() {
      this.hidden = true;
      try {
        window.localStorage.setItem('ls-policy-hidden', '1');
      } catch (_) {
        //
      }
    },
  },

  created() {
    try {
      if (window.localStorage.getItem('ls-policy-hidden') === '1') {
        this.hidden = true;
      }
    } catch (_) {
      //
    }
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/palette";

$background: $color3;
$text-color: $color5;

.ls-policy {
  align-items: center;
  background-color: $background;
  display: flex;
  flex: 1 0 auto;
  padding: 0.5rem;

  &__text {
    color: $text-color;
    margin-right: 0.5rem;
  }

  &__close {
    margin-left: auto;
  }
}
</style>
