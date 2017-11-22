import { tagColor } from '@/utils';

export default {
  bind(el) {
    const tag = el;
    const { textContent: text } = tag;

    tag.style.backgroundColor = tagColor(text).background;
    tag.style.color = tagColor(text).font;
  },
};
