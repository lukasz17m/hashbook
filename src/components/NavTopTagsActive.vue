<template>
  <div v-if="hasActive" class="tags-active">
    <div class="tags-active__scroll-wrapper">
      <ul class="tags" v-scroll="direction">
        <li
          v-for="(tag, i) in tagsActive"
          class="tag is-medium"
          tabindex="0"
          :key="i"
          v-text="tag"
          v-tag></li>
        </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { scroll, tag } from '@/directives';

export default {
  name: 'NavTopTagsActive',

  directives: { scroll, tag },

  data() {
    return {
      direction: 'horizontal',
    };
  },

  computed: {
    ...mapGetters(['tagsActive']),

    hasActive() {
      return !!this.tagsActive.length;
    },
  },
};
</script>
