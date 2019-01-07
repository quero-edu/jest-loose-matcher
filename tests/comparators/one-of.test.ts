import { oneOf } from '../../src';

describe('Comparators/OneOf', () => {
  it('Passes if value in one of provided', () => {
    const values = [1, 'a', null, undefined, true];

    values.forEach((value) => {
      const result = oneOf(1, 'a', null, undefined, true).compare(value);

      expect(result.message()).toEqual('');
      expect(result.pass).toEqual(true);
    });
  });

  it('Fails if value is not one of expectations', () => {
    const values = [2, 'b', false];
    const expectations = [1, 'a', null, undefined, true];

    values.forEach((value) => {
      const result = oneOf(...expectations).compare(value);

      expect(result.pass).toEqual(false);
      expect(result.message()).toEqual(`${value} is not one of [${expectations.join(', ')}]`);
    });
  });
});
