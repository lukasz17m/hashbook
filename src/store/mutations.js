export default {
  increment: (_state) => {
    const state = _state;
    state.count += 1;
  },
  decrement: (_state) => {
    const state = _state;
    state.count -= 1;
  },
};
