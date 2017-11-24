export default {
  bind(_el, { value: callback }) {
    const el = _el;

    el.addEventListener('keydown', (e) => {
      const { key } = e;

      if (key === '#') {
        const { value: content, selectionStart: caret } = el;

        if (content.substring(caret - 1, caret) !== '\\') {
          e.preventDefault();
          callback();
        }
      }
    });

    el.addEventListener('keyup', () => {
      el.value = el.value.replace(/\\#/, '#');
      el.dispatchEvent(new Event('input')); // Force Vuex update
    });
  },
};
