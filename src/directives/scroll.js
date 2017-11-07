let heightDiff;
let widthDiff;

const updateDimDiffs = (el, pel) => {
  heightDiff =
      parseFloat(window.getComputedStyle(el).height)
    - parseFloat(window.getComputedStyle(pel).height);

  widthDiff =
      parseFloat(window.getComputedStyle(el).width)
    - parseFloat(window.getComputedStyle(pel).width);
};

export default {
  inserted(_el, { value }, vnode) {
    const direction = value;
    const el = _el;
    const pel = vnode.elm.parentElement;

    const startPosition = {
      left: 0,
      top: 0,
    };

    const startPoint = {
      x: 0,
      y: 0,
    };

    let dragging = false;

    pel.style.overflow = 'hidden';
    pel.style.position = 'relative';
    el.style.left = '0';
    el.style.position = 'relative';
    el.style.top = '0';

    updateDimDiffs(el, pel);

    const resetVars = (e, { x, y }) => {
      if (x) {
        startPosition.left = parseFloat(el.style.left);
        startPoint.x = e.touches ? e.touches[0].clientX : e.clientX;
      }

      if (y) {
        startPosition.top = parseFloat(el.style.top);
        startPoint.y = e.touches ? e.touches[0].clientY : e.clientY;
      }
    };

    // forEach is not necessary in the following case, consistency issues
    ['resize'].forEach((event) => {
      window.addEventListener(event, () => {
        updateDimDiffs(el, pel);
      });
    });

    ['mousedown', 'touchstart'].forEach((event) => {
      el.addEventListener(event, (e) => {
        resetVars(e, { x: true, y: true });

        dragging = true;
      });
    });

    ['mousemove', 'touchmove'].forEach((event) => {
      window.addEventListener(event, (e) => {
        if (!dragging) {
          return false;
        }

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const [xDiff, yDiff] = [clientX - startPoint.x, clientY - startPoint.y];

        if (direction === 'horizontal') {
          if (startPosition.left + xDiff > 0) {
            el.style.left = '0';

            resetVars(e, { x: true, y: false });
          } else if (-(startPosition.left + xDiff) >= widthDiff) {
            el.style.left = `${-widthDiff}px`;

            resetVars(e, { x: true, y: false });
          } else {
            el.style.left = `${startPosition.left + xDiff}px`;
          }
        } else if (direction === 'vertical') {
          if (startPosition.top + yDiff > 0) {
            el.style.top = '0';

            resetVars(e, { x: false, y: true });
          } else if (-(startPosition.top + yDiff) >= heightDiff) {
            el.style.top = `${-heightDiff}px`;

            resetVars(e, { x: false, y: true });
          } else {
            el.style.top = `${startPosition.top + yDiff}px`;
          }
        } else {
          throw new Error(`
            Undefined direction '${direction}'.
            Available directions are 'horizontal' and 'vertical'.
          `);
        }

        return true;
      });
    });

    ['mouseup', 'touchend', 'visibilitychange'].forEach((event) => {
      window.addEventListener(event, () => {
        dragging = false;
      });
    });
  },

  componentUpdated(el, _, vnode) {
    updateDimDiffs(el, vnode.elm.parentElement);
  },
};
