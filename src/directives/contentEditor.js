export default {
  inserted(_el) {
    const el = _el;

    el.attributes.removeNamedItem('content');
    el.attributes.removeNamedItem('ineditmode');

    el.style.display = 'block';
    el.style.height = 'calc(100% - 1rem)';
    el.style.left = '.5rem';
    el.style.position = 'absolute';
    el.style.resize = 'none';
    el.style.top = '.5rem';
    el.style.width = 'calc(100% - 1rem)';

    setTimeout(() => {
      el.focus();
    }, 100);
  },
};
