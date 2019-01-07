export default function oneOf(...expectations: any): IComparer {
  return {
    compare(value: any): ITestResult {
      if (!expectations.includes(value)) {
        return { pass: false, message: () => `${value} is not one of [${expectations.join(', ')}]` };
      }

      return { pass: true, message: () => '' };
    },
  };
}
