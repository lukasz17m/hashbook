<template>
  <div id="app">
    <div class="hello" v-text="msg"></div>

    <img class="block-center" src="../assets/images/logo.png" alt="logo">

    <ul class="tag-list">
      <li
      v-for="(tag, index) in uniqTags"
      class="tag-list-item"
      :style="`
      background-color: ${tagColor(tag).background};
      color: ${tagColor(tag).font}
      `"
      :key="index"
      v-text="tag">
    </li>
  </ul>
</div>
</template>

<script>
import tagColor from '../utils/tagColor';

export default {
  data() {
    return {
      msg: 'Hello ES6/7/8…!',
      tags: [
        'set', 'set', 'set', 'set', 'set', 'set', 'set', 'set', 'Lorem', 'sint',
        'ipsum dolor', 'sit amet, consectetur', 'sint', 'adipisicing', 'elit.',
        'Sapiente', 'voluptatum!', 'Doloribus', 'reiciendis', 'est', 'eligendi',
        'voluptates harum', 'at quis dolores', 'ea', 'est', ', nisi, iusto,',
        'quidem architecto.', 'Vel vero', 'blanditiis', 'itaque', 'sit', 'ab',
        'inventore', 'sint', 'temporibus', 'ducimus', 'libero', 'dolorum',
        'architecto', 'sint', 'voluptate', 'odit', 'eum', 'commodi', 'dode',
        'cupiditate', 'fuga', 'corporis', 'soluta', 'aperiam', 'repellendus',
        'Maiores', 'excepturi', 'eius', 'nisi', 'blanditiis', 'doloremque',
        'ut', 'ad', 'similique', 'aut', 'sint', 'blanditiis', 'adipisicing',
      ],
    };
  },
  computed: {
    uniqTags() {
      return [...new Set(this.tags)];
    },
  },
  methods: {
    tagColor,
  },
};
</script>
