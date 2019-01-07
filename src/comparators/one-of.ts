export default function oneOf(...expectations: any): IComparer {
  return {
    compare(value: any): ITestResult {
      if (expectations.indexOf(value) !== -1) {
        return { pass: true, message: () => '' };
      }

      return { pass: false, message: () => `${value} is not one of [${expectations.join(', ')}]` };
    },
  };
}
