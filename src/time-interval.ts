export function milliseconds(interval) {
  return interval;
}

export function seconds(interval) {
  return interval * 1000;
}

export function minutes(interval) {
  return interval * 1000 * 60;
}

export function hours(interval) {
  return interval * 1000 * 60 * 60;
}

export function days(interval) {
  return interval * 1000 * 60 * 60 * 24;
}

export function months(interval) {
  return interval * 1000 * 60 * 60 * 24 * 30;
}

export function years(interval) {
  return interval * 1000 * 60 * 60 * 24 * 365;
}
