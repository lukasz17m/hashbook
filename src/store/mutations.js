export default {
  hideLeftNav: (_state) => {
    const state = _state;
    state.leftNav = false;
  },
  showLeftNav: (_state) => {
    const state = _state;
    state.leftNav = true;
  },
};
