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
  // TEMP: Only for scroll testing
  pushtags: (_state) => {
    const state = _state;
    state.tagsActive.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
  },
};
