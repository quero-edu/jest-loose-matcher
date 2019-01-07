export default function atMost(max: any): IComparer {
  return {
    compare(value: any): ITestResult {
      if (value > max) {
        return { pass: false, message: () => `${value} should be at most ${max}` };
      }

      return { pass: true, message: () => '' };
    },
  };
}
