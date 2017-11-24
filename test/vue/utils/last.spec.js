import { expect } from 'chai';
import { last } from '@/utils';

describe('Last', () => {
  it('returns last array item', () => {
    expect(last([1, 2, 3])).equal(3);
  });

  it('throws TypeError when first parameter is not an array', () => {
    expect(last.bind(last, 'Not an array')).to.throw(TypeError);
    expect(last.bind(last, null)).to.throw(TypeError);
    expect(last.bind(last)).to.throw(TypeError); // undefined
  });
});
