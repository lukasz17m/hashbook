import tagColor from '@/utils/tagColor';

export default {
  bind(_el) {
    const el = _el;
    const text = el.textContent;

    el.style.backgroundColor = tagColor(text).background;
    el.style.color = tagColor(text).font;
  },
};
