<template>
  <div :class="classObject">
    <NavTop />
    <NavLeft />

    <div class="main-flex">
      <TagsInactive />
      <Notes />
    </div>

    <TagInput v-if="showInput" @escape="escape" @submit="saveTag" />
    <Spinner v-if="loading" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import NavLeft from '@/components/NavLeft.vue';
import NavTop from '@/components/NavTop.vue';
import Notes from '@/components/Notes.vue';
import Spinner from '@/components/common/Spinner.vue';
import TagInput from '@/components/common/TagInput.vue';
import TagsInactive from '@/components/TagsInactive.vue';

export default {
  name: 'App',

  components: {
    NavLeft,
    NavTop,
    Notes,
    Spinner,
    TagInput,
    TagsInactive,
  },

  data() {
    return {
      showInput: false,
    };
  },

  computed: {
    ...mapGetters(['leftNav', 'leftNavCollapsed', 'loading']),

    classObject() {
      return {
        'fix-top-padding': true,
        collapsed: this.leftNav && this.leftNavCollapsed,
        uncollapsed: this.leftNav && !this.leftNavCollapsed,
      };
    },
  },

  methods: {
    ...mapMutations(['pushActiveTag']),

    escape() {
      this.showInput = false;
      document.querySelector('.note__content textarea').focus();
    },

    saveTag(tag) {
      this.pushActiveTag(tag);
      this.showInput = false;
      document.querySelector('.note__content textarea').focus();
    },
  },

  created() {
    this.$_eventBus.$on('addTag', () => {
      this.showInput = true;

      this.$nextTick(() => {
        document.querySelector('.tag-input input').focus();
      });
    });
  },
};
</script>
