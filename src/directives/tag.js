import { tagColor } from '@/utils';

export default {
  bind(el) {
    const tag = el;
    const { textContent: text } = tag;

    tag.style.backgroundColor = tagColor(text + text.length).background;
    tag.style.color = tagColor(text + text.length).font;
  },
};
