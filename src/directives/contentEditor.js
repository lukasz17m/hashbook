export default {
  inserted(_el) {
    const el = _el;

    el.attributes.removeNamedItem('content');

    el.style.display = 'block';
    el.style.height = '100%';
    el.style.width = '100%';
    el.style.resize = 'none';

    setTimeout(() => {
      el.focus();
    }, 100);
  },
};
