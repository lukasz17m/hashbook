<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
};
</script>

<style lang="scss">
@import "~@/assets/scss/palette";
@import "~@/assets/scss/variables";

$overlay-color: $color1;
$spinner-color: $color4;

.spinner-wrapper {
  align-items: center;
  background-color: transparentize($overlay-color, .1);
  display: flex;
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 1;
}

/* http://tobiasahlin.com/spinkit/ */
.spinner {
  animation: sk-rotateplane 1s infinite ease-in-out;
  background-color: $spinner-color;
  height: 3rem;
  margin: 0 auto;
  width: 3rem;
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }

  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }

  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
