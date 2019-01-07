interface ITestResult {
  pass: boolean;
  message: () => string;
}

interface IComparer {
  compare(value: any): ITestResult;
}
