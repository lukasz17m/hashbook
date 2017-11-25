import detectIt from 'detect-it';

const { deviceType } = detectIt;

export default {
  bind(_el, _, { context: $vue }) {
    const el = _el;

    el.addEventListener('keydown', (e) => {
      const { key } = e;

      if (deviceType === 'touchOnly') return;

      if (key === '#') {
        const { value: content, selectionStart: caret } = el;

        if (content.substring(caret - 1, caret) !== '\\') {
          e.preventDefault();
          $vue.$_eventBus.$emit('addTag');
        }
      }
    });

    el.addEventListener('keyup', () => {
      if (deviceType === 'touchOnly') return;

      el.value = el.value
        .replace(/\\\\#/, '\\​#') // \<ZERO WIDTH SPACE\u200b>#
        .replace(/\\#/, '#');

      el.dispatchEvent(new Event('input')); // Force Vuex update
    });
  },
};
