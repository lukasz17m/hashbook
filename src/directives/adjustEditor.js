import store from '@/store';

export default {
  inserted(_el, { value: id }) {
    const el = _el;

    const rem = parseInt(
      getComputedStyle(document.documentElement).fontSize,
      10,
    );

    // Four custom events triggered in `NoteItemMenuItems` component

    ['editmodeon', 'previewmodeoff'].forEach((type) => {
      el.addEventListener(type, () => {
        const container = document.querySelector('.notes');
        const tagBox = document.querySelector('.tags-inactive');

        if (container === null || typeof container === 'undefined') return;

        const containerHeight = container.clientHeight;
        const tagBoxHeight = tagBox === null ? 0 : tagBox.clientHeight;

        if (!containerHeight || id !== store.getters.editingID) return;

        el.style.height = `${containerHeight - (3 * rem)}px`;

        container.scrollTo({
          behavior: 'smooth',
          top: el.offsetTop - ((5.5 * rem) + tagBoxHeight),
        });
      });
    });

    ['editmodeoff', 'previewmodeon'].forEach((type) => {
      el.addEventListener(type, () => {
        el.style.height = 'auto';
      });
    });
  },
};
