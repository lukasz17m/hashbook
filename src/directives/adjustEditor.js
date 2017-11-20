import store from '@/store';

export default {
  inserted(_el, { value: id }) {
    const el = _el;

    const rem = parseInt(
      getComputedStyle(document.documentElement).fontSize,
      10,
    );

    // `editmodeon` is a custom event triggered in `NoteItemMenuItems` component
    el.addEventListener('editmodeon', () => {
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
  },
};
