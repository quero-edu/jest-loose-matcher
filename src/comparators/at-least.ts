export default function atLeast(min: any): IComparer {
  return {
    compare(value: any): ITestResult {
      if (value < min) {
        return { pass: false, message: () => `${value} should be at least ${min}` };
      }

      return { pass: true, message: () => '' };
    },
  };
}
