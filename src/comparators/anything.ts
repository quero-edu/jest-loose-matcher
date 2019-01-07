export default function anything() {
  return {
    compare(): ITestResult {
      return { pass: true, message: () => '' };
    },
  };
}
