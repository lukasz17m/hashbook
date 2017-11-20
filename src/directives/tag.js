import { tagColor } from '@/utils';

const paintTag = (_tag) => {
  const tag = _tag;
  const { textContent: text } = tag;

  tag.style.backgroundColor = tagColor(text).background;
  tag.style.color = tagColor(text).font;
};

export default {
  bind(el) {
    paintTag(el);
  },

  update(el) {
    paintTag(el);
  },
};
