import detectIt from 'detect-it';

const { deviceType } = detectIt;

export default {
  bind(_el, _, { context: $vue }) {
    const el = _el;

    el.addEventListener('keydown', (e) => {
      if (deviceType === 'touchOnly') return;

      const { key } = e;

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

      if (new RegExp(/\\\\#/).test(el.value)) {
        el.value = el.value.replace(/\\\\#/, '\\​#'); // \<\u200b>#
      }

      if (new RegExp(/\\#/).test(el.value)) {
        el.value = el.value.replace(/\\#/, '#');
      }

      el.dispatchEvent(new CustomEvent('input')); // Force Vuex update
    });
  },
};
