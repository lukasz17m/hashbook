<template>
  <div class="content" v-html="desiredContent"></div>
</template>

<script>
import highlightJS from 'highlight.js';
import MarkdownIt from 'markdown-it';
import MarkdownItAbbr from 'markdown-it-abbr';
import MarkdownItDeflist from 'markdown-it-deflist';
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItIns from 'markdown-it-ins';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItSup from 'markdown-it-sup';
import twemoji from 'twemoji';
import { mapGetters } from 'vuex';

export default {
  name: 'NoteItemContentPreview',

  props: {
    content: {
      type: String,
      required: true,
    },

    inEditMode: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      md: null,
    };
  },

  computed: {
    ...mapGetters(['noteContent']),

    desiredContent() {
      return this.md.render(this.inEditMode
        ? this.noteContent || ''
        : this.content);
    },
  },

  created() {
    this.md = new MarkdownIt({
      linkify: true,
      typographer: true,
      highlight: (str, lang) => {
        if (lang && highlightJS.getLanguage(lang)) {
          try {
            return highlightJS.highlight(lang, str).value;
          } catch (_) {
            //
          }
        }
        return '';
      },
    }).use(MarkdownItAbbr)
      .use(MarkdownItDeflist)
      .use(MarkdownItEmoji)
      .use(MarkdownItFootnote)
      .use(MarkdownItIns)
      .use(MarkdownItMark)
      .use(MarkdownItSub)
      .use(MarkdownItSup);

    this.md.renderer.rules.emoji = (token, id) =>
      `<span class="emoji">${twemoji.parse(token[id].content)}</span>`;
  },
};
</script>
