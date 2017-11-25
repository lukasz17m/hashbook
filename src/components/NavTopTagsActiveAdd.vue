<template>
  <div
    v-if="editingID"
    tabindex="0"
    class="tags-active__add-button"
    @click="addTag"
    @keyup.enter.space="addTag">
    <span class="fa fa-plus fa-2x"></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavTopTagsActiveAdd',

  computed: mapGetters(['editingID']),

  methods: {
    addTag() {
      this.$_eventBus.$emit('addTag');
    },
  },
};
</script>
