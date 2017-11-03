export default {
  hideLeftNav: (_state) => {
    const state = _state;
    state.leftNav = false;
  },
  showLeftNav: (_state) => {
    const state = _state;
    state.leftNav = true;
  },
  collapseLeftNav: (_state) => {
    const state = _state;
    state.leftNavCollapsed = true;
  },
  uncollapseLeftNav: (_state) => {
    const state = _state;
    state.leftNavCollapsed = false;
  },
};
