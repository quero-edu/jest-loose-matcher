export function toString(value: Date | number): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value.toString();
}
