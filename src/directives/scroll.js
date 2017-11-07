let heightDiff;
let widthDiff;

const updateDimDiffs = (el, pel) => {
  heightDiff = parseFloat(window.getComputedStyle(el).height, 10)
  - parseFloat(window.getComputedStyle(pel).height, 10);

  widthDiff = parseFloat(window.getComputedStyle(el).width, 10)
  - parseFloat(window.getComputedStyle(pel).width, 10);
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
    let xDiff;
    let yDiff;

    pel.style.overflow = 'hidden';
    pel.style.position = 'relative';
    el.style.left = '0';
    el.style.position = 'relative';
    el.style.top = '0';

    updateDimDiffs(el, pel);

    const restartVars = (e, { x, y }) => {
      if (x) {
        startPosition.left = parseInt(el.style.left, 10);
        startPoint.x = e.touches ? e.touches[0].clientX : e.clientX;
      }

      if (y) {
        startPosition.top = parseInt(el.style.top, 10);
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
        restartVars(e, { x: true, y: true });

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

        [xDiff, yDiff] = [clientX - startPoint.x, clientY - startPoint.y];

        if (direction === 'horizontal') {
          if (startPosition.left + xDiff > 0) {
            el.style.left = '0';

            restartVars(e, { x: true, y: false });
          } else if (-(startPosition.left + xDiff) >= widthDiff) {
            el.style.left = `${-widthDiff}px`;

            restartVars(e, { x: true, y: false });
          } else {
            el.style.left = `${startPosition.left + xDiff}px`;
          }
        } else if (direction === 'vertical') {
          if (startPosition.top + yDiff > 0) {
            el.style.top = '0';

            restartVars(e, { x: false, y: true });
          } else if (-(startPosition.top + yDiff) >= heightDiff) {
            el.style.top = `${-heightDiff}px`;

            restartVars(e, { x: false, y: true });
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
