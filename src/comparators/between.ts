export default function between(min: any, max: any): IComparer {
  return {
    compare(value: any): ITestResult {
      if (value <= max && value >= min) {
        return { pass: true, message: () => '' };
      }

      const valueString = value instanceof Date ? value.toISOString() : value.toString();
      const minString = min instanceof Date ? min.toISOString() : min.toString();
      const maxString = max instanceof Date ? max.toISOString() : max.toString();

      return { pass: false, message: () => `Expected ${valueString} to be within ${minString} and ${maxString}` };
    },
  };
}
