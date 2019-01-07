import { atMost } from '../../src';

describe('Comparators/AtMost', () => {
  it('Passes if number in less than or equal to value', () => {
    const values = [10, 8, 0, -1, -1e10];
    const max = 10;

    values.forEach((value) => {
      const result = atMost(max).compare(value);

      expect(result.pass).toEqual(true);
      expect(result.message()).toEqual('');
    });
  });

  it('Fails if number in greater than value', () => {
    const values = [10.0000001, 1e2, 1e3, 1e4];
    const max = 10;

    values.forEach((value) => {
      const result = atMost(max).compare(value);

      expect(result.pass).toEqual(false);
      expect(result.message()).toEqual(`${value} should be at most ${max}`);
    });
  });
});
