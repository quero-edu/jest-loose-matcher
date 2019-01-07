import { toString } from './utils';

export default function approximately(expected: number | Date, delta: number): IComparer {
  return {
    compare(actual: number | Date): ITestResult {
      const min = expected instanceof Date ? new Date(expected.getTime() - delta) : expected - delta;
      const max = expected instanceof Date ? new Date(expected.getTime() + delta) : expected + delta;

      if (actual < min || actual > max) {
        return { pass: false, message: () =>
          `${toString(actual)} should be approximately ${toString(expected)} ± ${delta}` };
      }
      return { pass: true, message: () => '' };
    },
  };
}
