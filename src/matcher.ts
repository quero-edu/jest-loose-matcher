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
          if (isComparator(leftHandOperator) && isComparator(rightHandOperator)) {
            return false;
          }

          if (isComparator(rightHandOperator)) {
            const res = rightHandOperator.compare(leftHandOperator);
            msg = res.message();
            return res.pass;
          }

          if (isComparator(leftHandOperator)) {
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

function isComparator(operator: any): boolean {
  return operator && typeof operator.compare === 'function';
}
