import { expect } from 'chai';
import { contains } from '@/utils';

describe('Function returns true if expression contains any given word', () => {
  it('returns false — expression does not include any given word', () => {
    expect(contains('Lorem ipsum', 'dolor', 'sit', 'amet')).to.be.false;
  });

  it('returns true — expression contains one given word', () => {
    expect(contains('Lorem ipsum', 'dolor', 'sit', 'ipsum')).to.be.true;
  });

  it('throws TypeError when first parameter is not a string', () => {
    expect(contains.bind(contains, ['Not a string'])).to.throw(TypeError);
  });

  it('throws TypeError — reached a non-string parameter before return', () => {
    expect(contains.bind(contains, 'String', 'Boolean', 7)).to.throw(TypeError);
  });

  it('not throwing — returned before reaching a non-string parameter', () => {
    expect(contains.bind(contains, 'String', 'Str', 7)).to.not.throw;
  });
});
