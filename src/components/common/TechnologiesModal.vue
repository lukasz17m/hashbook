<template>
  <div class="wrapper" @click="$emit('close')">
    <div
      ref="content"
      tabindex="0"
      class="content"
      v-html="content"
      @keyup.escape="$emit('close')"></div>
  </div>
</template>

<script>
import axios from 'axios';
import MarkdownIt from 'markdown-it';

export default {
  name: 'TechnologiesModal',

  data() {
    return {
      content: '',
    };
  },

  created() {
    const md = new MarkdownIt({
      linkify: true,
      typographer: true,
    });

    axios.get('/assets/technologies.md')
      .catch(() => ({ data: '# Axios couldn’t fetch the file' }))
      .then(({ data }) => {
        this.content = md.render(data);
      });
  },

  updated() {
    this.$refs.content.focus();
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/palette";

$border-color: $color2;
$content-background: $color5;
$overlay-color: $color1;

.wrapper {
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

  .content {
    background-color: $content-background;
    border: .5rem solid $border-color;
    height: 80%;
    max-width: 30rem;
    overflow: auto;
    padding: 1rem;
    width: 80%;
  }
}
</style>
