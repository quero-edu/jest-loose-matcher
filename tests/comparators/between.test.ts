import { between } from '../../src';
import { toString } from '../../src/comparators/utils';

describe('Comparators/Between', () => {

  describe('With numbers', () => {
    it('Passes if number in inside interval', () => {
      const values = [10, 11, 12];
      const min = 10;
      const max = 12;

      values.forEach((value) => {
        const result = between(min, max).compare(value);

        expect(result.pass).toEqual(true);
        expect(result.message()).toEqual('');
      });
    });

    it('Fails if number in outside interval', () => {
      const values = [1, 9.999999999, 12.0000000001, 20];
      const min = 10;
      const max = 12;

      values.forEach((value) => {
        const result = between(min, max).compare(value);

        expect(result.pass).toEqual(false);
        expect(result.message()).toEqual(`Expected ${value} to be within ${min} and ${max}`);
      });
    });
  });

  describe('With Dates', () => {
    it('Passes if number in inside interval', () => {
      const values = [
        new Date('2019-01-06T10:00:00.000Z'),
        new Date('2019-01-06T11:00:00.000Z'),
        new Date('2019-01-06T12:00:00.000Z'),
      ];
      const min = new Date('2019-01-06T10:00:00.000Z');
      const max = new Date('2019-01-06T12:00:00.000Z');

      values.forEach((value) => {
        const result = between(min, max).compare(value);

        expect(result.pass).toEqual(true);
        expect(result.message()).toEqual('');
      });
    });

    it('Fails if number in outside interval', () => {
      const values = [
        new Date('2019-01-06T09:59:59.999Z'),
        new Date('2019-01-06T12:00:00.001Z'),
      ];
      const min = new Date('2019-01-06T10:00:00.000Z');
      const max = new Date('2019-01-06T12:00:00.000Z');

      values.forEach((value) => {
        const result = between(min, max).compare(value);

        expect(result.pass).toEqual(false);
        expect(result.message()).toEqual(
          `Expected ${toString(value)} to be within ${toString(min)} and ${toString(max)}`);
      });
    });
  });
});
