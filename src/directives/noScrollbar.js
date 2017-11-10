export default {
  inserted(_el, { arg: direction, modifiers: { wheel } }, vnode) {
    if (direction !== 'horizontal' && direction !== 'vertical') {
      throw new Error(`
        Undefined direction '${direction}'.
        Available directions are 'horizontal' and 'vertical'.
      `);
    }

    const el = _el;
    const pel = vnode.elm.parentElement;

    const horizontalMarginNegative = () => {
      el.style.marginBottom = `${el.clientHeight - el.offsetHeight}px`;
    };

    const verticalMarginNegative = () => {
      el.style.marginRight = `${el.clientWidth - el.offsetWidth}px`;
    };

    if (direction === 'horizontal') {
      el.style.overflowX = 'scroll';
      horizontalMarginNegative();

      window.addEventListener('resize', horizontalMarginNegative);

      if (wheel) {
        el.addEventListener('mousewheel', (e) => {
          if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
            // TODO: Smooth?
            el.scrollLeft += e.deltaY;
          }
        }, { passive: true });
      }
    }

    if (direction === 'vertical') {
      el.style.overflowY = 'scroll';
      verticalMarginNegative();

      window.addEventListener('resize', verticalMarginNegative);
    }

    pel.style.overflow = 'hidden';
  },
};
