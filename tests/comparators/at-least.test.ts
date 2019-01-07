import { atLeast } from '../../src';

describe('Comparators/AtLeast', () => {
  it('Passes if number in greater than or equal to value', () => {
    const values = [1e1, 1e2, 1e3, 1e4];
    const min = 10;

    values.forEach((value) => {
      const result = atLeast(min).compare(value);

      expect(result.pass).toEqual(true);
      expect(result.message()).toEqual('');
    });
  });

  it('Fails if number in less than value', () => {
    const values = [9.999999, 8, 0, -1, -1e10];
    const min = 10;

    values.forEach((value) => {
      const result = atLeast(min).compare(value);

      expect(result.pass).toEqual(false);
      expect(result.message()).toEqual(`${value} should be at least ${min}`);
    });
  });
});
