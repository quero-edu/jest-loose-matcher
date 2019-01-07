import * as deepEql from 'deep-eql';

declare global {
  namespace jest {
    interface Matchers<R> { // tslint:disable-line:interface-name
      toLooselyEqual(value: any): CustomMatcherResult;
    }
  }
}

const DEFAULT_ERROR_MSG = 'Values do not match';

expect.extend({
  toLooselyEqual(actual, expected) {
    if (typeof actual.compare === 'function') {
      return actual.compare(expected);
    }

    if (typeof expected.compare === 'function') {
      return expected.compare(actual);
    }

    let msg = DEFAULT_ERROR_MSG;

    return {
      pass: deepEql(actual, expected, {
        comparator(lho: any, rho: any) {
          if (lho.compare && rho.compare) {
            return false;
          }

          if (rho.compare) {
            const res = rho.compare(lho);
            msg = res.message();
            return res.pass;
          }

          if (lho.compare) {
            const res = lho.compare(rho);
            msg = res.message();
            return res.pass;
          }

          return null;
        },
      }),
      message: () => msg };
  },
});
