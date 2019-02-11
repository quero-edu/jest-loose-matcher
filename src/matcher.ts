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
        comparator(leftHandOperator: any, rightHandOperator: any) {
          if ((leftHandOperator && leftHandOperator.compare) && (rightHandOperator && rightHandOperator.compare)) {
            return false;
          }

          if (rightHandOperator && rightHandOperator.compare) {
            const res = rightHandOperator.compare(leftHandOperator);
            msg = res.message();
            return res.pass;
          }

          if (leftHandOperator && leftHandOperator.compare) {
            const res = leftHandOperator.compare(rightHandOperator);
            msg = res.message();
            return res.pass;
          }

          return null;
        },
      }),
      message: () => msg };
  },
});

