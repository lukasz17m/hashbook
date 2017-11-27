<template>
  <div :class="classObject">
    <NavTop />
    <NavLeft />

    <div class="main-flex">
      <LocalStoragePolicy />
      <TagsInactive />
      <Notes />
    </div>

    <Spinner v-if="loading" />
    <TagInput v-if="showInput" @escape="escape" @submit="saveTag" />
    <TechnologiesModal v-if="showTechnologiesModal" @close="hideTechnologiesModal" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import LocalStoragePolicy from '@/components/common/LocalStoragePolicy.vue';
import NavLeft from '@/components/NavLeft.vue';
import NavTop from '@/components/NavTop.vue';
import Notes from '@/components/Notes.vue';
import Spinner from '@/components/common/Spinner.vue';
import TagInput from '@/components/common/TagInput.vue';
import TagsInactive from '@/components/TagsInactive.vue';
import TechnologiesModal from '@/components/common/TechnologiesModal.vue';

export default {
  name: 'App',

  components: {
    LocalStoragePolicy,
    NavLeft,
    NavTop,
    Notes,
    Spinner,
    TagInput,
    TagsInactive,
    TechnologiesModal,
  },

  data() {
    return {
      showInput: false,
      showTechnologiesModal: false,
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
    ...mapMutations([
      'hideLeftNav',
      'pushActiveTag',
      'setLeftNavStateFromLocalStorage',
    ]),

    escape() {
      this.showInput = false;
      document.querySelector('.note__content textarea').focus();
    },

    hideTechnologiesModal() {
      this.showTechnologiesModal = false;
    },

    saveTag(tag) {
      this.pushActiveTag(tag);
      this.showInput = false;
      document.querySelector('.note__content textarea').focus();
    },
  },

  created() {
    this.setLeftNavStateFromLocalStorage();

    this.$_eventBus.$on('addTag', () => {
      this.showInput = true;

      this.$nextTick(() => {
        document.querySelector('.tag-input input').focus();
      });
    });

    this.$_eventBus.$on('showTechnologiesModal', () => {
      this.showTechnologiesModal = true;
    });
  },
};
</script>
