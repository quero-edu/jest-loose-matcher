import { approximately } from '../../src';
import { toString } from '../../src/comparators/utils';
import { hours } from '../../src/time-interval';

describe('Comparators/Approximately', () => {
  describe('With numbers', () => {
    it('Passes if number in inside interval', () => {
      const values = [9.9, 10, 10.1];

      values.forEach((value) => {
        const result = approximately(10, 0.1).compare(value);

        expect(result.pass).toEqual(true);
        expect(result.message()).toEqual('');
      });
    });

    it('Fails if number in outside interval', () => {
      const values = [9.89, 10.11];
      const expected = 10;
      const delta = 0.1;

      values.forEach((value) => {
        const result = approximately(expected, delta).compare(value);

        expect(result.pass).toEqual(false);
        expect(result.message()).toEqual(`${value} should be approximately ${expected} ± ${delta}`);
      });
    });
  });

  describe('With Dates', () => {
    it('Passes if date in inside interval', () => {
      const values = [
        new Date('2019-01-06T10:00:00.000Z'),
        new Date('2019-01-06T11:00:00.000Z'),
        new Date('2019-01-06T12:00:00.000Z'),
      ];
      const expected = new Date('2019-01-06T11:00:00.000Z');
      const delta = hours(1);

      values.forEach((value) => {
        const result = approximately(expected, delta).compare(value);

        expect(result.pass).toEqual(true);
        expect(result.message()).toEqual('');
      });
    });

    it('Fails if number in outside interval', () => {
      const values = [
        new Date('2019-01-06T09:59:59.999Z'),
        new Date('2019-01-06T12:00:00.001Z'),
      ];
      const expected = new Date('2019-01-06T11:00:00.000Z');
      const delta = hours(1);

      values.forEach((value) => {
        const result = approximately(expected, delta).compare(value);

        expect(result.pass).toEqual(false);
        expect(result.message()).toEqual(`${toString(value)} should be approximately ${toString(expected)} ± ${delta}`);
      });
    });
  });
});
