<template>
  <div class="tag-input" @click="$emit('escape')">
    <div class="tag-input__wrapper">
      <input
        v-model="tag"
        type="text"
        placeholder="#"
        class="tag-input__input input"
        @keyup.enter="$emit('submit', tag)"
        @keyup.escape="$emit('escape')">

        <div class="tag-input__color" :style="boxColor"></div>
    </div>
  </div>
</template>

<script>
import { tagColor } from '@/utils';

export default {
  name: 'TagInput',

  data() {
    return {
      tag: '',
    };
  },

  computed: {
    boxColor() {
      return { backgroundColor: tagColor(this.tag).background };
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/palette";
@import "~@/assets/scss/variables";

$overlay-color: $color1;
$wrapper-color: $color2;
$input-color: $color4;

.tag-input {
  align-items: center;
  background-color: transparentize($overlay-color, .1);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 1;

  &__wrapper {
    background-color: $wrapper-color;
    display: flex;
    padding: 0.5rem;
  }

  &__input {
    flex: 1;
  }

  &__color {
    border-radius: 4px;
    filter: drop-shadow(0 0 2px black);
    height: 36px;
    margin-left: .5rem;
    width: 36px;
  }
}
</style>
