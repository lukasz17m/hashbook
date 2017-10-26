export default {
  increment: (state) => {
    const h = state;
    h.count += 1;
  },
  decrement: (state) => {
    const h = state;
    h.count -= 1;
  },
};
