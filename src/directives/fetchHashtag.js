// BUG: Not working in Android Chrome
export default {
  bind(_el, { value: callback }) {
    const el = _el;

    el.addEventListener('keydown', (e) => {
      const {
        key,
        keyCode,
        shiftKey,
        which,
      } = e;

      const code = keyCode || which;

      if (key === '#' || (shiftKey && code === 51)) {
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
